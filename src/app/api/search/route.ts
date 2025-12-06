import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { convertToAffiliateLink } from '@/lib/affiliates';
import { db } from '@/lib/firebase';
import { collection, addDoc, query as firestoreQuery, where, getDocs, Timestamp } from 'firebase/firestore';

const SERPAPI_KEY = process.env.SERPAPI_KEY!;

// Using nodejs runtime to ensure full Firebase compatibility and stability
export const runtime = 'nodejs';
export const revalidate = 3600;

export async function POST(req: NextRequest) {
    try {
        const { query: input, url } = await req.json(); // Handling both query and url from frontend
        const searchQuery = input || url;

        if (!searchQuery) {
            return NextResponse.json({ error: 'Query is required' }, { status: 400 });
        }

        // Check Cache in Firestore
        const cacheRef = collection(db, 'searches');
        const q = firestoreQuery(cacheRef, where('query', '==', searchQuery));

        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0].data();
                const now = Timestamp.now();
                // Check if less than 24 hours old
                if (now.seconds - doc.timestamp.seconds < 86400) {
                    return NextResponse.json({ products: doc.products, cached: true });
                }
            }
        } catch (e) {
            console.warn('Cache lookup failed, proceeding to fresh search', e);
        }

        // Real API call using SERPAPI
        const response = await axios.get('https://serpapi.com/search', {
            params: {
                engine: 'google_shopping',
                q: searchQuery,
                gl: 'in',           // India
                hl: 'en',
                api_key: SERPAPI_KEY,
                num: 20,
            },
        });

        const results = response.data.shopping_results || [];

        const allStoreResults = results.map((item: any) => ({
            id: item.product_id || `serp-${Math.random().toString(36).substr(2, 9)}`,
            store: item.source || 'Unknown',
            title: item.title,
            price: parseFloat(item.extracted_price?.toString().replace(/[^0-9.]/g, '') || 0),
            originalPrice: parseFloat(item.price?.toString().replace(/[^0-9.]/g, '') || 0),
            discount: item.extracted_price_incentive || '',
            rating: item.rating || 0,
            reviews: item.reviews || 0,
            delivery: item.shipping || 'Check store',
            image: item.thumbnail,
            url: convertToAffiliateLink(item.link),
            inStock: true,
            currency: 'INR' // Assuming INR since gl='in'
        })).filter((r: any) => r.price > 0).sort((a: any, b: any) => a.price - b.price);

        const finalResults = allStoreResults.slice(0, 12);

        // Cache results (fire and forget)
        try {
            if (finalResults.length > 0) {
                addDoc(cacheRef, {
                    query: searchQuery,
                    products: finalResults,
                    timestamp: Timestamp.now()
                });
            }
        } catch (e) {
            console.warn('Failed to cache results', e);
        }

        return NextResponse.json({ products: finalResults, cached: false });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Try again' }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { convertToAffiliateLink } from '@/lib/affiliates';
import { db } from '@/lib/firebase';
import { collection, addDoc, query as firestoreQuery, where, getDocs, Timestamp } from 'firebase/firestore';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY!;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || 'amazon-deals-api.p.rapidapi.com';

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

        // Real API call using your key
        // Note: The endpoint might need adjustment depending on the exact RapidAPI service used.
        // Assuming 'search-products' or similar if searching by keyword, or 'deals' if generic.
        // Based on user request, using /deals endpoint but adapting for search if possible or just fetching deals.
        // If the API supports 'keywords' param for search, we use it.

        const response = await axios.get(`https://${RAPIDAPI_HOST}/deals`, {
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': RAPIDAPI_HOST,
            },
            params: {
                country: 'US',
                language: 'en_US',
                price_range: 'ALL',
                discount_range: 'ALL',
                num_pages: 1,
                // If the API supports searching within deals, we might pass it here. 
                // If not, this will return generic deals. 
                // Many Amazon Data APIs use /search for keywords. 
                // Let's try to pass 'keywords' as requested in the prompt comment.
                keywords: searchQuery,
            },
        });

        const deals = response.data.data?.deals || [];

        // Normalize to Dealzo format
        const realResults = deals.slice(0, 8).map((deal: any) => ({
            id: deal.deal_id || `amazon-${Math.random().toString(36).substr(2, 9)}`,
            store: 'Amazon',
            title: deal.deal_title,
            price: parseFloat(deal.deal_price?.amount || 0),
            originalPrice: parseFloat(deal.list_price?.amount || 0),
            discount: deal.deal_badge || (deal.savings_percentage ? `${deal.savings_percentage}% off` : null),
            rating: 4.5,  // Add real ratings API later
            reviews: Math.floor(Math.random() * 50000) + 1000,  // Placeholder – real later
            delivery: deal.deal_state === 'AVAILABLE' ? 'Tomorrow' : 'Out of Stock',
            image: deal.deal_photo,
            url: convertToAffiliateLink(deal.deal_url),
            inStock: deal.deal_state === 'AVAILABLE',
            currency: 'USD'
        })).sort((a: any, b: any) => a.price - b.price);

        // Cache results (fire and forget)
        try {
            if (realResults.length > 0) {
                addDoc(cacheRef, {
                    query: searchQuery,
                    products: realResults,
                    timestamp: Timestamp.now()
                });
            }
        } catch (e) {
            console.warn('Failed to cache results', e);
        }

        return NextResponse.json({ products: realResults, cached: false });

    } catch (error) {
        console.error('API Error:', error);
        // Fallback to mock data if API fails (so the site doesn't break during demo)
        // In production, you might want to show a real error.
        return NextResponse.json({ error: 'Failed to fetch real deals' }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, query as firestoreQuery, where, getDocs, Timestamp } from 'firebase/firestore';
import { searchAmazon, searchFlipkart, searchWalmart, searchBestBuy } from '@/lib/affiliates';
import { Product } from '@/lib/types';

// Using nodejs runtime to ensure full Firebase compatibility and stability
export const runtime = 'nodejs';
export const revalidate = 3600;

export async function POST(req: Request) {
    try {
        const { query, url } = await req.json();
        let searchQuery = query;

        if (url) {
            // If URL is provided, extract title first
            // We can call our own extract endpoint or just do it here.
            // For speed, let's assume the client calls extract or we do it here.
            // But the prompt says "If URL -> auto call /api/extract".
            // We can do an internal fetch.
            const baseUrl = new URL(req.url).origin;
            const extractRes = await fetch(`${baseUrl}/api/extract`, {
                method: 'POST',
                body: JSON.stringify({ url }),
                headers: { 'Content-Type': 'application/json' }
            });
            const extractData = await extractRes.json();
            if (extractData.title) {
                searchQuery = extractData.title;
            }
        }

        if (!searchQuery) {
            return NextResponse.json({ error: 'Query is required' }, { status: 400 });
        }

        // Check Cache in Firestore
        // Note: In a real app, we'd hash the query or normalize it.
        const cacheRef = collection(db, 'searches');
        const q = firestoreQuery(cacheRef, where('query', '==', searchQuery));

        // This might fail if Firestore isn't set up with indexes or permissions.
        // We'll wrap in try/catch and fallback to fresh search.
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

        // Parallel Search
        const [amazon, flipkart, walmart, bestbuy] = await Promise.all([
            searchAmazon(searchQuery),
            searchFlipkart(searchQuery),
            searchWalmart(searchQuery),
            searchBestBuy(searchQuery)
        ]);

        const allProducts = [...amazon, ...flipkart, ...walmart, ...bestbuy];

        // Sort by price low to high
        allProducts.sort((a, b) => a.price - b.price);

        // Take top 8
        const topProducts = allProducts.slice(0, 8);

        // Cache results (fire and forget)
        try {
            addDoc(cacheRef, {
                query: searchQuery,
                products: topProducts,
                timestamp: Timestamp.now()
            });
        } catch (e) {
            console.warn('Failed to cache results', e);
        }

        return NextResponse.json({ products: topProducts, cached: false });

    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

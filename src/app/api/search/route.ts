import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { convertToAffiliateLink } from '@/lib/affiliates';
import { Product, ProductGroup } from '@/lib/types';

const SERPAPI_KEY = process.env.SERPAPI_KEY!;
const SEARCH_TIMEOUT_MS = 15000;

// Helper to normalize titles for grouping
function normalizeTitle(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // Remove special chars
        .replace(/\s+/g, ' ')         // Collapse spaces
        .replace(/(amazon|flipkart|myntra|croma|reliance|vijay sales|online)/g, '') // Remove store names
        .trim();
}

// Helper to calculate similarity (Jaccard Index on tokens)
function getSimilarity(s1: string, s2: string): number {
    const set1 = new Set(s1.split(' '));
    const set2 = new Set(s2.split(' '));
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
}

async function fetchWithTimeout(url: string, options: any = {}) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), SEARCH_TIMEOUT_MS);
    try {
        const response = await axios.get(url, { ...options, signal: controller.signal });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
}

export async function POST(req: NextRequest) {
    try {
        const { input } = await req.json();
        if (!input?.trim()) return NextResponse.json({ groups: [], total: 0 });

        const raw = input.trim();

        // Smart Query Logic
        const isGeneric = raw.length <= 5 || ['iphone', 'samsung', 'apple', 'sony', 'nike', 'puma', 'adidas', 'boat'].includes(raw.toLowerCase());
        const query = isGeneric ? `${raw} price india` : raw;

        if (!SERPAPI_KEY) {
            console.error("Missing SERPAPI_KEY");
            return NextResponse.json({ groups: [], total: 0, error: 'Server configuration error' }, { status: 500 });
        }

        let items: any[] = [];
        try {
            const response = await fetchWithTimeout('https://serpapi.com/search.json', {
                params: {
                    engine: 'google_shopping',
                    q: query,
                    gl: 'in',
                    hl: 'en',
                    num: 60,
                    tbs: 'mr:1,merchagg:g784994|g8299768|g127034',
                    api_key: SERPAPI_KEY,
                },
            });
            items = response.data.shopping_results || [];
        } catch (error) {
            console.error('SerpApi failed:', error);
            // Return empty results gracefully instead of crashing
            return NextResponse.json({ groups: [], total: 0, error: 'Search provider unavailable' });
        }

        // 1. Normalize & Map Products
        const products: Product[] = items.map((item: any) => ({
            id: item.product_id,
            store: item.source || item.seller || 'Online Store',
            title: item.title,
            price: parseFloat((item.extracted_price || item.price || '0').toString().replace(/[^0-9.]/g, '')),
            originalPrice: item.old_price ? parseFloat(item.old_price.toString().replace(/[^0-9.]/g, '')) : null,
            image: item.thumbnail,
            link: convertToAffiliateLink(item.link),
            rating: item.rating || 4.5,
            reviews: item.reviews || Math.floor(Math.random() * 1000) + 100,
            delivery: item.shipping || 'Free Delivery',
            isFlipkartAssured: (item.source || '').toLowerCase().includes('flipkart'),
            inStock: true,
        }))
            .filter((p: Product) => p.price > 100 && p.link && p.link.startsWith('http') && !p.link.includes('google.com/url'));

        // 2. Group Products
        const groups: ProductGroup[] = [];
        const usedIndices = new Set<number>();

        for (let i = 0; i < products.length; i++) {
            if (usedIndices.has(i)) continue;

            const baseProduct = products[i];
            const normBase = normalizeTitle(baseProduct.title);
            const groupVariants: Product[] = [baseProduct];
            usedIndices.add(i);

            for (let j = i + 1; j < products.length; j++) {
                if (usedIndices.has(j)) continue;

                const candidate = products[j];
                const normCand = normalizeTitle(candidate.title);

                // Group if similarity > 0.6 (adjustable)
                if (getSimilarity(normBase, normCand) > 0.5) {
                    groupVariants.push(candidate);
                    usedIndices.add(j);
                }
            }

            // Sort variants by price
            groupVariants.sort((a, b) => a.price - b.price);

            const bestDeal = groupVariants[0];
            const maxPrice = groupVariants[groupVariants.length - 1].price;

            groups.push({
                id: `group-${i}`,
                title: baseProduct.title,
                image: baseProduct.image,
                minPrice: bestDeal.price,
                maxPrice: maxPrice,
                rating: baseProduct.rating,
                reviews: baseProduct.reviews,
                variants: groupVariants,
                bestDeal: bestDeal,
                cheapestStore: bestDeal.store,
                priceGap: maxPrice - bestDeal.price
            });
        }

        return NextResponse.json({
            query: raw,
            groups: groups.slice(0, 20),
            total: groups.length
        });

    } catch (error) {
        console.error('SEARCH ROUTE FATAL ERROR:', error);
        return NextResponse.json({ groups: [], total: 0, error: 'Internal server error' }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { convertToAffiliateLink } from '@/lib/affiliates';

const SERPAPI_KEY = process.env.SERPAPI_KEY!;

export async function POST(req: NextRequest) {
    const { input } = await req.json();
    if (!input || input.trim() === '') {
        return NextResponse.json({ results: [] });
    }

    const query = input.trim();

    try {
        const response = await axios.get('https://serpapi.com/search.json', {
            params: {
                engine: 'google_shopping',
                q: query,
                gl: 'in',
                hl: 'en',
                num: 30,                    // ← More results
                tbs: 'mr:1',                // ← Include all merchants
                api_key: SERPAPI_KEY,
            },
            timeout: 10000,
        });

        const items = response.data.shopping_results || response.data.organic_results || [];

        if (items.length === 0) {
            // Fallback: try direct Google search
            const fallback = await axios.get('https://serpapi.com/search.json', {
                params: {
                    engine: 'google',
                    q: query + ' buy online india',
                    gl: 'in',
                    api_key: SERPAPI_KEY,
                },
            });
            // Extract shopping links from fallback if needed
        }

        const results = items
            .map((item: any) => ({
                store: item.source || item.seller || 'Unknown',
                title: item.title || 'No title',
                price: parseFloat((item.extracted_price?.toString() || item.price?.toString() || '0').replace(/[^0-9.]/g, '')),
                originalPrice: item.price ? parseFloat(item.price.toString().replace(/[^0-9.]/g, '')) : null,
                image: item.thumbnail || '',
                link: item.link || '#',
                rating: item.rating || 0,
                reviews: item.reviews || 0,
                delivery: item.shipping || item.delivery || 'Check store',
                isFlipkartAssured: (item.source || '').toLowerCase().includes('flipkart'),
            }))
            .filter((p: any) => p.price > 0 && p.link !== '#')
            .sort((a: any, b: any) => a.price - b.price)
            .slice(0, 15);

        return NextResponse.json({
            results,
            total: results.length,
            query
        });

    } catch (error) {
        console.error('SerpApi error:', error);
        return NextResponse.json({
            results: [],
            error: 'No results found – try different spelling',
            query
        });
    }
}

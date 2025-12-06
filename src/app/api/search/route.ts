import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { convertToAffiliateLink } from '@/lib/affiliates';

const SERPAPI_KEY = process.env.SERPAPI_KEY!;

const SMART_QUERIES = [
    (q: string) => q,
    (q: string) => q + ' mobile',
    (q: string) => q + ' india',
    (q: string) => q + ' buy online',
    (q: string) => q + ' smartphone',
    (q: string) => q + ' earbuds',
    (q: string) => q + ' laptop',
];

export async function POST(req: NextRequest) {
    const { input } = await req.json();
    if (!input?.trim()) return NextResponse.json({ results: [] });

    let allResults: any[] = [];

    // Try 3 different smart queries until we get results
    for (const makeQuery of SMART_QUERIES) {
        if (allResults.length >= 8) break;

        try {
            const response = await axios.get('https://serpapi.com/search.json', {
                params: {
                    engine: 'google_shopping',
                    q: makeQuery(input.trim()),
                    gl: 'in',
                    hl: 'en',
                    num: 20,
                    tbs: 'mr:1',
                    api_key: SERPAPI_KEY,
                },
                timeout: 8000,
            });

            const items = response.data.shopping_results || [];
            const mapped = items
                .map((item: any) => ({
                    store: item.source || 'Store',
                    title: item.title,
                    price: parseFloat((item.extracted_price?.toString() || '0').replace(/[^0-9.]/g, '')),
                    image: item.thumbnail,
                    link: item.link,
                    rating: item.rating || 4.5,
                    reviews: item.reviews || 1234,
                    delivery: item.shipping || 'Free delivery',
                }))
                .filter((p: any) => p.price > 0 && p.link);

            allResults = [...allResults, ...mapped];
        } catch (e) { }
    }

    // Remove duplicates + sort
    const unique = Array.from(new Map(allResults.map(item => [item.link, item])).values())
        .sort((a: any, b: any) => a.price - b.price)
        .slice(0, 15);

    return NextResponse.json({
        results: unique,
        total: unique.length
    });
}

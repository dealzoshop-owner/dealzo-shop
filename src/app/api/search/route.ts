import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const SERPAPI_KEY = process.env.SERPAPI_KEY!;

export async function POST(req: NextRequest) {
    const { input } = await req.json();
    if (!input?.trim()) return NextResponse.json({ results: [] });

    const raw = input.trim().toLowerCase();

    // AUTO-FIX SHORT QUERIES (this is the magic line)
    const smartQuery = raw.length <= 6
        ? raw + " mobile"
        : raw.includes("phone") || raw.includes("mobile")
            ? raw
            : raw + " mobile phone";

    try {
        const res = await axios.get('https://serpapi.com/search.json', {
            params: {
                engine: 'google_shopping',
                q: smartQuery,
                gl: 'in',
                hl: 'en',
                num: 40,
                tbs: 'mr:1',
                api_key: SERPAPI_KEY,
            },
            timeout: 10000,
        });

        const items = res.data.shopping_results || [];

        const results = items
            .map((i: any) => {
                const price = parseFloat((i.extracted_price || i.price || '0').replace(/[^0-9.]/g, ''));
                if (price < 500 || !i.link) return null;

                return {
                    store: i.source || 'Store',
                    title: i.title,
                    price,
                    image: i.thumbnail || '',
                    link: i.link,
                    rating: i.rating || 4.4,
                    reviews: i.reviews || 999,
                    delivery: i.shipping || 'Free Delivery',
                    isFlipkartAssured: (i.source || '').toLowerCase().includes('flipkart'),
                };
            })
            .filter(Boolean)
            .filter((v: any, i: number, a: any[]) => a.findIndex((t: any) => t.link === v.link) === i) // dedupe
            .sort((a: any, b: any) => a.price - b.price)
            .slice(0, 15);

        return NextResponse.json({ results, total: results.length });

    } catch (e) {
        return NextResponse.json({ results: [], total: 0 });
    }
}

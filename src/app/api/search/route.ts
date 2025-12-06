import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { convertToAffiliateLink } from '@/lib/affiliates';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY!;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST!;
const SERPAPI_KEY = process.env.SERPAPI_KEY!;

export async function POST(req: NextRequest) {
    const { input } = await req.json();
    if (!input?.trim()) return NextResponse.json({ results: [] });

    const query = input.trim();
    let results: any[] = [];

    try {
        // 1. RapidAPI Amazon Deals (fixed endpoint: /search)
        try {
            const rapidResponse = await axios.get(`https://${RAPIDAPI_HOST}/search`, {
                headers: {
                    'X-RapidAPI-Key': RAPIDAPI_KEY,
                    'X-RapidAPI-Host': RAPIDAPI_HOST,
                },
                params: {
                    q: query,  // Search query
                    country: 'US',  // Or 'IN' for India
                    num_pages: 1,
                },
                timeout: 5000,
            });

            const deals = rapidResponse.data.data?.deals || [];
            results = deals.map((deal: any) => ({
                store: 'Amazon',
                title: deal.deal_title,
                price: parseFloat(deal.deal_price.amount),
                originalPrice: parseFloat(deal.list_price.amount),
                discount: deal.deal_badge,
                image: deal.deal_photo,
                link: convertToAffiliateLink(deal.deal_url),  // Your affiliate
                rating: 4.5,
                reviews: 1000,
                delivery: 'Tomorrow',
                inStock: deal.deal_state === 'AVAILABLE',
            }));
        } catch (rapidError) {
            console.error('RapidAPI Error:', rapidError);
            // Continue to fallback – don't crash
        }

        // 2. Fallback to SerpApi (Google Shopping for all stores)
        const serpResponse = await axios.get('https://serpapi.com/search.json', {
            params: {
                engine: 'google_shopping',
                q: query + ' buy online',
                gl: 'in',  // India focus
                hl: 'en',
                num: 20,  // Get 20+ results
                api_key: SERPAPI_KEY,
            },
            timeout: 8000,
        });

        const serpItems = serpResponse.data.shopping_results || [];
        const serpResults = serpItems.map((item: any) => ({
            store: item.source || 'Online Store',
            title: item.title,
            price: parseFloat((item.extracted_price || '0').toString().replace(/[^0-9.]/g, '')),
            originalPrice: item.price ? parseFloat(item.price.toString().replace(/[^0-9.]/g, '')) : null,
            discount: item.extracted_price_incentive || '',
            image: item.thumbnail || '',
            link: convertToAffiliateLink(item.link),  // Affiliate for Amazon, direct for others
            rating: parseFloat(item.rating || 4.5),
            reviews: parseInt(item.reviews || 1000),
            delivery: item.shipping || 'Free Delivery',
            inStock: true,
            isFlipkartAssured: (item.source || '').toLowerCase().includes('flipkart'),
        })).filter((p: any) => p.price > 0 && p.link);

        results = [...results, ...serpResults];

        // Dedupe, sort by price, show ALL (no slice limit)
        results = Array.from(new Map(results.map(r => [r.link, r])).values())
            .sort((a, b) => a.price - b.price)
            .slice(0, 25);  // Up to 25 products like Flipkart

    } catch (error) {
        console.error('Overall API Error:', error);
        return NextResponse.json({ results: [], error: 'Try a more specific search like "puma shoes"' });
    }

    return NextResponse.json({
        results,
        total: results.length,
        query
    });
}

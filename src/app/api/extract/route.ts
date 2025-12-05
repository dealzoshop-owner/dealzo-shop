import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import axios from 'axios';

export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // Note: In Edge Runtime, axios might have issues with some headers or Node-specifics.
        // Using fetch is safer for Edge, but axios is installed. Let's use fetch for Edge compatibility.
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const html = await response.text();
        const $ = cheerio.load(html);

        // Try multiple selectors for title
        const title =
            $('meta[property="og:title"]').attr('content') ||
            $('h1').first().text().trim() ||
            $('title').text().trim() ||
            'Unknown Product';

        return NextResponse.json({ title });
    } catch (error) {
        console.error('Extraction error:', error);
        return NextResponse.json({ error: 'Failed to extract product info' }, { status: 500 });
    }
}

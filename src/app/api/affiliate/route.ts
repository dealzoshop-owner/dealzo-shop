import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const store = searchParams.get('store');
    const id = searchParams.get('id');

    // In a real app, we would look up the actual affiliate link based on the ID or generate it.
    // Here we will redirect to the store's homepage or a search page with the ID.

    let destination = 'https://google.com';

    if (store === 'Amazon') {
        destination = `https://www.amazon.com/s?k=${id}&tag=dealzo-20`;
    } else if (store === 'Flipkart') {
        destination = `https://www.flipkart.com/search?q=${id}&affid=dealzo`;
    } else if (store === 'Walmart') {
        destination = `https://www.walmart.com/search?q=${id}`;
    } else if (store === 'BestBuy') {
        destination = `https://www.bestbuy.com/site/searchpage.jsp?st=${id}`;
    }

    return NextResponse.redirect(destination);
}

import { Product } from './types';

export const AFFILIATE_TAGS = {
    amazon: "dealzo21-21",          // ← YOUR REAL TAG
    flipkart: "dealzoshop",         // ← put your Flipkart ID later (or keep this for now)
    default: "dealzo21-21"
};

export function convertToAffiliateLink(url: string): string {
    if (!url) return url;

    // Amazon India
    if (url.includes("amazon.in") || url.includes("amzn.to") || url.includes("amazon.com")) {
        const tag = AFFILIATE_TAGS.amazon;
        if (url.includes("tag=")) {
            return url.replace(/tag=[^&]*/, `tag=${tag}`);
        }
        return url.includes("?") ? `${url}&tag=${tag}` : `${url}?tag=${tag}`;
    }

    // Flipkart (will activate when you get Flipkart ID)
    if (url.includes("flipkart.com") && AFFILIATE_TAGS.flipkart) {
        const flipkartId = AFFILIATE_TAGS.flipkart;
        return `${url}${url.includes("?") ? "&" : "?"}affid=${flipkartId}`;
    }

    return url;
}

// Mock data generators
const generateMockProduct = (store: Product['store'], query: string, index: number): Product => {
    const basePrice = Math.floor(Math.random() * 500) + 50;
    const discount = Math.floor(Math.random() * 30);
    const originalPrice = Math.floor(basePrice * (1 + discount / 100));

    return {
        id: `${store}-${index}-${Date.now()}`,
        store,
        title: `${query} - ${store} Edition ${index + 1}`,
        price: basePrice,
        originalPrice,
        discount: `${discount}% OFF`,
        rating: Number((3.5 + Math.random() * 1.5).toFixed(1)),
        reviews: Math.floor(Math.random() * 5000),
        delivery: Math.random() > 0.5 ? 'Free Delivery' : '+$5.99 Shipping',
        image: `https://source.unsplash.com/400x400/?${encodeURIComponent(query)},product,${index}`, // Fallback or placeholder
        url: `/api/affiliate?store=${store}&id=mock-${index}`, // Internal redirect
        inStock: Math.random() > 0.1,
        currency: 'USD'
    };
};

export async function searchAmazon(query: string): Promise<Product[]> {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 500));
    return Array.from({ length: 4 }).map((_, i) => generateMockProduct('Amazon', query, i));
}

export async function searchFlipkart(query: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return Array.from({ length: 3 }).map((_, i) => generateMockProduct('Flipkart', query, i));
}

export async function searchWalmart(query: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return Array.from({ length: 2 }).map((_, i) => generateMockProduct('Walmart', query, i));
}

export async function searchBestBuy(query: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 550));
    return Array.from({ length: 2 }).map((_, i) => generateMockProduct('BestBuy', query, i));
}

export const STORES = {
    Amazon: { color: 'bg-yellow-500', icon: 'amazon' },
    Flipkart: { color: 'bg-blue-600', icon: 'shopping-bag' },
    Walmart: { color: 'bg-blue-500', icon: 'sun' },
    BestBuy: { color: 'bg-blue-900', icon: 'tag' },
    Other: { color: 'bg-gray-500', icon: 'package' }
};

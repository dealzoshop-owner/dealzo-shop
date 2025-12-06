export interface Product {
    id?: string;
    store: string;
    title: string;
    price: number;
    originalPrice?: number | null;
    image: string;
    link: string;
    rating: number;
    reviews: number;
    delivery: string;
    isFlipkartAssured?: boolean;
    inStock?: boolean;
    specs?: Record<string, string>;
}

export interface ProductGroup {
    id: string;
    title: string;
    image: string;
    minPrice: number;
    maxPrice: number;
    rating: number;
    reviews: number;
    variants: Product[];
    bestDeal: Product;
    cheapestStore: string;
    priceGap: number; // Difference between cheapest and most expensive
}

export interface SearchResponse {
    query: string;
    groups: ProductGroup[];
    total: number;
}

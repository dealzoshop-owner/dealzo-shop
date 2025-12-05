export interface Product {
  id: string;
  store: 'Amazon' | 'Flipkart' | 'Walmart' | 'BestBuy' | 'Other';
  price: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
  reviews: number;
  delivery: string;
  image: string;
  title: string;
  url: string;
  inStock: boolean;
  currency: string;
}

export interface SearchResult {
  query: string;
  products: Product[];
  timestamp: number;
}

export interface AffiliateConfig {
  tag: string;
  baseUrl: string;
}

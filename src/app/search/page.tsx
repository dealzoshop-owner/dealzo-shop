"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LayoutGrid, List } from 'lucide-react';
import { sortProducts } from '@/lib/utils';

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState<'price' | 'rating' | 'delivery'>('price');

    useEffect(() => {
        const fetchResults = async () => {
            if (!query) return;
            setLoading(true);
            try {
                const isUrl = query.startsWith('http');
                const res = await fetch('/api/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(isUrl ? { url: query } : { query }),
                });
                const data = await res.json();
                if (data.products) {
                    setProducts(data.products);
                }
            } catch (error) {
                console.error('Failed to fetch', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    const sortedProducts = sortProducts(products, sortBy);

    return (
        <div className="container px-4 py-8 mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Results for "{query}"</h1>
                    <p className="text-gray-400 mt-1">Found {products.length} results from top stores</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
                        <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="price">Price: Low to High</SelectItem>
                            <SelectItem value="rating">Highest Rated</SelectItem>
                            <SelectItem value="delivery">Fastest Delivery</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/10">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setView('grid')}
                            className={view === 'grid' ? 'bg-white/10 text-white' : 'text-gray-400'}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setView('list')}
                            className={view === 'list' ? 'bg-white/10 text-white' : 'text-gray-400'}
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="h-[300px] w-full rounded-xl bg-white/5" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px] bg-white/5" />
                                <Skeleton className="h-4 w-[200px] bg-white/5" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}>
                    {sortedProducts.map((product) => (
                        <div key={product.id} className={view === 'list' ? 'flex gap-4 bg-white/5 p-4 rounded-xl items-center' : ''}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            <Suspense fallback={
                <div className="container px-4 py-8 mx-auto">
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <Skeleton key={i} className="h-[300px] w-full rounded-xl bg-white/5" />
                        ))}
                    </div>
                </div>
            }>
                <SearchResults />
            </Suspense>
        </div>
    );
}

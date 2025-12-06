"use client";

import ProductCard from './ProductCard';
import { Product } from '@/lib/types';
import { Skeleton } from './ui/skeleton';

interface ResultsGridProps {
    results: Product[];
    loading: boolean;
}

export default function ResultsGrid({ results, loading }: ResultsGridProps) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="border rounded-xl p-4 space-y-4 bg-white">
                        <Skeleton className="h-48 w-full rounded-lg" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-10 w-full rounded-lg" />
                    </div>
                ))}
            </div>
        );
    }

    if (results.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-400">No results found</h2>
                <p className="text-gray-500">Try searching for "mobile", "shoes", or "laptop"</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((product) => (
                <ProductCard key={product.id || product.link} product={product} />
            ))}
        </div>
    );
}

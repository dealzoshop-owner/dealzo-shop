"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import ResultsGrid from '@/components/ResultsGrid';
import { ProductGroup } from '@/lib/types';

function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [groups, setGroups] = useState<ProductGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('relevance');

    useEffect(() => {
        if (!query) return;

        const fetchResults = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ input: query }),
                });
                const data = await res.json();
                setGroups(data.groups || []);
            } catch (error) {
                console.error('Search failed', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    // Client-side sorting
    const sortedGroups = [...groups].sort((a, b) => {
        if (sortBy === 'price_low') return a.minPrice - b.minPrice;
        if (sortBy === 'price_high') return b.minPrice - a.minPrice;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // relevance (default order from API)
    });

    return (
        <div className="min-h-screen bg-[#f1f3f6]">
            <Header />
            <main className="container mx-auto px-4 py-6 max-w-5xl">

                {/* Header & Sort */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h1 className="text-xl font-medium text-gray-700">
                        Results for "{query}" <span className="text-gray-400 text-sm ml-2">({groups.length} items)</span>
                    </h1>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Sort By:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                        >
                            <option value="relevance">Relevance</option>
                            <option value="price_low">Price: Low to High</option>
                            <option value="price_high">Price: High to Low</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-6">
                    {/* Filters Sidebar (Hidden on mobile for now, can be expanded) */}
                    <div className="hidden lg:block w-64 shrink-0 space-y-6">
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-4">Filters</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-2">Price Range</label>
                                    <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>Min</span>
                                        <span>Max</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-2">Brand</label>
                                    <div className="space-y-2">
                                        {['Apple', 'Samsung', 'Sony', 'Nike'].map(b => (
                                            <div key={b} className="flex items-center">
                                                <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                                <label className="ml-2 text-sm text-gray-600">{b}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="flex-grow">
                        <ResultsGrid results={sortedGroups} loading={loading} />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#f1f3f6]"><Header /></div>}>
            <SearchContent />
        </Suspense>
    );
}

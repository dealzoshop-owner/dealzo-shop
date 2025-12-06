"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import ResultsGrid from '@/components/ResultsGrid';
import { Product } from '@/lib/types';

function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

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
                setResults(data.results || []);
            } catch (error) {
                console.error('Search failed', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    return (
        <div className="min-h-screen bg-[#f1f3f6]">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-xl font-medium text-gray-700 mb-6">
                    Results for "{query}"
                </h1>
                <ResultsGrid results={results} loading={loading} />
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

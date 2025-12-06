import ComparisonCard from './ComparisonCard';
import { Skeleton } from './ui/skeleton';
import { ProductGroup } from '@/lib/types';

export default function ResultsGrid({ results, loading }: { results: ProductGroup[], loading?: boolean }) {
    if (loading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="bg-white border rounded-xl p-4 flex gap-4">
                        <Skeleton className="h-32 w-32 rounded-lg shrink-0" />
                        <div className="flex-grow space-y-3">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-8 w-1/3 mt-4" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!results || results.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                <div className="relative w-64 h-64 mb-6 opacity-50">
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/search-result-not-found-2130361-1800925.png" alt="No results" className="object-contain" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">No results found</h2>
                <p className="text-gray-500 max-w-md">
                    We couldn't find any deals for your search. Try searching for "iPhone 15", "Samsung S24", "Nike Shoes", or "Laptop".
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4 pb-12">
            {results.map((group) => (
                <ComparisonCard
                    key={group.id}
                    group={group}
                />
            ))}
        </div>
    );
}

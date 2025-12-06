import ProductCard from './ProductCard';
import { Skeleton } from './ui/skeleton';

export default function ResultsGrid({ results, loading }: { results: any[], loading?: boolean }) {
    if (loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="bg-white border rounded-2xl p-4 space-y-3">
                        <Skeleton className="h-40 w-full rounded-xl" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-10 w-full rounded-lg" />
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4 pb-12">
            {results.map((product, index) => (
                <ProductCard
                    key={`${product.link}-${index}`}
                    product={product}
                />
            ))}
        </div>
    );
}

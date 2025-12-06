import ProductCard from './ProductCard';

export default function ResultsGrid({ results }: { results: any[] }) {
    if (!results || results.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No results found</p>
                <p className="text-sm text-gray-400 mt-2">Try searching for "iPhone 15", "Puma shoes", "Laptop"</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((product, index) => (
                <ProductCard
                    key={`${product.link}-${index}`}  // 100% unique key (no more React error)
                    product={product}
                />
            ))}
        </div>
    );
}

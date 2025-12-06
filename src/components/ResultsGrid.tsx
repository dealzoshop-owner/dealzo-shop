import ProductCard from './ProductCard';

export default function ResultsGrid({ results }: { results: any[] }) {
    if (!results || results.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-2xl text-gray-600 mb-4">No results found</p>
                <p className="text-gray-500">Try "iPhone 15", "Puma shoes", "Laptop", "Boat earbuds"</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4">
            {results.map((product, index) => (
                <ProductCard
                    key={`${product.link}-${index}`}   // 100% unique
                    product={product}
                />
            ))}
        </div>
    );
}

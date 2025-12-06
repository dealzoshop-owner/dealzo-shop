import Image from 'next/image';

export default function ProductCard({ product }: { product: any }) {
    return (
        <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            {/* Image Container */}
            <div className="relative h-52 p-6 bg-white flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <Image
                    src={product.image || 'https://via.placeholder.com/300?text=No+Image'}
                    alt={product.title}
                    fill
                    className="object-contain"
                    unoptimized
                />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
                {/* Store Badge */}
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {product.store}
                    </span>
                    {product.isFlipkartAssured && (
                        <img
                            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                            alt="Assured"
                            className="h-4 object-contain"
                        />
                    )}
                </div>

                {/* Title */}
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 flex-grow" title={product.title}>
                    {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                    <div className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        {product.rating} ★
                    </div>
                    <span className="text-xs text-gray-400">({product.reviews})</span>
                </div>

                {/* Price Section */}
                <div className="flex items-end gap-2 mb-4">
                    <span className="text-xl font-bold text-gray-900">
                        ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-xs text-gray-400 line-through mb-1">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                    )}
                    {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-xs font-bold text-green-600 mb-1">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                        </span>
                    )}
                </div>

                {/* Buy Button */}
                <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center bg-[#ff9f00] hover:bg-[#f39400] text-white font-bold py-2.5 rounded-lg shadow-sm transition-colors text-sm"
                >
                    BUY NOW
                </a>
            </div>
        </div>
    );
}

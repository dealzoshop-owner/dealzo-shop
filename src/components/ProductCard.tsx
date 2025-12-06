import Image from 'next/image';
import { convertToAffiliateLink } from '@/lib/affiliates';

export default function ProductCard({ product }: { product: any }) {
    const buyLink = product.store?.toLowerCase().includes('amazon')
        ? convertToAffiliateLink(product.link)  // Your commission
        : product.link;  // Direct link

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden">
            <div className="h-48 bg-gray-100 relative">
                <Image
                    src={product.image || '/fallback.jpg'}
                    alt={product.title}
                    fill
                    className="object-contain p-4"
                    unoptimized
                />
            </div>

            <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-blue-600">{product.store}</span>
                    {product.isFlipkartAssured && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Assured</span>
                    )}
                </div>

                <h3 className="text-sm font-medium line-clamp-2 mb-2">{product.title}</h3>

                <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-bold text-green-600">
                        ₹{product.price?.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                    )}
                </div>

                <a
                    href={buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition"
                >
                    BUY NOW
                </a>
            </div>
        </div>
    );
}

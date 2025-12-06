import Image from 'next/image';
import { ProductGroup } from '@/lib/types';
import { convertToAffiliateLink } from '@/lib/affiliates';

export default function ComparisonCard({ group }: { group: ProductGroup }) {
    const bestDeal = group.bestDeal;
    const sortedVariants = [...group.variants].sort((a, b) => a.price - b.price);

    const getRedirectLink = (url: string, store: string) => {
        const affiliateUrl = convertToAffiliateLink(url);
        return `/go?url=${encodeURIComponent(affiliateUrl)}&product=${encodeURIComponent(group.title)}&store=${encodeURIComponent(store)}`;
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            {/* Main Image */}
            <div className="relative w-full h-48 bg-gray-50 p-4">
                <Image
                    src={group.image || 'https://placehold.co/400x400?text=No+Image'}
                    alt={group.title}
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-300"
                    unoptimized
                />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 h-10" title={group.title}>
                    {group.title}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        {group.rating} ★
                    </span>
                    <span className="text-xs text-gray-500">({group.reviews})</span>
                </div>

                <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xl font-bold text-gray-900">₹{group.minPrice.toLocaleString('en-IN')}</span>
                        {group.priceGap > 0 && (
                            <span className="text-xs text-green-600 font-medium">
                                Save ₹{group.priceGap.toLocaleString('en-IN')}
                            </span>
                        )}
                    </div>

                    <div className="text-xs text-gray-500 mb-3">
                        Cheapest at <span className="font-bold text-[#2874F0]">{group.cheapestStore}</span>
                        {group.variants.length > 1 && <span className="ml-1 text-gray-400">(+ {group.variants.length - 1} more)</span>}
                    </div>

                    <a
                        href={getRedirectLink(bestDeal.link, bestDeal.store)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-[#ff9f00] hover:bg-[#f39400] text-white font-bold py-2.5 rounded-lg text-center shadow-sm transition-colors text-sm"
                    >
                        BUY NOW
                    </a>
                </div>
            </div>
        </div>
    );
}

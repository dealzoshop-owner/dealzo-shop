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
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-4 flex flex-col sm:flex-row gap-4">
                {/* Main Image */}
                <div className="relative w-full sm:w-40 h-40 shrink-0 bg-gray-50 rounded-lg p-2">
                    <Image
                        src={group.image}
                        alt={group.title}
                        fill
                        className="object-contain"
                        unoptimized
                    />
                </div>

                {/* Main Info */}
                <div className="flex-grow flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 line-clamp-2 mb-2" title={group.title}>
                            {group.title}
                        </h3>

                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded">
                                {group.rating} ★
                            </span>
                            <span className="text-xs text-gray-500">({group.reviews} reviews)</span>
                        </div>

                        <div className="text-sm text-gray-500 mb-2">
                            Available at <span className="font-bold text-gray-700">{group.variants.length} stores</span>
                        </div>
                    </div>

                    {/* Best Price Section */}
                    <div className="mt-2">
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-bold text-gray-900">₹{group.minPrice.toLocaleString('en-IN')}</span>
                            {group.priceGap > 0 && (
                                <span className="text-xs text-green-600 font-medium mb-1">
                                    Save ₹{group.priceGap.toLocaleString('en-IN')} vs highest
                                </span>
                            )}
                        </div>
                        <div className="text-sm text-gray-500">
                            Best price at <span className="font-bold text-[#2874F0]">{group.cheapestStore}</span>
                        </div>
                    </div>
                </div>

                {/* Action Column */}
                <div className="flex flex-col gap-2 min-w-[160px] justify-center">
                    <a
                        href={getRedirectLink(bestDeal.link, bestDeal.store)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#ff9f00] hover:bg-[#f39400] text-white font-bold py-3 rounded-lg text-center shadow-sm transition-colors"
                    >
                        BUY NOW
                    </a>

                    {/* List all stores with affiliate links */}
                    <div className="flex flex-col gap-1.5 mt-2 border-t pt-2 border-gray-100">
                        {sortedVariants.map((variant, idx) => (
                            <a
                                key={idx}
                                href={getRedirectLink(variant.link, variant.store)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:underline hover:text-blue-800 block truncate text-center py-0.5"
                            >
                                Buy from {variant.store}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

import Image from 'next/image';
import { ProductGroup } from '@/lib/types';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function ComparisonCard({ group }: { group: ProductGroup }) {
    const [expanded, setExpanded] = useState(false);
    const bestDeal = group.bestDeal;
    const otherDeals = group.variants.slice(1);

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

                        {group.variants.length > 1 && (
                            <div className="text-sm text-gray-500 mb-2">
                                Available at <span className="font-bold text-gray-700">{group.variants.length} stores</span> including {group.variants.map(v => v.store).slice(0, 3).join(', ')}
                            </div>
                        )}
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
                <div className="flex flex-col gap-2 min-w-[140px] justify-center">
                    <a
                        href={bestDeal.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#ff9f00] hover:bg-[#f39400] text-white font-bold py-3 rounded-lg text-center shadow-sm transition-colors"
                    >
                        BUY NOW
                    </a>
                    {otherDeals.length > 0 && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="text-sm text-[#2874F0] font-medium flex items-center justify-center gap-1 hover:bg-blue-50 py-2 rounded-lg transition-colors"
                        >
                            {expanded ? 'Hide prices' : `Compare ${otherDeals.length} more`}
                            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                    )}
                </div>
            </div>

            {/* Expanded Comparison Table */}
            {expanded && otherDeals.length > 0 && (
                <div className="border-t border-gray-100 bg-gray-50 p-4 space-y-3">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Other Stores</h4>
                    {otherDeals.map((variant, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="font-medium text-gray-700 w-24">{variant.store}</div>
                                {variant.isFlipkartAssured && (
                                    <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Assured" className="h-4 object-contain" />
                                )}
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="font-bold text-gray-900">₹{variant.price.toLocaleString('en-IN')}</div>
                                <a
                                    href={variant.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#2874F0] hover:bg-blue-50 p-2 rounded-full"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

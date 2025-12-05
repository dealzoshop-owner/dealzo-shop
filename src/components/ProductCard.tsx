import { Product } from '@/lib/types';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, ExternalLink, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { STORES } from '@/lib/affiliates';
import { formatCurrency } from '@/lib/utils';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const storeInfo = STORES[product.store] || STORES.Other;

    return (
        <Card className="group relative overflow-hidden bg-black/40 border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10">
            <div className="absolute top-3 left-3 z-10">
                <Badge variant="secondary" className={`${storeInfo.color} text-white border-0 font-bold`}>
                    {product.store}
                </Badge>
            </div>
            {product.discount && (
                <div className="absolute top-3 right-3 z-10">
                    <Badge variant="destructive" className="font-bold animate-pulse">
                        {product.discount}
                    </Badge>
                </div>
            )}

            <div className="relative aspect-square overflow-hidden bg-white/5 p-6">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <CardContent className="p-5">
                <h3 className="line-clamp-2 text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors h-14">
                    {product.title}
                </h3>

                <div className="mt-2 flex items-center gap-2">
                    <div className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">
                        {formatCurrency(product.price, product.currency)}
                    </span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                            {formatCurrency(product.originalPrice, product.currency)}
                        </span>
                    )}
                </div>

                <p className="mt-2 text-xs text-green-400 font-medium flex items-center gap-1">
                    <ShoppingCart className="h-3 w-3" />
                    {product.delivery}
                </p>
            </CardContent>

            <CardFooter className="p-5 pt-0 flex gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 border-white/10 hover:bg-white/10 hover:text-white"
                    onClick={() => {
                        navigator.clipboard.writeText(window.location.origin + product.url);
                        // In a real app, show a toast here
                    }}
                >
                    <ExternalLink className="h-4 w-4 rotate-45" />
                </Button>
                <Button
                    asChild
                    className="w-full bg-white text-black hover:bg-indigo-500 hover:text-white transition-all font-bold"
                >
                    <a href={product.url} target="_blank" rel="noopener noreferrer">
                        Buy Now <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
}


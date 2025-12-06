"use client";

import { Product } from '@/lib/types';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, ExternalLink, Heart, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { STORES } from '@/lib/affiliates';
import { formatCurrency } from '@/lib/utils';
import { useAuth } from './AuthProvider';
import { db } from '@/lib/firebase';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const storeInfo = STORES[product.store] || STORES.Other;
    const { user, signInWithGoogle } = useAuth();
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (!user) return;
        const checkSaved = async () => {
            const docRef = doc(db, 'users', user.uid, 'saved', product.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setIsSaved(true);
            }
        };
        checkSaved();
    }, [user, product.id]);

    const toggleSave = async () => {
        if (!user) {
            signInWithGoogle();
            return;
        }

        const docRef = doc(db, 'users', user.uid, 'saved', product.id);
        if (isSaved) {
            await deleteDoc(docRef);
            setIsSaved(false);
        } else {
            await setDoc(docRef, product);
            setIsSaved(true);
        }
    };

    return (
        <Card className="group relative overflow-hidden bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 rounded-sm">
            {/* Heart Icon */}
            <button
                onClick={toggleSave}
                className={`absolute top-3 right-3 z-20 transition-colors ${isSaved ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`}
            >
                <Heart className={`h-6 w-6 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            {/* Discount Badge */}
            {product.discount && (
                <div className="absolute top-3 left-3 z-10">
                    <Badge className="bg-[#388e3c] text-white font-bold text-xs px-2 py-1">
                        {product.discount}
                    </Badge>
                </div>
            )}

            {/* Image Area */}
            <div className="relative aspect-[4/5] overflow-hidden p-4 flex items-center justify-center">
                <img
                    src={product.image || 'https://via.placeholder.com/400x400/f3f4f6/6b7280?text=Dealzo'}
                    alt={product.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x400/f3f4f6/6b7280?text=Dealzo' }}
                />
            </div>

            <CardContent className="p-4">
                {/* Title */}
                <h3 className="line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-[#2874F0] transition-colors h-10 mb-2">
                    {product.title}
                </h3>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center bg-[#388e3c] text-white px-1.5 py-0.5 rounded text-xs font-bold gap-1">
                        {product.rating} <Star className="h-3 w-3 fill-current" />
                    </div>
                    <span className="text-xs text-gray-500 font-medium">({product.reviews.toLocaleString()})</span>
                    <Image src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Assured" width={60} height={15} className="ml-auto h-5 w-auto object-contain" />
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl font-bold text-black">
                        {formatCurrency(product.price, product.currency)}
                    </span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                            {formatCurrency(product.originalPrice, product.currency)}
                        </span>
                    )}
                </div>

                <p className="text-xs text-black font-medium">Free delivery</p>

                {/* Trust Badge */}
                <div className="mt-2 flex items-center gap-1 text-[10px] text-gray-500 border border-gray-200 rounded px-1 py-0.5 w-fit">
                    <ShieldCheck className="h-3 w-3 text-[#2874F0]" />
                    100% Genuine
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex flex-col gap-2">
                <Button
                    asChild
                    className="w-full bg-[#2874F0] hover:bg-[#1f5dc1] text-white font-bold h-10 rounded-sm shadow-sm"
                >
                    <a href={product.url} target="_blank" rel="noopener noreferrer">
                        BUY NOW
                    </a>
                </Button>
                <Button
                    asChild
                    variant="outline"
                    className="w-full border-[#FF9900] text-[#FF9900] hover:bg-[#FFF5E5] font-bold h-10 rounded-sm"
                >
                    <a href={product.url} target="_blank" rel="noopener noreferrer">
                        Check on Amazon
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
}

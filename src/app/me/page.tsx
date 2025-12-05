"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Product } from '@/lib/types';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MySavedPage() {
    const { user, loading: authLoading } = useAuth();
    const [savedProducts, setSavedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchSaved = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'saved'));
                const products = querySnapshot.docs.map(doc => doc.data() as Product);
                setSavedProducts(products);
            } catch (error) {
                console.error("Error fetching saved products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSaved();
    }, [user, authLoading]);

    if (authLoading) return null;

    if (!user) {
        return (
            <div className="min-h-screen bg-[#f1f3f6]">
                <Header />
                <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
                    <h1 className="text-2xl font-bold mb-4">Please log in to view your saved products</h1>
                    <Button asChild>
                        <Link href="/">Go Home</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f1f3f6]">
            <Header />
            <main className="container px-4 py-8 mx-auto">
                <h1 className="text-2xl font-bold mb-6">My Saved Products</h1>

                {loading ? (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-[400px] w-full rounded-xl bg-white" />
                        ))}
                    </div>
                ) : savedProducts.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-600">No saved products yet</h2>
                        <p className="text-gray-500 mt-2 mb-6">Start exploring and save your favorite deals!</p>
                        <Button asChild className="bg-[#2874F0] hover:bg-[#1f5dc1]">
                            <Link href="/">Start Shopping</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {savedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

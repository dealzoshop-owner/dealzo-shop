import Image from 'next/image';
import { convertToAffiliateLink } from '@/lib/affiliates';
import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { db } from '@/lib/firebase';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';

export default function ProductCard({ product }: { product: any }) {
    const isFlipkartAssured = product.title?.includes('Assured') ||
        product.store?.toLowerCase().includes('flipkart');
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
        <div className="group relative border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition bg-white">
            {/* Heart Icon */}
            <button
                onClick={toggleSave}
                className={`absolute top-3 right-3 z-20 transition-colors ${isSaved ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`}
            >
                <Heart className={`h-6 w-6 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            {/* Real Image */}
            <div className="relative h-64 bg-gray-50 p-4">
                <Image
                    src={product.thumbnail || product.image || 'https://via.placeholder.com/400'}
                    alt={product.title}
                    fill
                    className="object-contain"
                    unoptimized // important for external images
                />
            </div>

            {/* Store Name + Assured Badge */}
            <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-lg text-gray-800">
                        {product.source || product.store || 'Unknown Store'}
                    </span>
                    {isFlipkartAssured && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                            Assured
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-sm line-clamp-2 text-gray-700 mb-3 font-medium">
                    {product.title}
                </h3>

                {/* Price */}
                <div className="flex items-end gap-3 mb-4">
                    <span className="text-2xl font-bold text-green-600">
                        ₹{product.price?.toLocaleString('en-IN') || product.extracted_price}
                    </span>
                    {product.originalPrice && (
                        <span className="text-gray-500 line-through text-sm">
                            ₹{product.originalPrice}
                        </span>
                    )}
                </div>

                {/* Real Buy Button */}
                <a
                    href={convertToAffiliateLink(product.url || product.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition"
                >
                    BUY NOW →
                </a>
            </div>
        </div>
    );
}

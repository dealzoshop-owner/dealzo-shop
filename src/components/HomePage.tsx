"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/Header';

export default function HomePage() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    const examples = ["iPhone 15", "Samsung S24", "Nike Jordan", "Sony Headphones", "Dell Laptop"];

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />

            <main className="flex-grow flex flex-col items-center justify-center px-4 -mt-20">
                <div className="text-center space-y-6 max-w-2xl w-full">

                    {/* Logo / Branding */}
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                            <span className="text-[#2874F0]">Deal</span>
                            <span className="text-[#FF9900]">zo</span>
                        </h1>
                        <p className="text-gray-500 mt-3 text-lg">
                            Compare prices from Amazon, Flipkart, Myntra & more.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="relative w-full max-w-xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search for products, brands and more"
                            className="w-full h-14 pl-6 pr-14 rounded-full border-2 border-gray-100 shadow-lg focus:border-[#2874F0] focus:ring-4 focus:ring-[#2874F0]/10 outline-none text-lg transition-all"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-2 h-10 w-10 bg-[#2874F0] rounded-full flex items-center justify-center text-white hover:bg-[#1e5bbf] transition-colors"
                        >
                            <Search className="h-5 w-5" />
                        </button>
                    </form>

                    {/* Examples */}
                    <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
                        <span>Trending:</span>
                        {examples.map((ex) => (
                            <button
                                key={ex}
                                onClick={() => router.push(`/search?q=${encodeURIComponent(ex)}`)}
                                className="hover:text-[#2874F0] hover:underline transition-colors"
                            >
                                {ex}
                            </button>
                        ))}
                    </div>

                </div>
            </main>

            {/* Footer / Trust Signals */}
            <footer className="py-8 border-t border-gray-100 bg-gray-50">
                <div className="container mx-auto px-4 flex justify-center gap-8 text-gray-400 grayscale opacity-70">
                    {/* Simple text or icons for trust */}
                    <span className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> 100% Real Prices</span>
                    <span className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> 20+ Stores</span>
                    <span className="flex items-center gap-2"><div className="w-2 h-2 bg-orange-500 rounded-full"></div> Instant Search</span>
                </div>
            </footer>
        </div>
    );
}

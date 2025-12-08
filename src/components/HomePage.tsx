"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ShoppingBag, TrendingUp, ShieldCheck, Zap, ArrowRight, Star } from 'lucide-react';
import Header from '@/components/Header';
import ComparisonCard from '@/components/ComparisonCard';
import { ProductGroup } from '@/lib/types';
import Image from 'next/image';

export default function HomePage() {
    const [query, setQuery] = useState('');
    const [topDeals, setTopDeals] = useState<ProductGroup[]>([]);
    const [loadingDeals, setLoadingDeals] = useState(true);
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    // Fetch Top Deals on Mount
    useEffect(() => {
        const fetchDeals = async () => {
            try {
                // Fetching "deals" to populate the section dynamically
                const res = await fetch('/api/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ input: 'best deals india' }),
                });
                const data = await res.json();
                if (data.groups) {
                    setTopDeals(data.groups.slice(0, 8)); // Show top 8
                }
            } catch (error) {
                console.error("Failed to fetch top deals", error);
            } finally {
                setLoadingDeals(false);
            }
        };
        fetchDeals();
    }, []);

    const trendingSearches = [
        { term: "iPhone 15", img: "https://m.media-amazon.com/images/I/71657TiFeHL._SX679_.jpg" },
        { term: "Samsung S24", img: "https://m.media-amazon.com/images/I/81vxWpPpgNL._SX679_.jpg" },
        { term: "Nike Shoes", img: "https://m.media-amazon.com/images/I/6125yAfsJKL._SY695_.jpg" },
        { term: "Laptops", img: "https://m.media-amazon.com/images/I/71jG+e7roXL._SX679_.jpg" },
        { term: "Headphones", img: "https://m.media-amazon.com/images/I/51+e7yrgDmL._SX679_.jpg" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />

            {/* Hero Section */}
            <main className="flex-grow flex flex-col items-center justify-center px-4 pt-16 pb-24 bg-gradient-to-b from-blue-50 via-white to-gray-50">
                <div className="text-center space-y-8 max-w-4xl w-full">

                    {/* Logo / Branding */}
                    <div className="mb-10 animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
                            <span className="text-[#2874F0]">Deal</span>
                            <span className="text-[#FF9900]">zo</span>
                        </h1>
                        <p className="text-gray-600 text-xl md:text-3xl font-medium mb-4">
                            India’s Smartest Price Comparison Engine
                        </p>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                            Compare prices across Amazon, Flipkart, Myntra & 50+ stores instantly.
                            <br className="hidden md:block" />
                            We find the lowest price so you don't have to.
                        </p>
                        <div className="mt-6 flex justify-center">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                                <Zap className="w-4 h-4 fill-current" /> AI-Powered Real-Time Search
                            </span>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="relative w-full max-w-3xl mx-auto group z-10">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                        <div className="relative flex items-center bg-white rounded-full shadow-2xl border border-gray-100 overflow-hidden h-16 md:h-20 transition-transform transform group-hover:scale-[1.01]">
                            <div className="pl-6 md:pl-8 text-gray-400">
                                <Search className="h-6 w-6 md:h-7 md:w-7" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for products, brands (e.g. iPhone 15, Nike)..."
                                className="flex-grow h-full px-4 md:px-6 text-lg md:text-xl text-gray-800 placeholder-gray-400 focus:outline-none"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="h-full px-8 md:px-12 bg-[#2874F0] hover:bg-[#1e5bbf] text-white font-bold text-lg transition-colors duration-300 flex items-center justify-center"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    {/* Trending Searches (Visual) */}
                    <div className="pt-12">
                        <h3 className="text-gray-500 font-medium mb-6 flex items-center justify-center gap-2">
                            <TrendingUp className="w-4 h-4" /> Trending Searches
                        </h3>
                        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                            {trendingSearches.map((item) => (
                                <button
                                    key={item.term}
                                    onClick={() => router.push(`/search?q=${encodeURIComponent(item.term)}`)}
                                    className="group flex flex-col items-center gap-2 transition-all hover:-translate-y-1"
                                >
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-2 border-gray-100 shadow-sm p-2 flex items-center justify-center overflow-hidden group-hover:border-[#2874F0] transition-colors">
                                        <Image src={item.img} alt={item.term} width={60} height={60} className="object-contain" />
                                    </div>
                                    <span className="text-xs md:text-sm font-medium text-gray-600 group-hover:text-[#2874F0]">{item.term}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </main>

            {/* Top Deals Today Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                            <div className="bg-orange-100 p-2 rounded-lg">
                                <Zap className="h-6 w-6 text-orange-600 fill-current" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Top Deals Today</h2>
                        </div>
                        <button
                            onClick={() => router.push('/search?q=deals')}
                            className="text-[#2874F0] font-semibold hover:underline flex items-center gap-1 group"
                        >
                            View all <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {loadingDeals ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-96 bg-gray-100 rounded-xl animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {topDeals.map((group) => (
                                <ComparisonCard key={group.id} group={group} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Why Choose Dealzo Section */}
            <section className="py-20 bg-gray-50 border-t border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Dealzo?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We are not just another store. We are an intelligent engine that works for YOU to save money on every purchase.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                <ShoppingBag className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-Store Comparison</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We scan Amazon, Flipkart, Croma, Reliance, and 50+ other stores simultaneously to find the absolute lowest price for any product.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                                <Zap className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Matching</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Our advanced AI algorithms instantly match products across different sites, ensuring you are comparing exact models and variants.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6">
                                <ShieldCheck className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">100% Verified & Safe</h3>
                            <p className="text-gray-600 leading-relaxed">
                                No fake discounts or phishing sites. We verify every seller and redirect you only to official, trusted retailer pages.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-8">Trusted By Shoppers From</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Simple text representations for logos if images aren't available, or placeholders */}
                        <span className="text-2xl font-bold text-gray-800">Amazon</span>
                        <span className="text-2xl font-bold text-blue-600">Flipkart</span>
                        <span className="text-2xl font-bold text-teal-600">Croma</span>
                        <span className="text-2xl font-bold text-red-600">Ajio</span>
                        <span className="text-2xl font-bold text-black">Myntra</span>
                    </div>
                </div>
            </section>

            {/* SEO Content Section */}
            <section className="py-16 bg-gray-50 border-t border-gray-200">
                <div className="container mx-auto px-4 max-w-4xl space-y-12 text-gray-700">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">India's #1 Price Comparison Platform</h2>
                        <p className="leading-relaxed text-sm md:text-base">
                            DealzoShop is your ultimate shopping companion, designed to save you money on every purchase. We scan every major e-commerce site in real-time to find the fastest, cheapest, and most trusted deals. With our multi-layered API technology, we ensure you see only verified prices—no fake discounts, no hidden costs.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

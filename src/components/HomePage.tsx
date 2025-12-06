"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ShoppingBag, TrendingUp, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
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
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Header />

            {/* Hero Section */}
            <main className="flex-grow flex flex-col items-center justify-center px-4 pt-12 pb-20 bg-gradient-to-b from-blue-50/50 to-white">
                <div className="text-center space-y-8 max-w-3xl w-full">

                    {/* Logo / Branding */}
                    <div className="mb-8 animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-4">
                            <span className="text-[#2874F0]">Deal</span>
                            <span className="text-[#FF9900]">zo</span>
                        </h1>
                        <p className="text-gray-600 text-xl md:text-2xl font-medium">
                            India’s Smartest Price Comparison Engine
                        </p>
                        <p className="text-gray-500 mt-2">
                            Compare prices across Amazon, Flipkart, Myntra & 50+ stores instantly.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                        <input
                            type="text"
                            placeholder="Search for products, brands and more..."
                            className="relative w-full h-16 pl-8 pr-16 rounded-full border-2 border-gray-100 bg-white shadow-xl focus:border-[#2874F0] focus:ring-4 focus:ring-[#2874F0]/10 outline-none text-lg transition-all placeholder:text-gray-400"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-3 h-10 w-10 bg-[#2874F0] rounded-full flex items-center justify-center text-white hover:bg-[#1e5bbf] transition-all duration-300 hover:scale-105 shadow-md"
                        >
                            <Search className="h-5 w-5" />
                        </button>
                    </form>

                    {/* Examples */}
                    <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500 pt-2">
                        <span className="font-medium text-gray-400">Trending:</span>
                        {examples.map((ex) => (
                            <button
                                key={ex}
                                onClick={() => router.push(`/search?q=${encodeURIComponent(ex)}`)}
                                className="bg-white border border-gray-200 px-3 py-1 rounded-full hover:border-[#2874F0] hover:text-[#2874F0] transition-colors shadow-sm"
                            >
                                {ex}
                            </button>
                        ))}
                    </div>

                </div>
            </main>

            {/* Value Props Section */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                                <ShoppingBag className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">50+ Stores</h3>
                            <p className="text-gray-600">We scan Amazon, Flipkart, Croma, and more to find you the absolute lowest price.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-orange-50/50 border border-orange-100 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4">
                                <Zap className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Comparison</h3>
                            <p className="text-gray-600">Our AI matches products instantly so you never overpay for your favorite gadgets.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-green-50/50 border border-green-100 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">100% Verified</h3>
                            <p className="text-gray-600">No fake discounts. We verify every price and redirect you to trusted stores only.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO Content Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl space-y-12 text-gray-700">

                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-gray-900">Why Dealzo is India’s #1 Price Comparison Platform</h2>
                        <p className="leading-relaxed">
                            DealzoShop is your ultimate shopping companion, designed to save you money on every purchase. We scan every major e-commerce site in real-time to find the fastest, cheapest, and most trusted deals. With our multi-layered API technology, we ensure you see only verified prices—no fake discounts, no hidden costs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-blue-600" /> How Dealzo Works
                            </h3>
                            <ul className="space-y-3 list-disc list-inside text-gray-600">
                                <li>Search for any product (Mobiles, Laptops, Shoes).</li>
                                <li>We scan Amazon, Flipkart, Croma, Blinkit & more.</li>
                                <li>Our AI compares price, delivery, and ratings.</li>
                                <li>Click "Buy Now" to purchase securely from the official store.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-green-600" /> Trust & Safety
                            </h3>
                            <ul className="space-y-3 list-disc list-inside text-gray-600">
                                <li>We never ask for payments or OTPs.</li>
                                <li>All purchases happen on Amazon/Flipkart directly.</li>
                                <li>Your privacy and data safety are guaranteed.</li>
                                <li>100% Free to use, forever.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">What is DealzoShop?</h4>
                                <p className="text-gray-600 text-sm">India’s fastest, AI-powered price comparison website showing the lowest price across 50+ stores.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Is Dealzo legal?</h4>
                                <p className="text-gray-600 text-sm">Yes. We use approved affiliate networks (Amazon Associates, EarnKaro) and do not scrape websites illegally.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Will Dealzo always show the lowest price?</h4>
                                <p className="text-gray-600 text-sm">Yes — our AI and multi-store API system sorts by best price first to ensure you save money.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div className="col-span-1 md:col-span-2">
                            <h2 className="text-2xl font-bold text-white mb-4">
                                <span className="text-[#2874F0]">Deal</span><span className="text-[#FF9900]">zo</span>Shop
                            </h2>
                            <p className="max-w-xs">India’s Smartest Shopping Companion. Compare Prices • Find Best Deals • Save Money.</p>
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-4">Connect</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-sm">
                        <p>&copy; 2025 Dealzo Technologies · All Rights Reserved</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

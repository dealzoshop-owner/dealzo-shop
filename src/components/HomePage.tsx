"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ShoppingBag, TrendingUp, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import ComparisonCard from '@/components/ComparisonCard';

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
                        <p className="text-blue-600 font-medium mt-4 text-sm bg-blue-50 inline-block px-4 py-1 rounded-full">
                            Dealzo (also known as DealzoShop) is India’s smartest price comparison platform.
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

            {/* Featured Live Deals Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Zap className="h-6 w-6 text-orange-500" /> Featured Live Deals
                        </h2>
                        <button
                            onClick={() => router.push('/search?q=iphone')}
                            className="text-[#2874F0] font-medium hover:underline flex items-center gap-1"
                        >
                            View all deals <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="grid gap-6">
                        {/* Mock Deal 1: iPhone 15 */}
                        <ComparisonCard group={{
                            id: 'home-1',
                            title: 'Apple iPhone 15 (128 GB) - Black',
                            image: 'https://m.media-amazon.com/images/I/71657TiFeHL._SX679_.jpg',
                            minPrice: 71290,
                            maxPrice: 79900,
                            rating: 4.6,
                            reviews: 12500,
                            variants: [
                                { id: 'v1', store: 'Amazon', price: 71290, title: 'iPhone 15', link: 'https://www.amazon.in/dp/B0CHX2F5QT', image: '', rating: 4.6, reviews: 0, delivery: 'Free', isFlipkartAssured: false, inStock: true },
                                { id: 'v2', store: 'Flipkart', price: 72999, title: 'iPhone 15', link: 'https://www.flipkart.com/apple-iphone-15-black-128-gb/p/itm6ac648551528c', image: '', rating: 4.6, reviews: 0, delivery: 'Free', isFlipkartAssured: true, inStock: true },
                                { id: 'v3', store: 'Croma', price: 79900, title: 'iPhone 15', link: 'https://www.croma.com/apple-iphone-15-128gb-black/p/300652', image: '', rating: 4.6, reviews: 0, delivery: 'Free', isFlipkartAssured: false, inStock: true }
                            ],
                            bestDeal: { id: 'v1', store: 'Amazon', price: 71290, title: 'iPhone 15', link: 'https://www.amazon.in/dp/B0CHX2F5QT', image: '', rating: 4.6, reviews: 0, delivery: 'Free', isFlipkartAssured: false, inStock: true },
                            cheapestStore: 'Amazon',
                            priceGap: 8610
                        }} />

                        {/* Mock Deal 2: Samsung S24 */}
                        <ComparisonCard group={{
                            id: 'home-2',
                            title: 'Samsung Galaxy S24 Ultra 5G AI Smartphone (Titanium Gray, 12GB, 256GB Storage)',
                            image: 'https://m.media-amazon.com/images/I/81vxWpPpgNL._SX679_.jpg',
                            minPrice: 129999,
                            maxPrice: 134999,
                            rating: 4.5,
                            reviews: 850,
                            variants: [
                                { id: 'v4', store: 'Amazon', price: 129999, title: 'Samsung S24 Ultra', link: 'https://www.amazon.in/dp/B0CS5Y7R92', image: '', rating: 4.5, reviews: 0, delivery: 'Free', isFlipkartAssured: false, inStock: true },
                                { id: 'v5', store: 'Samsung Shop', price: 134999, title: 'Samsung S24 Ultra', link: 'https://www.samsung.com/in/smartphones/galaxy-s24-ultra/', image: '', rating: 4.5, reviews: 0, delivery: 'Free', isFlipkartAssured: false, inStock: true }
                            ],
                            bestDeal: { id: 'v4', store: 'Amazon', price: 129999, title: 'Samsung S24 Ultra', link: 'https://www.amazon.in/dp/B0CS5Y7R92', image: '', rating: 4.5, reviews: 0, delivery: 'Free', isFlipkartAssured: false, inStock: true },
                            cheapestStore: 'Amazon',
                            priceGap: 5000
                        }} />
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => router.push('/search?q=laptop')}
                            className="bg-[#2874F0] text-white px-8 py-3 rounded-full font-bold hover:bg-[#1e5bbf] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Try Search Now
                        </button>
                    </div>
                </div>
            </section>

            {/* Value Props Section */}
            <section className="py-16 bg-gray-50 border-t border-gray-100">
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
                        <p>&copy; 2025 Dealzo | DealzoShop – Official Price Comparison Platform</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

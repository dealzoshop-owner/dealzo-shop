import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import { ShieldCheck, CheckCircle, TrendingDown } from 'lucide-react';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-[#f1f3f6] text-gray-900 font-sans">
            <Header />

            <main className="relative flex flex-col items-center justify-start pt-12 pb-32 px-4">

                {/* Hero Section */}
                <div className="w-full max-w-4xl mx-auto text-center space-y-8 mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
                        Compare Prices. <span className="text-[#2874F0]">Save Big.</span>
                    </h1>

                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Stop overpaying. We track prices across Amazon, Flipkart, and more to find you the lowest price instantly.
                    </p>

                    <div className="pt-4">
                        <SearchBar />
                    </div>

                    {/* Trust Signals */}
                    <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm font-medium text-gray-600">
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                            <ShieldCheck className="h-5 w-5 text-green-600" />
                            Safe & Secure
                        </div>
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                            <CheckCircle className="h-5 w-5 text-[#2874F0]" />
                            100% Genuine Products
                        </div>
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                            <TrendingDown className="h-5 w-5 text-[#FF9900]" />
                            Price Checked Today
                        </div>
                    </div>
                </div>

                {/* Categories / Stores */}
                <div className="w-full max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Trusted By Millions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Amazon', 'Flipkart', 'Walmart', 'BestBuy'].map(store => (
                            <div key={store} className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center font-bold text-xl text-gray-400 hover:text-gray-900 hover:shadow-md transition-all cursor-pointer">
                                {store}
                            </div>
                        ))}
                    </div>
                </div>

            </main>

            <footer className="bg-white border-t border-gray-200 py-8 text-center text-gray-500 text-sm mt-auto">
                <p>© 2024 Dealzo. All rights reserved.</p>
            </footer>
        </div>
    );
}

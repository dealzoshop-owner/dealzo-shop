import Link from 'next/link';
import Header from '@/components/Header';

export const metadata = {
    title: 'Dealzo – Official Website | India’s Smartest Price Comparison Engine',
    description: 'Dealzo (DealzoShop) is the official website for comparing prices across Amazon, Flipkart, and 50+ stores. Find the best deals instantly.',
};

export default function DealzoPage() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <Header />
            <main className="container mx-auto px-4 py-16 max-w-3xl text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                    Dealzo – Official Website
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Dealzo, popularly known as <span className="font-bold text-[#2874F0]">DealzoShop</span>, is India's fastest and smartest price comparison engine.
                </p>

                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 mb-12">
                    <p className="text-lg text-gray-700 mb-6">
                        Looking for the best price? You are at the right place.
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-[#2874F0] text-white font-bold py-3 px-8 rounded-full hover:bg-[#1e5bbf] transition-colors shadow-lg"
                    >
                        Visit Official Site: DealzoShop.com
                    </Link>
                </div>

                <div className="text-left space-y-6 text-gray-600">
                    <h2 className="text-2xl font-bold text-gray-900">About Dealzo</h2>
                    <p>
                        Dealzo is an AI-powered shopping assistant that helps millions of Indians save money. Whether you are looking for the latest iPhone, a new laptop, or just a pair of shoes, Dealzo scans over 50 online stores including Amazon, Flipkart, Croma, and Myntra to find you the absolute lowest price.
                    </p>
                    <p>
                        Our technology verifies prices in real-time, ensuring that you never see fake discounts or out-of-stock items. Dealzo (DealzoShop) is 100% free to use and dedicated to making online shopping transparent and affordable.
                    </p>
                </div>
            </main>
        </div>
    );
}

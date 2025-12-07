import Link from 'next/link';
import Header from '@/components/Header';

export const metadata = {
    title: 'What Is Dealzo? (Complete Guide) | DealzoShop',
    description: 'Learn everything about Dealzo (DealzoShop), India’s most advanced AI-based price comparison engine. Save money on every purchase.',
};

export default function WhatIsDealzoPage() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <Header />
            <main className="container mx-auto px-4 py-16 max-w-3xl">
                <article className="prose lg:prose-xl mx-auto">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-6">What Is Dealzo? (Complete Guide)</h1>

                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        <strong>Dealzo</strong> (also known as <strong>DealzoShop</strong>) is India’s most advanced AI-based price comparison engine, designed to help online shoppers find the lowest prices across millions of products.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How Does Dealzo Work?</h2>
                    <p className="text-gray-700 mb-4">
                        Dealzo uses sophisticated algorithms to scan major e-commerce platforms like Amazon, Flipkart, Croma, Reliance Digital, and Tata Cliq in real-time. When you search for a product on Dealzo, our engine instantly retrieves the current price, availability, and shipping offers from all these stores and presents them in a single, easy-to-read comparison grid.
                    </p>
                    <p className="text-gray-700 mb-4">
                        This ensures that you never overpay. Often, the same mobile phone or laptop is available for ₹1,000 or even ₹5,000 less on a different store. Dealzo finds these hidden price differences for you automatically.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Use Dealzo?</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                        <li><strong>Save Money:</strong> The primary benefit is savings. Users save an average of 10-15% on electronics and fashion.</li>
                        <li><strong>Save Time:</strong> No need to open 10 different tabs. Check one site, see all prices.</li>
                        <li><strong>Verified Deals:</strong> We filter out fake sellers and "too good to be true" scams. We only redirect you to trusted, official retailers.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Is Dealzo Free?</h2>
                    <p className="text-gray-700 mb-4">
                        Yes, Dealzo is 100% free for users. We do not charge any subscription fees. We earn a small commission from retailers when you make a purchase through our links, at no extra cost to you. This allows us to keep the platform free and unbiased.
                    </p>

                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mt-8">
                        <h3 className="text-xl font-bold text-blue-900 mb-2">Ready to start saving?</h3>
                        <p className="text-blue-800 mb-4">Try searching for your favorite gadget now.</p>
                        <Link
                            href="/"
                            className="inline-block bg-[#2874F0] text-white font-bold py-2 px-6 rounded-full hover:bg-[#1e5bbf] transition-colors"
                        >
                            Go to Homepage
                        </Link>
                    </div>
                </article>
            </main>
        </div>
    );
}

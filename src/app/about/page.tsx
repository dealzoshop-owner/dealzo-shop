import Header from '@/components/Header';

export const metadata = {
    title: 'About Us | DealzoShop',
    description: 'Learn about DealzoShop, India’s smartest price comparison platform.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="container mx-auto px-4 py-12 max-w-3xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">About DealzoShop</h1>
                <div className="prose prose-lg text-gray-600">
                    <p>
                        Welcome to <strong>DealzoShop</strong>, India’s fastest and smartest price comparison engine.
                        Our mission is simple: to help you find the best deal on every purchase, instantly.
                    </p>
                    <p>
                        In a world with dozens of online stores like Amazon, Flipkart, Myntra, and Croma, comparing prices manually is a hassle.
                        DealzoShop solves this by scanning 50+ stores in real-time to bring you the lowest price, verified deals, and fastest delivery options—all in one place.
                    </p>
                    <h3>Our Vision</h3>
                    <p>
                        To become India’s #1 shopping gateway, empowering millions of users to save money and shop smarter with the power of AI.
                    </p>
                </div>
            </main>
        </div>
    );
}

import Header from '@/components/Header';

export const metadata = {
    title: 'Privacy Policy | DealzoShop',
    description: 'Privacy Policy for DealzoShop.',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="container mx-auto px-4 py-12 max-w-3xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
                <div className="prose prose-sm text-gray-600">
                    <p>Last Updated: December 2025</p>
                    <p>
                        At DealzoShop, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information.
                    </p>
                    <h3>1. Information We Collect</h3>
                    <p>
                        We do not collect personal information like your name, address, or payment details directly.
                        We may collect anonymous usage data (clicks, searches) to improve our service.
                    </p>
                    <h3>2. Affiliate Disclosure</h3>
                    <p>
                        DealzoShop participates in various affiliate marketing programs. We may earn commissions on purchases made through our links to retailer sites.
                        This does not affect the price you pay.
                    </p>
                    <h3>3. Cookies</h3>
                    <p>
                        We use cookies to enhance your experience and analyze site traffic. You can control cookie settings in your browser.
                    </p>
                </div>
            </main>
        </div>
    );
}

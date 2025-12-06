import Header from '@/components/Header';

export const metadata = {
    title: 'Terms of Service | DealzoShop',
    description: 'Terms of Service for DealzoShop.',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="container mx-auto px-4 py-12 max-w-3xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
                <div className="prose prose-sm text-gray-600">
                    <p>Last Updated: December 2025</p>
                    <p>
                        By using DealzoShop, you agree to these Terms of Service.
                    </p>
                    <h3>1. Use of Service</h3>
                    <p>
                        DealzoShop is a price comparison tool. We do not sell products directly.
                        All purchases are handled by third-party retailers.
                    </p>
                    <h3>2. Accuracy of Information</h3>
                    <p>
                        While we strive for accuracy, prices and availability on retailer sites may change.
                        We are not responsible for discrepancies between our site and the retailer's site.
                    </p>
                    <h3>3. Limitation of Liability</h3>
                    <p>
                        DealzoShop is not liable for any damages arising from the use of our service or products purchased through our links.
                    </p>
                </div>
            </main>
        </div>
    );
}

import Header from '@/components/Header';

export const metadata = {
    title: 'Contact Us | DealzoShop',
    description: 'Get in touch with the DealzoShop team.',
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="container mx-auto px-4 py-12 max-w-3xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
                <div className="prose prose-lg text-gray-600">
                    <p>
                        Have questions, feedback, or partnership inquiries? We'd love to hear from you.
                    </p>
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 not-prose mt-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Get in Touch</h3>
                        <ul className="space-y-3">
                            <li><strong>Email:</strong> support@dealzoshop.com</li>
                            <li><strong>Twitter:</strong> @dealzoshop</li>
                            <li><strong>Address:</strong> Dealzo Technologies, Bangalore, India</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}

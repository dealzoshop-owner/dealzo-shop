import Header from '@/components/Header';

export const metadata = {
    title: 'Frequently Asked Questions | DealzoShop',
    description: 'Common questions about DealzoShop.',
};

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="container mx-auto px-4 py-12 max-w-3xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
                <div className="space-y-6">
                    {[
                        { q: "What is DealzoShop?", a: "India’s fastest, AI-powered price comparison website showing the lowest price across 50+ stores." },
                        { q: "Is Dealzo legal?", a: "Yes. We use approved affiliate networks (Amazon Associates, EarnKaro) and do not scrape websites illegally." },
                        { q: "How does Dealzo earn money?", a: "When you buy something using our link, the store pays us a small affiliate commission. This comes at no extra cost to you." },
                        { q: "Does Dealzo store my personal data?", a: "No. We only track anonymous click analytics. We do not store personal information like addresses or payment details." },
                        { q: "Is Dealzo free?", a: "Yes, 100% free forever." },
                    ].map((item, i) => (
                        <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{item.q}</h3>
                            <p className="text-gray-600">{item.a}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

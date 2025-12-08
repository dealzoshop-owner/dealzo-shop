import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="inline-block mb-4">
                            <h2 className="text-2xl font-bold text-white">
                                <span className="text-[#2874F0]">Deal</span><span className="text-[#FF9900]">zo</span>Shop
                            </h2>
                        </Link>
                        <p className="max-w-xs text-sm leading-relaxed">
                            India’s Smartest Shopping Companion. Compare Prices • Find Best Deals • Save Money.
                            We scan 50+ stores to find you the absolute lowest price.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="/affiliate-disclosure" className="hover:text-white transition-colors">Affiliate Disclosure</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4">Connect</h3>
                        <div className="flex gap-4">
                            <a href="https://twitter.com/dealzo" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="https://instagram.com/dealzo" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="https://facebook.com/dealzo" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="https://linkedin.com/company/dealzo" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 text-center text-sm">
                    <p>&copy; 2025 Dealzo | DealzoShop – Made in India 🇮🇳</p>
                </div>
            </div>
        </footer>
    );
}

import Link from 'next/link';
import { Button } from './ui/button';
import { ShoppingBag, Search, Menu } from 'lucide-react';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
            <div className="container flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-2">
                            <ShoppingBag className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Dealzo
                        </span>
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <Link href="/deals" className="hover:text-white transition-colors">Top Deals</Link>
                    <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10">
                        <Search className="h-5 w-5" />
                    </Button>
                    <Button className="bg-white text-black hover:bg-gray-200 hidden md:flex">
                        Sign In
                    </Button>
                    <Button variant="ghost" size="icon" className="md:hidden text-gray-300">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
}

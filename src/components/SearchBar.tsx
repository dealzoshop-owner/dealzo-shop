"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Link as LinkIcon, Loader2 } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        // If it's a URL, we might want to encode it differently, but search page handles it.
        // We pass it as a query param 'q'
        router.push(`/search?q=${encodeURIComponent(query)}`);
        // We don't set loading false here because we're navigating away
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSearch}
            className="relative w-full max-w-2xl mx-auto"
        >
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center bg-black/80 backdrop-blur-xl rounded-xl border border-white/10 p-2">
                    <div className="pl-4 text-gray-400">
                        {query.startsWith('http') ? <LinkIcon className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                    </div>
                    <Input
                        type="text"
                        placeholder="Paste a product URL or type a product name..."
                        className="border-0 bg-transparent text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg h-12"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-8 h-12 font-semibold transition-all"
                    >
                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Find Best Price'}
                    </Button>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-400">
                <span>Try:</span>
                {['iPhone 15 Pro', 'Sony WH-1000XM5', 'MacBook Air M2'].map((item) => (
                    <button
                        key={item}
                        type="button"
                        onClick={() => setQuery(item)}
                        className="hover:text-white underline decoration-indigo-500/50 hover:decoration-indigo-500 transition-all"
                    >
                        {item}
                    </button>
                ))}
            </div>
        </motion.form>
    );
}

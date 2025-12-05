"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Link as LinkIcon, Loader2, Mic } from 'lucide-react';
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
        router.push(`/search?q=${encodeURIComponent(query)}`);
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSearch}
            className="relative w-full max-w-3xl mx-auto"
        >
            <div className="relative flex items-center bg-white rounded-full shadow-lg border border-gray-200 p-1">
                <div className="pl-4 text-gray-400">
                    <Search className="h-6 w-6" />
                </div>
                <Input
                    type="text"
                    placeholder="Paste Amazon/Flipkart link or search product..."
                    className="border-0 bg-transparent text-gray-900 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg h-14"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="flex items-center gap-2 pr-2">
                    <Button type="button" variant="ghost" size="icon" className="text-[#2874F0]">
                        <Mic className="h-6 w-6" />
                    </Button>
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="bg-[#FF9900] hover:bg-[#e68a00] text-white rounded-full px-8 h-12 font-bold text-lg shadow-md transition-all"
                    >
                        {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : 'Search'}
                    </Button>
                </div>
            </div>
        </motion.form>
    );
}

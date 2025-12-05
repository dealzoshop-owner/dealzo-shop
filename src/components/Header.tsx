"use client";

import Link from 'next/link';
import { Button } from './ui/button';
import { ShoppingCart, Search, User, LogOut } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import Image from 'next/image';

export default function Header() {
    const { user, signInWithGoogle, logout } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full bg-[#2874F0] text-white shadow-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
                {/* Logo */}
                <div className="flex items-center gap-2 shrink-0">
                    <Link href="/" className="flex flex-col leading-none">
                        <span className="text-xl font-bold italic tracking-wide">Dealzo</span>
                        <span className="text-[10px] font-medium text-yellow-300 flex items-center gap-1">
                            Explore <span className="text-yellow-300 font-bold">Plus</span>
                            <span className="text-yellow-300">✦</span>
                        </span>
                    </Link>
                </div>

                {/* Search Bar (Desktop) */}
                <div className="hidden md:flex flex-1 max-w-2xl mx-4">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search for products, brands and more"
                            className="w-full h-10 px-4 rounded-sm text-black focus:outline-none shadow-sm"
                        />
                        <Search className="absolute right-3 top-2.5 h-5 w-5 text-[#2874F0]" />
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-6 font-medium">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2 hover:bg-transparent hover:text-gray-100">
                                    {user.photoURL ? (
                                        <Image src={user.photoURL} alt={user.displayName || "User"} width={32} height={32} className="rounded-full border border-white" />
                                    ) : (
                                        <User className="h-5 w-5" />
                                    )}
                                    <span className="hidden md:inline">{user.displayName?.split(' ')[0]}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem asChild>
                                    <Link href="/me" className="cursor-pointer">My Saved Products</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                                    <LogOut className="mr-2 h-4 w-4" /> Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button
                            onClick={signInWithGoogle}
                            className="bg-white text-[#2874F0] hover:bg-white/90 font-bold px-8 rounded-sm hidden md:flex"
                        >
                            Login
                        </Button>
                    )}

                    <Link href="/cart" className="flex items-center gap-1 hover:text-gray-100">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="hidden md:inline">Cart</span>
                    </Link>

                    {!user && (
                        <button onClick={signInWithGoogle} className="flex items-center gap-1 hover:text-gray-100 md:hidden">
                            <User className="h-5 w-5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="md:hidden px-2 pb-2">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full h-10 px-4 rounded-sm text-black focus:outline-none shadow-sm"
                    />
                    <Search className="absolute right-3 top-2.5 h-5 w-5 text-[#2874F0]" />
                </div>
            </div>
        </header>
    );
}

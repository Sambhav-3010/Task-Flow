'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="p-4 lg:p-6 flex justify-between items-center border-b-4 border-black bg-white">
            <Link href="/dashboard" className="text-2xl lg:text-3xl font-black tracking-tight">
                TASK<span className="bg-[var(--primary)] text-white px-2">FLOW</span>
            </Link>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 transition-colors border-4 border-black shadow-[4px_4px_0px_black]"
                >
                    <div className="w-10 h-10 bg-[var(--blue)] border-3 border-black flex items-center justify-center text-white font-black text-lg">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="font-bold hidden sm:block">{user?.name || 'User'}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border-4 border-black shadow-[6px_6px_0px_black] z-50 animate-bounce-in">
                        <div className="p-4 border-b-4 border-black bg-[var(--accent)]">
                            <p className="font-black truncate">{user?.name}</p>
                            <p className="text-sm truncate">{user?.email}</p>
                        </div>
                        <div className="p-2">
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-3 font-bold hover:bg-[var(--primary)] hover:text-white transition-colors flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

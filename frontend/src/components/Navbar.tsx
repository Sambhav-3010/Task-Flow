'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useState } from 'react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav className="bg-[var(--card)] border-b-3 border-[var(--border)] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/dashboard" className="text-2xl font-black tracking-tight">
                        <span className="text-[var(--primary)]">Task</span>Flow
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="flex items-center gap-2 neo-button neo-button-outline py-2 px-4"
                            >
                                <div className="w-8 h-8 bg-[var(--primary)] text-white font-bold flex items-center justify-center border-2 border-[var(--border)]">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <span className="hidden sm:block font-bold">{user?.name}</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {showMenu && (
                                <div className="absolute right-0 mt-2 w-48 neo-card p-2 animate-slide-up">
                                    <div className="px-3 py-2 border-b-2 border-[var(--border)] mb-2">
                                        <p className="font-bold truncate">{user?.name}</p>
                                        <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="w-full text-left px-3 py-2 font-bold text-[var(--error)] hover:bg-[var(--error)] hover:text-white transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

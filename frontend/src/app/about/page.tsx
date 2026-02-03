'use client';

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AboutPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    return (
        <div className="min-h-screen flex flex-col bg-pattern">
            <header className="p-4 md:p-6 flex flex-col sm:flex-row justify-between items-center border-b-4 border-black bg-white gap-4 sm:gap-0">
                <Link href="/" className="text-2xl md:text-3xl font-black tracking-tight">
                    TASK<span className="bg-[var(--primary)] text-white px-2">FLOW</span>
                </Link>
                <nav className="flex gap-2 md:gap-3 w-full sm:w-auto justify-center">
                    <Link href="/login" className="neo-button neo-button-yellow py-2 px-3 md:px-4 text-xs md:text-sm">
                        Login
                    </Link>
                    <Link href="/signup" className="neo-button py-2 px-3 md:px-4 text-xs md:text-sm">
                        Sign Up
                    </Link>
                </nav>
            </header>

            <main className="flex-1">
                <section className="py-12 md:py-20 px-4 md:px-8 bg-[var(--accent)]">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-black mb-4 md:mb-6">ABOUT US</h1>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto px-2">
                            We&apos;re on a mission to make task management brutally simple and incredibly effective.
                        </p>
                    </div>
                </section>

                <section className="py-12 md:py-20 px-4 md:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                            <div>
                                <div className="inline-block bg-[var(--primary)] text-white border-4 border-black px-3 py-1 md:px-4 md:py-2 mb-4 md:mb-6 shadow-[4px_4px_0px_black]">
                                    <span className="font-black text-xs md:text-sm tracking-widest">OUR STORY</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black mb-4 md:mb-6 leading-tight">Built for the Modern Worker</h2>
                                <p className="text-base md:text-lg mb-4 leading-relaxed">
                                    TaskFlow was born out of frustration with overly complex task management tools. We wanted something that would get out of the way and let us focus on what matters: getting things done.
                                </p>
                                <p className="text-base md:text-lg leading-relaxed">
                                    Our brutalist design isn&apos;t just aesthetic—it&apos;s functional. Every element serves a purpose. No distractions, no bloat, just pure productivity.
                                </p>
                            </div>
                            <div className="neo-card p-6 md:p-8 bg-[var(--secondary)] mt-8 lg:mt-0">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-white border-4 border-black w-10 h-10 md:w-14 md:h-14 flex items-center justify-center text-xl md:text-2xl font-black shadow-[3px_3px_0px_black] md:shadow-[4px_4px_0px_black] shrink-0">1</div>
                                        <div>
                                            <h4 className="font-black text-base md:text-lg">Simple by Design</h4>
                                            <p className="text-sm md:text-base">No feature creep. Every function has a purpose.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-white border-4 border-black w-10 h-10 md:w-14 md:h-14 flex items-center justify-center text-xl md:text-2xl font-black shadow-[3px_3px_0px_black] md:shadow-[4px_4px_0px_black] shrink-0">2</div>
                                        <div>
                                            <h4 className="font-black text-base md:text-lg">Fast by Default</h4>
                                            <p className="text-sm md:text-base">Optimized for speed. No waiting, no loading.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-white border-4 border-black w-10 h-10 md:w-14 md:h-14 flex items-center justify-center text-xl md:text-2xl font-black shadow-[3px_3px_0px_black] md:shadow-[4px_4px_0px_black] shrink-0">3</div>
                                        <div>
                                            <h4 className="font-black text-base md:text-lg">Secure by Nature</h4>
                                            <p className="text-sm md:text-base">Your data belongs to you. Period.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12 md:py-20 px-4 md:px-8 bg-black text-white">
                    <div className="max-w-6xl mx-auto">
                        <h3 className="text-3xl md:text-4xl font-black text-center mb-8 md:mb-12">THE TEAM</h3>
                        <div className="grid md:grid-cols-3 gap-8 text-center px-4">
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 md:w-32 md:h-32 bg-[var(--primary)] border-4 border-white mb-4 flex items-center justify-center text-4xl md:text-5xl">👨‍💻</div>
                                <h4 className="text-lg md:text-xl font-black">Developer</h4>
                                <p className="text-gray-400 text-sm md:text-base">Full-Stack Engineer</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 md:w-32 md:h-32 bg-[var(--secondary)] border-4 border-white mb-4 flex items-center justify-center text-4xl md:text-5xl">🎨</div>
                                <h4 className="text-lg md:text-xl font-black">Designer</h4>
                                <p className="text-gray-400 text-sm md:text-base">UI/UX Specialist</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 md:w-32 md:h-32 bg-[var(--accent)] border-4 border-white mb-4 flex items-center justify-center text-4xl md:text-5xl">🚀</div>
                                <h4 className="text-lg md:text-xl font-black">Growth</h4>
                                <p className="text-gray-400 text-sm md:text-base">Product Manager</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12 md:py-20 px-4 md:px-8">
                    <div className="max-w-6xl mx-auto">
                        <h3 className="text-3xl md:text-4xl font-black text-center mb-8 md:mb-12">OUR VALUES</h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            <div className="neo-card p-6 bg-[var(--primary)] text-white">
                                <div className="text-3xl md:text-4xl mb-4">💪</div>
                                <h4 className="font-black text-lg mb-2">Simplicity</h4>
                                <p className="text-sm opacity-90">Less is more. We remove, we don&apos;t add.</p>
                            </div>
                            <div className="neo-card p-6 bg-[var(--blue)] text-white">
                                <div className="text-3xl md:text-4xl mb-4">⚡</div>
                                <h4 className="font-black text-lg mb-2">Speed</h4>
                                <p className="text-sm opacity-90">Performance is a feature, not an afterthought.</p>
                            </div>
                            <div className="neo-card p-6 bg-[var(--accent)]">
                                <div className="text-3xl md:text-4xl mb-4">🎯</div>
                                <h4 className="font-black text-lg mb-2">Focus</h4>
                                <p className="text-sm">One thing at a time. Do it well.</p>
                            </div>
                            <div className="neo-card p-6 bg-[var(--secondary)]">
                                <div className="text-3xl md:text-4xl mb-4">🔐</div>
                                <h4 className="font-black text-lg mb-2">Privacy</h4>
                                <p className="text-sm">Your data is yours. Always.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12 md:py-20 px-4 md:px-8 bg-[var(--blue)] text-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 leading-tight">JOIN THE MOVEMENT</h3>
                        <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90 px-4">Thousands of people are already using TaskFlow to crush their goals.</p>
                        <Link href="/signup" className="neo-button neo-button-yellow text-base md:text-lg border-white">
                            Start Free Today →
                        </Link>
                    </div>
                </section>
            </main>

            <footer className="bg-black text-white py-8 px-8 text-center">
                <p className="text-gray-500">© 2026 TaskFlow. Built with Next.js & Express.</p>
            </footer>
        </div>
    );
}

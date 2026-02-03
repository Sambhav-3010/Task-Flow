'use client';

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-pattern">
      <div className="bg-[var(--primary)] text-white py-2 overflow-hidden">
        <div className="marquee">
          <span className="marquee-content font-bold text-sm tracking-widest">
            TASKFLOW • MANAGE YOUR TASKS • STAY PRODUCTIVE • GET THINGS DONE • TASKFLOW • MANAGE YOUR TASKS • STAY PRODUCTIVE • GET THINGS DONE •
          </span>
        </div>
      </div>

      <header className="p-4 md:p-6 flex flex-col sm:flex-row justify-between items-center border-b-4 border-black bg-white gap-4 sm:gap-0">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight">
          TASK<span className="bg-[var(--primary)] text-white px-2">FLOW</span>
        </h1>
        <nav className="flex gap-2 md:gap-3 w-full sm:w-auto justify-center">
          <Link href="/about" className="neo-button neo-button-outline py-2 px-3 md:px-4 text-xs md:text-sm">
            About
          </Link>
          <Link href="/login" className="neo-button neo-button-yellow py-2 px-3 md:px-4 text-xs md:text-sm">
            Login
          </Link>
          <Link href="/signup" className="neo-button py-2 px-3 md:px-4 text-xs md:text-sm">
            Sign Up
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="animate-fade-in text-center lg:text-left">
                <div className="inline-block bg-[var(--accent)] border-4 border-black px-3 py-1 md:px-4 md:py-2 mb-4 md:mb-6 shadow-[4px_4px_0px_black]">
                  <span className="font-black text-xs md:text-sm tracking-widest">NEW IN 2026</span>
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 md:mb-6">
                  CRUSH YOUR
                  <span className="block text-[var(--primary)]">TO-DO LIST</span>
                </h2>
                <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  A beautifully brutal task manager that helps you stay organized and productive. No fluff, just results.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
                  <Link href="/signup" className="neo-button text-base md:text-lg w-full sm:w-auto text-center">
                    Get Started Free →
                  </Link>
                  <Link href="/about" className="neo-button neo-button-outline text-base md:text-lg w-full sm:w-auto text-center">
                    Learn More
                  </Link>
                </div>
              </div>

              <div className="relative animate-slide-up mt-8 lg:mt-0">
                <div className="neo-card p-6 md:p-8 bg-[var(--accent)]">
                  <div className="flex items-center gap-2 md:gap-3 mb-4">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-[var(--primary)] border-2 border-black"></div>
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-[var(--secondary)] border-2 border-black"></div>
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-[var(--blue)] border-2 border-black"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white border-3 border-black p-3 md:p-4 shadow-[4px_4px_0px_black]">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-[var(--success)] border-2 border-black flex items-center justify-center text-xs">✓</div>
                        <span className="font-bold line-through text-gray-500 text-sm md:text-base">Design homepage</span>
                      </div>
                    </div>
                    <div className="bg-white border-3 border-black p-3 md:p-4 shadow-[4px_4px_0px_black]">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-[var(--blue)] border-2 border-black"></div>
                        <span className="font-bold text-sm md:text-base">Build dashboard</span>
                        <span className="ml-auto neo-badge neo-badge-in-progress text-[10px] md:text-xs">In Progress</span>
                      </div>
                    </div>
                    <div className="bg-white border-3 border-black p-3 md:p-4 shadow-[4px_4px_0px_black]">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 md:w-6 md:h-6 border-3 border-black bg-white"></div>
                        <span className="font-bold text-sm md:text-base">Write documentation</span>
                        <span className="ml-auto neo-badge neo-badge-high text-[10px] md:text-xs">High</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-full h-full bg-[var(--primary)] border-4 border-black -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-black text-white">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-5xl font-black text-[var(--accent)]">10K+</p>
                <p className="font-bold mt-2">Active Users</p>
              </div>
              <div>
                <p className="text-5xl font-black text-[var(--secondary)]">50K+</p>
                <p className="font-bold mt-2">Tasks Created</p>
              </div>
              <div>
                <p className="text-5xl font-black text-[var(--blue)]">99%</p>
                <p className="font-bold mt-2">Uptime</p>
              </div>
              <div>
                <p className="text-5xl font-black text-[var(--primary)]">4.9★</p>
                <p className="font-bold mt-2">User Rating</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-4xl font-black text-center mb-4">WHY TASKFLOW?</h3>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Everything you need to stay productive, nothing you don&apos;t.</p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="neo-card p-8 bg-[var(--secondary)]">
                <div className="text-5xl mb-4">⚡</div>
                <h4 className="text-2xl font-black mb-3">Lightning Fast</h4>
                <p className="font-medium">Create tasks in seconds. No learning curve, no complexity. Just pure productivity.</p>
              </div>
              <div className="neo-card p-8 bg-[var(--accent)]">
                <div className="text-5xl mb-4">🎯</div>
                <h4 className="text-2xl font-black mb-3">Stay Focused</h4>
                <p className="font-medium">Filter by priority and status. Find what you need instantly. Never lose track.</p>
              </div>
              <div className="neo-card p-8 bg-[var(--blue)] text-white">
                <div className="text-5xl mb-4">🔒</div>
                <h4 className="text-2xl font-black mb-3">Secure & Private</h4>
                <p className="font-medium">Your data is encrypted end-to-end. Only you can see your tasks.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-8 bg-[var(--primary)]">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h3 className="text-5xl font-black mb-6">READY TO GET STARTED?</h3>
            <p className="text-xl mb-8 opacity-90">Join thousands of productive people using TaskFlow today.</p>
            <Link href="/signup" className="neo-button neo-button-yellow text-lg border-white">
              Create Free Account →
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-12 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-2xl font-black mb-4">TASK<span className="text-[var(--primary)]">FLOW</span></h4>
              <p className="text-gray-400">The brutally simple task manager for productive people.</p>
            </div>
            <div>
              <h5 className="font-black mb-4">PRODUCT</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-black mb-4">LEGAL</h5>
              <ul className="space-y-2 text-gray-400">
                <li><span className="cursor-pointer hover:text-white transition-colors">Privacy</span></li>
                <li><span className="cursor-pointer hover:text-white transition-colors">Terms</span></li>
              </ul>
            </div>
            <div>
              <h5 className="font-black mb-4">CONNECT</h5>
              <ul className="space-y-2 text-gray-400">
                <li><span className="cursor-pointer hover:text-white transition-colors">Twitter</span></li>
                <li><span className="cursor-pointer hover:text-white transition-colors">GitHub</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>© 2026 TaskFlow. Built with Next.js & Express.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

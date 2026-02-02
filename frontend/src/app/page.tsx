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
    <div className="min-h-screen flex flex-col">
      <header className="p-6 flex justify-between items-center border-b-3 border-[var(--border)]">
        <h1 className="text-2xl font-black tracking-tight">
          <span className="text-[var(--primary)]">Task</span>Flow
        </h1>
        <nav className="flex gap-4">
          <Link href="/login" className="neo-button neo-button-outline text-sm">
            Login
          </Link>
          <Link href="/signup" className="neo-button text-sm">
            Sign Up
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-4xl text-center">
          <div className="neo-card p-12 mb-8 animate-bounce-in">
            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Manage Tasks<br />
              <span className="text-[var(--primary)]">Like a Pro</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              A beautifully brutal task management app. Create, organize, and crush your to-do list with style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="neo-button text-lg px-8 py-4">
                Get Started Free
              </Link>
              <Link href="/login" className="neo-button neo-button-secondary text-lg px-8 py-4">
                I Have an Account
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="neo-card p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">Simple & Fast</h3>
              <p className="text-gray-600">Create and manage tasks in seconds. No complexity, just productivity.</p>
            </div>
            <div className="neo-card p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Stay Organized</h3>
              <p className="text-gray-600">Filter by status and priority. Find what you need instantly.</p>
            </div>
            <div className="neo-card p-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your data is encrypted and protected. Only you can see your tasks.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-6 border-t-3 border-[var(--border)] text-center">
        <p className="text-gray-600">
          Built with <span className="text-[var(--primary)]">♥</span> using Next.js & Express
        </p>
      </footer>
    </div>
  );
}

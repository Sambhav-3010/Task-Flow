'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';

export default function LoginPage() {
    const { login, user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!authLoading && user) {
            router.push('/dashboard');
        }
    }, [user, authLoading, router]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setErrors({});

        try {
            await login(formData.email, formData.password);
            router.push('/dashboard');
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            setErrors({ form: error.response?.data?.message || 'Login failed' });
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-pattern">
            <header className="p-6 flex justify-between items-center border-b-4 border-black bg-white">
                <Link href="/" className="text-3xl font-black tracking-tight">
                    TASK<span className="bg-[var(--primary)] text-white px-2">FLOW</span>
                </Link>
            </header>

            <main className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="neo-card p-8 bg-[var(--accent)]">
                        <h1 className="text-4xl font-black mb-2">WELCOME BACK</h1>
                        <p className="text-lg mb-8">Sign in to continue crushing your tasks.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-black mb-2 uppercase tracking-wide">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={`neo-input ${errors.email ? 'border-[var(--primary)]' : ''}`}
                                    placeholder="you@example.com"
                                />
                                {errors.email && (
                                    <p className="text-[var(--primary)] text-sm mt-2 font-bold">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-black mb-2 uppercase tracking-wide">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className={`neo-input ${errors.password ? 'border-[var(--primary)]' : ''}`}
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="text-[var(--primary)] text-sm mt-2 font-bold">{errors.password}</p>
                                )}
                            </div>

                            {errors.form && (
                                <div className="bg-[var(--primary)] text-white p-4 font-bold border-4 border-black">
                                    {errors.form}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="neo-button w-full text-lg"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="loading-spinner w-6 h-6 border-3"></div>
                                        Signing In...
                                    </span>
                                ) : (
                                    'Sign In →'
                                )}
                            </button>
                        </form>
                    </div>

                    <p className="text-center mt-6 font-medium">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="neo-link">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}

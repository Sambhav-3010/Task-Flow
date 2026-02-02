'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
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
        try {
            await login(formData.email, formData.password);
            toast.success('Welcome back!');
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            const message = err.response?.data?.message || 'Login failed';
            toast.error(message);
            setErrors({ form: message });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <header className="p-6 border-b-3 border-[var(--border)]">
                <Link href="/" className="text-2xl font-black tracking-tight">
                    <span className="text-[var(--primary)]">Task</span>Flow
                </Link>
            </header>

            <main className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="neo-card p-8 animate-bounce-in">
                        <h1 className="text-3xl font-black mb-2">Welcome Back</h1>
                        <p className="text-gray-600 mb-8">Sign in to continue to your dashboard</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`neo-input ${errors.email ? 'border-[var(--error)]' : ''}`}
                                    placeholder="you@example.com"
                                />
                                {errors.email && (
                                    <p className="text-[var(--error)] text-sm mt-1 font-medium">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`neo-input ${errors.password ? 'border-[var(--error)]' : ''}`}
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="text-[var(--error)] text-sm mt-1 font-medium">{errors.password}</p>
                                )}
                            </div>

                            {errors.form && (
                                <div className="p-4 bg-[var(--error)] text-white font-medium border-3 border-[var(--border)]">
                                    {errors.form}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="neo-button w-full flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="loading-spinner w-5 h-5 border-2"></div>
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </form>

                        <div className="neo-divider"></div>

                        <p className="text-center text-gray-600">
                            Don&apos;t have an account?{' '}
                            <Link href="/signup" className="neo-link">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';

export default function SignupPage() {
    const { signup, user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!authLoading && user) {
            router.push('/dashboard');
        }
    }, [user, authLoading, router]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        } else if (!/\d/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one number';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
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
            await signup(formData.name, formData.email, formData.password);
            router.push('/dashboard');
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Signup failed';

            // If we have specific field errors from backend
            if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
                const backendErrors = err.response.data.errors;
                const newErrors: Record<string, string> = { form: errorMessage };

                backendErrors.forEach((error: { field: string; message: string }) => {
                    // Map backend 'path' to frontend form field names if they match
                    if (error.field === 'name' || error.field === 'email' || error.field === 'password') {
                        newErrors[error.field] = error.message;
                    }
                });
                setErrors(newErrors);
            } else {
                setErrors({ form: errorMessage });
            }
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
            <header className="p-4 md:p-6 flex justify-between items-center border-b-4 border-black bg-white">
                <Link href="/" className="text-2xl md:text-3xl font-black tracking-tight">
                    TASK<span className="bg-[var(--primary)] text-white px-2">FLOW</span>
                </Link>
            </header>

            <main className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="neo-card p-8 bg-[var(--secondary)]">
                        <h1 className="text-4xl font-black mb-2">JOIN US</h1>
                        <p className="text-lg mb-8">Create your account and start crushing it.</p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-black mb-2 uppercase tracking-wide">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className={`neo-input ${errors.name ? 'border-[var(--primary)]' : ''}`}
                                    placeholder="John Doe"
                                />
                                {errors.name && (
                                    <p className="text-[var(--primary)] text-sm mt-2 font-bold">{errors.name}</p>
                                )}
                            </div>

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

                            <div>
                                <label className="block text-sm font-black mb-2 uppercase tracking-wide">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className={`neo-input ${errors.confirmPassword ? 'border-[var(--primary)]' : ''}`}
                                    placeholder="••••••••"
                                />
                                {errors.confirmPassword && (
                                    <p className="text-[var(--primary)] text-sm mt-2 font-bold">{errors.confirmPassword}</p>
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
                                        Creating Account...
                                    </span>
                                ) : (
                                    'Create Account →'
                                )}
                            </button>
                        </form>
                    </div>

                    <p className="text-center mt-6 font-medium">
                        Already have an account?{' '}
                        <Link href="/login" className="neo-link">
                            Sign In
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import toast from 'react-hot-toast';

export default function SignupPage() {
    const { signup } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length > 50) {
            newErrors.name = 'Name cannot exceed 50 characters';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        } else if (!/\d/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one number';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        try {
            await signup(formData.name, formData.email, formData.password);
            toast.success('Account created successfully!');
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string; errors?: Array<{ field: string; message: string }> } } };
            const message = err.response?.data?.message || 'Signup failed';
            toast.error(message);

            if (err.response?.data?.errors) {
                const serverErrors: Record<string, string> = {};
                err.response.data.errors.forEach((e: { field: string; message: string }) => {
                    serverErrors[e.field] = e.message;
                });
                setErrors(prev => ({ ...prev, ...serverErrors }));
            } else {
                setErrors({ form: message });
            }
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
                        <h1 className="text-3xl font-black mb-2">Create Account</h1>
                        <p className="text-gray-600 mb-8">Start managing your tasks today</p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`neo-input ${errors.name ? 'border-[var(--error)]' : ''}`}
                                    placeholder="John Doe"
                                />
                                {errors.name && (
                                    <p className="text-[var(--error)] text-sm mt-1 font-medium">{errors.name}</p>
                                )}
                            </div>

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
                                <p className="text-gray-500 text-xs mt-1">Min 6 characters, must include a number</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`neo-input ${errors.confirmPassword ? 'border-[var(--error)]' : ''}`}
                                    placeholder="••••••••"
                                />
                                {errors.confirmPassword && (
                                    <p className="text-[var(--error)] text-sm mt-1 font-medium">{errors.confirmPassword}</p>
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
                                        Creating account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </form>

                        <div className="neo-divider"></div>

                        <p className="text-center text-gray-600">
                            Already have an account?{' '}
                            <Link href="/login" className="neo-link">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

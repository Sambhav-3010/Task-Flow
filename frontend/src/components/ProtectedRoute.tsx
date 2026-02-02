'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-pattern">
                <div className="text-center">
                    <div className="loading-spinner mx-auto mb-4"></div>
                    <p className="font-bold text-lg">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
}

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function ProfileSection() {
    const { user, updateUser } = useAuth();
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', bio: '' });

    useEffect(() => {
        if (user) {
            setFormData({ name: user.name || '', bio: user.bio || '' });
        }
    }, [user]);

    const handleSave = async () => {
        if (!formData.name.trim()) {
            toast.error('Name is required');
            return;
        }

        setLoading(true);
        try {
            const response = await api.put('/me', formData);
            updateUser(response.data.data);
            setEditing(false);
            toast.success('Profile updated!');
        } catch {
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="neo-card p-6 text-white" style={{ background: 'var(--blue)' }}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black uppercase tracking-wide">Profile</h2>
                {!editing ? (
                    <button
                        onClick={() => setEditing(true)}
                        className="p-2 bg-white text-black border-3 border-black shadow-[3px_3px_0px_black] hover:shadow-[4px_4px_0px_black] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="p-2 bg-[var(--secondary)] text-black border-3 border-black shadow-[3px_3px_0px_black] hover:shadow-[4px_4px_0px_black] transition-all"
                        >
                            {loading ? '...' : '✓'}
                        </button>
                        <button
                            onClick={() => {
                                setEditing(false);
                                setFormData({ name: user?.name || '', bio: user?.bio || '' });
                            }}
                            className="p-2 bg-white text-black border-3 border-black shadow-[3px_3px_0px_black] hover:shadow-[4px_4px_0px_black] transition-all"
                        >
                            ✕
                        </button>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[var(--accent)] border-4 border-black flex items-center justify-center text-3xl font-black text-black shadow-[4px_4px_0px_black]">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                    {editing ? (
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="neo-input text-black font-bold"
                            placeholder="Your name"
                        />
                    ) : (
                        <>
                            <p className="font-black text-xl truncate">{user?.name}</p>
                            <p className="text-white/80 truncate">{user?.email}</p>
                        </>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wide text-white/80">Bio</label>
                {editing ? (
                    <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="neo-input text-black min-h-[80px] resize-none"
                        placeholder="Tell us about yourself..."
                    />
                ) : (
                    <p className="text-white/90">{user?.bio || 'No bio yet. Click edit to add one!'}</p>
                )}
            </div>
        </div>
    );
}

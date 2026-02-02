'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function ProfileSection() {
    const { user, updateUser } = useAuth();
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        bio: user?.bio || '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.put('/me', formData);
            updateUser(response.data.data);
            setEditing(false);
            toast.success('Profile updated!');
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            toast.error(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            bio: user?.bio || '',
        });
        setEditing(false);
    };

    return (
        <div className="neo-card p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black uppercase tracking-wide">Profile</h2>
                {!editing && (
                    <button
                        onClick={() => setEditing(true)}
                        className="neo-button neo-button-outline py-2 px-4 text-sm"
                    >
                        Edit
                    </button>
                )}
            </div>

            {editing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                            Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="neo-input"
                            maxLength={50}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                            Bio
                        </label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            className="neo-input min-h-[100px] resize-none"
                            maxLength={200}
                            placeholder="Tell us about yourself..."
                        />
                        <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/200</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="neo-button py-2 px-4 text-sm flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="loading-spinner w-4 h-4 border-2"></div>
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="neo-button neo-button-outline py-2 px-4 text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-[var(--primary)] text-white text-2xl font-black flex items-center justify-center border-3 border-[var(--border)] shadow-[4px_4px_0px_var(--border)]">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">{user?.name}</h3>
                            <p className="text-gray-500">{user?.email}</p>
                        </div>
                    </div>
                    {user?.bio && (
                        <div className="p-4 bg-[var(--background)] border-2 border-[var(--border)]">
                            <p className="text-gray-700">{user.bio}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

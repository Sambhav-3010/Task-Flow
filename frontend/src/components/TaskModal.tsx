'use client';

import { useState, useEffect } from 'react';

interface Task {
    _id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
}

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<Task, '_id'> | Task) => Promise<void>;
    task?: Task | null;
}

export default function TaskModal({ isOpen, onClose, onSubmit, task }: TaskModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending' as const,
        priority: 'medium' as const,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
            });
        } else {
            setFormData({
                title: '',
                description: '',
                status: 'pending',
                priority: 'medium',
            });
        }
        setErrors({});
    }, [task, isOpen]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.length > 100) {
            newErrors.title = 'Title cannot exceed 100 characters';
        }

        if (formData.description.length > 500) {
            newErrors.description = 'Description cannot exceed 500 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        try {
            if (task) {
                await onSubmit({ ...formData, _id: task._id });
            } else {
                await onSubmit(formData);
            }
            onClose();
        } catch {
            setErrors({ form: 'Failed to save task' });
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            ></div>

            <div className="neo-card p-6 w-full max-w-md relative animate-bounce-in">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black uppercase tracking-wide">
                        {task ? 'Edit Task' : 'New Task'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[var(--foreground)] hover:text-white transition-colors border-2 border-[var(--border)]"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                            Title *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className={`neo-input ${errors.title ? 'border-[var(--error)]' : ''}`}
                            placeholder="What needs to be done?"
                        />
                        {errors.title && (
                            <p className="text-[var(--error)] text-sm mt-1 font-medium">{errors.title}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className={`neo-input min-h-[100px] resize-none ${errors.description ? 'border-[var(--error)]' : ''}`}
                            placeholder="Add more details..."
                        />
                        <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500</p>
                        {errors.description && (
                            <p className="text-[var(--error)] text-sm mt-1 font-medium">{errors.description}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                                Status
                            </label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
                                className="neo-select w-full"
                            >
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                                Priority
                            </label>
                            <select
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
                                className="neo-select w-full"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    {errors.form && (
                        <div className="p-4 bg-[var(--error)] text-white font-medium border-3 border-[var(--border)]">
                            {errors.form}
                        </div>
                    )}

                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="neo-button flex-1 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="loading-spinner w-5 h-5 border-2"></div>
                                    Saving...
                                </>
                            ) : (
                                task ? 'Update Task' : 'Create Task'
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="neo-button neo-button-outline"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

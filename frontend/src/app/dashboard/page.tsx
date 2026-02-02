'use client';

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import ProfileSection from '@/components/ProfileSection';
import TaskCard from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal';

interface Task {
    _id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    createdAt: string;
}

export default function DashboardPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const fetchTasks = useCallback(async () => {
        try {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (statusFilter) params.append('status', statusFilter);
            if (priorityFilter) params.append('priority', priorityFilter);

            const response = await api.get(`/tasks?${params.toString()}`);
            setTasks(response.data.data);
        } catch {
            toast.error('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    }, [search, statusFilter, priorityFilter]);

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchTasks();
        }, 300);
        return () => clearTimeout(debounce);
    }, [fetchTasks]);

    const handleCreateTask = async (data: { title: string; description: string; status: 'pending' | 'in-progress' | 'completed'; priority: 'low' | 'medium' | 'high' }) => {
        const response = await api.post('/tasks', data);
        setTasks(prev => [response.data.data, ...prev]);
        toast.success('Task created!');
    };

    const handleUpdateTask = async (data: { title: string; description: string; status: 'pending' | 'in-progress' | 'completed'; priority: 'low' | 'medium' | 'high'; _id?: string }) => {
        const response = await api.put(`/tasks/${data._id}`, data);
        setTasks(prev => prev.map(t => t._id === data._id ? response.data.data : t));
        toast.success('Task updated!');
    };

    const handleDeleteTask = async (id: string) => {
        await api.delete(`/tasks/${id}`);
        setTasks(prev => prev.filter(t => t._id !== id));
        setDeleteConfirm(null);
        toast.success('Task deleted!');
    };

    const openCreateModal = () => {
        setEditingTask(null);
        setModalOpen(true);
    };

    const openEditModal = (task: Task) => {
        setEditingTask(task);
        setModalOpen(true);
    };

    const taskStats = {
        total: tasks.length,
        pending: tasks.filter(t => t.status === 'pending').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
        completed: tasks.filter(t => t.status === 'completed').length,
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-[var(--background)]">
                <Navbar />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1 space-y-6">
                            <ProfileSection />

                            <div className="neo-card p-6">
                                <h2 className="text-xl font-black uppercase tracking-wide mb-4">Stats</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-[var(--background)] border-2 border-[var(--border)] text-center">
                                        <p className="text-3xl font-black text-[var(--primary)]">{taskStats.total}</p>
                                        <p className="text-xs font-bold uppercase text-gray-500">Total</p>
                                    </div>
                                    <div className="p-4 bg-[var(--background)] border-2 border-[var(--border)] text-center">
                                        <p className="text-3xl font-black text-[var(--warning)]">{taskStats.pending}</p>
                                        <p className="text-xs font-bold uppercase text-gray-500">Pending</p>
                                    </div>
                                    <div className="p-4 bg-[var(--background)] border-2 border-[var(--border)] text-center">
                                        <p className="text-3xl font-black text-[var(--secondary)]">{taskStats.inProgress}</p>
                                        <p className="text-xs font-bold uppercase text-gray-500">In Progress</p>
                                    </div>
                                    <div className="p-4 bg-[var(--background)] border-2 border-[var(--border)] text-center">
                                        <p className="text-3xl font-black text-[var(--success)]">{taskStats.completed}</p>
                                        <p className="text-xs font-bold uppercase text-gray-500">Done</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="neo-card p-6 mb-6">
                                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
                                    <h2 className="text-xl font-black uppercase tracking-wide">Tasks</h2>
                                    <button onClick={openCreateModal} className="neo-button py-2 px-4 text-sm">
                                        + New Task
                                    </button>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Search tasks..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="neo-input"
                                        />
                                    </div>
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="neo-select"
                                    >
                                        <option value="">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                    <select
                                        value={priorityFilter}
                                        onChange={(e) => setPriorityFilter(e.target.value)}
                                        className="neo-select"
                                    >
                                        <option value="">All Priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>

                                {loading ? (
                                    <div className="flex justify-center py-12">
                                        <div className="loading-spinner"></div>
                                    </div>
                                ) : tasks.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">📝</div>
                                        <h3 className="text-xl font-bold mb-2">No tasks found</h3>
                                        <p className="text-gray-500 mb-4">
                                            {search || statusFilter || priorityFilter
                                                ? 'Try adjusting your filters'
                                                : 'Create your first task to get started'}
                                        </p>
                                        {!search && !statusFilter && !priorityFilter && (
                                            <button onClick={openCreateModal} className="neo-button">
                                                Create Task
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="grid gap-4">
                                        {tasks.map((task) => (
                                            <TaskCard
                                                key={task._id}
                                                task={task}
                                                onEdit={openEditModal}
                                                onDelete={(id) => setDeleteConfirm(id)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                <TaskModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                    task={editingTask}
                />

                {deleteConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/50" onClick={() => setDeleteConfirm(null)}></div>
                        <div className="neo-card p-6 relative animate-bounce-in max-w-sm w-full">
                            <h3 className="text-xl font-black mb-4">Delete Task?</h3>
                            <p className="text-gray-600 mb-6">This action cannot be undone.</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleDeleteTask(deleteConfirm)}
                                    className="neo-button flex-1"
                                    style={{ background: 'var(--error)' }}
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="neo-button neo-button-outline flex-1"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
}

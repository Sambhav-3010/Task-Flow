'use client';

interface Task {
    _id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    createdAt: string;
}

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

const statusColors = {
    pending: 'neo-badge-pending',
    'in-progress': 'neo-badge-in-progress',
    completed: 'neo-badge-completed',
};

const priorityColors = {
    low: 'neo-badge-low',
    medium: 'neo-badge-medium',
    high: 'neo-badge-high',
};

const statusLabels = {
    pending: 'Pending',
    'in-progress': 'In Progress',
    completed: 'Completed',
};

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
    return (
        <div className="neo-card p-5 animate-slide-up">
            <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-bold text-lg flex-1 break-words">{task.title}</h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 hover:bg-[var(--secondary)] hover:text-white transition-colors border-2 border-[var(--border)]"
                        title="Edit"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="p-2 hover:bg-[var(--error)] hover:text-white transition-colors border-2 border-[var(--border)]"
                        title="Delete"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {task.description && (
                <p className="text-gray-600 mb-4 text-sm break-words">{task.description}</p>
            )}

            <div className="flex flex-wrap gap-2 mb-3">
                <span className={`neo-badge ${statusColors[task.status]}`}>
                    {statusLabels[task.status]}
                </span>
                <span className={`neo-badge ${priorityColors[task.priority]}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
            </div>

            <p className="text-xs text-gray-400">
                Created {new Date(task.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                })}
            </p>
        </div>
    );
}

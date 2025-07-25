import { useState } from 'react';
import { useTaskStore } from '../store/taskStore';

export const TaskForm = () => {
    const [title, setTitle] = useState('');
    const addTask = useTaskStore((state) => state.addTask);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        addTask(title.trim());
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
                type="text"
                placeholder="Add a task"
                className="flex-1 p-2 border border-gray-300 rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Add
            </button>
        </form>
    );
}

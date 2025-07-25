import { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

export const TaskForm = ()=> {
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
            <Input
                type="text"
                placeholder="Add a task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Button type="submit">Add</Button>
        </form>
    );
}
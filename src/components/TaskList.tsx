import { useTaskStore } from '../store/taskStore';
import {TaskItem} from "./TaskItem.tsx";

export const TaskList = () => {
    const tasks = useTaskStore((state) => state.tasks);
    const filter = useTaskStore((state) => state.filter);

    const filtered = tasks.filter((t) => {
        if (filter === 'completed') return t.completed;
        if (filter === 'pending') return !t.completed;
        return true;
    });

    if (filtered.length === 0) {
        return <p className="text-gray-500 italic">No tasks to show.</p>;
    }

    return (
        <ul>
            {filtered.map((t) => (
                <TaskItem key={t.id} {...t} />
            ))}
        </ul>
    );
}

import { useTaskStore } from '../store/taskStore';
import {TaskItem} from "./TaskItem.tsx";
import {AnimatePresence, motion} from "framer-motion";

export const TaskList = () => {
    const { data, filter, isLoading, error } = useTaskStore();

    const filtered = data.filter((t) => {
        if (filter === 'completed') return t.completed;
        if (filter === 'pending') return !t.completed;
        return true;
    });

    if (isLoading) {
        return (
            <div className="text-center py-10 text-gray-500" role="status" aria-live="polite">
                <p className="animate-pulse text-sm">Loading tasks...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10 text-red-500" role="alert">
                <p className="text-sm font-medium">{error}</p>
            </div>
        );
    }

    if (filtered.length === 0) {
        return (
            <div className="text-center text-gray-400 py-10" aria-live="polite">
                <p className="text-sm">No tasks found for this filter.</p>
            </div>
        );
    }

    return (
        <ul className="space-y-3" aria-label="Task list">
            <AnimatePresence>
                {filtered.map((t) => (
                    <motion.li
                        key={t.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <TaskItem {...t} />
                    </motion.li>
                ))}
            </AnimatePresence>
        </ul>
    );
}

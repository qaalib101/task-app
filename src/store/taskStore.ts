import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fakeApiCall } from '../utils/fakeApi.ts';

export type Task = {
    id: string;
    title: string;
    completed: boolean;
};

type Filter = 'all' | 'completed' | 'pending';

interface TaskState {
    tasks: Task[];
    filter: Filter;
    addTask: (title: string) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
    setFilter: (filter: Filter) => void;
}

export const useTaskStore = create<TaskState>()(
    persist(
        (set, get) => ({
            tasks: [],
            filter: 'all',

            addTask: (title) => {
                const task: Task = {
                    id: crypto.randomUUID(),
                    title,
                    completed: false,
                };

                // Optimistic update
                set((state) => ({ tasks: [...state.tasks, task] }));

                // Simulate saving to API
                fakeApiCall(task).catch(() => {
                    // Rollback
                    set((state) => ({
                        tasks: state.tasks.filter((t) => t.id !== task.id),
                    }));
                    alert('Failed to save task. Rolled back.');
                });
            },

            toggleTask: (id) =>
                set((state) => ({
                    tasks: state.tasks.map((t) =>
                        t.id === id ? { ...t, completed: !t.completed } : t
                    ),
                })),

            deleteTask: (id) =>
                set((state) => ({
                    tasks: state.tasks.filter((t) => t.id !== id),
                })),

            setFilter: (filter) => set(() => ({ filter })),
        }),
        {
            name: 'task-store', // localStorage key
        }
    )
);

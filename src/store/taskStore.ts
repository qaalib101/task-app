import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fakeApiCall } from '../utils/fakeApi';

export type Task = {
    id: string;
    title: string;
    completed: boolean;
};

type Filter = 'all' | 'completed' | 'pending';

interface TaskState {
    data: Task[];
    isLoading: boolean;
    error: string | null;
    filter: Filter;

    fetchData: () => void;
    setFilter: (filter: Filter) => void;
    addTask: (title: string) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskState>()(
    persist(
        (set, get) => ({
            data: [],
            isLoading: false,
            error: null,
            filter: 'all',

            fetchData: async () => {
                const { isLoading } = get();

                // Prevent overlapping fetches
                if (isLoading) return;

                try {
                    set({ isLoading: true, error: null });

                    // Simulate network delay (e.g., to show skeletons/loaders)
                    await new Promise((res) => setTimeout(res, 700));

                    // No actual fetch needed since we're using localStorage
                    set({ isLoading: false });
                } catch (err) {
                    console.error(err);
                    set({ isLoading: false, error: 'Failed to simulate fetch' });
                }
            },

            setFilter: (filter) => set({ filter }),

            addTask: (title) => {
                const task: Task = {
                    id: crypto.randomUUID(),
                    title,
                    completed: false,
                };

                set((state) => ({ data: [...state.data, task] }));

                fakeApiCall(task).catch(() => {
                    set((state) => ({ data: state.data.filter((t) => t.id !== task.id) }));
                    alert('Failed to save task. Rolled back.');
                });
            },

            toggleTask: (id) => {
                const prev = get().data;
                set((state) => ({
                    data: state.data.map((t) =>
                        t.id === id ? { ...t, completed: !t.completed } : t
                    ),
                }));

                const updated = get().data.find((t) => t.id === id);
                fakeApiCall(updated).catch(() => {
                    set({ data: prev });
                    alert('Failed to update task. Rolled back.');
                });
            },

            deleteTask: (id) => {
                const prev = get().data;
                set((state) => ({
                    data: state.data.filter((t) => t.id !== id),
                }));

                const deleted = prev.find((t) => t.id === id);
                fakeApiCall(deleted).catch(() => {
                    set({ data: prev });
                    alert('Failed to delete task. Rolled back.');
                });
            },
        }),
        {
            name: 'task-store',
            partialize: (state) => ({
                data: state.data,
                filter: state.filter,
            }),
        }
    )
);

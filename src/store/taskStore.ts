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
                const { data } = get();

                // Do nothing if already loaded (i.e. from localStorage via persist)
                if (data.length > 0) return;

                set({ isLoading: true });

                // Simulate delay (e.g. 700ms)
                await new Promise((res) => setTimeout(res, 700));

                // After delay, still no data — fallback is just empty (or log)
                set({ isLoading: false });
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

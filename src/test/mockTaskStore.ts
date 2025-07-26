import type {Task} from "../store/taskStore.ts";

export const mockTasks: Task[] = [
    { id: '1', title: 'Mock Task 1', completed: false },
    { id: '2', title: 'Mock Task 2', completed: true },
];

export const mockTaskStore = {
    data: mockTasks,
    filter: 'all',
    isLoading: false,
    error: null,
    fetchData: vi.fn(),
    setFilter: vi.fn(),
    addTask: vi.fn(),
    toggleTask: vi.fn(),
    deleteTask: vi.fn(),
};
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { useTaskStore } from './store/taskStore';
import {type Mock, vi} from 'vitest';
import { mockTaskStore } from './test/mockTaskStore';

vi.mock('./store/taskStore', async () => {
    const actual = await vi.importActual<typeof import('./store/taskStore')>('./store/taskStore');
    return {
        ...actual,
        useTaskStore: vi.fn(() =>
            ({
                ...mockTaskStore,
                fetchData: vi.fn(),
            })
        ),
    };
});

describe('App', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders main sections of the app', () => {
        render(<App />);
        expect(screen.getByPlaceholderText(/Add a task/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /completed/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /pending/i })).toBeInTheDocument();
    });

    it('shows tasks from store', () => {
        render(<App />);
        expect(screen.getByText(/Mock Task 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Mock Task 2/i)).toBeInTheDocument();
    });

    it('adds new task and clears input', () => {
        render(<App />);
        const input = screen.getByPlaceholderText(/Add a task/i);
        const addBtn = screen.getByRole('button', { name: /add/i });

        fireEvent.change(input, { target: { value: 'New App Task' } });
        fireEvent.click(addBtn);

        expect(mockTaskStore.addTask).toHaveBeenCalledWith('New App Task');
        expect(input).toHaveValue('');
    });

    it('filters tasks to only completed', () => {
        render(<App />);
        const completedBtn = screen.getByRole('button', { name: /completed/i });
        fireEvent.click(completedBtn);
        expect(mockTaskStore.setFilter).toHaveBeenCalledWith('completed');
    });

    it('shows loading state if loading is true', () => {
        (useTaskStore as unknown as Mock).mockImplementation(() =>
            ({ ...mockTaskStore, isLoading: true })
        );

        render(<App />);
        expect(screen.getByText(/loading tasks/i)).toBeInTheDocument();
    });

    it('shows error if error exists', () => {
        (useTaskStore as unknown as Mock).mockImplementation(() =>
            ({ ...mockTaskStore, error: 'Boom!' })
        );

        render(<App />);
        expect(screen.getByText(/boom/i)).toBeInTheDocument();
    });
});

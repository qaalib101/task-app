import { render, screen } from '@testing-library/react';
import { TaskList } from './TaskList';
import { useTaskStore } from '../store/taskStore';
import { type Mock, vi } from 'vitest';
import { mockTaskStore } from '../test/mockTaskStore.ts';

vi.mock('../store/taskStore', async () => {
    const actual = await vi.importActual<typeof import('../store/taskStore')>(
        '../store/taskStore'
    );
    return {
        ...actual,
        useTaskStore: vi.fn(() => mockTaskStore),
    };
});

describe('TaskList', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders message when no tasks match filter', () => {
        (useTaskStore as unknown as Mock).mockImplementation(() => ({
            ...mockTaskStore,
            data: [],
        }));

        render(<TaskList />);
        expect(screen.getByText(/no tasks found/i)).toBeInTheDocument();
    });

    it('renders filtered tasks', () => {
        (useTaskStore as unknown as Mock).mockImplementation(() => ({
            ...mockTaskStore,
            filter: 'completed',
        }));

        render(<TaskList />);
        expect(screen.getByText('Mock Task 2')).toBeInTheDocument();
        expect(screen.queryByText('Mock Task 1')).not.toBeInTheDocument();
    });
});

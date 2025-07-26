import { render, screen, fireEvent } from '@testing-library/react';
import { TaskForm } from './TaskForm';
import { vi } from 'vitest';
import { mockTaskStore } from '../test/mockTaskStore';

vi.mock('../store/taskStore', async () => {
    const actual = await vi.importActual<typeof import('../store/taskStore')>(
        '../store/taskStore'
    );
    return {
        ...actual,
        useTaskStore: vi.fn(() => mockTaskStore),
    };
});

describe('TaskForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders input and button', () => {
        render(<TaskForm />);
        expect(screen.getByPlaceholderText(/Add a task/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    });

    it('calls addTask with the entered value', () => {
        render(<TaskForm />);
        const input = screen.getByPlaceholderText(/Add a task/i);
        const button = screen.getByRole('button', { name: /add/i });

        fireEvent.change(input, { target: { value: 'New task' } });
        fireEvent.click(button);

        expect(mockTaskStore.addTask).toHaveBeenCalledWith('New task');
    });

    it('does not call addTask if input is empty', () => {
        render(<TaskForm />);
        fireEvent.click(screen.getByRole('button', { name: /add/i }));

        expect(mockTaskStore.addTask).not.toHaveBeenCalled();
    });
});

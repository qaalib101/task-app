import { render, screen, fireEvent } from '@testing-library/react';
import { TaskItem } from './TaskItem';
import { useTaskStore } from '../store/taskStore';
import {type Mock, vi} from 'vitest';
import {mockTaskStore} from "../test/mockTaskStore.ts";

// Mock Zustand store
vi.mock('../store/taskStore', async () => {
    const actual = await vi.importActual<typeof import('../store/taskStore')>(
        '../store/taskStore'
    );
    return {
        ...actual,
        useTaskStore: vi.fn(() => mockTaskStore),
    };
});

describe('TaskItem', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (useTaskStore as unknown as Mock).mockImplementation(() =>
            mockTaskStore
        );
    });

    it('renders a task title and checkbox', () => {
        render(<TaskItem id="1" title="Test Task" completed={false} />);
        expect(screen.getByText('Test Task')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('strikes through completed task', () => {
        render(<TaskItem id="2" title="Completed Task" completed={true} />);
        const label = screen.getByText('Completed Task');
        expect(label).toHaveClass('line-through');
    });

    it('calls toggleTask on checkbox change', () => {
        render(<TaskItem id="1" title="Test Task" completed={false} />);
        fireEvent.click(screen.getByRole('checkbox'));
        expect(mockTaskStore.toggleTask).toHaveBeenCalledWith('1');
    });

    it('calls deleteTask when delete button is clicked', () => {
        render(<TaskItem id="1" title="Test Task" completed={false} />);
        fireEvent.click(screen.getByRole('button', { name: /delete/i }));
        expect(mockTaskStore.deleteTask).toHaveBeenCalledWith('1');
    });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { FilterBar } from './FilterBar';
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

describe('FilterBar', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders all filter buttons', () => {
        render(<FilterBar />);
        expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /completed/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /pending/i })).toBeInTheDocument();
    });

    it('calls setFilter when a button is clicked', () => {
        render(<FilterBar />);
        fireEvent.click(screen.getByRole('button', { name: /completed/i }));
        expect(mockTaskStore.setFilter).toHaveBeenCalledWith('completed');
    });

    it('highlights the currently selected filter', () => {
        render(<FilterBar />);
        const allButton = screen.getByRole('button', { name: /all/i });
        expect(allButton).toHaveClass('bg-blue-600');
    });
});

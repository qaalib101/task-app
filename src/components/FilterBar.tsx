import { useTaskStore } from '../store/taskStore';
import { Button } from "./ui/Button.tsx";

export const FilterBar = () => {
    const { filter, setFilter } = useTaskStore();
    const filters: ('all' | 'completed' | 'pending')[] = ['all', 'completed', 'pending'];

    return (
        <div
            className="flex gap-2 mb-4"
            role="group"
            aria-label="Filter tasks by status"
        >
            {filters.map((f) => (
                <Button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1 rounded ${
                        filter === f ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                    aria-pressed={filter === f}
                >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                </Button>
            ))}
        </div>
    );
}
import { useTaskStore } from '../store/taskStore';

export const FilterBar = () => {
    const filter = useTaskStore((state) => state.filter);
    const setFilter = useTaskStore((state) => state.setFilter);

    const filters: ('all' | 'completed' | 'pending')[] = ['all', 'completed', 'pending'];

    return (
        <div className="flex gap-2 mb-4">
            {filters.map((f) => (
                <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1 rounded ${
                        filter === f ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
            ))}
        </div>
    );
}
import { useTaskStore } from '../store/taskStore';
import {Button} from "./ui/Button.tsx";

type Props = {
    id: string;
    title: string;
    completed: boolean;
};

export const TaskItem = ({ id, title, completed }: Props) =>  {
    const toggleTask = useTaskStore((state) => state.toggleTask);
    const deleteTask = useTaskStore((state) => state.deleteTask);

    return (
        <li className="flex items-center justify-between p-2 border rounded mb-2">
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => toggleTask(id)}
                />
                <span className={completed ? 'line-through text-gray-500' : ''}>
          {title}
        </span>
            </label>
            <Button
                onClick={() => deleteTask(id)}
                className="text-red-500"
                variant={"danger"}
            >
                Delete
            </Button>
        </li>
    );
}
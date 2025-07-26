import { useTaskStore } from '../store/taskStore';
import {Button} from "./ui/Button.tsx";
import {Input} from "./ui/Input.tsx";

type Props = {
    id: string;
    title: string;
    completed: boolean;
};

export const TaskItem = ({ id, title, completed }: Props) =>  {
    const { toggleTask, deleteTask } = useTaskStore();

    const inputId = `task-${id}`;

    return (
        <div className="flex items-center justify-between p-3 bg-gray-50 border rounded-lg shadow-sm hover:shadow-md transition">
            <label htmlFor={inputId} className="flex items-center gap-2 cursor-pointer">
                <Input
                    id={inputId}
                    type="checkbox"
                    checked={completed}
                    onChange={() => toggleTask(id)}
                />
                <span className={completed ? 'line-through text-gray-400' : 'text-gray-800'}>
          {title}
        </span>
            </label>
            <Button
                onClick={() => deleteTask(id)}
                variant="danger"
                aria-label={`Delete task: ${title}`}
            >
                Delete
            </Button>
        </div>
    );
}
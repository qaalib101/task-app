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

    return (
        <li className="flex items-center justify-between p-3 bg-gray-50 border rounded-lg shadow-sm hover:shadow-md transition">
            <label className="flex items-center gap-2">
                <Input
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
                variant={"danger"}
            >
                Delete
            </Button>
        </li>
    );
}
import type { DetailedHTMLProps, InputHTMLAttributes} from 'react';
import classNames from 'classnames';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const Input = ({ className, type, ...props }: Props) => {
    const baseStyles =
        type === 'checkbox'
            ? 'h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-400 hover:cursor-pointer'
            : 'p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400';

    return (
        <input
            type={type}
            {...props}
            className={classNames(baseStyles, className)}
        />
    );
}
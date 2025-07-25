import type { DetailedHTMLProps, InputHTMLAttributes} from 'react';
import classNames from 'classnames';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const Input = ({ className, ...props }: Props) => {
    return (
        <input
            {...props}
            className={classNames(
                'p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400',
                className
            )}
        />
    );
}
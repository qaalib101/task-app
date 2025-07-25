import classNames from 'classnames';
import type {ButtonHTMLAttributes, DetailedHTMLProps} from "react";

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = ({ variant = 'primary', className, ...props }: Props) => {
    const base = 'px-4 py-2 rounded font-medium transition hover:cursor-pointer';
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400',
        secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400',
        danger: 'bg-red-100 text-red-600 border border-red-400 hover:bg-red-200 focus:ring-2 focus:ring-red-300',
    };

    return (
        <button
            {...props}
            className={classNames(base, variants[variant], className)}
        />
    );
}
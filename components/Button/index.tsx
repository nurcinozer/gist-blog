import { useMemo } from "react";

export type ButtonVariant =
  | 'primary'
  | 'secondary';

export type ButtonSize = 'large' | 'small';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  size = 'small',
  variant = 'primary',
}) => {

  const className = useMemo(() => {
    const base = 'inline-flex items-center border-0 focus:outline-none rounded mt-4 md:mt-0';
    const sizeClass = size === 'large' ? 'text-lg' : 'text-sm py-2 px-3';
    const variantClass = variant === 'primary' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-gray-800 hover:bg-gray-700';
    return `${base} ${sizeClass} ${variantClass}`;
  }, [size, variant]);

  return (
    <button className={className}>
      {children}
    </button>
  )
}
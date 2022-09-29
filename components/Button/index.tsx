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

  const baseStyle = 'inline-flex items-center border-0 focus:outline-none rounded mt-4 md:mt-0';
  const primaryStyle = 'bg-indigo-500 hover:bg-indigo-600';
  const secondaryStyle = ' bg-gray-800 hover:bg-gray-700';
  const largeStyle = 'text-lg';
  const smallStyle = 'text-base py-1 px-3';

  return (
    <button className={
      `${baseStyle} ${variant === 'primary' ? primaryStyle : secondaryStyle} ${size === 'large' ? largeStyle : smallStyle}`
    }>
      {children}
    </button>
  )
}
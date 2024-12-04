import { ComponentProps } from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

interface LoginButtonProps extends ComponentProps<'button'> {
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}

export function LoginButton({ 
  children, 
  loading, 
  variant = 'primary',
  className,
  disabled,
  ...props 
}: LoginButtonProps) {
  return (
    <button
      disabled={loading || disabled}
      className={clsx(
        'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
        variant === 'primary' 
          ? 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
          : 'text-white bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
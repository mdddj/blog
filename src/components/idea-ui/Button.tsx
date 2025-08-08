import React, { forwardRef, ReactNode } from 'react';
import './styles.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'idea-component idea-focusable inline-flex items-center justify-center font-medium transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variantClasses = {
      primary: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white border-blue-600 focus:ring-blue-500',
      secondary: 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-900 border-gray-300 focus:ring-gray-500',
      ghost: 'bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700 border-transparent focus:ring-gray-500',
      danger: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white border-red-600 focus:ring-red-500',
      success: 'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white border-green-600 focus:ring-green-500'
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm rounded-sm gap-1',
      md: 'px-4 py-2 text-sm rounded-md gap-2',
      lg: 'px-6 py-3 text-base rounded-md gap-2'
    };

    const disabledClasses = 'opacity-50 cursor-not-allowed';
    const loadingClasses = 'cursor-wait';
    const fullWidthClasses = fullWidth ? 'w-full' : '';

    const buttonClasses = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      (disabled || loading) && disabledClasses,
      loading && loadingClasses,
      fullWidthClasses,
      className
    ].filter(Boolean).join(' ');

    const LoadingSpinner = () => (
      <svg
        className="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {!loading && icon && iconPosition === 'left' && icon}
        {children}
        {!loading && icon && iconPosition === 'right' && icon}
      </button>
    );
  }
);

Button.displayName = 'Button';
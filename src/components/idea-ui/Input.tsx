import React, { forwardRef, ReactNode, useState } from 'react';
import './styles.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'borderless';
  fullWidth?: boolean;
  loading?: boolean;
  clearable?: boolean;
  onClear?: () => void;
}

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      size = 'md',
      variant = 'default',
      fullWidth = false,
      loading = false,
      clearable = false,
      onClear,
      disabled,
      className = '',
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value || '');

    const currentValue = value !== undefined ? value : internalValue;
    const hasValue = String(currentValue).length > 0;

    const sizeClasses = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-3 text-sm',
      lg: 'h-12 px-4 text-base'
    };

    const getInputClasses = () => {
      const baseClasses = [
        'idea-component',
        'idea-focusable',
        'w-full',
        'border',
        'transition-all',
        'duration-200',
        'outline-none',
        'placeholder-gray-400',
        sizeClasses[size]
      ];

      if (variant === 'default') {
        baseClasses.push('rounded-md');
        if (error) {
          baseClasses.push('border-red-500 focus:border-red-500 focus:ring-red-500');
        } else if (focused) {
          baseClasses.push('ring-2 ring-blue-500 border-blue-500');
        } else {
          baseClasses.push('border-gray-300 hover:border-gray-400');
        }
      } else if (variant === 'filled') {
        baseClasses.push('rounded-md', 'bg-gray-50', 'border-transparent');
        if (error) {
          baseClasses.push('ring-2 ring-red-500');
        } else if (focused) {
          baseClasses.push('ring-2 ring-blue-500');
        }
      } else if (variant === 'borderless') {
        baseClasses.push('border-transparent', 'bg-transparent');
        if (error) {
          baseClasses.push('border-b-2 border-red-500');
        } else if (focused) {
          baseClasses.push('border-b-2 border-blue-500');
        } else {
          baseClasses.push('border-b border-gray-300');
        }
      }

      if (disabled) {
        baseClasses.push('opacity-50', 'cursor-not-allowed');
      }

      if (leftIcon) {
        baseClasses.push('pl-10');
      }

      if (rightIcon || clearable || loading) {
        baseClasses.push('pr-10');
      }

      return baseClasses.join(' ');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (value === undefined) {
        setInternalValue('');
      }
      onClear?.();
    };

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
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    const ClearButton = () => (
      <button
        type="button"
        onClick={handleClear}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        style={{ color: 'var(--idea-text-secondary)' }}
        tabIndex={-1}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    );

    return (
      <div className={`${fullWidth ? 'w-full' : 'inline-block'} ${className}`}>
        {/* Label */}
        {label && (
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: error ? 'var(--idea-text-error)' : 'var(--idea-text-primary)' }}
          >
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div
              className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              style={{ color: 'var(--idea-text-secondary)' }}
            >
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            className={getInputClasses()}
            style={{
              backgroundColor: variant === 'filled' ? 'var(--idea-bg-tertiary)' : 'var(--idea-bg-secondary)',
              color: 'var(--idea-text-primary)',
              borderColor: error ? 'var(--idea-text-error)' : focused ? 'var(--idea-border-focus)' : 'var(--idea-border-default)'
            }}
            disabled={disabled || loading}
            value={currentValue}
            onChange={handleChange}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />

          {/* Right Icons */}
          {(rightIcon || clearable || loading) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              {loading && <LoadingSpinner />}
              {!loading && clearable && hasValue && !disabled && <ClearButton />}
              {!loading && rightIcon && (
                <span style={{ color: 'var(--idea-text-secondary)' }}>
                  {rightIcon}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Helper Text / Error */}
        {(error || helperText) && (
          <p
            className="mt-1 text-xs"
            style={{ color: error ? 'var(--idea-text-error)' : 'var(--idea-text-secondary)' }}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      helperText,
      resize = 'vertical',
      fullWidth = false,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);

    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize'
    };

    const getTextAreaClasses = () => {
      const baseClasses = [
        'idea-component',
        'idea-focusable',
        'w-full',
        'min-h-20',
        'px-3',
        'py-2',
        'text-sm',
        'border',
        'rounded-md',
        'transition-all',
        'duration-200',
        'outline-none',
        'placeholder-gray-400',
        resizeClasses[resize]
      ];

      if (error) {
        baseClasses.push('border-red-500 focus:border-red-500 focus:ring-red-500');
      } else if (focused) {
        baseClasses.push('ring-2 ring-blue-500 border-blue-500');
      } else {
        baseClasses.push('border-gray-300 hover:border-gray-400');
      }

      if (disabled) {
        baseClasses.push('opacity-50', 'cursor-not-allowed');
      }

      return baseClasses.join(' ');
    };

    return (
      <div className={`${fullWidth ? 'w-full' : 'inline-block'} ${className}`}>
        {/* Label */}
        {label && (
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: error ? 'var(--idea-text-error)' : 'var(--idea-text-primary)' }}
          >
            {label}
          </label>
        )}

        {/* TextArea */}
        <textarea
          ref={ref}
          className={getTextAreaClasses()}
          style={{
            backgroundColor: 'var(--idea-bg-secondary)',
            color: 'var(--idea-text-primary)',
            borderColor: error ? 'var(--idea-text-error)' : focused ? 'var(--idea-border-focus)' : 'var(--idea-border-default)'
          }}
          disabled={disabled}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />

        {/* Helper Text / Error */}
        {(error || helperText) && (
          <p
            className="mt-1 text-xs"
            style={{ color: error ? 'var(--idea-text-error)' : 'var(--idea-text-secondary)' }}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
TextArea.displayName = 'TextArea';
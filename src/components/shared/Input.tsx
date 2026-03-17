"use client"
import React, { InputHTMLAttributes, forwardRef, useId, useState } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label for the input */
  label?: string;
  /** Error message to display below the input */
  error?: string;
  /** Hint or helper text to display below the input */
  helperText?: string;
  /** Element to display on the left side of the input (e.g., an icon) */
  leftIcon?: React.ReactNode;
  /** Element to display on the right side of the input (e.g., a button or icon) */
  rightIcon?: React.ReactNode;
  /** Visual variant of the input */
  variant?: 'outline' | 'filled' | 'flushed';
  /** Size of the input */
  size?: 'sm' | 'md' | 'lg';
  /** If true, the input will take up the full width of its container */
  fullWidth?: boolean;
  /** Border radius */
  rounded?: 'sm' | 'md' | 'lg' | 'full' | 'none';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      variant = 'outline',
      size = 'md',
      fullWidth = true,
      rounded = 'lg',
      disabled,
      id,
      type = 'text',
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if one isn't provided, useful for linking label and input
    const generatedId = useId();
    const inputId = id || generatedId;
    
    // State for toggling password visibility
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    // Base wrapper styles
    const wrapperStyles = [
      'relative flex items-center',
      fullWidth ? 'w-full' : '',
    ]
      .filter(Boolean)
      .join(' ');

    // Shared input base styles
    const baseInputStyles =
      'w-full transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

    // Variant-specific styles
    const variants = {
      outline:
        'border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary bg-transparent',
      filled:
        'border-transparent bg-gray-100 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary',
      flushed:
        'border-b border-gray-300 focus:border-primary bg-transparent rounded-none px-0',
    };

    // Error styles (overrides variant styles if there is an error)
    const errorStyles = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900 placeholder-red-300'
      : '';

    // Size-specific styles
    const sizes = {
      sm: 'h-8 text-sm',
      md: 'h-10 text-base',
      lg: 'h-12 text-lg',
    };

    // Padding adjustments based on icons
    const paddingStyles = [
      variant !== 'flushed' ? 'px-3' : '',
      leftIcon ? 'pl-10' : '',
      rightIcon || isPassword ? 'pr-10' : '',
    ]
      .filter(Boolean)
      .join(' ');

    // Border radius styles
    const roundedStyles =
      variant === 'flushed'
        ? ''
        : rounded === 'full'
        ? 'rounded-full'
        : rounded === 'lg'
        ? 'rounded-lg'
        : rounded === 'md'
        ? 'rounded-md'
        : rounded === 'sm'
        ? 'rounded-sm'
        : 'rounded-none';

    // Construct the input className string
    const inputClasses = [
      baseInputStyles,
      variants[variant],
      sizes[size],
      paddingStyles,
      roundedStyles,
      errorStyles,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-200"
          >
            {label}
          </label>
        )}

        <div className={wrapperStyles}>
          {leftIcon && (
            <div className="absolute left-3 flex items-center justify-center text-gray-500">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={disabled}
            className={inputClasses}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />

          {(rightIcon || isPassword) && (
            <div className="absolute right-3 flex items-center justify-center">
              {isPassword ? (
                <button
                  type="button"
                  tabIndex={-1}
                  className="text-gray-500 hover:text-gray-200 focus:outline-none"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent accidental form submissions
                    setShowPassword(!showPassword);
                  }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    // Eye off icon
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    // Eye icon
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              ) : (
                <div className="text-gray-500">{rightIcon}</div>
              )}
            </div>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-500">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={`${inputId}-helper`} className="text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

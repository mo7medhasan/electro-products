"use client"
import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';
import { UrlObject } from 'url';

type BaseProps = {
  /** Text to display (kept for backward compatibility; prefer using children) */
  title?: string;
  /** Visual variant of the button */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg' | 'icon';
  /** If true, shows a spinner and disables the button */
  isLoading?: boolean;
  /** Element to display on the left side of the text */
  leftIcon?: React.ReactNode;
  /** Element to display on the right side of the text */
  rightIcon?: React.ReactNode;
  /** If true, the button will take up the full width of its container */
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string | UrlObject;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  rounded?: 'lg' | 'md' | 'sm' | 'full';
  
};

type ButtonAsButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
};

type ButtonAsLinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string | UrlObject;
};

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      rounded = 'lg',
      fullWidth = false,
      disabled,
      children,
      title,
      type = 'button',
      onClick,
      href,
      ...props
    },
    ref
  ) => {
    // Shared base styles
    const baseStyles =
      'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

    // Variant-specific styles
    const variants = {
      primary:
        'bg-primary text-white hover:bg-primary-dark shadow-sm focus:ring-primary',
      secondary:
        'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
      outline:
        'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
      ghost:
        'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800',
      danger:
        'bg-red-500 text-white hover:bg-red-600 shadow-sm focus:ring-red-500',
    };

    // Size-specific styles
    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 py-2 text-base',
      lg: 'h-12 px-6 text-lg',
      icon: 'h-10 w-10',
    };

    // Construct the className string manually (no clsx or tailwind-merge needed)
    const classes = [
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth ? 'w-full' : '',
      className,
      disabled || isLoading ? 'opacity-50 pointer-events-none' : '',
      rounded === 'lg' ? 'rounded-lg' : rounded === 'md' ? 'rounded-md' : rounded === 'sm' ? 'rounded-sm' : rounded === 'full' ? 'rounded-full' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const innerContent = (
      <>
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
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
        )}
        {!isLoading && leftIcon && (
          <span className="mr-2 inline-flex">{leftIcon}</span>
        )}
        <span className="truncate">{children || title}</span>
        {!isLoading && rightIcon && (
          <span className="ml-2 inline-flex">{rightIcon}</span>
        )}
      </>
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
      if (isLoading || disabled) {
        e.preventDefault();
        return;
      }
      if (onClick) {
        // We know onClick matches the event type based on whether href is defined
        (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
      }
    };

    if (href) {
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          onClick={handleClick as React.MouseEventHandler<HTMLAnchorElement>}
          aria-disabled={disabled || isLoading}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {innerContent}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type as "button" | "submit" | "reset"}
        disabled={disabled || isLoading}
        className={classes}
        onClick={handleClick as React.MouseEventHandler<HTMLButtonElement>}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {innerContent}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

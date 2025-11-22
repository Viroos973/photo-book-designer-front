import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = 'text', leftIcon, rightIcon, ...props }, ref) => (
        <div className='relative w-full'>
            {leftIcon &&
                React.isValidElement(leftIcon) &&
                (() => {
                    const iconElement = leftIcon as React.ReactElement<{ className?: string }>;
                    return (
                        <span className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground'>
              {React.cloneElement(iconElement, {
                  className: cn('size-4', iconElement.props.className)
              })}
            </span>
                    );
                })()}

            {rightIcon &&
                React.isValidElement(rightIcon) &&
                (() => {
                    const iconElement = rightIcon as React.ReactElement<{ className?: string }>;
                    return (
                        <span className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground'>
              {React.cloneElement(iconElement, {
                  className: cn('size-4', iconElement.props.className)
              })}
            </span>
                    );
                })()}

            <input
                type={type}
                className={cn(
                    'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                    leftIcon && 'pl-9',
                    className
                )}
                ref={ref}
                {...props}
            />
        </div>
    )
);
Input.displayName = 'Input';

export { Input };
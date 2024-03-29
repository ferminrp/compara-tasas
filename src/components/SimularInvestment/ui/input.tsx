import * as React from 'react';

import { cn } from 'src/components/SimularInvestment/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputmode?:
    | 'email'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
    | 'none'
    | 'numeric'
    | 'decimal';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputmode, ...props }, ref) => {
    return (
      <input
        type={type}
        inputMode={inputmode}
        className={cn(
          'flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6469F2] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-[#6469F2]',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };

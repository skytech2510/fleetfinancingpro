import React, { forwardRef, useRef, useState } from 'react';
import { ChevronUp, ChevronDown, Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ className = '', label, error, multiline = false, rows = 4, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const internalRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const inputRef = (ref || internalRef) as React.RefObject<HTMLInputElement>;

    const inputClasses = `
      w-full px-4 py-2.5 
      bg-background/50 rounded-lg
      border border-primary/10
      focus:border-[rgb(245,49,196)] focus:ring-2 focus:ring-[rgb(245,49,196)]/20
      placeholder:text-muted-foreground/50
      transition-all duration-300
      hover:border-primary/20
      backdrop-blur-sm
      after:content-[''] after:absolute after:inset-0 after:z-[-1] 
      after:transition-opacity after:duration-300 
      after:bg-gradient-to-r after:from-[#ff10f0] after:to-[#00fff0] 
      after:opacity-0 focus:after:opacity-20
      ${type === 'number' ? '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pr-10' : ''}
      ${type === 'password' ? 'pr-12' : ''}
      ${error ? 'border-destructive focus:border-destructive' : ''}
      ${className}
    `;

    const handleIncrement = () => {
      if (inputRef.current) {
        const currentValue = parseFloat(inputRef.current.value) || 0;
        const step = parseFloat(inputRef.current.step) || 1;
        inputRef.current.value = (currentValue + step).toString();
        inputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
      }
    };

    const handleDecrement = () => {
      if (inputRef.current) {
        const currentValue = parseFloat(inputRef.current.value) || 0;
        const step = parseFloat(inputRef.current.step) || 1;
        inputRef.current.value = (currentValue - step).toString();
        inputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const InputComponent = multiline ? 'textarea' as const : 'input' as const;

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-foreground mb-1.5">
            {label}
          </label>
        )}
        <div className="relative group">
          <InputComponent
            ref={inputRef}
            rows={multiline ? rows : undefined}
            type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
            className={inputClasses}
            {...props}
          />
          
          {type === 'number' && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
              <button
                type="button"
                className="p-0.5 text-primary/50 hover:text-primary transition-colors duration-200 focus:outline-none"
                onClick={handleIncrement}
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-0.5 text-primary/50 hover:text-primary transition-colors duration-200 focus:outline-none"
                onClick={handleDecrement}
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}

          {type === 'password' && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 
                text-primary/50 hover:text-primary 
                transition-colors duration-200 
                focus:outline-none
                hover:bg-primary/5 rounded-md"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
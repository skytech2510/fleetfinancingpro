import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export function Select({ options, value, onChange, label, className = '' }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={selectRef}>
      {label && (
        <label className="block text-sm font-medium mb-2">{label}</label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full px-3 py-2 text-left
          bg-background/50 rounded-lg
          border border-primary/10
          focus:outline-none focus:ring-2 focus:ring-primary/20
          transition-all duration-200
          hover:border-primary/20
          flex items-center justify-between
          ${className}
        `}
      >
        <span className="block truncate">
          {selectedOption?.label || 'Select option...'}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="
          absolute z-50 w-full mt-2
          bg-background/95 backdrop-blur-xl
          border border-primary/10 rounded-lg
          shadow-lg
          py-1
          max-h-60 overflow-auto
          scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent
        ">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`
                w-full px-3 py-2 text-left
                hover:bg-primary/10 transition-colors duration-150
                ${option.value === value ? 'text-primary bg-primary/5' : ''}
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
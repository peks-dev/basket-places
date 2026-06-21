'use client';

import { CornerIcon } from '@/app/components/ui/svgs';

interface Option {
  value: string | number;
  label: string;
}

interface InputSelectorProps {
  label?: string;
  options: Option[];
  value?: string;
  onChange: (value: string | number) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function InputSelector({
  label,
  options,
  value,
  onChange,
  placeholder = 'Selecciona una opción',
  className = '',
  disabled = false,
}: InputSelectorProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {label && (
        <label className="text-foreground-accent text-sm font-bold uppercase">
          {label}
        </label>
      )}

      <div className="group focus-within:border-foreground relative h-[clamp(3.5rem,8vh,4.5rem)] w-full border-2 border-dashed border-(--color-border) p-[0.2rem] transition-all duration-200 ease-in-out">
        <select
          value={value ?? 'none'}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="text-foreground h-full w-full cursor-pointer appearance-none border-none bg-transparent px-4 pr-10 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="none" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="text-foreground-secondary pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-xs">
          ▾
        </span>
        <CornerIcon position="top-left" size="small" variant="interactive" />
        <CornerIcon position="top-right" size="small" variant="interactive" />
        <CornerIcon position="bottom-left" size="small" variant="interactive" />
        <CornerIcon
          position="bottom-right"
          size="small"
          variant="interactive"
        />
      </div>
    </div>
  );
}

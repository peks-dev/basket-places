'use client';
import React, { useState, useRef } from 'react';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export default function OtpInput({
  value,
  onChange,
  maxLength = 6,
}: OtpInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9]/g, '');
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  const handleBoxClick = () => {
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);

    // Scroll manual para mobile
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        });
      }
    }, 300); // Delay para esperar que el teclado se despliegue
  };

  const handleBlur = () => setIsFocused(false);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
    >
      <input
        ref={inputRef}
        type="tel" // Cambiado de "text" a "tel" para teclado numérico
        inputMode="numeric" // Fuerza teclado numérico en iOS
        pattern="[0-9]*" // Ayuda en Android
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        className="absolute h-full w-full cursor-text bg-transparent text-transparent opacity-0"
        style={{ caretColor: 'transparent' }}
        autoFocus
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div
        className="flex cursor-text items-center justify-center space-x-4"
        onClick={handleBoxClick}
      >
        {Array.from({ length: maxLength }).map((_, index) => {
          const hasValue = index < value.length;
          const isActive = index === value.length && isFocused;
          return (
            <div
              key={index}
              className={`flex h-14 w-12 items-center justify-center border-2 text-2xl font-bold transition-colors duration-200 ${
                hasValue
                  ? ''
                  : isActive
                    ? 'border-accent-primary border-solid'
                    : 'border-dashed border-gray-500'
              }`}
            >
              {value[index] || ''}
            </div>
          );
        })}
      </div>
    </div>
  );
}

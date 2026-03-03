import { useState, useRef, useEffect } from 'react';
import type { Priority } from '../types/api';
import { PriorityTag } from './PriorityTag';
import { BsCaretDownFill } from 'react-icons/bs';

const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: 'LOW', label: 'Baixa Prioridade' },
  { value: 'MEDIUM', label: 'Média Prioridade' },
  { value: 'HIGH', label: 'Alta Prioridade' },
  { value: 'VERY_HIGH', label: 'Altíssima Prioridade' },
];

interface PriorityDropdownItemProps {
  option: { value: Priority; label: string };
  isSelected: boolean;
  onClick: () => void;
}

export function PriorityDropdownItem({ option, isSelected, onClick }: PriorityDropdownItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-2 py-1 rounded hover:bg-options-button-hover hover:border-l-2 border-white duration-100 ease-out flex items-center outline-none ${isSelected ? 'border-l-2 border-white' : ''}`}
    >
      <PriorityTag priority={option.value} />
    </button>
  );
}

interface PriorityDropdownProps {
  value: Priority | '';
  onChange: (priority: Priority) => void;
  disabled?: boolean;
}

export function PriorityDropdown({ value, onChange, disabled = false }: PriorityDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleSelect = (priority: Priority) => {
    onChange(priority);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center px-2 py-1 gap-5 rounded border border-line ${value ? '' : 'bg-bg text-white text-sm'} ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:opacity-80'} transition duration-200`}
      >
        <PriorityTag priority={value} />
        <BsCaretDownFill className={`text-white ${isOpen ? 'rotate-180 transition duration-300 ' : ''}`}/>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-bg rounded-md shadow-lg py-1 z-20 min-w-[140px] animate-fadeIn">
          {PRIORITY_OPTIONS.map((option) => (
            <PriorityDropdownItem
              key={option.value}
              option={option}
              isSelected={value === option.value}
              onClick={() => handleSelect(option.value)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

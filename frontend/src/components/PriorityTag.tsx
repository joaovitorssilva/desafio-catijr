import type { Priority } from '../types/api';

const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: 'LOW', label: 'Baixa Prioridade' },
  { value: 'MEDIUM', label: 'Média Prioridade' },
  { value: 'HIGH', label: 'Alta Prioridade' },
  { value: 'VERY_HIGH', label: 'Altíssima Prioridade' },
];

const getPriorityStyles = (priority: string): string => {
  switch (priority) {
    case 'LOW':
      return 'bg-lowPrio text-lowPrioText';
    case 'MEDIUM':
      return 'bg-mediumPrio text-mediumPrioText';
    case 'HIGH':
      return 'bg-highPrio text-highPrioText';
    case 'VERY_HIGH':
      return 'bg-veryHighPrio text-veryHighPrioText';
    default:
      return 'bg-gray-500 text-white';
  }
};

const getPriorityLabel = (priority: Priority): string => {
  const option = PRIORITY_OPTIONS.find(opt => opt.value === priority);
  return option?.label || 'Prioridade';
};

interface PriorityTagProps {
  priority: Priority | '';
}

export function PriorityTag({ priority }: PriorityTagProps) {
  const displayLabel = priority ? getPriorityLabel(priority) : 'Prioridade';

  return (
    <span
      className={`px-4 py-1 rounded text-sm font-semibold inline-flex items-center outline-none ${getPriorityStyles(priority)
        }`}
    >
      {displayLabel}
    </span>
  );
}

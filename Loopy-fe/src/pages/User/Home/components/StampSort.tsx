import { useState } from 'react';
import Down from '../../../../assets/images/Down.svg?react';

interface StampSortProps {
  value: 'most' | 'due';
  onChange: (sortType: 'most' | 'due') => void;
}

const StampSort = ({ value, onChange }: StampSortProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const options: { label: string; value: 'most' | 'due' }[] = [
    { label: '적립 많은 순', value: 'most' },
    { label: '기한 짧은 순', value: 'due' },
  ];

  const handleSelect = (val: 'most' | 'due') => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className="relative text-left text-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between w-[6.875rem] h-[1.75rem] px-3 py-[6px] bg-[#F3F3F3] rounded-sm text-[0.875rem] items-center"
      >
        {options.find((opt) => opt.value === value)?.label || '정렬'}
        <Down />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-[6.875rem] bg-white border border-gray-200 rounded-md shadow-sm">
          {options.map((option) => (
            <li
              key={option.value}
              className={`px-4 py-2 hover:bg-gray-100 ${
                value === option.value ? 'font-semibold text-[#6970F3]' : ''
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StampSort;

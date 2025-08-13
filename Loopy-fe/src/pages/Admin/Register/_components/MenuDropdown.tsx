import { useEffect, useRef, useState } from 'react';
import ChevronIcon from '/src/assets/images/ArrowDown.svg?react';

export interface MenuOption {
  id: string;
  label: string;
}

interface MenuDropdownProps {
  options: MenuOption[];              // {id, label} 목록
  value?: string | null;              // 선택된 id
  onChange: (id: string) => void;     // id 콜백
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  lockScrollOnOpen?: boolean;
}

export default function MenuDropdown({
  options,
  value,
  onChange,
  placeholder = '무료 리워드로 적용할 메뉴를 선택해주세요',
  disabled,
  className = '',
  lockScrollOnOpen = true,
}: MenuDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  useEffect(() => {
    if (!lockScrollOnOpen) return;
    const body = document.body;
    const prev = body.style.overflow;
    if (open) body.style.overflow = 'hidden';
    return () => {
      body.style.overflow = prev;
    };
  }, [open, lockScrollOnOpen]);

  const selected = options.find(o => o.id === value)?.label ?? '';

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {/* 버튼 */}
      <button
        type="button"
        onClick={() => !disabled && setOpen(prev => !prev)}
        disabled={disabled}
        className={[
          'w-full h-[3rem] rounded-[0.5rem] bg-[#F3F3F3] border border-transparent',
          'px-[1.5rem] text-[1rem] leading-[100%] text-left',
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#CFCFCF]',
          'flex items-center justify-between',
        ].join(' ')}
        aria-expanded={open}
      >
        <span className={selected ? 'text-black' : 'text-[#A8A8A8]'}>
          {selected || placeholder}
        </span>
        <ChevronIcon className={`w-[0.875rem] h-[0.875rem] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* 리스트 */}
      {open && (
        <div
          className="absolute z-20 mt-[0.5rem] max-h-[16rem] w-full overflow-auto
                     rounded-[0.5rem] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                     border border-[#EFEFEF]"
          role="listbox"
        >
          {options.length ? (
            options.map(opt => (
              <button
                key={opt.id}
                type="button"
                className="w-full text-left px-[1rem] py-[0.875rem] text-[1rem] leading-[100%] hover:bg-[#F7F7F7]"
                onClick={() => { onChange(opt.id); setOpen(false); }}
                role="option"
                aria-selected={opt.id === value}
              >
                {opt.label}
              </button>
            ))
          ) : (
            <div className="px-[1rem] py-[0.875rem] text-[0.9375rem] text-[#7F7F7F]">
              등록된 메뉴가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

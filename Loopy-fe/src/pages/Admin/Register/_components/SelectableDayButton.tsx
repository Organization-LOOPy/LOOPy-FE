type DayState = 'active' | 'filled' | 'empty';

interface SelectableDayButtonProps {
  label: string;
  selected?: boolean;
  onClick: () => void;
  state?: DayState;
  disabled?: boolean;
}

export default function SelectableDayButton({
  label,
  onClick,
  state,
  selected,
  disabled = false,
}: SelectableDayButtonProps) {
  const resolved: DayState =
    state ?? (selected ? 'filled' : 'empty');

  const base =
    'rounded-[0.25rem] text-[0.875rem] leading-[100%] px-[0.75rem] py-[0.625rem] transition-colors';

  const borderFix = { borderWidth: '0.03125rem' as const }; 

  const styles: Record<DayState, string> = {
    active: 'bg-[#6970F3] text-white border border-[#6970F3]',
    filled: 'bg-[#F0F1FE] text-[#6970F3] border border-[#6970F3]',
    empty:  'bg-white text-[#252525] border border-[#A5A5A5]',
  };

  const disabledStyle =
    'bg-white text-[#000000] border border-[#A5A5A5]';

  return (
    <button
      type="button"
      onClick={onClick} 
      className={`${base} ${
        disabled ? disabledStyle : styles[resolved]
      }`}
      style={borderFix}
    >
      {label}
    </button>
  );
}

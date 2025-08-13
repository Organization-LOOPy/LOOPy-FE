import CheckCircle from '../../../User/Signin/_components/CheckCircle';

interface SelectableItemProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function SelectableItem({
  label,
  selected,
  onClick,
  disabled = false,
}: SelectableItemProps) {
  const textCls = disabled
    ? 'text-[#A8A8A8]'
    : selected
    ? 'text-[#6970F3]'
    : 'text-[#222]';

  const handleClick = () => {
    if (disabled) return;
    onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-disabled={disabled}
      aria-pressed={selected}
      className={`flex items-center gap-[0.5rem] ${disabled ? 'cursor-not-allowed' : ''}`}
    >
      <CheckCircle checked={selected} disabled={disabled} />
      <span className={`text-[1rem] font-medium leading-[100%] ${textCls}`}>
        {label}
      </span>
    </button>
  );
}

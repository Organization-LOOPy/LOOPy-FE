type DayState = 'active' | 'filled' | 'empty';

interface SelectableDayButtonProps {
    label: string;
    selected?: boolean;
    onClick: () => void;
    state?: DayState;
}

export default function SelectableDayButton({
    label,
    onClick,
    state,
    selected,
}: SelectableDayButtonProps) {
    const resolved: DayState =
    state ?? (selected ? 'filled' : 'empty');

    const base =
        'rounded-[0.25rem] text-[0.875rem] leading-[100%] px-[0.75rem] py-[0.625rem] transition-colors';
    const borderFix = { borderWidth: '0.03125rem' as const }; // 0.5px = 0.03125rem

    const styles: Record<DayState, string> = {
        active: 'bg-[#6970F3] text-white border border-[#6970F3]',
        filled: 'bg-[#F0F1FE] text-[#6970F3] border border-[#6970F3]',
        empty:  'bg-white text-[#252525] border border-[#A8A8A8]',
    };

    return (
        <button type="button" onClick={onClick} className={`${base} ${styles[resolved]}`} style={borderFix}>
            {label}
        </button>
    );
}

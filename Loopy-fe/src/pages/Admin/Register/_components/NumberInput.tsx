import { useMemo } from 'react';

type Mode = 'amount' | 'count';

interface NumerInputProps {
    mode: Mode;                       // 'amount' = 금액(콤마), 'count' = 숫자
    value: string;                    // 숫자만(콤마 없이) 보관: 예) "5000"
    onChange: (raw: string) => void;  // raw 숫자 문자열 전달
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    maxLength?: number;
    name?: string;
    id?: string;
}

const onlyDigits = (v: string) => v.replace(/\D/g, '');
const formatAmount = (v: string) => v.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default function NumberInput({
    mode,
    value,
    onChange,
    placeholder,
    disabled,
    className = '',
    maxLength,
    name,
    id,
}: NumerInputProps) {
    // 금액이면 콤마 포함, 숫자면 그대로
    const displayValue = useMemo(() => {
        const raw = onlyDigits(value);
        return mode === 'amount' ? formatAmount(raw) : raw;
    }, [mode, value]);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const raw = onlyDigits(e.target.value);
        onChange(maxLength ? raw.slice(0, maxLength) : raw);
    };

    return (
        <input
            id={id}
            name={name}
            type="text"                
            inputMode="numeric"        
            pattern="[0-9]*"
            value={displayValue}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            className={[
                'text-[1rem] font-normal leading-[100%] text-center',
                'text-black placeholder:text-[#A8A8A8] bg-[#F3F3F3]',
                'px-[1rem] py-[0.75rem] rounded-[0.5rem]',
                'outline-none focus:ring-0 focus:border-[#6970F3] border border-transparent',
                disabled ? 'opacity-50 cursor-not-allowed' : '',
                className,
            ].join(' ')}
        />
    );
}

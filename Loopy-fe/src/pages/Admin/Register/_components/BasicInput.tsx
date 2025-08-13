import type { InputHTMLAttributes } from 'react';

interface BasicInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BasicInput({
    placeholder,
    value,
    onChange,
    ...rest
}: BasicInputProps) {
    return (
        <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-[3rem] px-[1rem] py-[1.0625rem] text-[0.875rem] leading-[100%] bg-[#F3F3F3] text-[#3B3B3B] 
            placeholder:text-[#7F7F7F] rounded-[0.5rem] border border-transparent focus:border-[#6970F3] outline-none"
        {...rest}
        />
    );
}

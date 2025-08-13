interface AddButtonProps {
    text: string;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export default function AddButton({
    text,
    onClick,
    className = '',
    type = 'button',
    disabled = false,
}: AddButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                h-[3rem] px-[1rem] py-[1.0625rem]
                text-[0.875rem] font-semibold leading-[100%]
                rounded-[0.5rem] bg-[#6970F3] text-center
                disabled:opacity-50 disabled:pointer-events-none
                ${className}
            `}
        >
            {text}
        </button>
    );
}

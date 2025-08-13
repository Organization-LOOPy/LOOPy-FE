import AddIcon from '/src/assets/images/AddIconPurple.svg?react';

interface BigAddButtonProps {
    text: string;
    onClick?: () => void;
}

export default function BigAddButton({ text, onClick }: BigAddButtonProps) {
    return (
        <button
        onClick={onClick}
        className="
            w-full
            px-[12.375rem] py-[1.0625rem]
            flex justify-center items-center
            text-[1rem] font-semibold leading-[100%] text-[#6970F3]
            bg-[#F0F1FE] rounded-[0.5rem]
        "
        >
            <AddIcon className="w-[0.875rem] h-[0.875rem] mr-[0.25rem]" />
            {text}
        </button>
    );
}

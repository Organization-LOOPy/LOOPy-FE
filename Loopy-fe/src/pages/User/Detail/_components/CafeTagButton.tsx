interface CafeTagButtonProps {
    label: string;
}

export default function CafeTagButton({ label }: CafeTagButtonProps) {
    return (
        <div className="px-[1.25rem] py-[0.25rem] border-[0.5px] border-[#A8A8A8] rounded-full text-[0.875rem] font-medium text-[#333]">
            {label}
        </div>
    );
}

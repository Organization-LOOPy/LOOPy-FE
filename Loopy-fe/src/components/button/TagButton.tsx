interface TagButtonProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function TagButton({ label, selected, onClick }: TagButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-[1.25rem] py-[0.75rem] border-[0.03125rem] text-[0.875rem] font-medium rounded-full whitespace-nowrap leading-none ${
        selected
          ? "bg-[#F0F1FE] text-[#6970F3] border-[#6970F3]"
          : "bg-white border-[#A8A8A8] text-[#333]"
      }`}
    >
      {label}
    </button>
  );
}
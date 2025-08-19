interface SelectableButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const SelectableButton = ({ label, selected, onClick }: SelectableButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-[1.25rem] py-[0.75rem] border-[0.03125rem] rounded-[50px] whitespace-nowrap leading-none text-[0.875rem] font-medium outline-none
        ${selected ? "bg-[#F0F1FE] text-[#6970F3] border-[#6970F3]" : "text-[#3B3B3B] border-[#A8A8A8]"}`}
    >
      {label}
    </button>
  );
};

export default SelectableButton;

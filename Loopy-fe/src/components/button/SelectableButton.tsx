interface SelectableButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const SelectableButton = ({ label, selected, onClick }: SelectableButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-[1.25rem] py-[0.625rem] rounded-[50px] text-[0.875rem] font-medium outline-none
        ${selected ? "bg-[#F0F1FE] text-[#6970F3] border-[1px] border-[#6970F3]" : "text-[#3B3B3B] border-[0.5px] border-[#A8A8A8]"}`}
    >
      {label}
    </button>
  );
};

export default SelectableButton;

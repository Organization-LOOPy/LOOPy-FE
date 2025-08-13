import ArrowDownIcon from "/src/assets/images/ArrowDown.svg?react";

interface Props {
  label: string;
  onClick: () => void;
  variant?: "map" | "search";
  count?: number;
}

const FilterDropdownButton = ({ label, onClick, variant = "map", count = 0 }: Props) => {
  const isMap = variant === "map";
  const isActive = count > 0;

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center h-8 px-3 text-[0.875rem] rounded-full gap-[0.25rem] whitespace-nowrap
        ${isMap
          ? `${isActive ? 'border border-[#6970F3]' : 'shadow-[0_0_0.25rem_0_rgba(0,0,0,0.15)]'} bg-white`
          : `border ${isActive ? 'border-[#6970F3]' : 'border-[#CFCFCF]'} bg-white`
        }
        ${isActive ? 'text-[#6970F3]' : 'text-[#3B3B3B]'}
      `}
    >
      <span>{label}</span>

      {isActive && (
        <span className="w-[1.125rem] h-[1.125rem] rounded-full bg-[#6970F3] text-white text-[0.75rem] font-semibold leading-none flex items-center justify-center">
          {count}
        </span>
      )}

      <ArrowDownIcon
        className="w-[0.5rem] h-[0.5rem]" // 12px
      />
    </button>
  );
};

export default FilterDropdownButton;

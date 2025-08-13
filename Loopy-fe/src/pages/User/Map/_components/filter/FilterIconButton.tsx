import FilterIcon from "/src/assets/images/Filter.svg?react";

interface Props {
  onClick: () => void;
  variant?: "map" | "search";
}

const FilterIconButton = ({ onClick, variant = "map" }: Props) => {
  const isMap = variant === "map";

  return (
    <button
      onClick={onClick}
      className={`
        ${isMap ? "w-8 aspect-square rounded-full bg-white flex items-center justify-center shadow-[0_0_4px_0_rgba(0,0,0,0.15)]" : ""}
      `}
    >
      <FilterIcon className={`${isMap ? "w-4 h-4 object-contain" : "w-[1.15625rem] h-[1.15625rem] object-contain"}`} />
    </button>
  );
};

export default FilterIconButton;

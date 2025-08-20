import FilterIconButton from "./FilterIconButton";
import FilterDropdownButton from "./FilterDropdownButton";
import { useFilterStore } from "../../../../../store/filterStore";

interface FilterBarProps {
  onOpenFilterPopup: (group?: string) => void;
  variant?: "map" | "search";
}

const FilterBar = ({ onOpenFilterPopup, variant = "map" }: FilterBarProps) => {
  const { selectedByGroup } = useFilterStore();

  const counts = {
    '매장 이용': selectedByGroup['매장 이용']?.length ?? 0,
    '테이크아웃': selectedByGroup['테이크아웃']?.length ?? 0,
    '메뉴': selectedByGroup['메뉴']?.length ?? 0,
  };

  return (
    <div className="inline-flex items-center gap-[0.75rem] flex-nowrap">
      <FilterIconButton
        onClick={() => onOpenFilterPopup()}
        variant={variant}
        className="flex-shrink-0"
      />
      <div className="flex gap-[0.375rem] flex-nowrap">
        <FilterDropdownButton
          label="매장 이용"
          onClick={() => onOpenFilterPopup('매장 이용')}
          variant={variant}
          count={counts['매장 이용'] ?? 0}
          className="flex-shrink-0"
        />
        <FilterDropdownButton
          label="테이크아웃"
          onClick={() => onOpenFilterPopup('테이크아웃')}
          variant={variant}
          count={counts['테이크아웃'] ?? 0}
          className="flex-shrink-0"
        />
        <FilterDropdownButton
          label="메뉴"
          onClick={() => onOpenFilterPopup('메뉴')}
          variant={variant}
          count={counts['메뉴'] ?? 0}
          className="flex-shrink-0"
        />
      </div>
    </div>
  );
};

export default FilterBar;

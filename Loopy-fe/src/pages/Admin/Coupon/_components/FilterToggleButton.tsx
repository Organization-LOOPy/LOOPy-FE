import ToggleIcon from '../../../../assets/images/Toggle.svg?react';

interface Props {
  onClick: () => void;
}

const FilterToggleButton = ({ onClick }: Props) => (
  <button
    onClick={onClick}
    className="flex items-center text-[#252525] text-[0.875rem] border border-[0.5px] border-[#A8A8A8] rounded-[30px] px-3 py-[0.438rem] gap-2"
  >
    유형
    <ToggleIcon className="text-black" />
  </button>
);

export default FilterToggleButton;

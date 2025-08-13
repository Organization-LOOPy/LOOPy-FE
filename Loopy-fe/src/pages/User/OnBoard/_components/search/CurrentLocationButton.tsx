import DestinationIcon from "../../../../../assets/images/Destination.svg?react";

const CurrentLocationButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex font-medium text-[0.875rem] items-center justify-center gap-2 bg-[#6970F3] text-white w-full py-[14px] rounded-[8px] mb-4"
  >
    <DestinationIcon className="w-5 h-5 stroke-white" />
    현재 위치로 설정하기
  </button>
);

export default CurrentLocationButton;

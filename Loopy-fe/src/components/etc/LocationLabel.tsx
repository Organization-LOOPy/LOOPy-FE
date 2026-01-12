import { useNavigate, useLocation } from "react-router-dom";
import PinIcon from "/src/assets/images/PinIcon.svg?react";

interface LocationLabelProps {
  dongName: string; 
  isPlaceholder?: boolean;
  onClear?: () => void;
}

const LocationLabel = ({ dongName, isPlaceholder = false, onClear, }: LocationLabelProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = () => {
    if (pathname.includes("/map")) {
      navigate("/map/location");
    } else {
      navigate("/search/location");
    }
  };

  return (
    <div
      className="inline-flex items-center text-[0.875rem]"
      aria-label="위치 설정"
    >
      {/* 위치 설정 클릭 영역 */}
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center"
      >
        <PinIcon className="w-[1rem] h-[1rem] mr-[0.25rem]" />
        <span className={isPlaceholder ? "text-[#7F7F7F]" : "text-[#3B3B3B]"}>
          {dongName}
        </span>
      </button>

      {onClear && !isPlaceholder && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); 
            onClear();
          }}
          className="ml-[0.375rem] text-[#7F7F7F] hover:text-[#3B3B3B]"
          aria-label="위치 초기화"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default LocationLabel;

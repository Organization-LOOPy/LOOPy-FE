import { useNavigate, useLocation } from "react-router-dom";
import PinIcon from "/src/assets/images/PinIcon.svg?react";

interface LocationLabelProps {
  dongName: string; 
  isPlaceholder?: boolean;
}

const LocationLabel = ({ dongName, isPlaceholder = false }: LocationLabelProps) => {
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
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center text-[0.875rem]"   // rem 유지
      aria-label="위치 설정"
    >
      <PinIcon className="w-[1rem] h-[1rem] mr-[0.25rem]" />
      <span className={isPlaceholder ? 'text-[#7F7F7F]' : 'text-[#3B3B3B]'}>{dongName}</span>
    </button>
  );
};

export default LocationLabel;

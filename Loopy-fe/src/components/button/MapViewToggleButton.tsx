import { useNavigate } from "react-router-dom";
import ListViewIcon from "/src/assets/images/ListView.svg?react";
import MapViewIcon from "/src/assets/images/MapView.svg?react";

interface Props {
  isMapView: boolean;
  onClick: () => void;
}

const MapViewToggleButton = ({ isMapView }: Props) => {
  const Icon = isMapView ? ListViewIcon : MapViewIcon;

  const navigate = useNavigate();

  const handleClick = () => {
    if (isMapView) {
      navigate("/search"); // 리스트 페이지
    } else {
      navigate("/map"); // 지도 페이지
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-[4rem] h-[4rem] rounded-full bg-[#6970F3] shadow-[0_0_10px_rgba(0,0,0,0.2)] flex items-center justify-center z-10"
    >
      <Icon className="w-[1.45rem] h-[1.45rem]" />
    </button>
  );
};

export default MapViewToggleButton;

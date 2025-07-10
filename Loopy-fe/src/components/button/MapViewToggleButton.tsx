import { useNavigate } from "react-router-dom";

interface Props {
  isMapView: boolean;
  onClick: () => void;
}

const MapViewToggleButton = ({ isMapView }: Props) => {
  const iconSrc = isMapView
    ? "src/assets/images/ListView.svg"
    : "src/assets/images/MapView.svg";

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
      style={{
        width: "4rem", 
        height: "4rem",
        backgroundColor: "transparent",
        padding: 0,
        border: "none",
        zIndex: 10,
      }}
    >
      <img
        src={iconSrc}
        alt="전환 버튼"
        style={{
          width: "4rem",
          height: "4rem",
          objectFit: "contain",
        }}
      />
    </button>
  );
};

export default MapViewToggleButton;

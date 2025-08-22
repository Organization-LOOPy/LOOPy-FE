import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReviewButtonIcon from "/src/assets/images/ReviewButton.svg?react";
import ReviewRestrictionModal from "./ReviewRestrictionModal";

interface Props {
  className?: string;
  hasStamp: boolean;
  cafeId: string;
  cafeName: string; 
}

export default function ReviewButton({ className = '', hasStamp, cafeId, cafeName }: Props) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (hasStamp) {
      navigate(`/detail/${cafeId}/write-review`, {state: { cafeName },});
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`w-[4rem] h-[4rem] rounded-full bg-[#6970F3] shadow-[0_0_10px_rgba(0,0,0,0.2)] flex items-center justify-center ${className}`}
      >
        <ReviewButtonIcon
          className="w-[1.45rem] h-[1.45rem]"
        />
      </button>

      {isModalOpen && (
        <ReviewRestrictionModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

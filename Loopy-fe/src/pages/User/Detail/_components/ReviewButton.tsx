import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReviewButtonIcon from "/src/assets/images/ReviewButton.svg?react";
import ReviewRestrictionModal from "./ReviewRestrictionModal";

interface Props {
  className?: string;
  hasStamp: boolean;
  cafeId: string;
}

export default function ReviewButton({ className = '', hasStamp, cafeId }: Props) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (hasStamp) {
      navigate(`/detail/${cafeId}/write-review`);
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
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[200]"
            onClick={() => setIsModalOpen(false)} // 배경 클릭 시 닫기
          />

          {/* 모달 박스 */}
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full z-50">
            <ReviewRestrictionModal onClose={() => setIsModalOpen(false)} />
          </div>
        </>
      )}
    </>
  );
};

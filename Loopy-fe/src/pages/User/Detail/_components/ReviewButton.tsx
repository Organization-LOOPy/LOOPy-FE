import { useNavigate } from "react-router-dom";
import ReviewButtonIcon from "/src/assets/images/ReviewButton.svg?react";

interface Props {
  className?: string;
}

export default function ReviewButton({ className = "" }: Props) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/detail/write-review")}
      className={`w-[4rem] h-[4rem] rounded-full bg-[#6970F3] shadow-[0_0_10px_rgba(0,0,0,0.2)] flex items-center justify-center ${className}`}
    >
      <ReviewButtonIcon
        className="w-[1.45rem] h-[1.45rem]"
      />
    </button>
  );
};

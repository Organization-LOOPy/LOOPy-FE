import NextIcon from "../../../../assets/images/Next.svg?react";
import BellIcon from "../../../../assets/images/BellPlus.svg?react";
import type { MyPageSteps } from "../../../../types/mySteps";

interface Props {
  onNavigate: (step: keyof MyPageSteps) => void; 
}

const CafeNotification = ({ onNavigate }: Props) => {
  return (
    <button
      onClick={() => onNavigate("cafeNotice")} 
      className="w-full flex items-center text-left"
    >
      <div className="flex items-center gap-[1rem]">
        <BellIcon className="w-[1.5rem] h-[1.5rem]" />
        <div className="flex flex-col justify-center">
          <p className="text-[1rem] font-semibold">
            내 단골카페 알림 보기
          </p>
          <p className="text-[0.875rem] font-normal text-[#7F7F7F]">
            사장님이 보낸 편지를 확인해보세요
          </p>
        </div>
      </div>

      <NextIcon className="w-[1rem] h-[1rem] text-[#A8A8A8] ml-auto" />
    </button>
  );
};

export default CafeNotification;

import CommonHeader from "../../../../components/header/CommonHeader";
import NextIcon from "../../../../assets/images/Next.svg?react";
import type { MyPageSteps } from "../../../../types/mySteps";

interface SettingPageProps {
  currentStep: keyof MyPageSteps; 
  onBack: () => void;
  onNavigate: (
    step: keyof MyPageSteps,
    context: (prev: any) => any
  ) => void;
}

const SettingPage = ({ onBack, onNavigate }: SettingPageProps) => {
  return (
    <div>
      <CommonHeader title="설정" onBack={onBack} />

      <div className="flex flex-col mt-[1.5rem]">
        <button
          onClick={() => onNavigate("editProfile", () => ({}))}
          className="flex w-full items-center justify-between py-[0.625rem] text-[1.125rem] font-medium"
        >
          <span>개인정보 수정</span>
          <NextIcon className="w-[1rem] h-[1rem] text-[#A8A8A8]" />
        </button>

        <button
          onClick={() => onNavigate("manageAccount", () => ({}))}
          className="flex w-full items-center justify-between py-[0.625rem] text-[1.125rem] font-medium"
        >
          <span>계정 관리</span>
          <NextIcon className="w-[1rem] h-[1rem] text-[#A8A8A8]" />
        </button>
      </div>
    </div>
  );
};

export default SettingPage;

import AgreementItem from "./AgreementItem";
import CheckCircle from "./CheckCircle";
import type { AgreementKey, AgreementState } from "../../../../types/agreement";
import CommonButton from "../../../../components/button/CommonButton";

interface AgreementListViewProps {
  agreements: AgreementState;
  onToggle: (key: AgreementKey) => void;
  onToggleAll: () => void;
  onShowDetail: (key: AgreementKey) => void;
  isAllRequiredChecked: boolean;
  onNext: () => void;
}

const AgreementListView = ({
  agreements,
  onToggle,
  onToggleAll,
  onShowDetail,
  isAllRequiredChecked,
  onNext,
}: AgreementListViewProps) => {
  return (
    <>
      <div className="pb-[7rem]">
        <h1 className="text-[1.5rem] text-[#323232] font-bold mt-[2.5rem] mb-[2.75rem]">
          서비스 이용을 위해
          <br />
          약관에 동의해주세요.
        </h1>

        <div
          onClick={onToggleAll}
          role="button"
          tabIndex={0}
          className="flex items-center justify-between w-full mb-[3rem] cursor-pointer"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onToggleAll();
          }}
        >
          <div className="flex items-center gap-2">
            <CheckCircle checked={Object.values(agreements).every(Boolean)} />
            <span className="text-[1rem] font-medium text-[#252525]">전체 동의하기</span>
          </div>
        </div>

        <AgreementItem
          label="[필수] 서비스 이용약관"
          checked={agreements.terms}
          onClick={() => onToggle("terms")}
          onArrowClick={() => onShowDetail("terms")}
        />
        <AgreementItem
          label="[필수] 개인정보 수집 및 이용 동의"
          checked={agreements.privacy}
          onClick={() => onToggle("privacy")}
          onArrowClick={() => onShowDetail("privacy")}
        />
        <AgreementItem
          label="[필수] 위치기반 서비스 이용약관 동의"
          checked={agreements.location}
          onClick={() => onToggle("location")}
          onArrowClick={() => onShowDetail("location")}
        />
        <AgreementItem
          label="[선택] 마케팅 정보 활용 동의"
          checked={agreements.marketing}
          onClick={() => onToggle("marketing")}
          onArrowClick={() => onShowDetail("marketing")}
        />
      </div>

      <div className="absolute bottom-0 left-0 w-full py-[3rem] bg-white">
        <CommonButton
          text="다음으로 넘어가기"
          onClick={onNext}
          disabled={!isAllRequiredChecked}
        />
      </div>
    </>
  );
};

export default AgreementListView;
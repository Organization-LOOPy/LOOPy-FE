import { useEffect, useState } from "react";
import AgreementItemPlain from "../_components/AgreementItemPlain";
import CommonButton from "../../../../components/button/CommonButton";
import { useCreateOwnerCafe } from "../../../../hooks/mutation/admin/document/useAdminCafe";
import { fetchAdminCafe } from "../../../../apis/admin/cafeStatus/api";

interface Step1DocumentGuideProps {
  setValid: (valid: boolean) => void;
  onNext: () => void;
  onCafeCreated: (cafeId: number) => void;
}

export default function Step1DocumentGuide({
  setValid,
  onNext,
  onCafeCreated,
}: Step1DocumentGuideProps) {
  const [agreed, setAgreed] = useState(false);
  const { mutate: createCafe } = useCreateOwnerCafe();

  useEffect(() => {
    setValid(agreed);
  }, [agreed, setValid]);

  const handleSubmit = async () => {
    try {
      const info = await fetchAdminCafe();
      const existingCafeId = info.data?.cafeId;

      if (existingCafeId) {
        onCafeCreated(existingCafeId);
        onNext();
        return;
      }

      createCafe(undefined, {
        onSuccess: (res) => {
          if (res.resultType === "SUCCESS" && res.success?.cafeId) {
            onCafeCreated(res.success.cafeId);
            onNext();
            return;
          }

          console.error("카페 생성 응답에 cafeId가 없습니다.", res);
        },
        onError: (err: any) => {
          console.error("카페 생성 실패", err);
        },
      });
    } catch (e) {
      console.error("카페 정보 조회 실패", e);
    }
  };

  return (
    <div className="w-full flex-1 bg-white font-suit px-[1.5rem]">
      <div className="w-full max-w-[544px] mx-auto flex flex-col h-full min-h-[calc(100vh-9.5rem-6.5rem)] pt-[2rem]">
        <h1 className="text-[1.25rem] font-bold text-[#252525] mb-[1.5rem]">
          필요 서류 안내
        </h1>

        <div className="w-full h-[6rem] p-[1.5rem] bg-[#F4F5FF] text-[1rem] font-medium text-[#3B3B3B] rounded-[0.5rem] mb-[2rem]">
          등록된 제휴 업체는 실제 영업을 하고 있는 사업자여야 하며,
          루피는 필요 시 관련 서류를 요청할 수 있습니다.
        </div>

        <div className="flex-1" />

        <AgreementItemPlain
          label="서류 안내 사항을 확인하였으며, 이에 동의합니다."
          checked={agreed}
          onClick={() => setAgreed((prev) => !prev)}
        />
      </div>

      <div className="absolute left-1/2 translate-x-[-50%] w-full max-w-[34rem] flex flex-col items-center transition-all duration-300">
        <CommonButton
          text="다음으로 넘어가기"
          onClick={handleSubmit}
          disabled={!agreed}
          className={`w-full max-w-[34rem] ${
            agreed
              ? "bg-[#6970F3] text-white"
              : "bg-[#CCCCCC] text-[#7F7F7F] pointer-events-none"
          }`}
        />
      </div>
    </div>
  );
}

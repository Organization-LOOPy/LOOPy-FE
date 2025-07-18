import { useState } from "react";
import SampleQR from "../../../../assets/images/qr-sample.svg?react"; 
import CommonBottomPopup from "../../../../components/popup/CommonBottomPopup";

const ProfileSection = () => {
  const [showQRPopup, setShowQRPopup] = useState(false);

  return (
    <>
      <div className="flex flex-col items-start text-[#252525]">
        <div className="flex flex-row gap-[1rem] w-full items-start">
          <div className="w-[4.5rem] h-[4.5rem] bg-red-500 rounded-full" />

          <div className="flex flex-1 flex-row justify-between items-start">
            <div className="flex flex-col gap-[0.5rem]">
              <p className="text-[1.125rem] font-bold">루피25</p>
              <span className="text-[0.875rem] font-normal text-center border border-[#DFDFDF] px-[1rem] py-[0.25rem] rounded-[4px] w-fit">
                호기심 많은 탐색가
              </span>
            </div>

            <div
              className="flex flex-col items-center gap-[0.25rem] ml-[0.5rem] cursor-pointer"
              onClick={() => setShowQRPopup(true)}
            >
              <SampleQR className="w-[2.5rem] h-[2.5rem]" />
              <p className="text-[0.688rem] font-semibold text-[#000000] text-center">멤버십 QR</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-[1.5rem] flex flex-row text-sm text-[#252525] text-center">
        <div className="flex-1 flex items-center justify-center flex-row py-[1rem] border-t border-b border-r border-[#DFDFDF] gap-[1rem]">
          <p className="text-[0.875rem] font-semibold">총 스탬프</p>
          <p className="text-[#6970F3] font-bold text-[1.125rem]">60개</p>
        </div>
        <div className="flex-1 flex items-center justify-center flex-row py-[1rem] border-t border-b border-l border-[#DFDFDF] gap-[1rem]">
          <p className="text-[0.875rem] font-semibold">포인트</p>
          <p className="text-[#6970F3] font-bold text-[1.125rem]">326p</p>
        </div>
      </div>

      <CommonBottomPopup
        show={showQRPopup}
        onClose={() => setShowQRPopup(false)}
        titleText="통합 멤버십 QR"
        contentsText={`통합 멤버십 QR 코드를 통해 쿠폰 사용 · 포인트 사용 · 챌린지 인증이 가능합니다.직원에게 QR을 보여주세요.`}
      >
        <div className="flex justify-center my-[1.5rem]">
          <SampleQR className="w-[8rem] h-[8rem]" />
        </div>
      </CommonBottomPopup>
    </>
  );
};

export default ProfileSection;

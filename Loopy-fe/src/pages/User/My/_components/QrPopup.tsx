import CommonBottomPopup from "../../../../components/popup/CommonBottomPopup"
import type { HandlerKey } from "./ProfileSection";

interface QrPopupProps {
  show: boolean;
  onClose: () => void;
  qrImage?: string;
  onScan: (type: HandlerKey, data: any) => void;
}

const QrPopup = ({ show, onClose, qrImage }: QrPopupProps) => {
  return (
    <CommonBottomPopup
      show={show}
      onClose={onClose}
      titleText="통합 멤버십 QR"
      contentsText="통합 멤버쉽 QR 코드를 통해 쿠폰 사용 · 포인트 사용 · 챌린지 인증이 가능합니다. 직원에게 QR를 보여주세요."
    >
      <div className="flex flex-col items-center my-[1.5rem] gap-3">
        {qrImage ? (
          <img src={qrImage} alt="QR Code" className="w-[12.5rem] h-[12.5rem]" />
        ) : (
          <div className="w-[12rem] h-[12rem] bg-gray-200 rounded-md" />
        )}
      </div>
    </CommonBottomPopup>
  );
};

export default QrPopup;

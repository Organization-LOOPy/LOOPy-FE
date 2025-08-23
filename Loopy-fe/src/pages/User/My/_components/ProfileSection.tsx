import { useState } from "react";
import CommonBottomPopup from "../../../../components/popup/CommonBottomPopup";
import QrPopup from "./QrPopup";
import { useChallengeHandlers } from "../handlers/useChallengeHandlers";
import { ProfileHeader } from "./ProfileHeader";
import { StatItem } from "./ProfileStats";
import { useHomeProfile } from "../../../../hooks/query/homeProfile/useHomeProfile";
import { useUserQRCode } from "../../../../hooks/query/userInfo/qr/useUserQRCode";
import { useCurrentPointQuery } from "../../../../hooks/query/my/useMyPoint";
import { useMyInfo } from "../../../../hooks/query/userInfo/useMyInfo";

type Handlers = ReturnType<typeof useChallengeHandlers>;
export type HandlerKey = keyof Handlers; 

export default function ProfileSection() {
  const [showQRPopup, setShowQRPopup] = useState(false);
  const [popupState, setPopupState] = useState({ show: false });

  const { data: home } = useHomeProfile();
  const { data: myInfo } = useMyInfo();
  const { data: qrData } = useUserQRCode();
  const { data: pointData } = useCurrentPointQuery();

  const handlers = useChallengeHandlers(setPopupState);

  const onQrScan = (type: HandlerKey, data: any) => {
    handlers[type]?.(data);
  };

  return (
    <>
      <div className="flex flex-col items-center text-[#252525]">
        <ProfileHeader
          nickname={myInfo?.nickname || "루피25"}  
          levelLabel={home?.loopyLevel.label || "호기심 많은 탐색가"}
          level={home?.loopyLevel.level || 1}
          qrCodeImg={qrData?.success?.qrCodeImage}
          onQrClick={() => setShowQRPopup(true)}
        />
      </div>

      <div className="w-full mt-[1.5rem] flex text-sm text-center">
        <StatItem label="총 스탬프" value={`${home?.totalStampCount || 0}개`} />
        <StatItem
          label="포인트"
          value={`${pointData?.success?.currentPoint || 0}p`}
          border
        />
      </div>

      <QrPopup
        show={showQRPopup}
        onClose={() => setShowQRPopup(false)}
        qrImage={qrData?.success?.qrCodeImage}
        onScan={onQrScan}
      />

      <CommonBottomPopup
        {...popupState}
        onClose={() => setPopupState((prev) => ({ ...prev, show: false }))}
      />
    </>
  );
}

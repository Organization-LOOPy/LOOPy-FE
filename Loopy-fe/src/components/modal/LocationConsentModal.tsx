import MapPin from "../../assets/images/MapPin.svg?react";

interface LocationConsentModalProps {
  onConfirm: (option: "whileUsing" | "once" | "deny") => void;
}

const LocationConsentModal = ({ onConfirm }: LocationConsentModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-[20px] p-[2.5rem] w-[100%] max-w-sm text-center shadow-xl">
        <div className="flex justify-center items-center mb-[1.875rem]"><MapPin /></div>
        <h3 className="text-[1.375rem] font-semibold mb-[2.5rem] text-[#252525]">
          루피에서 내 기기 위치에 액세스하도록 허용하시겠습니까?
        </h3>

        <div className="mt-[1.25rem] space-y-3">
          <button
            onClick={() => onConfirm("whileUsing")}
            className="w-full py-[0.125rem] rounded-md text-[#323232] font-medium"
          >
            앱 사용 중에만 허용
          </button>
          <button
            onClick={() => onConfirm("once")}
            className="w-full py-[0.125rem] text-[#323232] font-medium"
          >
            이번만 허용
          </button>
          <button
            onClick={() => onConfirm("deny")}
            className="w-full py-[0.125rem] text-[#323232]"
          >
            거부
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationConsentModal;

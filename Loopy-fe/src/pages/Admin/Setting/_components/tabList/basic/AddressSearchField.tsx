import { useState } from "react";
import CommonInput from "../../../../../../components/input/CommonInput";
import ModalLocationSelector from "../../../../Register/_components/ModalLocationSelector";
import ModalRoadAddressSelector from "./ModalRoadAddressSelector";
import type { RoadAddressPick } from "../../../../../../hooks/useAddressSearch";

interface PickedAddress {
  region1DepthName?: string;
  region2DepthName?: string;
  region3DepthName?: string;
  roadAddress?: string;
  jibunAddress?: string;
  latitude?: number;
  longitude?: number;
}

interface Props {
  address: string;
  setAddress: (v: string) => void;
  regionLabel?: string;
  onPick?: (picked: PickedAddress) => void;
}

const AddressSearchField = ({
  address,
  setAddress,
  regionLabel,
  onPick,
}: Props) => {
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [isRoadModalOpen, setIsRoadModalOpen] = useState(false);

  const updatePicked = (patch: Partial<PickedAddress>) => {
    onPick?.({
      ...(typeof onPick === "function" ? {} : {}), 
      ...patch,
    });
  };

  return (
    <div className="flex flex-col">
      <div className="font-semibold text-[1rem] mb-2">주소</div>

      <div className="flex gap-2 justify-center items-center">
        <div className="flex-[77_0_0%]">
          <CommonInput
            placeholder="주소를 검색해주세요"
            value={regionLabel ?? ""}
            readOnly
            onClick={() => setIsRegionModalOpen(true)}
          />
        </div>
        <button
          type="button"
          className="flex-[23_0_0%] h-[3.375rem] bg-[#6970F3] text-white rounded-[8px] text-[0.875rem] font-semibold"
          onClick={() => setIsRegionModalOpen(true)}
        >
          주소 검색하기
        </button>
      </div>

      <CommonInput
        placeholder="도로명 주소를 입력해주세요 (OO로 OO길 OO)"
        value={address}
        readOnly
        onClick={() => setIsRoadModalOpen(true)}
      />

      {isRegionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
          <ModalLocationSelector
            onClose={() => setIsRegionModalOpen(false)}
            onSave={(selected) => {
              updatePicked({
                region1DepthName: selected.region1DepthName,
                region2DepthName: selected.region2DepthName,
                region3DepthName: selected.region3DepthName,
              });
              setIsRegionModalOpen(false);
            }}
          />
        </div>
      )}

      {isRoadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
          <ModalRoadAddressSelector
            onClose={() => setIsRoadModalOpen(false)}
            onSave={(selected: RoadAddressPick) => {
              setAddress(selected.roadAddress);
              updatePicked({
                roadAddress: selected.roadAddress,
                jibunAddress: selected.jibunAddress,
                latitude: Number(selected.y),
                longitude: Number(selected.x),
              });
              setIsRoadModalOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AddressSearchField;

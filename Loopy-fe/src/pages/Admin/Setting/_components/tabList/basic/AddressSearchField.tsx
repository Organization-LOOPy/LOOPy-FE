import { useState } from "react";
import CommonInput from "../../../../../../components/input/CommonInput";
import ModalLocationSelector from "../../../../Register/_components/ModalLocationSelector";

interface PickedAddress {
  address: string; 
  region1DepthName: string;   
  region2DepthName: string;  
  region3DepthName: string;   
  latitude: number;
  longitude: number;
}

interface Props {
  address: string;
  setAddress: (v: string) => void;
  detailAddress: string;
  setDetailAddress: (v: string) => void;

  onPick?: (picked: PickedAddress) => void;
}

const AddressSearchField = ({
  address,
  setAddress,
  detailAddress,
  setDetailAddress,
  onPick,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  return (
    <div className="flex flex-col">
      <div className="font-semibold text-[1rem] mb-2">주소</div>

      <div className="flex gap-2 justify-center items-center">
        <div className="flex-[77_0_0%]">
          <CommonInput
            placeholder="주소를 검색해주세요"
            value={address}
            readOnly
            onChange={openModal}
          />
        </div>
        <button
          type="button"
          className="flex-[23_0_0%] h-[3.375rem] bg-[#6970F3] text-white rounded-[8px] text-[0.875rem] font-semibold"
          onClick={openModal}
        >
          주소 검색하기
        </button>
      </div>

      <CommonInput
        placeholder="상세 주소를 입력해주세요 (예시: 3층 카페 루피)"
        value={detailAddress}
        onChange={(e) => setDetailAddress(e.target.value)}
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
          <ModalLocationSelector
            onClose={() => setIsModalOpen(false)}
            onSave={(selected) => {
              const picked: PickedAddress = {
                address: selected.address, 
                region1DepthName: selected.region1DepthName,
                region2DepthName: selected.region2DepthName,
                region3DepthName: selected.region3DepthName,
                latitude: selected.latitude,
                longitude: selected.longitude,
              };

              setAddress(picked.address);
              onPick?.(picked);     
              setIsModalOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AddressSearchField;

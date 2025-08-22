import { useRoadAddressSearch, type RoadAddressPick } from "../../../../../../hooks/useAddressSearch";
import AddButton from "../../../../Register/_components/AddButton";
import SearchIcon from "/src/assets/images/Search.svg?react";
import CloseIcon from "/src/assets/images/Close.svg?react";

interface ModalRoadAddressSelectorProps {
  onClose: () => void;
  onSave: (picked: RoadAddressPick) => void;
}

export default function ModalRoadAddressSelector({ onClose, onSave }: ModalRoadAddressSelectorProps) {
  const {
    input,
    setInput,
    results,
    selected,
    setSelected,
    search,
    isLoading,
  } = useRoadAddressSearch();

  const handleConfirm = () => {
    if (!selected) return;
    onSave(selected);
    onClose();
  };

  return (
    <div className="w-[37rem] h-[35.75rem] bg-white rounded-[1rem] pt-[2rem] px-[2rem] flex flex-col">
      <div className="w-full flex justify-between items-center mb-[1.25rem]">
        <h2 className="text-[1.25rem] font-bold text-black">도로명 주소 검색</h2>
        <button onClick={onClose} className="text-[#7F7F7F] text-[1rem]">
          <CloseIcon />
        </button>
      </div>

      <div className="w-full h-[3rem] px-[1rem] py-[0.75rem] bg-[#F5F5F5] rounded-[0.5rem] flex items-center mb-[0.5rem]">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="도로명 주소 입력"
          className="flex-1 text-[1rem] bg-transparent border-none outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") search();
          }}
        />
        <SearchIcon
          className="w-4 h-4 ml-2 cursor-pointer"
          onClick={search}
        />
      </div>

      <div className="flex-1 w-full overflow-y-auto custom-scrollbar">
        {isLoading ? (
          <p className="text-center text-gray-500 mt-4">검색 중...</p>
        ) : results.length > 0 ? (
          results.map((r, i) => {
            const isSelected = selected?.roadAddress === r.roadAddress;
            return (
              <div
                key={i}
                className={`px-[1rem] py-[1.25rem] rounded-[8px] text-[1rem] font-medium cursor-pointer mb-2 transition
                  ${isSelected ? "bg-[#F0F1FE]" : "bg-white"}`}
                onClick={() => setSelected(r)}
              >
                <p className="text-black">{r.roadAddress}</p>
                {r.jibunAddress && (
                  <p className="text-sm text-gray-500 mt-1">{r.jibunAddress}</p>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-400 mt-4">검색 결과가 없습니다.</p>
        )}
      </div>

      <div className="w-full mt-[1.5rem] pb-[2rem]">
        <AddButton
          text="확정하기"
          onClick={handleConfirm}
          disabled={!selected}
          className={`w-full text-[1rem] flex items-center justify-center ${
            selected
              ? "bg-[#6970F3] text-white"
              : "bg-[#CCCCCC] text-[#7F7F7F] pointer-events-none"
          }`}
        />
      </div>
    </div>
  );
}

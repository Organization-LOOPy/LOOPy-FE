import { useSearchRegion } from '../../../../hooks/useSearchRegion';
import AddButton from './AddButton';
import SearchIcon from '/src/assets/images/Search.svg?react';
import LocationIcon from '/src/assets/images/Location.svg?react';
import SearchResultSkeleton from '../../../User/OnBoard/Skeleton/SearchResultSkeleton';
import SearchResultList from '../../../User/OnBoard/_components/search/SearchResultList';
import CloseIcon from '/src/assets/images/Close.svg?react';

interface ModalLocationSelectorProps {
  onClose: () => void;
  onSave: (selectedRegion: {
    address: string;          
    region1DepthName: string;  
    region2DepthName: string; 
    region3DepthName: string; 
    latitude: number;    
    longitude: number;
  }) => void;
}

export default function ModalLocationSelector({
  onClose,
  onSave,
}: ModalLocationSelectorProps) {
  const {
    input,
    setInput,
    selected,
    setSelected,
    handleSearch,
    handleCurrentLocation,
    filteredResults,
    isLoading,
  } = useSearchRegion();

  const handleConfirm = () => {
    if (!selected) return;

    const longitude = Number(selected.x);
    const latitude  = Number(selected.y);

    onSave({
      address: `${selected.region_1depth_name} ${selected.region_2depth_name} ${selected.region_3depth_name}`,
      region1DepthName: selected.region_1depth_name,
      region2DepthName: selected.region_2depth_name,
      region3DepthName: selected.region_3depth_name,
      latitude,
      longitude,
    });
    onClose();
  };

  return (
    <div className="w-[37rem] h-[35.75rem] bg-white rounded-[1rem] pt-[2rem] px-[2rem] flex flex-col">
      <div className="w-full flex justify-between items-center mb-[1.25rem]">
        <h2 className="text-[1.25rem] font-bold text-black">위치 설정</h2>
        <button onClick={onClose} className="text-[#7F7F7F] text-[1rem]">
          <CloseIcon />
        </button>
      </div>

      <div className="w-full h-[3rem] px-[1rem] py-[0.75rem] bg-[#F5F5F5] rounded-[0.5rem] flex items-center mb-[0.5rem]">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="동까지 입력"
          className="flex-1 text-[1rem] bg-transparent border-none outline-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        <SearchIcon className="w-4 h-4 ml-2 cursor-pointer" onClick={handleSearch} />
      </div>

      <button
        onClick={handleCurrentLocation}
        className="w-full h-[3rem] rounded-[0.5rem] bg-[#6970F3] text-white text-[0.875rem] font-medium flex justify-center items-center gap-[0.25rem] mb-[1rem]"
      >
        <LocationIcon className="w-4 h-4" />
        현재 위치로 설정하기
      </button>

      <div className="flex-1 w-full overflow-y-auto custom-scrollbar">
        {isLoading ? (
          <SearchResultSkeleton />
        ) : (
          <SearchResultList
            results={filteredResults}
            selected={selected}
            onSelect={setSelected}
          />
        )}
      </div>

      <div className="w-full mt-[1.5rem] pb-[2rem]">
        <AddButton
          text="확정하기"
          onClick={handleConfirm}
          disabled={!selected}
          className={`w-full text-[1rem] flex items-center justify-center ${
            selected ? 'bg-[#6970F3] text-white' : 'bg-[#CCCCCC] text-[#7F7F7F] pointer-events-none'
          }`}
        />
      </div>
    </div>
  );
}

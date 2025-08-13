import type { ExpiringStampBookResponse } from "../../../../../apis/my/expiring/type";

interface Props {
  stampBook: ExpiringStampBookResponse;
  onExchangeClick: (stampBookId: number) => void;
  onSelect: (stampBook: ExpiringStampBookResponse) => void;
}

const StampBookItem = ({ stampBook, onExchangeClick, onSelect }: Props) => {
  const {
    id,
    cafe,            
    currentCount,    
    goalCount,    
  } = stampBook;

  const cafeName = cafe.name;
  const cafeAddress = cafe.address;
  const imageUrl = cafe.image; 
  const progress = (currentCount / goalCount) * 100;

  const handleSelect = () => {
    onSelect(stampBook);
  };

  return (
    <div className="flex items-start justify-center mt-[1.5rem] cursor-pointer" onClick={handleSelect}>
      <div className="flex gap-4 w-full items-start">
        <img
          src={imageUrl}
          alt={cafeName}
          className="w-[5rem] h-[5rem] rounded-[8px] object-cover"
        />

        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between">
            <p className="text-[1.125rem] font-bold">{cafeName}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onExchangeClick(id);
              }}
              className="text-[#7F7F7F] text-[0.875rem] font-semibold bg-[#F3F3F3] px-[0.625rem] py-[0.25rem] rounded-[6px]"
            >
              환전
            </button>
          </div>

          <p className="text-[0.875rem] text-[#7F7F7F] font-normal">{cafeAddress}</p>

          <div className="mt-[0.5rem]">
            <div className="flex items-center gap-2">
              <span className="text-[#6970F3] text-[0.875rem] font-semibold">스탬프</span>
              <div className="flex-1 h-[10px] bg-[#F3F3F3] rounded-full relative">
                <div
                  className="absolute top-0 left-0 h-full bg-[#6970F3] rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-end gap-[2px]">
                <span className="text-[#6970F3] text-[0.875rem] font-bold">{currentCount}</span>
                <span className="text-[0.75rem] font-medium pb-0.25">/{goalCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StampBookItem;

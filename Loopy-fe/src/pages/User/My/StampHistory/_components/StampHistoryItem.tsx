import type { ConvertedStampBookGroup } from "../../../../../apis/my/converted/type";

interface Props {
  history: ConvertedStampBookGroup;
  onClick: () => void;
}

const StampHistoryItem = ({ history, onClick }: Props) => {
  const { cafeName, cafeAddress, cafeImageUrl, totalCount } = history;

  return (
    <div
      className="flex items-start gap-3 mt-[1.5rem] cursor-pointer"
      onClick={onClick}
    >
      <img
        src={cafeImageUrl}
        alt={cafeName}
        className="w-[5rem] h-[5rem] rounded-[8px] object-cover"
      />
      <div className="flex flex-col flex-1">
        <p className="text-[1.125rem] font-bold">{cafeName}</p>
        <p className="text-[0.875rem] text-[#7F7F7F] font-normal">{cafeAddress}</p>
        <p className="text-[0.875rem] text-[#6970F3] font-semibold mt-[0.5rem]">
          스탬프지 {totalCount}장 완료
        </p>
      </div>
    </div>
  );
};

export default StampHistoryItem;

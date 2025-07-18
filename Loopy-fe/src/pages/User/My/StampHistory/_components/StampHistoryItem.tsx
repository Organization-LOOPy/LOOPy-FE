import type { StampHistory } from "../../../../../types/stampHistory";
import { useNavigate } from "react-router-dom";

interface Props {
  history: StampHistory;
}

const StampHistoryItem = ({ history }: Props) => {
  const navigate = useNavigate();
  const { id, cafeName, cafeAddress, imageUrl, completedStampCount } = history;

  return (
    <div className="flex items-start gap-3 mt-[1.5rem]">
      <img
        src={imageUrl}
        alt={cafeName}
        className="w-[5rem] h-[5rem] rounded-[8px] object-cover cursor-pointer"
        onClick={() => navigate(`/mystamppage/${id}`)}
      />
      <div className="flex flex-col flex-1">
        <p
          className="text-[1.125rem] font-bold cursor-pointer"
          onClick={() => navigate(`/mystamppage/${id}`)}
        >
          {cafeName}
        </p>
        <p className="text-[0.875rem] text-[#7F7F7F] font-normal">{cafeAddress}</p>
        <p className="text-[0.875rem] text-[#6970F3] font-semibold mt-[0.5rem]">
          스탬프지 {completedStampCount}장 완료
        </p>
      </div>
    </div>
  );
};

export default StampHistoryItem;

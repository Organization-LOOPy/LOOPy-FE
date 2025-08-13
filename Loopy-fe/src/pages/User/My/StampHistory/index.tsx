import { useState } from "react";
import CommonHeader from "../../../../components/header/CommonHeader";
import StampHistoryItem from "./_components/StampHistoryItem";
import StampHistoryItemSkeleton from "./Skeleton/StampHistoryItemSkeleton";
import CompletedStampDetailPage from "./_components/CompletedStampDetailPage";
import { useConvertedStamp } from "../../../../hooks/query/my/useConvertedStamp";
import type { ConvertedStampBookItem } from "../../../../apis/my/converted/type";

const StampHistoryPage = ({ onBack }: { onBack: () => void }) => {
  const { data, isLoading } = useConvertedStamp();
  const [selectedHistory, setSelectedHistory] = useState<ConvertedStampBookItem | null>(null);

  const noData = !isLoading && (!data || data.length === 0);

  return (
    <div className="min-h-screen bg-white text-[#252525] -mx-[1.5rem] px-[1.5rem] pb-[2rem]">
      <CommonHeader title="스탬프 히스토리" onBack={onBack} />

      <div className="text-[#252525]">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => <StampHistoryItemSkeleton key={i} />)
        ) : noData ? (
          <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-8rem)]">
            <p className="text-[1.125rem] font-bold text-[#6970F3]">아직 완료한 스탬프가 없어요!</p>
            <p className="text-[0.875rem] font-normal text-[#7F7F7F] mt-3">
              루피와 함께 스탬프를 모아볼까요?
            </p>
          </div>
        ) : (
          data?.map((item) => (
            <StampHistoryItem
              key={item.stampBookId}
              history={{
                ...item,
                imageUrl: item.cafeImageUrl,
              }}
              onClick={() => setSelectedHistory(item)}
            />
          ))
        )}
      </div>

      {selectedHistory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="bg-white w-full sm:max-w-[393px] h-full overflow-y-auto custom-scrollbar">
            <CompletedStampDetailPage
              history={selectedHistory}
              onBack={() => setSelectedHistory(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StampHistoryPage;

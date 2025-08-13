import { useState } from "react";
import CommonHeader from "../../../../components/header/CommonHeader";
import CommonBottomPopup from "../../../../components/popup/CommonBottomPopup";
import StampBookItem from "./_components/StampBookItem";
import StampBookItemSkeleton from "./Skeleton/StampBookItemSkeleton";
import { useMyExpiringStamp } from "../../../../hooks/query/my/useMyExpiringStamp";
import type { ExpiringStampBookResponse } from "../../../../apis/my/expiring/type";
import ActiveStampDetailPage from "./_components/ActiveStampDetailPage";

interface StampExchangeProps {
  onBack: () => void;
}

const StampExchangePage = ({ onBack }: StampExchangeProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedCafeName, setSelectedCafeName] = useState<string>("");
  const [selectedStampBook, setSelectedStampBook] = useState<ExpiringStampBookResponse | null>(null);
  const { data, isLoading } = useMyExpiringStamp();

  const handleExchangeClick = (id: number, cafeName: string) => {
    setSelectedId(id);
    setSelectedCafeName(cafeName);
  };

  const handleConfirmExchange = () => {
    if (selectedId != null) {
      console.log("환전 API 호출:", selectedId);
      // TODO: mutate
    }
    setSelectedId(null);
  };

  const handleSelectStampBook = (book: ExpiringStampBookResponse) => {
    setSelectedStampBook(book);
  };

  return (
    <div className="mb-[4rem]">
      <CommonHeader title="스탬프 환전" onBack={onBack} />

      <div className="bg-[#F6F6F6] text-[#7F7F7F] text-[0.875rem] font-normal whitespace-pre-line -mx-[1.5rem] px-[1.5rem] py-[1.25rem]">
        1달 내 재방문이 없으면 스탬프 하나 당 2 포인트로 자동 환전되어요.{" "}
        자동 환전 후 스탬프는 소멸되어요!
      </div>

      {isLoading ? (
        Array.from({ length: 10 }).map((_, i) => <StampBookItemSkeleton key={i} />)
      ) : (
        <div className="text-[#252525]">
          {data?.map((item) => (
            <StampBookItem
              key={item.id}
              stampBook={item}
              onSelect={() => handleSelectStampBook(item)}
              onExchangeClick={() => handleExchangeClick(item.id, item.cafe.name)}
            />
          ))}
        </div>
      )}

      <CommonBottomPopup
        show={selectedId !== null}
        onClose={() => setSelectedId(null)}
        titleText={`${selectedCafeName}의\n스탬프를 모두 포인트로 환전할까요?`}
        contentsText={`환전된 포인트는 스탬프 기준 포인트로 적립됩니다.\n환전 후 스탬프는 초기화됩니다.`}
        purpleButton="환전하기"
        purpleButtonOnClick={handleConfirmExchange}
      />

      {selectedStampBook && (
        <div className="fixed inset-0 z-50 bg-white">
          <ActiveStampDetailPage
            stampBook={selectedStampBook}
            onBack={() => setSelectedStampBook(null)}
          />
        </div>
      )}
    </div>
  );
};

export default StampExchangePage;

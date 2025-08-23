import { useState } from "react";
import CommonHeader from "../../../../components/header/CommonHeader";
import CommonBottomPopup from "../../../../components/popup/CommonBottomPopup";
import StampBookItem from "./_components/StampBookItem";
import StampBookItemSkeleton from "./Skeleton/StampBookItemSkeleton";
import { useMyExpiringStamp } from "../../../../hooks/query/my/useMyExpiringStamp";
import type { ExpiringStampBookResponse } from "../../../../apis/my/expiring/type";
import ActiveStampDetailPage from "./_components/ActiveStampDetailPage";
import { useConvertStampBook } from "../../../../hooks/mutation/my/exchange/useConvertStampBook";

interface StampExchangeProps {
  onBack: () => void;
}

const StampExchangePage = ({ onBack }: StampExchangeProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedCafeName, setSelectedCafeName] = useState<string>("");
  const [selectedStampBook, setSelectedStampBook] =
    useState<ExpiringStampBookResponse | null>(null);
  const [messagePopup, setMessagePopup] = useState<string | null>(null);

  const { data, isLoading } = useMyExpiringStamp();
  const { mutate: convertStampBook } = useConvertStampBook(
    (res) => {
      setMessagePopup(res.message); 
      setSelectedId(null);
    },
    (err: any) => {
      if (err?.response?.data?.message) {
        setMessagePopup(err.response.data.message);
      } else {
        setMessagePopup("환전에 실패했습니다.");
      }
      setSelectedId(null);
    }
  );

  const handleExchangeClick = (id: number, cafeName: string) => {
    setSelectedId(id);
    setSelectedCafeName(cafeName);
  };

  const handleConfirmExchange = () => {
    if (selectedId != null) {
      convertStampBook(selectedId);
    }
  };

  const handleSelectStampBook = (book: ExpiringStampBookResponse) => {
    setSelectedStampBook(book);
  };

  return (
    <div className="mb-[4rem]">
      <CommonHeader title="스탬프 환전" onBack={onBack} />

      <div className="bg-[#F3F3F3] text-[#414141] text-[0.875rem] font-normal whitespace-pre-line -mx-[1.5rem] px-[1.5rem] py-[1rem]">
        스탬프 하나 당 2 포인트로 자동 환전되어요. 자동 환전 후 스탬프는 소멸되어요!
      </div>

      {isLoading ? (
        Array.from({ length: 10 }).map((_, i) => (
          <StampBookItemSkeleton key={i} />
        ))
      ) : data && data.length > 0 ? (
        <div className="text-[#252525]">
          {data.map((item) => (
            <StampBookItem
              key={item.id}
              stampBook={item}
              onSelect={() => handleSelectStampBook(item)}
              onExchangeClick={() =>
                handleExchangeClick(item.id, item.cafe.name)
              }
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-13rem)] text-center">
          <p className="text-[#6970F3] text-[1.125rem] font-bold">
            아직 스탬프지가 없어요!
          </p>
          <p className="text-[#7F7F7F] text-[0.875rem] mt-2">
            루피와 함께 스탬프를 모아보세요
          </p>
        </div>
      )}

      <CommonBottomPopup
        show={selectedId !== null}
        onClose={() => setSelectedId(null)}
        titleText={`${selectedCafeName}의 스탬프지를\n포인트로 환전할까요?`}
        contentsText={`환전이 완료되면 스탬프지의 모든 스탬프는 사라지고, 해당 수량만큼 포인트가 지급됩니다. 환전 후에는 취소할 수 없어요.`}
        purpleButton="환전하기"
        purpleButtonOnClick={handleConfirmExchange}
      />

      <CommonBottomPopup
        show={!!messagePopup}
        onClose={() => setMessagePopup(null)}
        titleText={messagePopup ?? ""}
        disableClose={false}
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

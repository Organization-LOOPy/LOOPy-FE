import { useMemo } from "react";
import StampDetailLayout from "../../../../../layouts/StampDetailLayout";
import type {
  ConvertedStampBookGroup,
  ConvertedStampBookItem,
} from "../../../../../apis/my/converted/type";
import StampConvertedPaper from "./StampConvertedPaper";

interface Props {
  history: ConvertedStampBookGroup;
  onBack: () => void;
}

const CompletedStampDetailPage = ({ history, onBack }: Props) => {
  const currentItem: ConvertedStampBookItem | undefined = useMemo(() => {
    return history.items
      .slice()
      .sort((a, b) => b.round - a.round)[0];
  }, [history.items]);

  const latestConvertedAt = useMemo(() => {
    const allDates = history.items
      .map((i) => i.convertedAt)
      .filter(Boolean);

    return allDates.length > 0
      ? new Date(allDates.sort().reverse()[0])
      : null;
  }, [history.items]);

  const formatYMD = (d: string | Date | null | undefined) => {
    if (!d) return "-";
    const iso = typeof d === "string" ? d : d.toISOString();
    const [year, month, day] = iso.slice(0, 10).split("-");
    return `${year}.${month}.${day}`;
  };

  if (!currentItem) {
    return null;
  }

  const isExpired = currentItem.completedAt === null;

  return (
    <StampDetailLayout title="내 스탬프지" onBack={onBack}>
      <div className="flex items-center gap-2 mt-6 text-white font-semibold text-lg">
        <span className="font-bold text-[1.125rem]">
          {history.cafeName}
        </span>
        {latestConvertedAt && (
          <span className="text-[#DFDFDF] text-[0.875rem] font-normal">
            ~{formatYMD(latestConvertedAt)}
          </span>
        )}
      </div>

      <div className="mt-1 text-[#E3F389] text-[1rem] font-semibold">
        {currentItem.displayText}
      </div>

      <div className="relative bg-white rounded-t-xl mt-6 pt-6 pb-6 flex-grow -mx-[1.5rem] px-[1.5rem]">
        <div className="my-20">
          <StampConvertedPaper currentStep={10} />
        </div>

        <div className="absolute inset-0 bg-black/70 z-110 rounded-t-xl" />

        <div className="absolute top-[1.5rem] left-0 w-full z-120 px-[1.5rem]">
          <span className="block text-center text-[1.25rem] font-bold text-white">
            {currentItem.round}번째 스탬프지
          </span>
        </div>

        <div className="absolute inset-0 z-120 flex items-center justify-center px-[1.5rem] pointer-events-none">
          <p className="text-white text-[1.125rem] font-bold text-center leading-[150%]">
            {isExpired ? (
              <>
                {formatYMD(currentItem.convertedAt)}에 스탬프지가 만료됐어요
                <br />
                새로운 스탬프지를 채워보세요
              </>
            ) : (
              <>
                {formatYMD(currentItem.completedAt)}에 스탬프를 모두 모았어요!
                <br />
                새로운 스탬프지를 채워보세요
              </>
            )}
          </p>
        </div>
      </div>
    </StampDetailLayout>
  );
};

export default CompletedStampDetailPage;
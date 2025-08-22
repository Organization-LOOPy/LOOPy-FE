import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowRightIcon from "/src/assets/images/ArrowRight_Grey2.svg?react";
import AlertCircle from "/src/assets/images/AlertCircle.svg?react";

interface MyStampCardProps {
  current: number;
  total: number;
  dueDate: string;
  isEmpty?: boolean;
  rewardText?: string;
  hasPreviousFullBook?: boolean;
}

export default function MyStampCard({
  current,
  total,
  dueDate,
  isEmpty = false,
  rewardText = "",
  hasPreviousFullBook = false
}: MyStampCardProps) {
  const navigate = useNavigate();
  const barRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [barWidth, setBarWidth] = useState(0);

  const displayCurrent =
    total > 0 && current === 0 && hasPreviousFullBook ? 1 : current;

  const targetWidthPercent = total > 0 ? (displayCurrent / total) * 100 : 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.4 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => {
      if (barRef.current) observer.unobserve(barRef.current);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setBarWidth(targetWidthPercent);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, targetWidthPercent]);

  if (isEmpty) {
    return (
      <div className="flex items-center gap-[1rem] w-full h-[5rem] bg-[#F0F1FE] rounded-[0.5rem] px-[1rem]">
        <div className="flex-shrink-0">
          <AlertCircle className="w-[1.25rem] h-[1.25rem]" />
        </div>
        <div className="flex flex-col leading-[150%]">
          <span className="text-[1rem] font-semibold text-[#7F7F7F]">
            스탬프를 다 모으면 쿠폰을 받을 수 있어요!
          </span>
          <span className="text-[1rem] font-semibold text-[#6970F3]">
            {rewardText}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <span className="text-[1rem] font-semibold text-[#000000] leading-none">
          내 스탬프
        </span>
        <button
          onClick={() => navigate('/mypage?my.step=stampHistory')}
          className="text-[0.875rem] font-normal text-[#7F7F7F] flex items-center leading-none"
        >
          전체보기
          <ArrowRightIcon className="h-[0.625rem] ml-[0.5rem]" />
        </button>
      </div>

      <div className="mt-[1rem] flex items-center gap-[1rem]">
        <div className="min-w-fit flex items-baseline leading-none">
          <span className="text-[1.5rem] font-semibold text-[#6970F3]">
            {displayCurrent}
          </span>
          <span className="text-[0.875rem] font-semibold text-[#A8A8A8]">
            /{total}
          </span>
        </div>

        <div
          ref={barRef}
          className="relative flex-1 h-[0.625rem] rounded-[1.25rem] bg-[#DFDFDF] overflow-hidden"
        >
          <div
            className="absolute left-0 top-0 h-full bg-[#6970F3] rounded-[1.25rem] transition-all duration-500"
            style={{ width: `${barWidth}%` }}
          />
        </div>
      </div>

      <div className="mt-[0.5rem] flex justify-end">
        <span className="text-[0.875rem] font-normal text-[#6970F3] leading-none">
          스탬프 기한 ~{dueDate}
        </span>
      </div>
    </div>
  );
}

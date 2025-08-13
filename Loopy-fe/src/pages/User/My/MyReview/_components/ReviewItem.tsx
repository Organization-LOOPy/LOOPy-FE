import { useRef, useState, useEffect } from "react";
import ReviewImageSlider from "./ReviewImageSlider";
import ArrowRight from "../../../../../assets/images/ArrowRight.svg?react";
import CommonBottomPopup from "../../../../../components/popup/CommonBottomPopup";

interface Props {
  id: number;
  cafeName: string;
  date: string;
  content: string;
  images: string[];
  onClick: () => void;
  onDelete: (id: number) => void;
}

const ReviewItem = ({ cafeName, date, content, images, onClick, id, onDelete }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  const handleNavigate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(false);
    onDelete(id);
  };

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        const { scrollHeight, clientHeight } = textRef.current;
        setShowMore(scrollHeight > clientHeight);
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [content]);

  return (
    <div className="space-y-[0.125rem] cursor-pointer px-[1.5rem]">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center text-[1.125rem] font-bold text-[#252525] gap-[0.125rem]">
            <span>{cafeName}</span>
            <ArrowRight
              className="w-[1.125rem] h-[1.125rem] cursor-pointer text-[#252525]"
              onClick={handleNavigate}
            />
          </div>
          <p className="text-[0.75rem] text-[#7F7F7F] font-normal">{date}</p>
        </div>
        <div className="flex gap-[0.5rem] text-[0.875rem] text-[#7F7F7F] font-semibold">
          <button
            className="px-[0.75rem] py-[0.375rem] bg-[#F3F3F3] rounded-[6px]"
            onClick={(e) => { e.stopPropagation(); onClick(); }}
          >
            수정
          </button>
          <button
            className="px-[0.75rem] py-[0.375rem] bg-[#F3F3F3] rounded-[6px]"
            onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(true); }}
          >
            삭제
          </button>
        </div>
      </div>

      <div className="relative my-[0.625rem] text-[0.875rem] leading-[1.5rem] font-normal">
        <p
            ref={textRef}
            onClick={showMore ? handleToggleExpand : undefined}
            className={`whitespace-pre-line ${!expanded ? "line-clamp-3" : ""} ${showMore ? "cursor-pointer" : ""}`}
        >
            {content}
        </p>

        {!expanded && showMore && (
            <>
            <div className="absolute bottom-0 right-[2.675rem] w-[2rem] h-[1.5rem] bg-gradient-to-r from-white/0 via-white/70 to-white z-0 pointer-events-none" />
            <span
                className="absolute bottom-0 right-0 text-[#7F7F7F] font-medium cursor-pointer z-100 bg-white rounded-[16px]"
                onClick={handleToggleExpand}
            >
                ...더 보기
            </span>
            </>
        )}
        </div>

      <ReviewImageSlider images={images} />

      <CommonBottomPopup
        show={showDeleteConfirm}
        titleText="리뷰를 삭제할까요?"
        contentsText="리뷰는 삭제되면 복구되지 않습니다."
        purpleButton="삭제하기"
        purpleButtonOnClick={handleDelete}
        onClose={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
};

export default ReviewItem;

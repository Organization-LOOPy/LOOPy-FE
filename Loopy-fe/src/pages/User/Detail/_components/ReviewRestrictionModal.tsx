import { createPortal } from 'react-dom';

interface Props {
  onClose: () => void;
}

export default function ReviewRestrictionModal({ onClose }: Props) {
  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-end justify-center">
      {/* 딤드 */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      {/* 모달 박스 */}
      <div className="
        relative z-[300] w-full h-[16.75rem]
        bg-white rounded-t-[1rem] px-[1.5rem] pt-[2.5rem] pb-[1.25rem] 
        flex flex-col items-start
      ">
        <div className="text-[1.25rem] font-bold text-[#000000] leading-[1.75rem]">
          스탬프 적립을 시작하고<br />
          리뷰를 작성해보세요!
        </div>
        <p className="mt-[1rem] text-[#7F7F7F] text-[0.875rem] font-normal leading-[1.5rem]">
          루피에서는 광고 없이 스탬프 적립을 통해<br />
          직접 카페를 이용한 고객님들의 후기만 제공해요
        </p>

        <button
          onClick={onClose}
          className="mt-[2rem] w-full h-[3.125rem] rounded-[0.5rem]
                     bg-[#DFDFDF] text-[#7F7F7F] font-semibold text-[1rem]"
        >
          닫기
        </button>
      </div>
    </div>,
    document.body
  );
}

import BaseModalLayout from "./BaseModal";

interface Props {
  onClose: () => void;
}

export default function ReviewRestrictionModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* 딤드 배경 */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* 모달 본문 */}
      <BaseModalLayout onClose={onClose} confirmText="알림 받기">
        <div className="text-[1.25rem] font-bold text-[#000000]">
          스탬프 적립을 시작하고<br />
          리뷰를 작성해보세요!
        </div>
        <p className="mt-[1rem] text-[#7F7F7F] text-[0.875rem] font-normal leading-[1.5rem]">
          루피에서는 광고 없이 스탬프 적립을 통해 직접 카페를 이용한 고객님들의 후기만 제공해요
        </p>
      </BaseModalLayout>
    </div>
  );
}

import SuccessIcon from '../../../assets/images/SuccessIcon.svg?react';

type CommonCompleteModalProps = {
  onClose: () => void;
  message: string;
};

const CommonCompleteModal = ({
  onClose,
  message,
}: CommonCompleteModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative bg-white rounded-xl shadow-lg w-[528px] h-[172px] flex items-center justify-center">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black text-xl"
          aria-label="닫기"
        >
          ×
        </button>

        {/* 본문 내용 */}
        <div className="flex flex-col items-center justify-center text-center gap-6">
          <div className="w-12 h-12">
            <SuccessIcon />
          </div>
          <div className="text-[1.25rem] font-bold text-black">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default CommonCompleteModal;

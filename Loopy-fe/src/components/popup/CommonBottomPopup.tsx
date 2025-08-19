import CommonButton from '../button/CommonButton';

interface BottomPopupProps {
  onClose: () => void;
  purpleButton?: string;
  purpleButtonOnClick?: () => void;
  show: boolean;
  titleText?: string;
  contentsText?: string;
  children?: React.ReactNode;
}

export default function CommonBottomPopup({
  onClose,
  show,
  titleText,
  purpleButton,
  purpleButtonOnClick,
  contentsText,
  children,
}: BottomPopupProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-[#252525] opacity-60"
        onClick={onClose}
      />

      <div className="relative w-full sm:max-w-[24.56rem] bg-white rounded-t-[1rem] px-[1.5rem] pt-[2.5rem] pb-[3rem] z-50">
        {/* 타이틀 텍스트 */}
        {titleText && (
          <div className="mb-[1.25rem] text-[1.25rem] font-bold whitespace-pre-line">
            {titleText}
          </div>
        )}

        {/* 컨텐츠 텍스트 */}
        {contentsText && (
          <div className="mb-[1.5rem] text-[0.875rem] font-regular text-[#7F7F7F] whitespace-pre-line">
            {contentsText}
          </div>
        )}

        {children && <div className="mb-[1.5rem]">{children}</div>}

        {/* 보라색 버튼 */}
        {purpleButton && (
          <div className="mb-[0.5rem]">
            <CommonButton
              text={purpleButton}
              autoStyle
              className="bg-[#6970F3] text-white font-semibold h-[3.125rem] flex items-center justify-center rounded"
              onClick={purpleButtonOnClick}
            />
          </div>
        )}

        <CommonButton
          text="닫기"
          autoStyle={false}
          className="text-[1rem] h-[3.125rem] bg-[#DFDFDF] text-[#7F7F7F] font-semibold flex items-center justify-center"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

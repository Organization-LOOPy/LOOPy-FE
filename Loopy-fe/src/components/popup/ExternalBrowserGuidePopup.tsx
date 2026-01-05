import { useEffect } from 'react';
import { openExternalBrowser } from '../../utils/browser.ts';

interface Props {
  onClose: () => void;
}

const ExternalBrowserGuidePopup = ({ onClose }: Props) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="w-[90%] max-w-[320px] rounded-[16px] bg-white px-6 py-5 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mb-5 text-[15px] font-semibold text-[#252525] leading-[1.4]">
          원활한 서비스 이용을 위해<br />
          외부 브라우저에서 열어주세요.
        </p>

        <button
          onClick={openExternalBrowser}
          className="mb-3 w-full rounded-[9px] bg-[#6970F3] py-[14px] text-[14px] font-semibold text-[#FFFFFF]"
        >
          열기
        </button>

        <button
          onClick={onClose}
          className="w-full rounded-[9px] bg-[#DFDFDF] py-[14px] text-[14px] font-semibold text-[#7F7F7F]"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default ExternalBrowserGuidePopup;

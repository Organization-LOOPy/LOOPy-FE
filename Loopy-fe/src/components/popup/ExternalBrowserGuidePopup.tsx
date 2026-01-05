import { useEffect } from 'react';
import { openExternalBrowser } from '../../utils/browser';
import CommonBottomPopup from '../popup/CommonBottomPopup';

interface Props {
  show: boolean;
  onClose: () => void;
}

const ExternalBrowserGuidePopup = ({ show, onClose }: Props) => {
  useEffect(() => {
    if (!show) return;

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  return (
    <CommonBottomPopup
      show={show}
      onClose={onClose}
      disableClose
      titleText={`원활한 서비스 이용을 위해\n외부 브라우저로 이동이 필요해요`}
      contentsText=""
      purpleButton="외부 브라우저로 루피 열기"
      purpleButtonOnClick={openExternalBrowser}
    />
  );
};

export default ExternalBrowserGuidePopup;

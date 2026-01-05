import { Outlet } from 'react-router-dom';
import { useExternalBrowserGuide } from '../hooks/useExternalBrowerGuide.ts';
import ExternalBrowserGuidePopup from '../components/popup/ExternalBrowserGuidePopup.tsx';

const GlobalLayout = () => {
  const { showGuide, closeGuide } = useExternalBrowserGuide();

  return (
    <>
      <Outlet />
      {showGuide && (
        <ExternalBrowserGuidePopup onClose={closeGuide} show={showGuide} />
      )}
    </>
  );
};

export default GlobalLayout;

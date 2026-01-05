import { useEffect, useState } from "react";
import { isInAppBrowser, isPWA } from "../utils/browser";

/**
 * 인앱 브라우저(WebView)로 접속한 경우
 * 항상 외부 브라우저 이동 안내를 노출하는 훅
 */
export const useExternalBrowserGuide = () => {
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (isInAppBrowser() && !isPWA()) {
      setShowGuide(true);
    }
  }, []);

  return {
    showGuide,
    closeGuide: () => setShowGuide(false),
  };
};


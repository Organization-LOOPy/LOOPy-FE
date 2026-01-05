/**
 * 모든 인앱 브라우저(WebView) 감지
 * - 카카오, 인스타, 에타, 학교앱, 커뮤니티앱 등 포함
 */
export const isInAppBrowser = (): boolean => {
  const ua = navigator.userAgent.toLowerCase();

  const isAndroidWebView =
    ua.includes("wv") ||
    (ua.includes("android") && ua.includes("version/"));

  const isIOSWebView =
    /iphone|ipad|ipod/i.test(ua) &&
    !ua.includes("safari");

  return isAndroidWebView || isIOSWebView;
};

/**
 * iOS 여부
 */
export const isIOS = (): boolean =>
  /iphone|ipad|ipod/i.test(navigator.userAgent);

/**
 * PWA 실행 여부
 */
export const isPWA = (): boolean =>
  window.matchMedia("(display-mode: standalone)").matches;

/**
 * 외부 브라우저로 열기
 */
export const openExternalBrowser = () => {
  const currentUrl = window.location.href;

  // iOS : Safari
  if (isIOS()) {
    window.open(currentUrl, "_blank");
    return;
  }

  // Android : Chrome
  const intentUrl =
    `intent://${currentUrl.replace(/^https?:\/\//, "")}` +
    `#Intent;scheme=https;package=com.android.chrome;end`;

  window.location.href = intentUrl;
};


import { useEffect, useState } from "react";
import LoginPage from "./User/Login";
import SplashPage from "./SplashPage";

const AppEntry = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1500);

    const hideTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (showSplash) {
    return (
      <div
        className={`fixed inset-0 z-[9999] transition-opacity duration-500 ${
          fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <SplashPage />
      </div>
    );
  }

  return <LoginPage />;
};

export default AppEntry;

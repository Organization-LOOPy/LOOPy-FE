import { useEffect, useState } from "react";
import LoginPage from "./User/Login";
import SplashPage from "./SplashPage";

const AppEntry = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false); 
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return showSplash ? <SplashPage /> : <LoginPage />;
};

export default AppEntry;

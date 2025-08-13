import { useEffect } from "react";

const useThemeColor = (color: string) => {
  useEffect(() => {
    let metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.setAttribute("name", "theme-color");
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute("content", color);

    return () => {
      metaThemeColor.setAttribute("content", "#ffffff"); 
    };
  }, [color]);
};

export default useThemeColor;

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { KakaoPlace } from "../types/location";

interface OnboardingContextType {
  region: KakaoPlace | null;
  setRegion: (region: KakaoPlace) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboardingContext = () => {
  const context = useContext(OnboardingContext);
  if (!context) throw new Error("OnboardingContext must be used within Provider");
  return context;
};

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [region, setRegion] = useState<KakaoPlace | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  return (
    <OnboardingContext.Provider value={{ region, setRegion, tags, setTags }}>
      {children}
    </OnboardingContext.Provider>
  );
};

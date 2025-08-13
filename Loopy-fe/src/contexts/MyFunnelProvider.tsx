import { useFunnel } from "@use-funnel/browser";
import type { UseFunnelOptions } from "@use-funnel/browser";
import { createContext, useContext } from "react";
import type { MyPageSteps } from "../types/mySteps";

const isEmpty = (data: unknown): data is {} =>
  typeof data === "object" && data !== null;

// const hasEmail = (data: unknown): data is { email: string } =>
//   typeof data === "object" &&
//   data !== null &&
//   "email" in data &&
//   typeof (data as any).email === "string";

const funnelOptions: UseFunnelOptions<MyPageSteps> = {
  id: "my",
  initial: {
    step: "my",
    context: {},
  },
  steps: {
    my: { guard: isEmpty },
    setting: { guard: isEmpty },
    editProfile: { guard: isEmpty },
    manageAccount: { guard: isEmpty },
    withdraw: { guard: isEmpty },
    stampExchange: { guard: isEmpty },
    couponBox: { guard: isEmpty },
    stampHistory: { guard: isEmpty },
    review: { guard: isEmpty },
    filter: { guard: isEmpty },
    cafeNotice: { guard: isEmpty },
  },
};

const FunnelContext = createContext<ReturnType<typeof useFunnel<MyPageSteps>> | null>(null);

export const MyPageFunnelProvider = ({ children }: { children: React.ReactNode }) => {
  const funnel = useFunnel(funnelOptions);
  return (
    <FunnelContext.Provider value={funnel}>
      {children}
    </FunnelContext.Provider>
  );
};

export const useMyPageFunnel = () => {
  const ctx = useContext(FunnelContext);
  if (!ctx) throw new Error("useMyPageFunnel은 MyPageFunnelProvider 내부에서 사용해야 합니다.");
  return ctx;
};

import { useFunnel } from "@use-funnel/browser";
import type { UseFunnelOptions } from "@use-funnel/browser";
import { useEffect } from "react";
import type { MyPageSteps } from "../types/mySteps";
import { useMyPageFunnelStore } from "../hooks/Funnel/useMyPageFunnelStore";

const isEmpty = (data: unknown): data is {} =>
  typeof data === "object" && data !== null;

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

export const MyPageFunnelProvider = ({ children }: { children: React.ReactNode }) => {
  const funnel = useFunnel(funnelOptions);
  const setFunnel = useMyPageFunnelStore((s) => s.setFunnel);

  useEffect(() => {
    setFunnel(funnel);
  }, [funnel, setFunnel]);

  return <>{children}</>;
};

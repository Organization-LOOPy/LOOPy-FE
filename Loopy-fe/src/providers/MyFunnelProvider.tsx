import { useEffect } from "react";
import { useFunnelWithOptions } from "../hooks/Funnel/useFunnelWithOptions";
import type { FunnelOptions } from "../types/funnel/FunnelOptions";
import type { MyPageStep, MyPageContext } from "../types/mySteps";
import { useMyPageFunnelStore } from "../store/funnel/useMyPageFunnelStore";

const isEmpty = (data: unknown): data is {} =>
  typeof data === "object" && data !== null;

const funnelOptions: FunnelOptions<MyPageStep, MyPageContext> = {
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

export const MyPageFunnelProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const funnel = useFunnelWithOptions(funnelOptions);
  const setFunnel = useMyPageFunnelStore((s) => s.setFunnel);

  useEffect(() => {
    setFunnel(funnel);
  }, [funnel, setFunnel]);

  return <>{children}</>;
};

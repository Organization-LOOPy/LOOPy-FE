import { create } from "zustand";
import type { MyPageSteps } from "../../types/mySteps";
import type { useFunnel } from "@use-funnel/browser";

type FunnelInstance = ReturnType<typeof useFunnel<MyPageSteps>>;

interface MyPageFunnelStore {
  funnel: FunnelInstance | null;
  setFunnel: (funnel: FunnelInstance) => void;
}

export const useMyPageFunnelStore = create<MyPageFunnelStore>((set) => ({
  funnel: null,
  setFunnel: (funnel) => set({ funnel }),
}));

import { create } from "zustand";
import type { FunnelInstance } from "../../types/funnel/FunnelInstance";
import type { MyPageStep, MyPageContext } from "../../types/mySteps";

interface MyPageFunnelStore {
  funnel: FunnelInstance<MyPageStep, MyPageContext> | null;
  setFunnel: (funnel: FunnelInstance<MyPageStep, MyPageContext>) => void;
}

export const useMyPageFunnelStore = create<MyPageFunnelStore>((set) => ({
  funnel: null,
  setFunnel: (funnel) => set({ funnel }),
}));

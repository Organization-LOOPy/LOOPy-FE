import { create } from "zustand";
import type { FunnelInstance } from "../../types/funnel/FunnelInstance";
import type {
  AdminSettingStep,
  AdminSettingContext,
} from "../../types/adminSteps";

interface AdminSettingFunnelStore {
  funnel: FunnelInstance<AdminSettingStep, AdminSettingContext> | null;
  setFunnel: (
    funnel: FunnelInstance<AdminSettingStep, AdminSettingContext>
  ) => void;
  clear: () => void;
}

export const useAdminSettingFunnelStore =
  create<AdminSettingFunnelStore>((set) => ({
    funnel: null,

    setFunnel: (funnel) => set({ funnel }),

    clear: () => set({ funnel: null }),
  }));

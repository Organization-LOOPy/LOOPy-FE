import { create } from "zustand";
import type { useFunnel } from "@use-funnel/browser";
import type { AdminSettingSteps } from "../../types/adminSteps";

type AdminSettingFunnelInstance =
  ReturnType<typeof useFunnel<AdminSettingSteps>>;

interface AdminSettingFunnelStore {
  funnel: AdminSettingFunnelInstance | null;
  setFunnel: (funnel: AdminSettingFunnelInstance) => void;
  clear: () => void;
}

export const useAdminSettingFunnelStore =
  create<AdminSettingFunnelStore>((set) => ({
    funnel: null,

    setFunnel: (funnel) => set({ funnel }),

    clear: () => set({ funnel: null }),
  }));

import { createContext, useContext, useMemo, useRef, useCallback } from "react";
import { useFunnel } from "@use-funnel/browser";
import type { UseFunnelOptions } from "@use-funnel/browser";
import type { AdminSettingSteps, AdminSettingContext, MenuItem } from "../types/adminSteps";

const initialContext: AdminSettingContext = {
  basicInfo: {
    storeName: "",
    ownerName: "",
    address: "",
    detailAddress: "",
    phone: "",
    sns: "",
    description: "",
    photos: [],
  },
  menus: [], 
};

const isAdminSettingContext = (data: unknown): data is AdminSettingContext => {
  if (typeof data !== "object" || data === null) return false;
  const d = data as any;
  return d.basicInfo && typeof d.basicInfo === "object";
};

const funnelOptions: UseFunnelOptions<AdminSettingSteps> = {
  id: "setting",
  initial: { step: "setting", context: initialContext },
  steps: {
    setting:       { guard: isAdminSettingContext },
    editProfile:   { guard: isAdminSettingContext },
    manageAccount: { guard: isAdminSettingContext },
  },
};

const FunnelContext = createContext<ReturnType<typeof useFunnel<AdminSettingSteps>> | null>(null);

export const AdminSettingFunnelProvider = ({ children }: { children: React.ReactNode }) => {
  const funnel = useFunnel(funnelOptions);
  return <FunnelContext.Provider value={funnel}>{children}</FunnelContext.Provider>;
};

export const useAdminSettingFunnel = () => {
  const ctx = useContext(FunnelContext);
  if (!ctx) throw new Error("useAdminSettingFunnel은 AdminSettingFunnelProvider 내부에서 사용해야 합니다.");
  return ctx;
};

type BridgeValue = {
  step: keyof AdminSettingSteps;
  context: AdminSettingContext;
  replace: (step: keyof AdminSettingSteps, ctx: AdminSettingContext) => void;
  push: (step: keyof AdminSettingSteps, ctx: Partial<AdminSettingContext>) => void;
  update: (patch: Partial<AdminSettingContext["basicInfo"]>) => void; 
  setMenus: (updater: (prev: MenuItem[]) => MenuItem[]) => void; 
};

const SettingContext = createContext<BridgeValue | null>(null);

export const SettingProvider = ({
  value,
  children,
}: {
  value: Omit<BridgeValue, "update" | "setMenus"> & { context: AdminSettingContext };
  children: React.ReactNode;
}) => {
  const { step, context, replace, push } = value;

  const latestContextRef = useRef(context);
  latestContextRef.current = context;

  const update = useCallback((patch: Partial<AdminSettingContext["basicInfo"]>) => {
    const curr = latestContextRef.current;
    const next: AdminSettingContext = {
      ...curr,
      basicInfo: { ...curr.basicInfo, ...patch },
      menus: Array.isArray(curr.menus) ? curr.menus : [],
    };

    const same = Object.keys(patch).every(
      (k) => (next.basicInfo as any)[k] === (curr.basicInfo as any)[k]
    );

    if (!same) {
      replace(step, next);
    }
  }, [replace, step]);

  const setMenus = useCallback((updater: (prev: MenuItem[]) => MenuItem[]) => {
    const curr = latestContextRef.current;
    const prevMenus = Array.isArray(curr.menus) ? curr.menus : [];
    const nextMenus = updater(prevMenus);

    if (nextMenus === prevMenus) return;

    replace(step, { ...curr, menus: nextMenus });
  }, [replace, step]);

  const ctxValue = useMemo<BridgeValue>(() => ({
    step,
    context,
    replace,
    push,
    update,
    setMenus,
  }), [step, context, replace, push, update, setMenus]);

  return <SettingContext.Provider value={ctxValue}>{children}</SettingContext.Provider>;
};

export const useSetting = () => {
  const v = useContext(SettingContext);
  if (!v) throw new Error("useSetting은 AdminSettingFunnelProvider/<funnel.Render> 내부에서 사용해야 합니다.");
  return v;
};

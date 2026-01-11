import { useEffect } from "react";
import { create } from "zustand";
import { useFunnelWithOptions } from "../hooks/Funnel/useFunnelWithOptions";
import type { FunnelOptions } from "../types/funnel/FunnelOptions";
import type {
  AdminSettingContext,
  AdminSettingStep,
  MenuItem,
} from "../types/adminSteps";
import { useAdminSettingFunnelStore } from "../store/funnel/useAdminSettingFunnelStore";

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
  activeTab: "basic",
};

const isAdminSettingContext = (
  data: unknown
): data is AdminSettingContext =>
  typeof data === "object" &&
  data !== null &&
  "basicInfo" in data;

const funnelOptions: FunnelOptions<
  AdminSettingStep,
  AdminSettingContext
> = {
  id: "setting",
  initial: {
    step: "setting",
    context: initialContext,
  },
  steps: {
    setting: { guard: isAdminSettingContext },
    editProfile: { guard: isAdminSettingContext },
    manageAccount: { guard: isAdminSettingContext },
  },
};

export const AdminSettingFunnelProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const funnel = useFunnelWithOptions(funnelOptions);
  const setFunnel = useAdminSettingFunnelStore((s) => s.setFunnel);

  useEffect(() => {
    setFunnel(funnel);
  }, [funnel, setFunnel]);

  return <>{children}</>;
};

type SettingStore = {
  step: AdminSettingStep | null;
  context: AdminSettingContext | null;

  replace?: (step: AdminSettingStep, ctx: AdminSettingContext) => void;
  push?: (
    step: AdminSettingStep,
    ctx: Partial<AdminSettingContext>
  ) => void;

  bind: (args: {
    step: AdminSettingStep;
    context: AdminSettingContext;
    replace: SettingStore["replace"];
    push: SettingStore["push"];
  }) => void;

  update: (patch: Partial<AdminSettingContext["basicInfo"]>) => void;
  setMenus: (updater: (prev: MenuItem[]) => MenuItem[]) => void;
};

const useSettingStore = create<SettingStore>((set, get) => ({
  step: null,
  context: null,

  bind: ({ step, context, replace, push }) =>
    set({ step, context, replace, push }),

  update: (patch) => {
    const { step, context, replace } = get();
    if (!step || !context || !replace) return;

    const next: AdminSettingContext = {
      ...context,
      basicInfo: { ...context.basicInfo, ...patch },
      menus: context.menus ?? [],
    };

    replace(step, next);
    set({ context: next });
  },

  setMenus: (updater) => {
    const { step, context, replace } = get();
    if (!step || !context || !replace) return;

    const nextMenus = updater(context.menus ?? []);
    const next = { ...context, menus: nextMenus };

    replace(step, next);
    set({ context: next });
  },
}));

export const SettingProvider = ({
  value,
  children,
}: {
  value: {
    step: AdminSettingStep;
    context: AdminSettingContext;
    replace: (
      step: AdminSettingStep,
      ctx: AdminSettingContext
    ) => void;
    push: (
      step: AdminSettingStep,
      ctx: Partial<AdminSettingContext>
    ) => void;
  };
  children: React.ReactNode;
}) => {
  const bind = useSettingStore((s) => s.bind);

  useEffect(() => {
    bind(value);
  }, [bind, value]);

  return <>{children}</>;
};

export const useSetting = () => {
  const store = useSettingStore();

  if (
    !store.step ||
    !store.context ||
    !store.replace ||
    !store.push
  ) {
    return {
      isReady: false as const,
      step: null,
      context: null,
      replace: () => {},
      push: () => {},
      update: () => {},
      setMenus: () => {},
    };
  }

  return {
    isReady: true as const,
    step: store.step,
    context: store.context,
    replace: store.replace,
    push: store.push,
    update: store.update,
    setMenus: store.setMenus,
  };
};

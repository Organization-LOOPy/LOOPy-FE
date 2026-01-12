import { useCreateFunnel } from "./useCreateFunnel";
import type {
  AdminSettingContext,
  AdminSettingStep,
} from "../../types/adminSteps";

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

export const useAdminSettingFunnel = () =>
  useCreateFunnel<AdminSettingStep, AdminSettingContext>({
    initialStep: "setting",
    initialContext,
  });

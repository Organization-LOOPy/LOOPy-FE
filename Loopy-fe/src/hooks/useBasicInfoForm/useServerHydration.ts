import { useEffect } from "react";
import { useOwnerCafeBasic } from "../query/admin/setting/useOwnerCafeBasic";
import type { BasicInfoForm } from "../../types/basicInfo";

type HydrateDeps = {
  dirtyRef: React.RefObject<boolean>;
  setForm: React.Dispatch<React.SetStateAction<BasicInfoForm>>;
};

export const useServerHydration = ({ dirtyRef, setForm }: HydrateDeps) => {
  const { data, isLoading } = useOwnerCafeBasic();

  useEffect(() => {
    if (!data) return;
    if (dirtyRef.current) return;

    const src: any = Array.isArray(data) ? data[0] : data;
    if (!src) return;

    const digitsPhone = (src.phone || "").replace(/\D/g, "");
    setForm(prev => ({
      ...prev,
      storeName: prev.storeName || src.name || "",
      ownerName: prev.ownerName || src.ownerName || "",
      address:   prev.address   || src.address   || "",
      phone:     prev.phone     || digitsPhone,
      description: prev.description || src.description || "",
      sns:         prev.sns         || src.websiteUrl  || "",
      region1DepthName: prev.region1DepthName ?? (typeof src.region1DepthName === "string" ? src.region1DepthName : undefined),
      region2DepthName: prev.region2DepthName ?? (typeof src.region2DepthName === "string" ? src.region2DepthName : undefined),
      region3DepthName: prev.region3DepthName ?? (typeof src.region3DepthName === "string" ? src.region3DepthName : undefined),
      latitude: typeof prev.latitude === "number" ? prev.latitude : (typeof src.latitude === "number" ? src.latitude : undefined),
      longitude: typeof prev.longitude === "number" ? prev.longitude : (typeof src.longitude === "number" ? src.longitude : undefined),
      serverPhotoUrls: prev.serverPhotoUrls ?? (Array.isArray(src.photos) ? src.photos : undefined),
    }));
  }, [data, dirtyRef, setForm]);

  return { isLoading };
};

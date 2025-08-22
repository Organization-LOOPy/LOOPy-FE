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
    setForm({
      storeName: src.name || "",
      ownerName: src.ownerName || "",
      address: src.address || "",
      detailAddress: "", 
      phone: digitsPhone,
      description: src.description || "",
      sns: src.websiteUrl || "",
      photos: [],          
      region1DepthName: typeof src.region1DepthName === "string" ? src.region1DepthName : undefined,
      region2DepthName: typeof src.region2DepthName === "string" ? src.region2DepthName : undefined,
      region3DepthName: typeof src.region3DepthName === "string" ? src.region3DepthName : undefined,
      latitude: typeof src.latitude === "number" ? src.latitude : undefined,
      longitude: typeof src.longitude === "number" ? src.longitude : undefined,
      serverPhotoUrls: Array.isArray(src.photos) ? src.photos : undefined,
    });
  }, [data, dirtyRef, setForm]);

  return { isLoading };
};

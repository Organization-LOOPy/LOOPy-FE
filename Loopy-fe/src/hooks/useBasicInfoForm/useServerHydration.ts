import { useEffect, useRef } from "react";
import { useOwnerCafeBasic } from "../query/admin/setting/useOwnerCafeBasic";
import type { BasicInfoForm } from "../../types/basicInfo";

type HydrateDeps = {
  dirtyRef: React.RefObject<boolean>;
  setForm: React.Dispatch<React.SetStateAction<BasicInfoForm>>;
  justSavedRef: React.RefObject<boolean>; // ✅ 추가
};

export const useServerHydration = ({
  dirtyRef,
  setForm,
  justSavedRef,
}: HydrateDeps) => {
  const { data, isLoading } = useOwnerCafeBasic();
  const hydratedOnceRef = useRef(false);

  useEffect(() => {
    if (!data) return;
    if (dirtyRef.current) return;
    if (justSavedRef.current) return; // ✅ 핵심
    if (hydratedOnceRef.current) return;

    hydratedOnceRef.current = true;

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
      region1DepthName: src.region1DepthName ?? undefined,
      region2DepthName: src.region2DepthName ?? undefined,
      region3DepthName: src.region3DepthName ?? undefined,
      latitude: typeof src.latitude === "number" ? src.latitude : undefined,
      longitude: typeof src.longitude === "number" ? src.longitude : undefined,
      serverPhotoUrls: Array.isArray(src.photos) ? src.photos : undefined,
    });
  }, [data, dirtyRef, justSavedRef, setForm]);

  return { isLoading };
};

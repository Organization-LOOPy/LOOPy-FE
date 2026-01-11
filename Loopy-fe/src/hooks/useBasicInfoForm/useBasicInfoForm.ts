import { useRef } from "react";
import { useSetting } from "../../zustand/AdminSettingProvider";
import { useAdminCafe } from "../../contexts/AdminContext";
import { useDraft } from "./useDraft";
import { useServerHydration } from "./useServerHydration";
import { useValidation } from "./useValidation";
import { usePatchOwnerCafeBasicInfo } from "../mutation/admin/basic/usePatchOwnerCafeBasicInfo";
import type { PatchOwnerCafeBasicInfoRequest } from "../../apis/admin/setting/basic/patch/type";
import type { BasicInfoForm } from "../../types/basicInfo";

export function useBasicInfoForm() {
  const setting = useSetting();
  const { setActiveCafeId } = useAdminCafe();

  const justSavedRef = useRef(false); 

  const safeContext = setting.isReady
    ? setting.context
    : {
        basicInfo: {
          storeName: "",
          ownerName: "",
          address: "",
          detailAddress: "",
          phone: "",
          sns: "",
          description: "",
          photos: [],
          region1DepthName: undefined,
          region2DepthName: undefined,
          region3DepthName: undefined,
          latitude: undefined,
          longitude: undefined,
          serverPhotoUrls: undefined,
        },
        menus: [],
      };

  const initialForm: BasicInfoForm = {
    storeName: safeContext.basicInfo.storeName ?? "",
    ownerName: safeContext.basicInfo.ownerName ?? "",
    address: safeContext.basicInfo.address ?? "",
    detailAddress: safeContext.basicInfo.detailAddress ?? "",
    phone: safeContext.basicInfo.phone ?? "",
    sns: safeContext.basicInfo.sns ?? "",
    description: safeContext.basicInfo.description ?? "",
    photos: safeContext.basicInfo.photos ?? [],
    region1DepthName: safeContext.basicInfo.region1DepthName,
    region2DepthName: safeContext.basicInfo.region2DepthName,
    region3DepthName: safeContext.basicInfo.region3DepthName,
    latitude: safeContext.basicInfo.latitude,
    longitude: safeContext.basicInfo.longitude,
    serverPhotoUrls: safeContext.basicInfo.serverPhotoUrls,
  };

  const {
    form,
    setForm,
    setField,
    hydrated,
    dirtyRef,
    latestFormRef,
    clearDraftAfterServerSave,
    setDirty,
  } = useDraft(initialForm);

  const { isLoading: serverLoading } = useServerHydration({
    dirtyRef,
    setForm,
    justSavedRef, 
  });

  const { isValid, maxPhotos, minPhotos } = useValidation(form);

  const {
    mutateAsync: patchBasicInfo,
    isPending: isSubmitting,
  } = usePatchOwnerCafeBasicInfo();

  const commit = async () => {
    if (!setting.isReady) return;

    const next = latestFormRef.current;

    const fullAddress =
      next.detailAddress && next.detailAddress.trim().length > 0
        ? `${next.address} ${next.detailAddress}`
        : next.address;

    const phoneDigits = (next.phone || "").replace(/\D/g, "");

    const payload: PatchOwnerCafeBasicInfoRequest = {
      name: next.storeName,
      ownerName: next.ownerName,
      address: fullAddress,
      region1DepthName: next.region1DepthName!,
      region2DepthName: next.region2DepthName!,
      region3DepthName: next.region3DepthName!,
      latitude: next.latitude!,
      longitude: next.longitude!,
      phone: phoneDigits,
      websiteUrl: next.sns || "",
      description: next.description,
    };

    const res = await patchBasicInfo(payload);
    const cafeId = res?.id;

    justSavedRef.current = true; 

    setForm(next);

    setting.update({
      storeName: next.storeName,
      ownerName: next.ownerName,
      address: next.address,
      detailAddress: next.detailAddress,
      phone: next.phone,
      sns: next.sns,
      description: next.description,
      photos: next.photos,
      region1DepthName: next.region1DepthName,
      region2DepthName: next.region2DepthName,
      region3DepthName: next.region3DepthName,
      latitude: next.latitude,
      longitude: next.longitude,
      serverPhotoUrls: next.serverPhotoUrls,
    });

    if (cafeId) {
      setActiveCafeId(cafeId);
      localStorage.setItem("activeCafeId", String(cafeId));
    }

    clearDraftAfterServerSave();
    setDirty(false);

    return cafeId;
  };

  return {
    isReady: setting.isReady,
    form,
    setField,
    commit,
    isValid,
    isLoading: serverLoading && !hydrated,
    isSubmitting,
    maxPhotos,
    minPhotos,
    clearDraftAfterServerSave,
    isDirty: dirtyRef.current,
  };
}

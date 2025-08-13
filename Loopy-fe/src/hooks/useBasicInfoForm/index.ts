import { useSetting } from "../../contexts/AdminSettingProvider";
import { useAdminCafe } from "../../contexts/AdminContext";
import { useDraft } from "./useDraft";
import { useServerHydration } from "./useServerHydration";
import { useValidation } from "./useValidation";

import { usePatchOwnerCafeBasicInfo } from "../mutation/admin/basic/usePatchOwnerCafeBasicInfo";
import type { PatchOwnerCafeBasicInfoRequest } from "../../apis/admin/setting/basic/patch/type";
import type { BasicInfoForm } from "../../types/basicInfo";

export function useBasicInfoForm() {
  const { context, update } = useSetting();
  const { setActiveCafeId } = useAdminCafe();

  const initialForm: BasicInfoForm = {
    storeName: context.basicInfo.storeName ?? "",
    ownerName: context.basicInfo.ownerName ?? "",
    address: context.basicInfo.address ?? "",
    detailAddress: context.basicInfo.detailAddress ?? "",
    phone: context.basicInfo.phone ?? "",
    sns: context.basicInfo.sns ?? "",
    description: context.basicInfo.description ?? "",
    photos: context.basicInfo.photos ?? [],
    region1DepthName: context.basicInfo.region1DepthName || undefined,
    region2DepthName: context.basicInfo.region2DepthName || undefined,
    region3DepthName: context.basicInfo.region3DepthName || undefined,
    latitude: typeof context.basicInfo.latitude === "number" ? context.basicInfo.latitude : undefined,
    longitude: typeof context.basicInfo.longitude === "number" ? context.basicInfo.longitude : undefined,
    serverPhotoUrls: context.basicInfo.serverPhotoUrls ?? undefined,
  };

  const { form, setForm, setField, hydrated, dirtyRef, latestFormRef, clearDraftAfterServerSave, setDirty } =
    useDraft(initialForm);

  const { isLoading } = useServerHydration({ dirtyRef, setForm });
  const { isValid, maxPhotos, minPhotos } = useValidation(form);
  const { mutateAsync: patchBasicInfo, isPending: isSubmitting } = usePatchOwnerCafeBasicInfo();

  const commit = async () => {
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

    if (cafeId) {
      setActiveCafeId(cafeId);
      localStorage.setItem("activeCafeId", String(cafeId));
    }

    update({
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

    clearDraftAfterServerSave();
    setDirty(false);

    return cafeId;
  };

  return {
    form,
    setField,
    commit,
    isValid,
    isLoading: isLoading && !hydrated,
    isSubmitting,
    maxPhotos,
    minPhotos,
    clearDraftAfterServerSave,
  };
}

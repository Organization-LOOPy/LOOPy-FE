import type { BasicInfoForm } from "../../types/basicInfo";

export const useValidation = (form: BasicInfoForm) => {
  const maxPhotos = 5;
  const minPhotos = 3;

  const isValid =
    !!form.storeName?.trim() &&
    !!form.ownerName?.trim() &&
    !!form.address?.trim() &&
    (form.phone || "").replace(/\D/g, "").length === 11 &&
    (form.photos?.length ?? 0) >= minPhotos &&
    !!form.description?.trim() &&
    !!form.region1DepthName &&
    !!form.region2DepthName &&
    !!form.region3DepthName &&
    typeof form.latitude === "number" &&
    typeof form.longitude === "number";

  return { isValid, maxPhotos, minPhotos };
};

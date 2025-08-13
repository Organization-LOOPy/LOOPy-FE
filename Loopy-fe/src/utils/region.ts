import type { KakaoPlace } from "../types/location";

export const normalizeRegion = (text: string) => {
  return text
    .replace(/특별시|광역시|자치시|도|시/g, "")
    .replace(/\s/g, "")
    .trim();
};

export const generateRegionKey = (place: Pick<KakaoPlace, "region_1depth_name" | "region_2depth_name" | "region_3depth_name">) => {
  return `${place.region_1depth_name}-${place.region_2depth_name}-${place.region_3depth_name}`;
};

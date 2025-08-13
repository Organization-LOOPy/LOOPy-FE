import kakaoInstance from "./kakaoInstance";
import type { KakaoPlace } from "../../types/location";

export const searchPlace = async (query: string): Promise<KakaoPlace[]> => {
  const { data } = await kakaoInstance.get("/search/keyword.json", {
    params: { query },
  });

  return data.documents
    .filter((place: any) => place.address_name)
    .map((place: any) => {
      const addressParts = place.address_name.split(" ");
      return {
        id: place.id,
        place_name: place.place_name,
        address_name: place.address_name,
        road_address_name: place.road_address_name,
        x: place.x,
        y: place.y,
        region_1depth_name: addressParts[0] ?? "",
        region_2depth_name: addressParts[1] ?? "",
        region_3depth_name: addressParts[2] ?? "",
      };
    });
};

export const reverseGeocode = async (lat: number, lng: number): Promise<KakaoPlace | null> => {
  const { data } = await kakaoInstance.get("/geo/coord2regioncode.json", {
    params: {
      x: lng,
      y: lat,
    },
  });

  const region = data.documents?.[0];
  if (!region) return null;

  return {
    id: region.code,
    place_name: region.address_name,
    address_name: region.address_name,
    road_address_name: "",
    x: region.x,
    y: region.y,
    region_1depth_name: region.region_1depth_name,
    region_2depth_name: region.region_2depth_name,
    region_3depth_name: region.region_3depth_name,
  };
};

// 도로명/지번 주소 검색 (도로명 우선 사용)
export const searchAddress = async (query: string): Promise<KakaoPlace[]> => {
  const { data } = await kakaoInstance.get("/search/address.json", {
    params: { query },
  });

  return (data.documents ?? [])
    .filter((doc: any) => doc.road_address || doc.address)
    .map((doc: any) => {
      const road = doc.road_address; 
      const jibun = doc.address;  

      const x = String(road?.x ?? jibun?.x ?? "");
      const y = String(road?.y ?? jibun?.y ?? "");

      return {
        id: `${x},${y},${road?.address_name ?? jibun?.address_name ?? ""}`,
        place_name: "",
        address_name: jibun?.address_name ?? "",        // 지번
        road_address_name: road?.address_name ?? "",    // 도로명
        x,
        y,
        region_1depth_name: jibun?.region_1depth_name ?? road?.region_1depth_name ?? "",
        region_2depth_name: jibun?.region_2depth_name ?? road?.region_2depth_name ?? "",
        region_3depth_name: jibun?.region_3depth_name ?? road?.region_3depth_name ?? "",
      } as KakaoPlace;
    });
};

// 좌표 -> 도로명/지번 주소 (도로명 우선 반환 사용)
export const reverseGeocodeAddress = async (
  lat: number,
  lng: number
): Promise<KakaoPlace | null> => {
  const { data } = await kakaoInstance.get("/geo/coord2address.json", {
    params: { x: lng, y: lat },
  });

  const doc = data.documents?.[0];
  if (!doc) return null;

  const road = doc.road_address;
  const jibun = doc.address;

  const x = String(lng);
  const y = String(lat);

  return {
    id: road?.address_name || jibun?.address_name || `${x},${y}`,
    place_name: "",
    address_name: jibun?.address_name ?? "",
    road_address_name: road?.address_name ?? "",
    x,
    y,
    region_1depth_name: jibun?.region_1depth_name ?? road?.region_1depth_name ?? "",
    region_2depth_name: jibun?.region_2depth_name ?? road?.region_2depth_name ?? "",
    region_3depth_name: jibun?.region_3depth_name ?? road?.region_3depth_name ?? "",
  } as KakaoPlace;
};



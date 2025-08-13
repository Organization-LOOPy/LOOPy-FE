import { useCallback, useMemo, useState } from "react";
import { searchPlace, reverseGeocode } from "../apis/kakao/address"; 
import { normalizeRegion, generateRegionKey } from "../utils/region";
import type { KakaoPlace } from "../types/location";

export const useSearchRegion = () => {
  const [input, setInput] = useState("");
  const [rawResults, setRawResults] = useState<KakaoPlace[]>([]);
  const [selected, setSelected] = useState<KakaoPlace | null>(null);
  const [isLoading, setIsLoading] = useState(false); 

  const handleSearch = useCallback(async () => {
    if (!input.trim()) return;
    const data = await searchPlace(input);
    setRawResults(data);
    setSelected(null);
  }, [input]);

  const handleCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert("이 브라우저에서는 위치 기능이 지원되지 않습니다.");
      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const result = await reverseGeocode(latitude, longitude);
        if (result) {
          setSelected(result);
          setInput(
            `${result.region_1depth_name || ""} ${result.region_2depth_name || ""} ${result.region_3depth_name || ""}`.trim()
          );
          setRawResults([result]);
        } else {
          alert("현재 위치를 불러오지 못했습니다.");
        }
        setIsLoading(false);
      },
      (err) => {
        console.error(err);
        alert("위치 정보를 가져올 수 없습니다.");
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  const filteredResults = useMemo(() => {
    const keyword = normalizeRegion(input);
    if (!keyword) return [];

    const unique = new Map<string, KakaoPlace>();

    rawResults.forEach((place) => {
      const { region_1depth_name, region_2depth_name, region_3depth_name } = place;
      if (!(region_1depth_name && region_2depth_name && region_3depth_name)) return;

      const fullRegion = normalizeRegion(`${region_1depth_name}${region_2depth_name}${region_3depth_name}`);
      const partialRegion = normalizeRegion(`${region_1depth_name}${region_2depth_name}`);
      const key = generateRegionKey(place);

      const isPartialMatch =
        fullRegion.includes(keyword) ||
        partialRegion.includes(keyword) ||
        keyword.includes(partialRegion);
      const isExactMatch = fullRegion === keyword;

      if ((isPartialMatch || isExactMatch) && !unique.has(key)) {
        unique.set(key, place);
      }
    });

    return Array.from(unique.values()).slice(0, 10);
  }, [input, rawResults]);

  return {
    input,
    setInput,
    selected,
    setSelected,
    handleSearch,
    handleCurrentLocation,
    filteredResults,
    isLoading, 
  };
};

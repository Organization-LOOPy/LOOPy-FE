import { useCallback, useState } from "react";
import { searchAddress } from "../apis/kakao/address";

export type RoadAddressPick = {
  roadAddress: string;  
  jibunAddress?: string;
  x: string;  
  y: string;  
};

export const useRoadAddressSearch = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<RoadAddressPick[]>([]);
  const [selected, setSelected] = useState<RoadAddressPick | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const search = useCallback(async () => {
    const q = input.trim();
    if (!q) return;
    setIsLoading(true);
    try {
      const docs = await searchAddress(q);
      const list: RoadAddressPick[] = (docs ?? [])
        .map((d: any) => {
          const road = d.road_address_name ?? "";
          const jibun = d.address_name ?? "";
          const x = String(d.x ?? "");
          const y = String(d.y ?? "");
          if (!road) return null;
          return { roadAddress: road, jibunAddress: jibun || undefined, x, y };
        })
        .filter(Boolean) as RoadAddressPick[];

      setResults(list.slice(0, 20));
      setSelected(null);
    } finally {
      setIsLoading(false);
    }
  }, [input]);

  return {
    input,               
    setInput,             
    results,             
    selected,           
    setSelected,       
    search,             
    isLoading,     
  };
};

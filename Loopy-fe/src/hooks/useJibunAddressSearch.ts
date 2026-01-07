import { useState, useCallback } from "react";
import { searchAddress } from "../apis/kakao/address";

export type JibunAddressPick = {
  jibunAddress: string;    
  roadAddress?: string;   
  x: string;
  y: string;
};

export const useJibunAddressSearch = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<JibunAddressPick[]>([]);
  const [selected, setSelected] = useState<JibunAddressPick | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const search = useCallback(async () => {
    const keyword = input.trim();
    if (!keyword) return;

    setIsLoading(true);
    try {
      const docs = await searchAddress(keyword);

      const list: JibunAddressPick[] = (docs ?? [])
        .map((d: any) => {
          const jibun = d.address_name ?? "";
          if (!jibun) return null;

          return {
            jibunAddress: jibun,
            roadAddress: d.road_address_name ?? undefined,
            x: String(d.x ?? ""),
            y: String(d.y ?? ""),
          };
        })
        .filter(Boolean) as JibunAddressPick[];

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

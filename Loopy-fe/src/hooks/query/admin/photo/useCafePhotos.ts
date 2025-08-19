import { useQuery } from "@tanstack/react-query";
import { fetchCafePhotos } from "../../../../apis/admin/setting/photo/api";
import type { CafePhoto } from "../../../../apis/admin/setting/photo/type";

export const useCafePhotos = () => {
  return useQuery<CafePhoto[]>({
    queryKey: ["cafePhotos"],
    queryFn: fetchCafePhotos,
    staleTime: 5 * 60 * 1000, 
  });
};

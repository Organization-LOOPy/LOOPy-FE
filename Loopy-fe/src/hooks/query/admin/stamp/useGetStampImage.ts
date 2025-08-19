import { useQuery } from "@tanstack/react-query";
import { getStampImages } from "../../../../apis/admin/register/stamp/image/api";
import type { StampImage } from "../../../../apis/cafeDetail/type";

export function useGetStampImages() {
  return useQuery<StampImage[]>({
    queryKey: ["stampImages"],
    queryFn: getStampImages,
  });
}

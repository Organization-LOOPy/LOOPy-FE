import { useQuery } from "@tanstack/react-query";
import { getUserQRCode } from "../../../../apis/userInfo/qr/api";

export const useUserQRCode = () => {
  return useQuery({
    queryKey: ["userQRCode"],
    queryFn: getUserQRCode,
    staleTime: Infinity,
    retry: 1,
  });
};

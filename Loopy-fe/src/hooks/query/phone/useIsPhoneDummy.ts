import { useQuery } from "@tanstack/react-query";
import { getIsDummyPhone } from "../../../apis/auth/phoneCheck/api";
import type { DummyPhoneResponse } from "../../../apis/auth/phoneCheck/type";

export const useIsDummyPhone = () => {
  return useQuery<DummyPhoneResponse>({
    queryKey: ["isDummyPhone"],
    queryFn: getIsDummyPhone,
    staleTime: 0, 
  });
};

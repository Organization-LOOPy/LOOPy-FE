import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../../../apis/userInfo/api";
import type { MyInfoResponse } from "../../../apis/userInfo/type";

export const useMyInfo = () => {
  return useQuery<MyInfoResponse["user"]>({
    queryKey: ["myInfo"],
    queryFn: async () => {
      const res = await getMyInfo();
      if (!res) throw new Error("사용자 정보가 없습니다.");
      return res;
    },
    staleTime: 1000 * 60 * 5, 
  });
};

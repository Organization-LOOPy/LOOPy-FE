import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postOwnerCafeBasicInfo } from "../../../../apis/admin/setting/basic/post/api";
import type {
  PostOwnerCafeBasicInfoRequest,
  PostOwnerCafeBasicInfoResponse,
} from "../../../../apis/admin/setting/basic/type";

const BASIC_INFO_KEY = ["owner", "cafe", "basic"];

export function usePostOwnerCafeBasicInfo() {
  const qc = useQueryClient();

  return useMutation<
    PostOwnerCafeBasicInfoResponse,
    unknown,
    PostOwnerCafeBasicInfoRequest
  >({
    mutationFn: postOwnerCafeBasicInfo,
    onSuccess: (data) => {
      const cafeId = data?.cafe?.id;
      if (cafeId) {
        localStorage.setItem("activeCafeId", String(cafeId));
      }

      qc.invalidateQueries({ queryKey: BASIC_INFO_KEY });
    },
    onError: (err) => {
      console.error("카페 기본 정보 등록 실패:", err);
    },
  });
}

import { useMutation } from "@tanstack/react-query";
import { patchNickname } from "../../../apis/userInfo/api";
import type { PatchNicknameRequest, PatchNicknameResponse } from "../../../apis/userInfo/type";

export const usePatchNickname = () =>
  useMutation<PatchNicknameResponse, unknown, PatchNicknameRequest>({
    mutationFn: patchNickname,
  });

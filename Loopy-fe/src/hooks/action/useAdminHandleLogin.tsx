import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../mutation/login/useLogin";
import { fetchAdminCafe } from "../../apis/admin/cafeStatus/api";
import Storage from "../../utils/storage";
import { useFcmToken } from "./useFcmToken";
import { useQueryClient } from "@tanstack/react-query";
import type { LoginRequest } from "../../apis/auth/login/type";

export const useHandleAdminLogin = () => {
  const navigate = useNavigate();
  const { mutate: loginMutate } = useLogin();
  const { requestFcmToken } = useFcmToken();
  const fcmRequestedRef = useRef(false);
  const queryClient = useQueryClient();

  const handleLogin = useCallback(
    (data: LoginRequest) => {
      loginMutate(data, {
        onSuccess: async (res) => {
          const { token, user, message } = res;

          // 로그인 응답 검증
          if (message !== "로그인 성공" || !token || !user) {
            console.warn("로그인 응답 이상:", res);
            return;
          }

          // 인증 토큰 저장
          Storage.setAccessToken(token);
          console.log("사장님 로그인 성공:", user);

          // 카페 상태 조회 → 등록 여부 판단
          try {
            const cafeRes = await queryClient.fetchQuery({
              queryKey: ["adminCafe"],
              queryFn: fetchAdminCafe,
            });

            const { cafeId, cafeStatus } = cafeRes.data;
            const storedCafeId = Storage.getActiveCafeId();

            // 이전 로그인 흔적 정리 (계정 전환 / 스토리지 잔존 대응)
            if (storedCafeId && storedCafeId !== cafeId) {
              localStorage.removeItem("activeCafeId");
            }

            if (cafeId) {
              // 카페는 이미 존재 -> 무조건 저장
              Storage.setActiveCafeId(cafeId);

              if (cafeStatus === "active") {
                navigate("/admin/home", { replace: true });
              } else {
                navigate("/admin/register", { replace: true });
              }
            } else {
              // 카페 자체가 없음 (아예 생성 전)
              localStorage.removeItem("activeCafeId");
              navigate("/admin/register", { replace: true });
            }
          } catch (err) {
            console.error("카페 정보 조회 실패:", err);
            localStorage.removeItem("activeCafeId");
            navigate("/admin/register", { replace: true });
          }

          // FCM 토큰 요청 
          if (!fcmRequestedRef.current) {
            fcmRequestedRef.current = true;
            try {
              const fcmToken = await requestFcmToken();
              if (!fcmToken) {
                console.warn("FCM 토큰 발급 실패 또는 권한 거부");
              }
            } catch (e) {
              console.error("FCM 토큰 요청 중 에러:", e);
            }
          }
        },

        onError: (err) => {
          console.error("사장님 로그인 실패:", err.message);
        },
      });
    },
    [loginMutate, requestFcmToken, navigate, queryClient]
  );

  return handleLogin;
};

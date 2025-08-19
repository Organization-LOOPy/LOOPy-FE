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

          if (message !== "로그인 성공" || !token || !user) {
            console.warn("로그인 응답 이상:", res);
            return;
          }

          console.log("사장님 로그인 성공:", user);
          Storage.setAccessToken(token);

          try {
            const cafeRes = await queryClient.fetchQuery({
              queryKey: ["adminCafe"],
              queryFn: fetchAdminCafe,
            });

            const { cafeId, cafeStatus } = cafeRes.data;
            const storedCafeId = Storage.getActiveCafeId();

            if (cafeId) {
              if (storedCafeId && storedCafeId !== cafeId) {
                localStorage.removeItem("activeCafeId");
              }

              Storage.setActiveCafeId(cafeId);

              if (cafeStatus === "inactive") {
                navigate("/admin/register", { replace: true });
              } else {
                navigate("/admin/home", { replace: true });
              }
            } else {
              localStorage.removeItem("activeCafeId");
              navigate("/admin/register", { replace: true });
            }
          } catch (err) {
            console.error("카페 정보 조회 실패:", err);
          }

          if (!fcmRequestedRef.current) {
            fcmRequestedRef.current = true;

            (async () => {
              try {
                const fcmToken = await requestFcmToken();
                if (!fcmToken) console.warn("FCM 토큰 발급 실패 또는 거부");
              } catch (e) {
                console.error("FCM 토큰 요청 중 에러:", e);
              }
            })();
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

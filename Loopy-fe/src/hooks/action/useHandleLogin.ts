import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../mutation/login/useLogin";
import { usePatchUserActivate } from "../mutation/active/useActiveStatus";
import Storage from "../../utils/storage";
import { useFcmToken } from "./useFcmToken";
import type { LoginRequest } from "../../apis/auth/login/type";
import { useQueryClient } from "@tanstack/react-query";
import mixpanel from "mixpanel-browser";

export const useHandleLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: loginMutate } = useLogin();
  const { mutate: activateUser } = usePatchUserActivate();
  const { requestFcmToken } = useFcmToken();

  const fcmRequestedRef = useRef(false);
  const inFlightRef = useRef(false);

  const handleLogin = useCallback(
    (data: LoginRequest) => {
      if (inFlightRef.current) return;
      inFlightRef.current = true;

      loginMutate(data, {
        onSuccess: (res) => {
          const { token, user, message } = res;

          if (message !== "로그인 성공" || !token || !user) {
            console.warn("로그인 응답 이상:", res);
            return;
          }

          Storage.setAccessToken(token);

          const user_id = `user_${user.id}`;
          mixpanel.identify(user_id);
          mixpanel.track("email_login_completed", {
            user_id,
            user_role: "customer",
            platform: "web",
          });

          queryClient.invalidateQueries({ queryKey: ["homeInfo"] });
          queryClient.invalidateQueries({ queryKey: ["stampBooks"] });

          activateUser(undefined, {
            onSuccess: () => console.log("계정 활성화 완료"),
            onError: (err) => console.warn("계정 활성화 실패:", err),
          });

          navigate("/home", { replace: true });

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
        onError: (err: any) => {
          console.error("로그인 요청 실패:", err?.message ?? err);
        },
        onSettled: () => {
          inFlightRef.current = false;
        },
      });
    },
    [loginMutate, activateUser, requestFcmToken, navigate, queryClient]
  );

  return handleLogin;
};

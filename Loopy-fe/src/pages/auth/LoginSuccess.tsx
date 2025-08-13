import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Storage from "../../utils/storage";
import { usePatchUserActivate } from "../../hooks/mutation/active/useActiveStatus";
import { useFcmToken } from "../../hooks/action/useFcmToken";

const LoginSuccess = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const token = params.get("token");
  const nickname = params.get("nickname");

  const { mutateAsync: activateUser, isPending: isActivating } = usePatchUserActivate();
  const { requestFcmToken, isRequesting, isPatching } = useFcmToken();

  const [working, setWorking] = useState(false); 
  const runOnceRef = useRef(false);

  useEffect(() => {
    if (runOnceRef.current) return;
    runOnceRef.current = true;

    (async () => {
      if (!token || !nickname) {
        console.error("소셜 로그인 실패: 토큰 또는 닉네임 없음");
        navigate("/", { replace: true });
        return;
      }

      setWorking(true); 
      Storage.setAccessToken(token);
      Storage.setNickname(nickname);

      try {
        await activateUser();     
        await requestFcmToken({ force: true });
        navigate("/verify", { replace: true });
      } catch (e) {
        console.warn("소셜 로그인 후처리 실패:", e);
        navigate("/", { replace: true });
      } finally {
        setWorking(false); 
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoading = working || isActivating || isRequesting || isPatching;

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
        <div
          className="w-12 h-12 border-4 border-[#6970F3] border-t-transparent rounded-full animate-spin"
          role="status"
          aria-label="로그인 처리 중"
        />
        <span className="sr-only">로그인 처리 중...</span>
      </div>
    );
  }

  return null;
};

export default LoginSuccess;

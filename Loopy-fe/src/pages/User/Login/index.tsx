import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../../../components/button/CommonButton";
import LoopyIconSection from "./_components/LoopyIconSection";
import Eye from "../../../assets/images/Eye.svg?react";
import EyeOff from "../../../assets/images/EyeOff.svg?react";
import SocialLoginSection from "./_components/SocialLoginSection";
import useThemeColor from "../../../hooks/useThemeColor";
import { useHandleLogin } from "../../../hooks/action/useHandleLogin";
import KeyInput from "../../../components/input/KeyInput";
import LoginBackground from "../../../assets/images/LoginBackground.svg?react";

const LoginPage = () => {
  useThemeColor("#6970F3");

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = useHandleLogin();

  // ✅ 디버깅용 useEffect — 어떤 요소가 회원가입 버튼 위를 덮는지 확인
  useEffect(() => {
    const checkOverlay = () => {
      // 회원가입 버튼 근처 좌표 (화면 하단 중심 기준)
      const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight - 100);

      if (el) {
        console.log("🔎 [DEBUG] 회원가입 버튼 위를 덮고 있는 요소:", el);
        console.log("📛 tagName:", el.tagName);
        console.log("📛 className:", el.className);
        console.log("📛 z-index:", getComputedStyle(el).zIndex);
        console.log("📛 pointer-events:", getComputedStyle(el).pointerEvents);

      } else {
        console.log("✅ [DEBUG] 회원가입 버튼 위를 덮는 요소 없음");
      }
    };

    // DOM 준비된 후 약간 지연시켜 확인 (렌더 후 실행)
    const timer = setTimeout(checkOverlay, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center bg-gradient-to-b from-[#6970F3] to-[#3D418D] -mx-[1.5rem] relative overflow-hidden">
      <LoopyIconSection />

      <div className="absolute bottom-0 left-0 right-0 z-0 overflow-hidden">
        <LoginBackground
          className="w-full h-[clamp(60vh,70vh,820px)] pointer-events-none"
          preserveAspectRatio="none"
        />
      </div>

      <div className="absolute bottom-[clamp(1px,calc((100vh-820px)*0.5+32px),80px)] left-0 right-0 z-50 w-full px-[1.625rem] max-w-[393px] mx-auto transition-all duration-300">
        <div className="mb-[0.5rem]">
          <KeyInput
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative w-full">
          <KeyInput
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-4 -translate-y-1/2"
          >
            {showPassword ? (
              <Eye className="w-5 h-5 text-[#7F7F7F]" />
            ) : (
              <EyeOff className="w-5 h-5 text-[#7F7F7F]" />
            )}
          </button>
        </div>

        <div className="mt-[1.5rem] mb-[0.5rem]">
          <CommonButton
            text="로그인"
            onClick={() => handleLogin({ email, password, role: "CUSTOMER" })}
          />
        </div>

        <div className="relative z-[9999]">
          <CommonButton
            text="회원가입"
            onClick={() => navigate("/signin")}
            autoStyle={false}
            className="bg-[#F0F1FE] text-[#6970F3] pointer-events-auto"
          />
        </div>

        <SocialLoginSection />
      </div>
    </div>
  );
};

export default LoginPage;

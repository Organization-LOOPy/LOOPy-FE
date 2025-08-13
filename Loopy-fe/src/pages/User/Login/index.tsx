import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../../../components/button/CommonButton";
import LoopyIconSection from "./_components/LoopyIconSection";
import Eye from "../../../assets/images/Eye.svg?react";
import EyeOff from "../../../assets/images/EyeOff.svg?react";
import SocialLoginSection from "./_components/SocialLoginSection";
import useThemeColor from "../../../hooks/useThemeColor";
import { useHandleLogin } from "../../../hooks/action/useHandleLogin";
import KeyInput from "../../../components/input/KeyInput";

const LoginPage = () => {
  useThemeColor("#6970F3");

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = useHandleLogin(); 

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <LoopyIconSection />

      <div className="w-full pt-[24.5rem]">
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

        <CommonButton
          text="회원가입"
          onClick={() => navigate("/signin")}
          autoStyle={false}
          className="bg-[#F0F1FE] text-[#6970F3]"
        />

        <SocialLoginSection />
      </div>
    </div>
  );
};

export default LoginPage;

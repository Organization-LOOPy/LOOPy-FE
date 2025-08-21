import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../../../components/button/CommonButton";
import Logo from "../../../assets/images/BlueIcon.svg?react";
import LogoText from "../../../assets/images/LoopyAdminText.svg?react";
import KeyInput from "../../../components/input/KeyInput";
import Eye from "../../../assets/images/Eye.svg?react";
import EyeOff from "../../../assets/images/EyeOff.svg?react";
import { useHandleAdminLogin } from "../../../hooks/action/useAdminHandleLogin";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();
  const handleAdminLogin = useHandleAdminLogin();

  const handleClickLogin = () => {
    handleAdminLogin({
      email,
      password,
      role: "OWNER",
    });
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center font-suit">
      <div className="w-full sm:max-w-[345px] top-[1.25rem] flex flex-col items-center justify-center">
        <div className="mb-[3rem] flex flex-col items-center gap-[0.875rem]">
          <Logo className="w-[4.625rem] h-[4.625rem]" />
          <LogoText className="w-[9rem] h-[2.75rem]"/>
        </div>

        <div className="w-full flex flex-col gap-[0.5rem] mb-[1.5rem]">
          <KeyInput
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative w-full">
            <KeyInput
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        </div>

        <div className="w-full flex flex-col gap-[0.5rem]">
          <CommonButton text="로그인" onClick={handleClickLogin} />
          <CommonButton
            text="회원가입"
            autoStyle={false}
            className="text-[#6970F3] bg-[#F0F1FE]"
            onClick={() => navigate("/admin/signin")}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;

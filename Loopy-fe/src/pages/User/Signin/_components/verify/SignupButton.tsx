import { useNavigate } from "react-router-dom";
import CommonButton from "../../../../../components/button/CommonButton";
import { useSignup } from "../../../../../hooks/mutation/signin/useSignup";
import type { SignupRequest } from "../../../../../apis/auth/signin/type";
import Storage from "../../../../../utils/storage";

interface SignupButtonProps {
  signupData: SignupRequest;
  isFormValid: boolean;
  isKeyboardOpen: boolean;
}

const SignupButton = ({
  signupData,
  isFormValid,
  isKeyboardOpen,
}: SignupButtonProps) => {
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useSignup();

  const handleClick = () => {
    if (!isFormValid || isPending) return;

    signup(signupData, {
      onSuccess: (res) => {
        console.log("회원가입 응답:", res);

        if (signupData.role) Storage.setRole(signupData.role);
        if (signupData.nickname) Storage.setNickname(signupData.nickname);

        navigate("/", { replace: true });
      },
      onError: (err: any) => {
        console.error("네트워크 오류", err.message);
      },
    });
  };

  return (
    <div
      className={`absolute left-0 w-full px-[1.5rem] transition-all duration-300 ${
        isKeyboardOpen ? "bottom-[4rem]" : "bottom-[2rem]"
      }`}
    >
      <CommonButton
        text="회원가입하기"
        onClick={handleClick}
        className={`w-full ${
          isFormValid ? "bg-[#6970F3] text-white" : "bg-[#CCCCCC] text-[#7F7F7F]"
        }`}  
        disabled={!isFormValid || isPending}
      />
    </div>
  );
};

export default SignupButton;

import CommonButton from "../../../../components/button/CommonButton";
import { useSignup } from "../../../../hooks/mutation/signin/useSignup";
import type { SignupRequest } from "../../../../apis/auth/signin/type";

interface AdminSignupButtonProps {
  signupData: SignupRequest;
  isFormValid: boolean;
  isKeyboardOpen: boolean;
  onNext: () => void;
}

const AdminSignupButton = ({
  signupData,
  isFormValid,
  isKeyboardOpen,
  onNext,
}: AdminSignupButtonProps) => {
  const { mutate: signup, isPending } = useSignup();

  const handleClick = () => {
    if (!isFormValid || isPending) return;

    signup(signupData, {
      onSuccess: (res) => {
        console.log("회원가입 응답:", res);
        onNext();
      },
      onError: (err) => {
        console.error("네트워크 오류", err.message);
      },
    });
  };

  return (
    <div
      className={`absolute left-1/2 transform -translate-x-1/2 w-full max-w-[34rem] transition-all duration-300 ${
        isKeyboardOpen ? "bottom-[4rem]" : "bottom-[2rem]"
      }`}
    >
      <CommonButton
        text="회원가입하기"
        onClick={handleClick}
        className={`w-full ${
          isFormValid
            ? "bg-[#6970F3] text-white"
            : "bg-[#CCCCCC] text-[#7F7F7F] pointer-events-none"
        }`}
        disabled={!isFormValid || isPending}
      />
    </div>
  );
};

export default AdminSignupButton;

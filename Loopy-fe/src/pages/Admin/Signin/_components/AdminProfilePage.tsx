import { useKeyboardOpen } from "../../../../hooks/useKeyboardOpen";
import CommonButton from "../../../../components/button/CommonButton";
import CommonHeader from "../../../../components/header/CommonHeader";
import AdminNicknameSection from "./sections/AdminNicknameSection";
import AdminPhoneSection from "./sections/AdminPhoneSection";
import type { FormData } from "../../../../types/form";

interface Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  onBack: () => void;
}

const AdminProfilePage = ({ formData, setFormData, onNext, onBack }: Props) => {
  const isKeyboardOpen = useKeyboardOpen();

  const isValid =
    !!formData.nickname &&
    !!formData.phoneNumber;

  return (
    <div className="min-h-screen w-full bg-white flex flex-col font-suit">
      <CommonHeader title="회원가입" onBack={onBack} />

      <div className="flex-1 pt-[1.5rem] pb-[8rem] max-w-[34rem] mx-auto w-full">
        <AdminNicknameSection
          value={formData.nickname}
          onChange={(nickname) =>
            setFormData((p) => ({ ...p, nickname }))
          }
        />

        <AdminPhoneSection
          value={formData.phoneNumber}
          onChange={(phoneNumber) =>
            setFormData((p) => ({ ...p, phoneNumber }))
          }
        />
      </div>

      <div
        className={`absolute left-1/2 translate-x-[-50%] w-full max-w-[34rem] flex flex-col items-center transition-all duration-300 ${
          isKeyboardOpen ? "bottom-[4rem]" : "bottom-[2rem]"
        }`}
      >
        <CommonButton
          text="회원가입하기"
          onClick={onNext}
          disabled={!isValid}
          className={`w-full ${
            isValid
              ? "bg-[#6970F3] text-white"
              : "bg-[#CCCCCC] text-[#7F7F7F] pointer-events-none"
          }`}
        />
      </div>
    </div>
  );
};

export default AdminProfilePage;

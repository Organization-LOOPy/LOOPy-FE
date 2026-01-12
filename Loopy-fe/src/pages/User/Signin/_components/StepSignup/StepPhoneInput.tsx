import CommonInput from "../../../../../components/input/CommonInput";
import CommonButton from "../../../../../components/button/CommonButton";
import { useKeyboardOpen } from "../../../../../hooks/useKeyboardOpen";
import type { FormData } from "../../../../../types/form";

interface Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
}

const formatPhoneNumber = (value: string) => {
  const numbersOnly = value.replace(/\D/g, "");

  if (numbersOnly.length <= 3) {
    return numbersOnly;
  }
  if (numbersOnly.length <= 7) {
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
  }
  return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
};

const StepPhoneInput = ({ formData, setFormData, onNext }: Props) => {
  const isKeyboardOpen = useKeyboardOpen();

  const isValid = formData.phoneNumber.replace(/-/g, "").length >= 10;

  return (
    <div>
      <p className="text-[1rem] font-semibold text-[#252525] mt-[1rem] mb-[0.5rem]">
        전화번호
      </p>
      <CommonInput
        placeholder="스탬프 적립을 위해 전화번호를 입력해주세요"
        value={formData.phoneNumber}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            phoneNumber: formatPhoneNumber(e.target.value),
          }))
        }
      />

      <div
        className={`absolute left-0 w-full px-[1.5rem] transition-all duration-300 ${
          isKeyboardOpen ? "bottom-[4rem]" : "bottom-[2rem]"
        }`}
      >
        <CommonButton
          text="다음으로 넘어가기"
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

export default StepPhoneInput;

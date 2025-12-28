import { usePasswordValidation } from "../../../../../hooks/usePasswordValidation";
import AdminPasswordInput from "../AdminPasswordInput";
import PasswordValidationHint from "../../../../User/Signin/_components/StepSignup/PasswordHint";
import type { FormData } from "../../../../../types/form";

interface Props {
  password: string;
  confirmPassword: string;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onValidityChange: (valid: boolean) => void;
}

const AdminPasswordSection = ({
  password,
  confirmPassword,
  setFormData,
  onValidityChange,
}: Props) => {
  const { lengthValid, comboValid, passwordMatch } =
    usePasswordValidation(password, confirmPassword);

  const isValid = lengthValid && comboValid && passwordMatch;

  onValidityChange(isValid);

  return (
    <>
      <p className="text-[1rem] font-semibold text-[#252525] mt-[1.5rem] mb-[0.5rem]">
        비밀번호
      </p>

      <AdminPasswordInput
        placeholder="비밀번호를 입력해주세요"
        value={password}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            password: e.target.value,
          }))
        }
      />

      <PasswordValidationHint
        lengthValid={lengthValid}
        comboValid={comboValid}
      />

      <p className="text-[1rem] font-semibold text-[#252525] mt-[1.5rem] mb-[0.5rem]">
        비밀번호 확인
      </p>

      <AdminPasswordInput
        placeholder="한번 더 비밀번호를 입력해주세요"
        value={confirmPassword}
        hasError={confirmPassword !== "" && !passwordMatch}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            confirmPassword: e.target.value,
          }))
        }
      />

      {!passwordMatch && confirmPassword && (
        <p className="text-[#FF0000] text-[0.75rem]">
          비밀번호가 일치하지 않습니다
        </p>
      )}
    </>
  );
};

export default AdminPasswordSection;

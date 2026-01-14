import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonHeader from "../../components/header/CommonHeader";
import CommonButton from "../../components/button/CommonButton";
import { useSavePhone } from "../../hooks/mutation/verify/useSavePhone";
import { useKeyboardOpen } from "../../hooks/useKeyboardOpen";
import { useQueryClient } from "@tanstack/react-query";
import { getIsDummyPhone } from "../../apis/auth/phoneCheck/api";
import Storage from "../../utils/storage";

const VerifyPage = () => {
  const navigate = useNavigate();
  const isKeyboardOpen = useKeyboardOpen();
  const queryClient = useQueryClient();

  const [phoneNumber, setPhoneNumber] = useState("");

  const { mutateAsync: savePhone, isPending } = useSavePhone();

  const normalizePhone = (num: string) => {
    const normalized = num.replace(/-/g, "");
    if (normalized.startsWith("+82")) {
      return "0" + normalized.slice(3);
    }
    return normalized;
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;

    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleSavePhone = async () => {
    try {
      const normalizedPhone = normalizePhone(phoneNumber);
      const res = await savePhone({ phoneNumber: normalizedPhone });

      if (res.token) {
        Storage.setAccessToken(res.token);
      }

      await queryClient.invalidateQueries();

      const result = await queryClient.fetchQuery({
        queryKey: ["isDummyPhone"],
        queryFn: () => getIsDummyPhone(),
      });

      if (result.isDummy || !result.phoneNumber?.startsWith("010")) {
        console.error("더미 번호 또는 유효하지 않은 번호");
        return;
      }

      navigate("/home", { replace: true });
    } catch (err) {
      console.error("전화번호 저장 실패", err);
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <CommonHeader title="전화번호" onBack={() => navigate(-1)} />

      <main className="flex-1 pt-6">
        <p className="text-[1rem] font-semibold text-[#252525] mb-2">
          전화번호
        </p>

        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
          inputMode="numeric"
          placeholder="스탬프 적립을 위해 전화번호를 입력해주세요"
          className="
            w-full h-[3.375rem]
            px-4
            rounded-[9px]
            bg-[#F4F4F4]
            text-[0.95rem]
            text-[#252525]
            placeholder:text-[#9A9A9A]
            outline-none
          "
        />
      </main>

      <div
        className={`absolute left-0 w-full px-[1.5rem] transition-all duration-300 ${
          isKeyboardOpen ? "bottom-[4rem]" : "bottom-[2rem]"
        }`}
      >
        <CommonButton
          text="저장하기"
          onClick={handleSavePhone}
          disabled={phoneNumber.replace(/\D/g, "").length !== 11 || isPending}
          className={`w-full ${
            phoneNumber.replace(/\D/g, "").length === 11
              ? "bg-[#6970F3] text-white"
              : "bg-[#CCCCCC] text-[#7F7F7F]"
          }`}
        />
      </div>
    </div>
  );
};

export default VerifyPage;

import { useEffect, useState } from "react";
import CommonInput from "../../../../../components/input/CommonInput";
import CommonButton from "../../../../../components/button/CommonButton";
import CommonHeader from "../../../../../components/header/CommonHeader";
import { useKeyboardOpen } from "../../../../../hooks/useKeyboardOpen";
import { usePatchNickname } from "../../../../../hooks/mutation/userInfo/usePatchNickname";
import { useMyInfo } from "../../../../../hooks/query/userInfo/useMyInfo";
import { useQueryClient } from "@tanstack/react-query";

interface EditProfileProps {
  onBack: () => void;
}

const EditProfile = ({ onBack }: EditProfileProps) => {
  const { data: myInfo, isLoading } = useMyInfo();
  const [nickname, setNickname] = useState("");
  const isKeyboardOpen = useKeyboardOpen();
  const { mutate, isPending } = usePatchNickname();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (myInfo) {
      setNickname(myInfo.nickname);
    }
  }, [myInfo]);

  const isValid = nickname.trim().length > 0;

  const handleSave = () => {
    if (!isValid) return;
    console.log("myInfo.nickname", myInfo?.nickname);

    mutate(
      { nickname },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["myInfo"] });
          onBack();
        },
        onError: (err) => {
          console.error("닉네임 변경 실패:", err);
          alert("닉네임 변경에 실패했어요.");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-75px)]">
        <div className="w-8 h-8 border-4 border-[#DFDFDF] border-t-[#6970F3] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <CommonHeader title="개인정보 수정" onBack={onBack} />
      <div className="flex flex-col justify-between mt-[1.5rem]">
        <div>
          <p className="text-[1rem] font-semibold text-[#252525] mb-[0.5rem]">닉네임</p>
          <CommonInput
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <div
          className={`absolute left-0 w-full px-[1.5rem] transition-all duration-300 ${
            isKeyboardOpen ? "bottom-[4rem]" : "bottom-[2rem]"
          }`}
        >
          <CommonButton
            text="저장하기"
            onClick={handleSave}
            className={`w-full ${
              isValid
                ? "bg-[#6970F3] text-white"
                : "bg-[#CCCCCC] text-[#7F7F7F] pointer-events-none"
            }`}
            disabled={!isValid || isPending}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;

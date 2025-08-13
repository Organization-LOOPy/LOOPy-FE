import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonBottomPopup from "../../../../../components/popup/CommonBottomPopup";
import CommonHeader from "../../../../../components/header/CommonHeader";
import DefaultAccountView from "./DefaultAccountView";
import { useMyInfo } from "../../../../../hooks/query/userInfo/useMyInfo";
import { useLogout } from "../../../../../hooks/mutation/logout/useLogout";

interface ManageAccountProps {
  onBack: () => void;
  onGoWithdraw: () => void;
}

const ManageAccount = ({ onGoWithdraw, onBack }: ManageAccountProps) => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();

  const { data: myInfo, isLoading } = useMyInfo();
  const { mutate: logout } = useLogout(
    () => {
      navigate("/"); 
    },
    (error) => {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했어요. 다시 시도해주세요.");
    }
  );

  const handleLogout = () => {
    logout();
    setShowLogoutPopup(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-75px)]">
        <div className="w-8 h-8 border-4 border-[#DFDFDF] border-t-[#6970F3] rounded-full animate-spin" />
      </div>
    );
  }

  const allowKakaoAlert = myInfo?.allowKakaoAlert ?? false;
  const email = allowKakaoAlert ? myInfo?.email ?? "" : "";

  return (
    <>
      <CommonHeader title="설정" onBack={onBack} />

      <DefaultAccountView
        email={email}
        allowKakaoAlert={allowKakaoAlert}
        onClickLogout={() => setShowLogoutPopup(true)}
        onClickWithdraw={onGoWithdraw}
      />

      <CommonBottomPopup
        show={showLogoutPopup}
        onClose={() => setShowLogoutPopup(false)}
        titleText="로그아웃할까요?"
        contentsText="다시 로그인하면 루피 서비스를 이용하실 수 있어요"
        purpleButton="로그아웃하기"
        purpleButtonOnClick={handleLogout}
      />
    </>
  );
};

export default ManageAccount;

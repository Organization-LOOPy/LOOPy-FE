import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonSideBar from "../../../../components/admin/sideBar/CommonSideBar";
import CommonTopBar from "../../../../components/admin/topBar/CommonTopBar";
import { useLogout } from "../../../../hooks/mutation/logout/useLogout";
import AdminDefaultAccountView from "./AdminDefaultAccountView";
import AdminWithdrawView from "./AdminWithdrawView"; 
import CommonTwoButtonModal from "../../../../components/admin/modal/CommonTwoButtonModal";
import CommonCompleteModal from "../../../../components/admin/modal/CommonCompleteModal";

interface Props {
  onBack: () => void;
}

const AdminManageAccount = ({ onBack }: Props) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLogoutComplete, setShowLogoutComplete] = useState(false);
  const [isWithdrawMode, setIsWithdrawMode] = useState(false); 
  const navigate = useNavigate();

  const { mutate: logout } = useLogout(
    () => {
      setShowLogoutModal(false);
      setShowLogoutComplete(true);
    },
    (error) => {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했어요. 다시 시도해주세요.");
    }
  );

  const handleLogout = () => {
    logout();
  };

  // const allowKakaoAlert = myInfo?.allowKakaoAlert ?? false;
  // const email = allowKakaoAlert ? myInfo?.email ?? "" : "";

  return (
    <div className="w-full min-h-screen flex font-suit text-[#252525]">
      <CommonSideBar />

      <div className="flex-1 flex flex-col ml-[12.875rem]">
        <CommonTopBar
          title={isWithdrawMode ? "회원탈퇴" : "계정 관리"} 
          profileImageUrl=""
          onBack={() => {
            if (isWithdrawMode) {
              setIsWithdrawMode(false); 
            } else {
              onBack();
            }
          }}
        />

        <main className="flex-1">
          {isWithdrawMode ? (
            <AdminWithdrawView />
          ) : (
            <AdminDefaultAccountView
              // email={email}
              // allowKakaoAlert={allowKakaoAlert}
              onClickLogout={() => setShowLogoutModal(true)}
              onClickWithdraw={() => setIsWithdrawMode(true)} 
            />
          )}
        </main>
      </div>

      {showLogoutModal && (
        <CommonTwoButtonModal
          onClose={() => setShowLogoutModal(false)}
          title="로그아웃할까요?"
          message="다시 로그인하면 루피 서비스를 이용하실 수 있어요"
          purpleButton="로그아웃하기"
          purpleButtonOnClick={handleLogout}
        />
      )}

      {showLogoutComplete && (
        <CommonCompleteModal
          message="로그아웃되었습니다"
          onClose={() => {
            setShowLogoutComplete(false);
            navigate("/");
          }}
        />
      )}
    </div>
  );
};

export default AdminManageAccount;

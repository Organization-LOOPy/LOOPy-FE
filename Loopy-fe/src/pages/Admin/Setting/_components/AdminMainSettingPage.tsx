import CommonSideBar from '../../../../components/admin/sideBar/CommonSideBar';
import CommonTopBar from '../../../../components/admin/topBar/CommonTopBar';
import NextIcon from '../../../../assets/images/Next.svg?react';
import type { AdminSettingSteps } from '../../../../types/adminSteps';

interface Props {
  onNavigate: (step: keyof AdminSettingSteps) => void;
}

const AdminMainSettingPage = ({ onNavigate }: Props) => {
  return (
    <div className="w-full min-h-screen flex font-suit text-[#252525]">
      <CommonSideBar />

      <div className="flex-1 flex flex-col ml-[12.875rem]">
        <CommonTopBar title="설정" profileImageUrl="" />

        <main className="flex-1">
          <div className="flex flex-col gap-[1.25rem]">
            <button
              onClick={() => onNavigate('editProfile')}
              className="flex w-full items-center justify-between text-[1.125rem] font-medium"
            >
              <span>매장정보 수정</span>
              <NextIcon className="w-[1rem] h-[1rem] text-[#A8A8A8]" />
            </button>

            <button
              onClick={() => onNavigate('manageAccount')}
              className="flex w-full items-center justify-between text-[1.125rem] font-medium"
            >
              <span>계정 관리</span>
              <NextIcon className="w-[1rem] h-[1rem] text-[#A8A8A8]" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminMainSettingPage;

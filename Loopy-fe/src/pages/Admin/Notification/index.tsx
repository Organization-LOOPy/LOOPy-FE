import { useState } from 'react';
import CommonAdminButton from '../../../components/admin/button/CommonAdminButton';
import CommonSideBar from '../../../components/admin/sideBar/CommonSideBar';
import CommonTopBar from '../../../components/admin/topBar/CommonTopBar';
import NotificationInput from './_components/NotificationInput';
import CommonCompleteModal from '../../../components/admin/modal/CommonCompleteModal';

const AdminNotificationPage = () => {
  const [completeMessage, setCompleteMessage] = useState<string | null>(null);

  return (
    <div>
      <CommonSideBar />
      <div className="flex-1 flex flex-col ml-[12.875rem] mb-8">
        <CommonTopBar title="메시지 전송" profileImageUrl="" />
        <div className="text-[1.125rem] font-bold leading-none mb-2 mt-6">
          알림 메시지 작성
        </div>
        <div className="text-[#7F7F7F] text-[0.875rem] mb-6">
          우리 매장 알림을 설정한 고객님께 메시지를 보내보세요.
        </div>
        <NotificationInput />
        <CommonAdminButton
          label="알림 메시지 보내기"
          onClick={() =>
            setCompleteMessage('알림 메시지를 성공적으로 보냈어요!')
          }
        />
      </div>

      {completeMessage && (
        <CommonCompleteModal
          onClose={() => setCompleteMessage(null)}
          message={completeMessage}
        />
      )}
    </div>
  );
};

export default AdminNotificationPage;

import { useState } from 'react';
import CommonAdminButton from '../../../components/admin/button/CommonAdminButton';
import CommonSideBar from '../../../components/admin/sideBar/CommonSideBar';
import CommonTopBar from '../../../components/admin/topBar/CommonTopBar';
import NotificationInput from './_components/NotificationInput';
import CommonCompleteModal from '../../../components/admin/modal/CommonCompleteModal';
import { useSendCafeNotification } from '../../../hooks/query/admin/notification/useSendCafeNotification';
import type { SendNotificationResponse } from '../../../apis/admin/notification/type';
import { useAdminCafe } from '../../../contexts/AdminContext';

const ButtonSpinner = () => (
  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
);

const AdminNotificationPage = () => {
  const [message, setMessage] = useState('');
  const [completeMessage, setCompleteMessage] = useState<string | null>(null);
  const { activeCafeId } = useAdminCafe();

  console.log('activeCafeId', activeCafeId);
  const cafeId = activeCafeId ?? 1;

  const sendNotificationMutation: ReturnType<typeof useSendCafeNotification> =
    useSendCafeNotification(
      (data) =>
        setCompleteMessage(data.success || '알림 메시지가 전송되었습니다.'),
      (error) => {
        if (typeof error === 'object' && error !== null && 'error' in error) {
          alert('알림 전송 실패: ' + (error as SendNotificationResponse).error);
        } else {
          alert('알림 전송 실패: 알 수 없는 오류');
        }
      },
    );

  const handleSend = () => {
    if (!message.trim()) {
      alert('메시지를 입력해주세요.');
      return;
    }
    sendNotificationMutation.mutate({ cafeId, message });
  };

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
        <NotificationInput value={message} onChange={setMessage} />

        {/* 버튼 */}
        <CommonAdminButton
          label={
            sendNotificationMutation.isPending ? (
              <ButtonSpinner />
            ) : (
              '알림 메시지 보내기'
            )
          }
          onClick={handleSend}
          disabled={sendNotificationMutation.isPending}
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

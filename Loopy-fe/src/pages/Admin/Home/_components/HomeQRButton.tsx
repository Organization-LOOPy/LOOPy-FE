import { useState } from 'react';
import AdminQRIcon from '../../../../assets/images/AdminQRIcon.svg?react';
import HomeButton from '../_components/HomeButton';
import QRModal from '../_components/modal/QRModal';
import type { Customer } from '../types/CustomerData';
import CommonTwoButtonModal from '../../../../components/admin/modal/CommonTwoButtonModal';
import CommonCompleteModal from '../../../../components/admin/modal/CommonCompleteModal';

type ConfirmInfo = {
  title: string;
  type: '사용' | '인증';
} | null;

const HomeQRButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pointCustomer, setPointCustomer] = useState<Customer | null>(null);
  const [completeMessage, setCompleteMessage] = useState<string | null>(null);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const [confirmInfo, setConfirmInfo] = useState<ConfirmInfo>(null);

  const handleConfirmAction = (title: string, type: '사용' | '인증') => {
    setConfirmInfo({ title, type });
    setIsModalOpen(false);
  };

  const handleCloseConfirm = () => setConfirmInfo(null);

  const mockCustomerDB: Record<string, Customer> = {
    '01012345678': {
      name: '홍길동',
      points: 1200,
      stamps: 3,
      coupons: [
        { expiry: '2025.09.15', title: '아메리카노 200원 할인쿠폰' },
        { expiry: '2025.10.01', title: '디카페인 무료 업그레이드' },
      ],
      challenges: [{ expiry: '2025.09.30', title: '텀블러 사용 챌린지' }],
    },
    '10003': {
      name: '감자먹자',
      points: 1200,
      stamps: 3,
      coupons: [
        { expiry: '2025.09.15', title: '아메리카노 200원 할인쿠폰' },
        { expiry: '2025.10.01', title: '디카페인 무료 업그레이드' },
      ],
      challenges: [{ expiry: '2025.09.30', title: '텀블러 사용 챌린지' }],
    },
    '01098765432': {
      name: '김이박',
      points: 850,
      stamps: 5,
      coupons: [],
      challenges: [],
    },
    '01011112222': {
      name: '이몽룡',
      points: 150,
      stamps: 1,
      coupons: [{ expiry: '2025.08.20', title: '음료 1+1 쿠폰' }],
      challenges: [],
    },
  };

  const lookupCustomer = async (phone: string): Promise<Customer | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const customer = mockCustomerDB[phone] || null;
        resolve(customer);
      }, 500);
    });
  };

  return (
    <>
      <HomeButton
        Icon={AdminQRIcon}
        label="맴버쉽 QR스캔"
        onClick={handleOpen}
        aria-label="맴버쉽 QR 스캔 버튼"
      />
      {isModalOpen && (
        <QRModal
          onClose={handleClose}
          onSubmit={lookupCustomer}
          onConfirmAction={handleConfirmAction}
          onPointUseClick={(customer) => {
            setIsModalOpen(false);
            setPointCustomer(customer);
          }}
        />
      )}
      {confirmInfo && (
        <CommonTwoButtonModal
          onClose={handleCloseConfirm}
          title={
            confirmInfo.type === '사용'
              ? `${confirmInfo.title}을 사용 처리할까요?`
              : `${confirmInfo.title} 인증을 진행할까요?`
          }
          message={
            confirmInfo.type === '사용'
              ? '사용 시 고객님의 쿠폰 목록에서 삭제되며 해당 혜택이 즉시 적용되어요'
              : '인증 후에는 취소가 불가능합니다. 모든 인증이 완료되면\n고객에게 리워드가 자동 지급되어요'
          }
          purpleButton={
            confirmInfo.type === '사용' ? '쿠폰 사용 처리하기' : '인증 진행하기'
          }
          purpleButtonOnClick={() => {
            console.log(`${confirmInfo.title} - ${confirmInfo.type} 완료`);
            setCompleteMessage(
              confirmInfo.type === '사용'
                ? `${confirmInfo.title}을 사용 처리했어요!`
                : `${confirmInfo.title} 인증이 완료되었어요!`,
            );
            handleCloseConfirm();
          }}
        />
      )}
      {pointCustomer && (
        <CommonTwoButtonModal
          onClose={() => setPointCustomer(null)}
          title={
            <>
              <span className="text-black">{pointCustomer.name} 고객님의 </span>
              <span className="text-[#6970F3] font-semibold">
                {pointCustomer.points} 포인트
              </span>
              <span className="text-black">를 사용할까요?</span>
            </>
          }
          message="포인트를 사용한 후에는 취소가 어려워요"
          purpleButton="포인트 사용하기"
          purpleButtonOnClick={() => {
            console.log(`${pointCustomer.name} 포인트 사용하기`);
            setCompleteMessage(
              `${pointCustomer.name}님의 포인트 사용이 완료되었어요!`,
            );
            setPointCustomer(null);
          }}
        />
      )}
      {completeMessage && (
        <CommonCompleteModal
          onClose={() => setCompleteMessage(null)}
          message={completeMessage}
        />
      )}
    </>
  );
};

export default HomeQRButton;

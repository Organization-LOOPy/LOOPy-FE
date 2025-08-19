import { useEffect, useRef, useState } from 'react';
import QRScannerSection from './_components/QRScannerSection';
import CustomerInfoSection from './_components/QRCustomerInfoSection';
import type { Customer } from '../../types/CustomerData';
import useVerifyQRToken from '../../../../../hooks/query/admin/home/useVerifyQRToken';

type QRModalProps = {
  onClose: () => void;
  onConfirmAction: (
    title: string,
    type: '사용' | '인증',
    couponId?: number,
    userId?: number,
  ) => void;
  onPointUseClick: (customer: Customer) => void;
  onSubmit: (userId: number) => Promise<Customer | null>;
};

export default function QRModal({
  onClose,
  onConfirmAction,
  onPointUseClick,
}: QRModalProps) {
  const [userId, setUserId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [scanCompleted, setScanCompleted] = useState(false);
  const submitTimeoutRef = useRef<number | null>(null);

  const mutation = useVerifyQRToken({
    onSuccess: (data) => {
      if (data.resultType === 'SUCCESS' && data.success) {
        setCustomer({
          userId: data.success.userId,
          name: data.success.nickname,
          points: data.success.point.total,
          stamps: data.success.stamp.totalCount,
          coupons: data.success.availableCoupons.map((c) => ({
            id: c.userCouponId,
            expiry: c.expiredAt,
            title: c.name,
          })),
          challenges: data.success.ongoingChallenges.map((ch) => ({
            id: ch.challengeId,
            expiry: ch.expiredAt,
            title: ch.title,
          })),
        });
        setScanCompleted(true);
        setError(null);
      } else if (data.resultType === 'FAIL') {
        setError(data.error.reason || '고객 정보를 찾을 수 없습니다.');
        setCustomer(null);
      }
    },
    onError: () => {
      setError('고객 정보를 불러오는 데 실패했습니다.');
      setCustomer(null);
    },
  });

  const handlePointUse = (customer: Customer) => {
    if (!customer) return;
    onPointUseClick(customer);
  };

  const handleDetect = (decoded: string) => {
    const digits = decoded.replace(/\D/g, '');
    if (!digits) return;

    const parsedUserId = Number(digits);
    if (!parsedUserId || parsedUserId === userId) return;

    setUserId(parsedUserId);
    setError(null);
    setCustomer(null);

    if (submitTimeoutRef.current) {
      clearTimeout(submitTimeoutRef.current);
    }

    submitTimeoutRef.current = window.setTimeout(() => {
      mutation.mutate({ userId: parsedUserId });
    }, 300);
  };

  const handleRescan = () => {
    setCustomer(null);
    setUserId(null);
    setError(null);
    setScanCompleted(false);
  };

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-[835px] h-[584px] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-6 border-b border-[#DFDFDF]">
          <div className="text-[1.125rem] font-extrabold flex-1">
            쿠폰/포인트 사용, 챌린지 인증을 위해 고객의 멤버쉽 QR을
            스캔해주세요.
          </div>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="text-gray-500 hover:text-gray-800 text-2xl leading-none ml-4"
          >
            ×
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <QRScannerSection
            scanCompleted={scanCompleted}
            onRescan={handleRescan}
            onDetect={handleDetect}
            error={error}
          />
          <CustomerInfoSection
            customer={customer}
            scanCompleted={scanCompleted}
            phone={userId ? String(userId) : ''}
            onConfirmAction={onConfirmAction}
            onPointUseClick={handlePointUse}
            isLoading={mutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}

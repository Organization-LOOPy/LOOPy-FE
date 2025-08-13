import { useEffect, useRef, useState } from 'react';
import QRScanner from '../QRScanner';
import CustomerInfoCard from '../CustomerInfoCard';
import type { Customer } from '../../types/CustomerData';

type QRModalProps = {
  onClose: () => void;
  onSubmit: (phone: string) => Promise<Customer | null>;
  onConfirmAction: (title: string, type: '사용' | '인증') => void;
  onPointUseClick: (customer: Customer) => void;
};

export default function QRModal({
  onClose,
  onSubmit,
  onConfirmAction,
  onPointUseClick,
}: QRModalProps) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [scanCompleted, setScanCompleted] = useState(false);
  const submitTimeoutRef = useRef<number | null>(null);

  const handleRescan = () => {
    setCustomer(null);
    setPhone('');
    setError(null);
    setScanCompleted(false);
  };

  const formattedPhone = phone
    ? phone.replace(/(\d{3})(\d{4})(\d{0,4})/, (_, a, b, c) =>
        c ? `${a}-${b}-${c}` : b ? `${a}-${b}` : a,
      )
    : '';

  const handleDetect = (decoded: string) => {
    const digits = decoded.replace(/\D/g, '').slice(0, 11);
    if (!digits || digits === phone) return;

    setPhone(digits);
    setError(null);
    setCustomer(null); // 초기화

    if (submitTimeoutRef.current) {
      clearTimeout(submitTimeoutRef.current);
    }

    submitTimeoutRef.current = window.setTimeout(async () => {
      try {
        const customerData = await onSubmit(digits);
        if (customerData) {
          setCustomer(customerData);
          setScanCompleted(true);
        } else {
          setError('고객 정보를 찾을 수 없습니다.');
        }
      } catch (e) {
        setError('고객 정보를 불러오는 데 실패했습니다.');
      }
    }, 300);
  };

  const handleError = (msg: string) => {
    setError(msg);
  };

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    // 테스트용 더미 데이터 - UI 확인용
    setCustomer({
      name: '홍길동',
      points: 1200,
      stamps: 8,
      coupons: [
        { expiry: '2025.09.15', title: '아메리카노 200원 할인쿠폰' },
        { expiry: '2025.10.01', title: '디카페인 무료 업그레이드' },
      ],
      challenges: [
        { expiry: '2025.09.30', title: '텀블러 사용 챌린지' },
        { expiry: '2025.11.05', title: '주 3회 방문 챌린지' },
        { expiry: '2025.11.05', title: '주 3회 방문 챌린지' },
      ],
    });
    setScanCompleted(true);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-[835px] h-[584px] flex flex-col overflow-hidden">
        {/* 헤더 */}
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
          <div className="flex-1 flex flex-col items-center overflow-hidden">
            <div className="w-[29rem] h-[32rem] relative bg-white rounded-lg flex items-center justify-center">
              {scanCompleted ? (
                <>
                  <div className="absolute top-2 right-2 overflow-hidden">
                    <button
                      onClick={handleRescan}
                      className="text-[1rem] text-black underline p-4"
                    >
                      스캔 다시하기
                    </button>
                  </div>
                  <div className="text-center text-[1rem] font-semibold text-[#7F7F7F] px-4">
                    고객의 멤버쉽 QR 스캔이 완료되었어요!
                  </div>
                </>
              ) : (
                <QRScanner onDetect={handleDetect} onError={handleError} />
              )}
            </div>

            {error && <div className="text-sm text-red-500 my-2">{error}</div>}
          </div>

          <div
            className={`w-[23.188rem] p-6 flex flex-col ${
              scanCompleted ? 'bg-[#F0F1FE]' : 'bg-[#F3F3F3]'
            }`}
          >
            <div className="text-[1rem] text-[#7F7F7F] font-semibold mb-6 leading-none">
              고객 정보
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hidden">
              <div className="min-h-full flex flex-col">
                {customer ? (
                  <div>
                    <div className="flex w-full justify-between gap-[3.188rem]">
                      <div className="text-[1.5rem] font-bold leading-none">
                        {customer.name}
                      </div>
                      <button
                        className="w-[6rem] h-[2.125rem] text-[0.875rem] font-semibold rounded-md bg-[#6970F3] text-white"
                        aria-label="포인트 사용"
                        onClick={() => {
                          if (customer) {
                            onClose();
                            onPointUseClick(customer);
                          }
                        }}
                      >
                        포인트 사용
                      </button>
                    </div>
                    <div className="flex mt-4 mb-8">
                      <div className="flex gap-4 w-[10.094rem] h-[3.125rem] py-[1rem] items-center justify-center border-y border-r border-[#A8A8A8]">
                        <div className="text-[0.875rem] font-semibold leading-none">
                          스탬프
                        </div>
                        <div className="text-[1.125rem] text-[#6970F3] font-bold leading-none ">
                          {customer.stamps}개
                        </div>
                      </div>
                      <div className="flex gap-4 w-[10.094rem] h-[3.125rem] py-[1rem] items-center justify-center border-y border-[#A8A8A8]">
                        <div className="text-[0.875rem] font-semibold leading-none">
                          포인트
                        </div>
                        <div className="text-[1.125rem] text-[#6970F3] font-bold leading-none ">
                          {customer.points}p
                        </div>
                      </div>
                    </div>
                    <div className="text-[#252525] text-[1rem] font-semibold mb-4">
                      소지한 쿠폰
                    </div>
                    {customer.coupons.map((c, idx) => (
                      <CustomerInfoCard
                        key={idx}
                        expiry={c.expiry}
                        title={c.title}
                        type="사용"
                        onClick={() => onConfirmAction(c.title, '사용')}
                      />
                    ))}
                    <div className="text-[#252525] text-[1rem] font-semibold mt-4 mb-4">
                      참여 중인 챌린지
                    </div>
                    {customer.challenges.map((c, idx) => (
                      <CustomerInfoCard
                        key={idx}
                        expiry={c.expiry}
                        title={c.title}
                        type="인증"
                        onClick={() => onConfirmAction(c.title, '인증')}
                      />
                    ))}
                  </div>
                ) : phone ? (
                  <div className="mt-[11rem] text-lg font-semibold mb-1 text-center">
                    {formattedPhone}
                  </div>
                ) : (
                  <div className="mt-[11rem] text-[#A8A8A8] whitespace-pre-line text-center ">
                    고객의 멤버쉽 QR을 스캔해
                    <br />
                    고객 정보를 조회해주세요
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

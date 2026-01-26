import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import CustomerInfoPanel from './_components/CustomerInfoPanel';
import ModalHeader from './_components/ModalHeader';
import PhoneInputKeypad from './_components/PhoneInputKeypad';
import useAddStamp from '../../../../../hooks/query/admin/home/useAddStamp';
import mixpanel from "mixpanel-browser";

export type Customer = {
  userId: number;
  name: string;
  points: number;
  stamps: number;
  stampBook?: number;
  actionToken: string;
};

type KeypadModalProps = {
  onClose: () => void;
  lookupCustomer: (phone: string) => Promise<Customer | null>;
  onApplyStamp: (phone: string, customer: Customer) => void;
};

type ActionTokenPayload = { cafeId?: number | string };

const decodeJwtPayload = <T,>(token: string): T | null => {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const json = decodeURIComponent(
      atob(padded)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );

    return JSON.parse(json) as T;
  } catch {
    return null;
  }
};

export default function KeypadModal({
  onClose,
  lookupCustomer,
  onApplyStamp,
}: KeypadModalProps) {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'notfound' | 'error'
  >('idle');
  const [customer, setCustomer] = useState<Customer | null>(null);
  const queryClient = useQueryClient();

  const addDigit = (d: string) => {
    if (phone.length >= 11) return;
    setPhone((p) => p + d);
    setStatus('idle');
    setCustomer(null);
  };

  const backspace = () => {
    setPhone((p) => p.slice(0, -1));
    setStatus('idle');
    setCustomer(null);
  };

  const handleLookup = async () => {
  console.log('lookup phone (raw):', phone);
  if (!phone) return;
  setStatus('loading');

  setCustomer(null);
  try {
    const result = await lookupCustomer(phone);
    if (result) {
      setCustomer(result);
      setStatus('success');

      const payload = decodeJwtPayload<ActionTokenPayload>(result.actionToken);
      const cafeId = payload?.cafeId;

      mixpanel.track("phone_lookup_succeeded", {
        user_id: `user_${result.userId}`,
        user_role: "customer",
        store_id: cafeId != null ? `cafe_${cafeId}` : "unknown",
        platform: "web",
      });

    } else {
      setStatus('notfound');
    }
  } catch (e) {
    console.error(e);
    setStatus('error');
  }
};

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // IME 입력 조합 중이면 무시(한글 입력 등)
      if (e.isComposing) return;

      // 숫자(상단 숫자키, 넘버패드 모두 대응)
      if (/^\d$/.test(e.key)) {
        e.preventDefault();
        addDigit(e.key);
        return;
      }

      // 백스페이스
      if (e.key === 'Backspace') {
        e.preventDefault();
        backspace();
        return;
      }

      // Enter = 조회
      if (e.key === 'Enter') {
        // 로딩 중이거나 번호 없으면 조회 막기
        if (!phone || status === 'loading') return;
        e.preventDefault();
        handleLookup();
        return;
      }

      // ESC = 닫기(원하면)
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', onKeyDown, { capture: true } as any);
  }, [phone, status, onClose]); // addDigit/backspace/handleLookup는 내부에서 상태 참조하므로 phone/status 의존


  const { mutate: addStamp } = useAddStamp();

  const handleApply = () => {
    if (!customer) return;

    if (!customer.stampBook) {
      console.info('현재 진행 중인 스탬프북이 없습니다. 새로 생성합니다.');
      return;
    }

    addStamp(
      { userId: customer.userId, actionToken: customer.actionToken },
      {
        onSuccess: async () => {
          const payload = decodeJwtPayload<ActionTokenPayload>(customer.actionToken);
          const cafeId = payload?.cafeId;

          mixpanel.track("stamp_earned", {
            user_id: `user_${customer.userId}`,
            user_role: "customer",
            store_id: cafeId != null ? `cafe_${cafeId}` : "unknown",
            stamp_count: customer.stamps + 1,
            platform: "web",
          });

          await queryClient.invalidateQueries({ queryKey: ['ownerStampStats'] });

          await queryClient.invalidateQueries({
            queryKey: ['searchUserByPhone', phone],
          });

          setCustomer((prev) => (prev ? { ...prev, stamps: prev.stamps + 1 } : prev));
          onApplyStamp(phone, customer);
        },
        onError: (err) => {
          console.error('스탬프 적립 실패', err);
        },
      },
    );
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
        <ModalHeader onClose={onClose} />
        <div className="flex flex-1 gap-0 overflow-hidden">
          <PhoneInputKeypad
            phone={phone}
            addDigit={addDigit}
            backspace={backspace}
            onLookup={handleLookup}
            status={status}
            disabledLookup={!phone || status === 'loading'}
          />
          <CustomerInfoPanel
            status={status}
            customer={customer}
            onApply={handleApply}
          />
        </div>
      </div>
    </div>
  );
}

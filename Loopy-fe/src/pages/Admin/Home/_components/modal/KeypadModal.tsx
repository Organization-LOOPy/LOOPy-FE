import { useEffect, useState } from 'react';
import CustomerInfoPanel from './_components/CustomerInfoPanel';
import ModalHeader from './_components/ModalHeader';
import PhoneInputKeypad from './_components/PhoneInputKeypad';
import useAddStamp from '../../../../../hooks/query/admin/home/useAddStamp';

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
      } else {
        setStatus('notfound');
      }
    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  };

  const { mutate: addStamp } = useAddStamp();

  const handleApply = () => {
    if (!customer) return;

    if (!customer.stampBook) {
      console.info('현재 진행 중인 스탬프북이 없습니다. 새로 생성합니다.');
      return;
    }

    addStamp(
      {
        userId: customer.userId,
        actionToken: customer.actionToken,
      },
      {
        onSuccess: () => {
          setCustomer((prev) =>
            prev ? { ...prev, stamps: prev.stamps + 1 } : prev,
          );
          onApplyStamp(phone, customer);
        },
        onError: (err: unknown) => {
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

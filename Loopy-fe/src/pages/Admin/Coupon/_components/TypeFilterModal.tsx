import CommonTwoButtonModal from '../../../../components/admin/modal/CommonTwoButtonModal';
import ResetIcon from '../../../../assets/images/AllReset.svg?react';

export type CouponTypeKey = 'DISCOUNT' | 'SIZE_UP' | 'FREE_DRINK';

const TYPE_LABEL: Record<CouponTypeKey, string> = {
  DISCOUNT: '금액 할인',
  SIZE_UP: '사이즈업',
  FREE_DRINK: '무료 음료',
};

interface Props {
  open: boolean;
  value: CouponTypeKey[];  
  onToggle: (key: CouponTypeKey) => void;
  onReset: () => void;
  onClose: () => void;
  onSave: () => void;
}

const TypeFilterModal = ({ open, value, onToggle, onReset, onClose, onSave }: Props) => {
  if (!open) return null;

  const Pill = ({ keyName }: { keyName: CouponTypeKey }) => {
    const active = value.includes(keyName);
    return (
      <button
        type="button"
        onClick={() => onToggle(keyName)}
        className={`px-5 py-2 rounded-[30px] text-[0.875rem] outline-none border border-[0.5px]
          ${active ? 'border-[#6970F3] bg-[#F0F1FE] text-[#6970F3]' : 'border-[#A8A8A8] text-[#3B3B3B]'}
        `}
      >
        {TYPE_LABEL[keyName]}
      </button>
    );
  };

  return (
    <CommonTwoButtonModal
      title="유형"
      purpleButton="저장하기"
      purpleButtonOnClick={onSave}
      onClose={onClose}
      titleAlign="start"
    >
      <div className="flex items-center justify-between mt-4 mb-10">
        <div className="flex items-center gap-3">
          <Pill keyName="DISCOUNT" />
          <Pill keyName="SIZE_UP" />
          <Pill keyName="FREE_DRINK" />
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 text-[#7F7F7F] text-[0.875rem]"
        >
          <ResetIcon className="w-4 h-4" />
          전체 초기화
        </button>
      </div>
    </CommonTwoButtonModal>
  );
};

export default TypeFilterModal;

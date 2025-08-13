import CheckCircle from "../../../User/Signin/_components/CheckCircle";

interface Props {
  value: 'discount' | 'size' | 'freeDrink' | null;
  onChange: (value: 'discount' | 'size' | 'freeDrink') => void;
  discountAmount: string;
  onChangeDiscountAmount: (amount: string) => void;
}

const CouponTypeSection = ({
  value,
  onChange,
  discountAmount,
  onChangeDiscountAmount,
}: Props) => {
  return (
    <section className="mb-6">
      <h3 className="font-bold text-[1.125rem] text-[#252525] mb-[1.5rem]">쿠폰 유형</h3>
      <div className="flex gap-6">
        {(['discount', 'size', 'freeDrink'] as const).map((type) => (
          <div
            key={type}
            className="flex items-center gap-[0.75rem] cursor-pointer"
            onClick={() => onChange(type)}
          >
            <CheckCircle checked={value === type} />
            <span
              className={`text-[0.875rem] font-normal ${
                value === type ? 'text-[#6970F3]' : 'text-[#252525]'
              }`}
            >
              {type === 'discount' ? '금액 할인' : type === 'size' ? '사이즈업' : '무료 음료'}
            </span>
          </div>
        ))}
      </div>

      {value === 'discount' && (
        <div className="mt-3 font-normal text-[1rem] flex items-center gap-3">
          <input
            type="number"
            value={discountAmount}
            onChange={(e) => onChangeDiscountAmount(e.target.value)}
            placeholder="금액 입력"
            className="rounded-[8px] px-[1rem] py-[0.75rem] bg-[#F3F3F3] w-[6.75rem] focus:outline-none"
          />
          <span className="text-[#252525]">원 할인</span>
        </div>
      )}
    </section>
  );
};

export default CouponTypeSection;

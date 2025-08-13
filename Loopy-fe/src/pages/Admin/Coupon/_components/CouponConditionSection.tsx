import CheckCircle from "../../../User/Signin/_components/CheckCircle";

interface Props {
  value: boolean | null;
  onChange: (value: boolean) => void;
  conditionText: string;
  onChangeConditionText: (text: string) => void;
}

const CouponConditionSection = ({
  value,
  onChange,
  conditionText,
  onChangeConditionText,
}: Props) => {
  return (
    <section className="mb-8">
      <h3 className="font-bold text-[1.125rem] text-[#252525] mb-[1.5rem]">쿠폰 사용 조건</h3>
      <div className="flex gap-6">
        <div
          className="flex items-center gap-[0.75rem] cursor-pointer"
          onClick={() => onChange(true)}
        >
          <CheckCircle checked={value === true} />
          <span className={`text-[0.875rem] font-normal ${value === true ? 'text-[#6970F3]' : 'text-[#252525]'}`}>
            있음
          </span>
        </div>
        <div
          className="flex items-center gap-[0.75rem] cursor-pointer"
          onClick={() => onChange(false)}
        >
          <CheckCircle checked={value === false} />
          <span className={`text-[0.875rem] font-normal ${value === false ? 'text-[#6970F3]' : 'text-[#252525]'}`}>
            없음
          </span>
        </div>
      </div>

      {value === true && (
        <input
          type="text"
          placeholder="쿠폰 사용 조건을 입력해주세요 (ex. 시즌 딸기 케이크 구매 시)"
          value={conditionText}
          onChange={(e) => onChangeConditionText(e.target.value)}
          className="rounded-[8px] p-4 mt-3 w-full bg-[#F3F3F3] focus:outline-none"
        />
      )}
    </section>
  );
};

export default CouponConditionSection;

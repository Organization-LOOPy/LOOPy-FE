import CheckCircle from '../../../User/Signin/_components/CheckCircle';
import DateRangePicker from './DateRangePicker';

interface Props {
  value: boolean | null;
  onChange: (value: boolean) => void;
  startDate: Date | null;
  endDate: Date | null;
  onChangeStartDate: (date: Date | null) => void;
  onChangeEndDate: (date: Date | null) => void;
}

const CouponLimitSection = ({
  value,
  onChange,
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
}: Props) => {
  return (
    <section className="w-full mb-6">
      <h3 className="font-bold text-[1.125rem] text-[#252525] mb-[1.5rem]">
        쿠폰 사용 기한
      </h3>

      <div className="flex gap-6">
        <div
          className="flex items-center gap-[0.75rem] cursor-pointer"
          onClick={() => onChange(true)}
        >
          <CheckCircle checked={value === true} />
          <span
            className={`text-[0.875rem] font-normal ${
              value === true ? 'text-[#6970F3]' : 'text-[#252525]'
            }`}
          >
            유효기간 있음
          </span>
        </div>
        <div
          className="flex items-center gap-[0.75rem] cursor-pointer"
          onClick={() => onChange(false)}
        >
          <CheckCircle checked={value === false} />
          <span
            className={`text-[0.875rem] font-normal ${
              value === false ? 'text-[#6970F3]' : 'text-[#252525]'
            }`}
          >
            유효기간 없음
          </span>
        </div>
      </div>

      {value === true && (
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onChangeStartDate={onChangeStartDate}
          onChangeEndDate={onChangeEndDate}
        />
      )}
    </section>
  );
};

export default CouponLimitSection;

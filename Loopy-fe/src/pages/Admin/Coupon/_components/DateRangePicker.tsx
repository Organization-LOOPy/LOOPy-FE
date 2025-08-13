import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '../../../../assets/images/CalendarIcon.svg?react';

interface Props {
  startDate: Date | null;
  endDate: Date | null;
  onChangeStartDate: (date: Date | null) => void;
  onChangeEndDate: (date: Date | null) => void;
}

const DateRangePicker = ({
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
}: Props) => {
  const format = (date: Date | null) =>
    date ? dayjs(date).format('YYYY.MM.DD') : '';

  const isError = startDate && endDate && dayjs(endDate).isBefore(startDate, 'day');

  return (
    <>
      <div className="flex w-full items-center gap-2 mt-3">
        <div className="relative w-full border-none">
          <DatePicker
            selected={startDate}
            onChange={(date) => onChangeStartDate(date)}
            dateFormat="yyyy.MM.dd"
            maxDate={endDate ?? undefined}
            customInput={
              <div className="relative w-full flex-1">
                <input
                  type="text"
                  value={format(startDate)}
                  readOnly
                  placeholder="시작일을 선택해주세요"
                  className="w-full bg-[#F3F3F3] rounded-[8px] pl-4 pr-[3.625rem] py-[0.875rem] focus:outline-none"
                />
                <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5" />
              </div>
            }
          />
        </div>
        <span>~</span>
        <div className="relative w-full border-none">
          <DatePicker
            selected={endDate}
            onChange={(date) => onChangeEndDate(date)}
            dateFormat="yyyy.MM.dd"
            minDate={startDate ?? undefined}
            customInput={
              <div className="relative w-full flex-1">
                <input
                  type="text"
                  value={format(endDate)}
                  readOnly
                  placeholder="마감일을 선택해주세요"
                  className="w-full bg-[#F3F3F3] rounded-[8px] pl-4 pr-[3.625rem] py-[0.875rem] focus:outline-none"
                />
                <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5" />
              </div>
            }
          />
        </div>
      </div>

      {isError && (
        <p className="mt-2 text-[0.875rem] text-red-500">
          마감일은 시작일 이후여야 합니다.
        </p>
      )}
    </>
  );
};

export default DateRangePicker;

import QuestionMark from '../../../../assets/images/QuestionMark.svg?react';
import StampPurple from '../../../../assets/images/StampPurple.svg?react';
import StampBarChart from './StampBarChart';
import type { StampData } from '../types/StampData';

const dummyData: StampData[] = [
  { day: 'MON', count: 40 },
  { day: 'TUE', count: 18 },
  { day: 'WED', count: 18 },
  { day: 'THU', count: 40 },
  { day: 'FRI', count: 14 },
  { day: 'SAT', count: 11 },
  { day: 'SUN', count: 11 },
];

const StampOverview = () => {
  return (
    <div className="flex h-[19rem] w-full bg-[#F0F1FE] p-8 rounded-lg">
      <div className="flex flex-col">
        <div className="flex gap-2 items-center mb-4">
          <StampPurple />
          <div className="text-[1rem] text-black font-semibold leading-none">
            오늘 스탬프 적립 수
          </div>
        </div>
        <div className="flex justify-center items-center bg-white mr-12">
          <StampBarChart data={dummyData} today="MON" />
        </div>
      </div>
      {/*우측 흰색 상자들*/}
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-[4.688rem] bg-white rounded-lg px-[2.875rem] py-[0.875rem] flex flex-col items-center justify-center">
          <div className="flex gap-2">
            <span className="leading-none text-[1rem] font-semibold">
              주간 적립 수
            </span>
            <QuestionMark />
          </div>
          <span className="text-[1.25rem] font-bold mt-3 leading-none">
            182개
          </span>
        </div>
        <div className="h-[4.688rem] bg-white rounded-lg px-[2.875rem] py-[0.875rem] flex flex-col items-center justify-center">
          <div className="flex gap-2">
            <span className="leading-none text-[1rem] font-semibold">
              활성 고객 수
            </span>
            <QuestionMark />
          </div>
          <span className="text-[1.25rem] font-bold mt-3 leading-none">
            94명
          </span>
        </div>
        <div className="h-[4.688rem] bg-white rounded-lg px-[2.875rem] py-[0.875rem] flex flex-col items-center justify-center">
          <div className="flex gap-2">
            <span className="leading-none text-[1rem] font-semibold">
              스탬프 달성 건수
            </span>
            <QuestionMark />
          </div>
          <span className="text-[1.25rem] font-bold mt-3 leading-none">
            17건
          </span>
        </div>
      </div>
    </div>
  );
};

export default StampOverview;

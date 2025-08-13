import CommonCard from "../../../../../components/card/CommonCard";
import type { Challenge } from "../types/challenges";

const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  return (
    <CommonCard padding="p-0" className="flex items-center justify-between">
      <div className="flex gap-[1rem] items-center">
        <div className="w-[4.5rem] h-[4.5rem] bg-red-600 rounded-full" />
        <div className="flex flex-col">
          <span className="text-[0.75rem] text-[#6970F3] font-semibold mb-[0.5rem]">
            {challenge.title}
          </span>
          <span className="text-[1rem] text-[#171718] font-semibold mb-[0.125rem]">
            {challenge.store}
          </span>
          <span className="text-[0.875rem] text-[#7F7F7F] font-normal">
            {challenge.period}
          </span>
        </div>
      </div>
      <button className="px-[0.5rem] py-[0.25rem] rounded-[8px] bg-[#F0F1FE] text-[#6970F3] text-[0.75rem] font-semibold">
        참여중
      </button>
    </CommonCard>
  );
};

export default ChallengeCard;
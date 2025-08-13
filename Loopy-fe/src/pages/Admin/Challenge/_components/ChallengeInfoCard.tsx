import Calendar from '../../../../assets/images/Calendar.svg';
import Crown from '../../../../assets/images/Crown.svg';
import Graph from '../../../../assets/images/Graph.svg?react';
import CharacterFace from '../../../../assets/images/CharacterFace.svg?react';

interface ChallengeInfoCardProps {
  period: string;
  points: number;
  participants: number;
  complete: number;
}

const ChallengeInfoCard = ({
  period,
  points,
  participants,
  complete,
}: ChallengeInfoCardProps) => {
  const completeRate =
    participants > 0 ? ((complete / participants) * 100).toFixed(1) : '0.0';

  return (
    <div className="w-[34rem] space-y-2 mt-6">
      <div className="flex items-center justify-between bg-[#F0F1FE] p-4 rounded-[8px] h-[52px]">
        <div className="flex items-center gap-1">
          <img src={Calendar} alt="달력 아이콘" className="w-4 h-4" />
          <span className="text-[1rem] font-semibold text-[#6970F3]">기간</span>
        </div>
        <span className="text-[1rem] font-medium">{period}</span>
      </div>

      <div className="flex items-center justify-between bg-[#F0F1FE] p-4 rounded-[8px] h-[52px]">
        <div className="flex items-center gap-1">
          <img src={Crown} alt="왕관 아이콘" className="w-4 h-4" />
          <span className="text-[1rem] font-medium text-[#6970F3]">
            챌린지 혜택
          </span>
        </div>
        <span className="text-[1rem] font-medium">+{points}p</span>
      </div>

      <div
        className="text-white p-4 rounded-[8px] flex justify-between"
        style={{
          background:
            'linear-gradient(65.89deg, #6970F3 16.37%, #000343 129.54%)',
        }}
      >
        <div className="flex flex-col">
          <div className="flex gap-2 mb-4">
            <Graph />
            <span className="text-[1rem] font-semibold text-[#E3F389]">
              현황
            </span>
          </div>
          <div className="flex gap-10">
            <div className="flex gap-4 items-center">
              <span>참여자 수</span>
              <div className="text-[1.25rem] font-bold leading-none">
                {participants}명
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <span>완료자 수</span>
              <div className="text-[1.25rem] font-bold leading-none">
                {complete}명({completeRate}%)
              </div>
            </div>
          </div>
        </div>
        <CharacterFace />
      </div>
    </div>
  );
};

export default ChallengeInfoCard;

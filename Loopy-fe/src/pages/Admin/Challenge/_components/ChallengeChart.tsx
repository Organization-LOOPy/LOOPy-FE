import { useChallengeStatistics } from '../../../../hooks/query/admin/challenge/useChallengeStatistics';

interface ChallengeChartProps {
  cafeId: number;
}

const ChallengeChart = ({ cafeId }: ChallengeChartProps) => {
  const { data, isLoading, isError } = useChallengeStatistics(cafeId);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  if (!data?.data) {
    console.log(data?.data);
    console.warn('ChallengeChart: 데이터가 없습니다.', data);
    return null;
  }

  const {
    participatedChallengeCount,
    totalParticipantCount,
    completedUserCount,
    challengeRelatedSalesCount,
  } = data.data;

  const stats = [
    { label: '참여한 챌린지 수', value: `${participatedChallengeCount}개` },
    { label: '총 참여 고객 수', value: `${totalParticipantCount}명` },
    { label: '혜택 수령한 고객 수', value: `${completedUserCount}명` },
    { label: '챌린지로 판매된 건', value: `${challengeRelatedSalesCount}건` },
  ];

  return (
    <div className="flex w-full mt-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`flex-1 h-16 px-8 ${
            index < stats.length - 1 ? 'border-r border-[#DFDFDF]' : ''
          }`}
        >
          <div className="flex flex-col justify-center gap-6 text-center">
            <div className="text-[1rem] text-[#7F7F7F] font-semibold leading-none">
              {stat.label}
            </div>
            <div className="text-[1.5rem] text-[#000000] font-bold leading-none">
              {stat.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChallengeChart;

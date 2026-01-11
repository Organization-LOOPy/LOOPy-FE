import HomeCharacter from '../../../../assets/images/HomeCharacter.svg?react';
import { useInsight } from '../../../../hooks/query/admin/home/useInsight';
import LoadingSpinner from '../../../../components/loading/LoadingSpinner';
import { useOwnerMyCafeInfo } from '../../../../hooks/query/admin/setting/useOwnerMyCafeInfo';

const AnalysisCard = () => {
  const { data: myCafeInfo } = useOwnerMyCafeInfo();
  const cafeId = myCafeInfo?.cafeId;

  const { data, isLoading, isError } = useInsight(cafeId);

  if (!cafeId) return <LoadingSpinner />;

  return (
    <div className="h-[8.938rem] w-[28.15rem] flex flex-col md:flex-row rounded-lg  bg-[#E3F389] relative overflow-visible">
      {/* 왼쪽 보라색 박스 */}
      <div
        className="flex justify-between rounded-l-lg text-white flex-grow"
        style={{
          background: 'linear-gradient(60deg, #6970F3 0%, #000343 100%)',
          clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0% 100%)',
        }}
      >
        <div className="flex flex-col py-6 pl-6">
          <span className="text-[1rem] text-[#E3F389] font-semibold mb-4 leading-none">
            매장 분석
          </span>
          {isLoading ? (
            <div className="flex items-center justify-center h-[4rem]">
              <LoadingSpinner />
            </div>
          ) : isError ? (
            <p className="text-[0.79rem] leading-relaxed whitespace-pre-wrap">
              데이터를 불러오지 못했습니다.
            </p>
          ) : (
            <p className="text-[0.79rem] leading-relaxed whitespace-pre">
              {data?.insight?.insights_summary ?? '요약 정보 없음'}
            </p>
          )}
        </div>
        <div
          className="flex w-30 bg-[#E3F38980]"
          style={{ clipPath: 'polygon(83% 0, 100% 0, 85% 100%, 0% 100%)' }}
        />
      </div>

      {/* 오른쪽 캐릭터 이미지 */}
      <div className="flex items-center justify-center flex-shrink-0 p-4 relative z-30 w-[120px]">
        <div className="w-full relative">
          <HomeCharacter className="absolute right-0 top-0 translate-y-[-65%] translate-x-[-10%] h-[10.063rem] w-[9.301rem]" />
        </div>
      </div>
    </div>
  );
};

export default AnalysisCard;

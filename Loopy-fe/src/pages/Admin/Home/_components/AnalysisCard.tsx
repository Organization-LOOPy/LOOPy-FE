import HomeCharacter from '../../../../assets/images/HomeCharacter.svg?react';

const AnalysisCard = () => {
  return (
    <div className="h-[8.938rem] w-[28.25rem] flex flex-col md:flex-row rounded-lg  bg-[#E3F389] relative overflow-visible">
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
          <p className="text-[0.875rem] leading-relaxed whitespace-pre-wrap">
            이번 주 신규 쿠폰 사용률이 35% {'\n'}증가했고, 활성 고객 수가
            어제보다 {'\n'}
            +12명 증가했어요!
          </p>
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

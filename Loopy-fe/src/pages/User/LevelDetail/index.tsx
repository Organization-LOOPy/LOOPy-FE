import { useNavigate } from 'react-router-dom';
import CommonHeader from '../../../components/header/CommonHeader';
import Level1 from '../../../assets/images/Level1.svg?react';
import Level2 from '../../../assets/images/Level2.svg?react';
import Level3 from '../../../assets/images/Level3.svg?react';
import Level4 from '../../../assets/images/Level4.svg?react';

const levels = [
  {
    step: '1단계',
    title: '호기심 많은 탐색가',
    range: '스탬프지 0장~3장',
    desc: '다양한 카페를 체험하며 루틴을 탐색하는 단계, 루피 여정을 시작한 사용자',
    Svg: Level1,
  },
  {
    step: '2단계',
    title: '차곡차곡 쌓는 수집가',
    range: '스탬프지 4장~9장',
    desc: '마음에 드는 카페를 골라가며 나만의 루틴을 쌓는 단계, 스탬프 하나하나 모으는 재미에 빠져보세요',
    Svg: Level2,
  },
  {
    step: '3단계',
    title: '동네 카페 전문가',
    range: '스탬프지 10장~19장',
    desc: '루피를 꾸준히 이용하며 관계가 끈끈해지고 있는 단계, 로컬 카페와 루피의 소중한 단골이 되었어요',
    Svg: Level3,
  },
  {
    step: '4단계',
    title: '커피왕 루피',
    range: '스탬프지 20장 이상',
    desc: '카페 단골, 루피 단골! 우리 동네 커피 박사',
    Svg: Level4,
  },
];

const LevelDetailPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <CommonHeader title="루피 레벨 안내" onBack={() => navigate(-1)} />
      {levels.map((level, idx) => (
        <div key={idx} className="flex flex-row items-center gap-4 mt-6 ">
          {/* 이미지 */}
          {level.Svg ? (
            <level.Svg
              className="w-[7.5rem] h-[6.75rem] shrink-0"
              aria-label={`${level.step} 아이콘`}
            />
          ) : null}

          {/* 텍스트 영역 */}
          <div className="flex flex-col justify-start flex-1">
            <div className="flex gap-2 items-center flex-wrap">
              <div className="px-2 py-1 bg-[#F0F1FE] text-[#6970F3] rounded-[2px] font-semibold text-[0.875rem] leading-none">
                {level.step}
              </div>
              <div className="text-[1.125rem] font-bold">{level.title}</div>
            </div>
            <div className="text-base font-medium text-[#6970F3] mt-1">
              {level.range}
            </div>
            <div className="text-sm font-normal text-[#7F7F7F] mt-1">
              {level.desc}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LevelDetailPage;

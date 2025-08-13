import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonBottomBar from '../../../components/bottomBar/CommonBottomBar';
import MyStamp from './components/MyStamp';
import ProfileCardContainer from './components/ProfileCardContainer';
import TopBar from './components/TopBar';
import StampSort from './components/StampSort';
import DetailButton from './components/DetailButton';
import ChallengeCarousel from './components/ChallengeCarousel';
import HomePageSkeleton from './Skeleton/HomeSkeleton';
import { useStampBooks } from '../../../hooks/query/stampBook/useStampBook';

const HomePage = () => {
  const [sortType, setSortType] = useState<'most' | 'due'>('most');
  const apiSortBy = sortType === 'most' ? 'mostStamped' : 'shortestDeadline';

  const {
    data: stampBooks,
    isLoading,
    error,
  } = useStampBooks({ sortBy: apiSortBy });

  const navigate = useNavigate();

  if (isLoading) {
    return <HomePageSkeleton />;
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">오류가 발생했습니다.</div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#6970F3] to-[#3D418D] -mx-[1.5rem]">
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="mt-[1.5rem] px-[1.5rem]">
          <TopBar />
        </div>
        <div className="mt-[1.5rem] px-[1.5rem]">
          <ProfileCardContainer />
        </div>

        {/* 흰색 영역: flex-1으로 남은 공간을 채우고, 아래 padding으로 바텀바 가림 방지 */}
        <div className="flex-1 bg-white rounded-t-xl mt-8 pt-8 px-[1.5rem] flex flex-col overflow-auto relative">
          <div className="font-bold text-[1.125rem] flex justify-between items-center leading-none mb-6 px-0">
            <span>루피와 진행 중인 챌린지</span>
            <DetailButton
              onClick={() => navigate('/challenge')}
              textColor="text-[#7F7F7F]"
              label="전체보기"
            />
          </div>
          <div className="-mr-[1.5rem] mb-6">
            <ChallengeCarousel />
          </div>

          {stampBooks && (
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-center mt-2">
                <div className="font-bold text-[1.125rem] flex items-center gap-2">
                  <span>내 스탬프지</span>
                  <span className="text-[#6970F3] text-[1.125rem]">
                    {stampBooks.length}개
                  </span>
                </div>
                <StampSort value={sortType} onChange={setSortType} />
              </div>
              <div className="text-[0.875rem] text-gray-500 mt-3">
                1달 내 재방문이 없으면 포인트로 자동 환전되어요
              </div>

              <div className="mt-6 pb-[100px] flex flex-col items-center">
                {stampBooks.length === 0 ? (
                  <div className="flex flex-col text-center mt-16 gap-3">
                    <div className="text-[#6970F3] text-[1.125rem] font-bold leading-none">
                      아직 적립한 스탬프가 없어요!
                    </div>
                    <div className="text-[#7F7F7F] text-[0.875rem] leading-none">
                      루피와 함께 첫 스탬프를 모아보세요
                    </div>
                  </div>
                ) : (
                  stampBooks.map((stamp) => (
                    <MyStamp
                      key={stamp.id}
                      stampBook={stamp}
                      imageUrl={undefined}
                    />
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0">
          <CommonBottomBar active="home" onChange={(tab) => console.log(tab)} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

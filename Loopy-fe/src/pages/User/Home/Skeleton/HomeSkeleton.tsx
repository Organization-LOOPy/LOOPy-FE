import CommonBottomBar from '../../../../components/bottomBar/CommonBottomBar';
import TopBar from '../components/TopBar';
import ProfileCardSkeleton from './ProfileCardSkeleton';

const HomePageSkeleton = () => {
  return (
    <div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#6970F3] to-[#3D418D] z-0" />

      <div className="relative z-10">
        {/* TopBar */}
        <div className="mt-[1.5rem]">
          <TopBar />
        </div>

        <CommonBottomBar active="home" onChange={(tab) => console.log(tab)} />

        {/* ProfileCard Skeleton */}
        <div className="mt-[1.5rem]">
          <ProfileCardSkeleton />
        </div>

        {/* 흰 부분 */}
        <div className="bg-white rounded-t-xl mt-8 pt-8 -mx-[1.5rem] px-[1.5rem]">
          {/* 챌린지 제목 및 버튼 */}
          <div className="flex justify-between items-center mb-6">
            <div className="w-40 h-6 bg-gray-200 rounded animate-pulse" />
            <div className="w-16 h-5 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* 챌린지 캐러셀*/}
          <div className="flex gap-4 overflow-x-auto">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="w-[10.5rem] h-[10.5rem] bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>

          {/* 내 스탬프지 헤더 */}
          <div className="flex justify-between items-center mt-8">
            <div className="flex gap-2 items-center">
              <div className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
              <div className="w-8 h-6 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="w-16 h-6 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* 안내 문구 */}
          <div className="text-[0.875rem] text-gray-400 mt-3">
            <div className="w-60 h-4 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* MyStamp 리스트 */}
          <div className="mt-6 pb-[4rem] flex flex-col items-center gap-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="w-full h-[6rem] bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageSkeleton;

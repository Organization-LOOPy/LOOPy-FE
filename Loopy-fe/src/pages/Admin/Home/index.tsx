import CommonSideBar from '../../../components/admin/sideBar/CommonSideBar';
import CommonTopBar from '../../../components/admin/topBar/CommonTopBar';
import AnalysisCard from './_components/AnalysisCard';
import HomeQRButton from './_components/HomeQRButton';
import HomeStampButton from './_components/HomeStampButton';
import StampOverview from './_components/StampOverview';
import CouponOverview from './_components/CouponOverview';
import ChallengeOverview from './_components/ChallengeOverview';
import { useOwnerCafeBasic } from '../../../hooks/query/admin/setting/useOwnerCafeBasic';
import type { OwnerCafeBasic } from '../../../apis/admin/setting/basic/type';

const AdminHomePage = () => {
  const { data: cafeData, isLoading } = useOwnerCafeBasic();
  const cafeArray = cafeData as OwnerCafeBasic[] | undefined;
  const cafeName = cafeArray?.[0]?.name || '카페';

  return (
    <div className="w-full min-h-screen font-suit bg-white text-[#252525]">
      {/* 사이드바 */}
      <CommonSideBar />

      {/* TopBar + 본문 */}
      <div className="flex-1 flex flex-col ml-[12.875rem]">
        <CommonTopBar userName={isLoading ? '' : cafeName} profileImageUrl="" />
        <main className="flex-1 pt-22 space-y-4 overflow-x-auto mb-8">
          {/* AnalysisCard + 버튼 2개 */}
          <div className="flex gap-4 items-stretch flex-nowrap">
            <div className="w-[28rem] flex-shrink-0">
              <AnalysisCard />
            </div>
            <div className="flex gap-2 flex-1 min-w-0">
              <div className="flex-1 min-w-0">
                <HomeStampButton />
              </div>
              <div className="flex-1 min-w-0">
                <HomeQRButton />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <StampOverview />
          </div>
          <div className="flex gap-4">
            <ChallengeOverview />
            <CouponOverview cafeId={cafeArray?.[0]?.id} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminHomePage;

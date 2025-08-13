import CommonSideBar from '../../../components/admin/sideBar/CommonSideBar';
import CommonTopBar from '../../../components/admin/topBar/CommonTopBar';
import ChallengeChart from './_components/ChallengeChart';
import ChallengeOverview from '../Home/_components/ChallengeOverview';
import ChallengeHistory from './_components/ChallengeHistory';
import ChallengeRecommend from './_components/ChallengeRecommend';
import { useAdminCafe } from '../../../contexts/AdminContext';

const AdminChallengePage = () => {
  const { activeCafeId } = useAdminCafe();
  const cafeId = activeCafeId ?? 1; // 없으면 기본값 1

  return (
    <div>
      <CommonSideBar />
      <div className="flex-1 flex flex-col ml-[12.875rem] mb-8">
        <CommonTopBar title="챌린지 관리" profileImageUrl="" />
        <ChallengeRecommend />
        <ChallengeChart cafeId={cafeId} />
        <div className="flex gap-4 mt-8">
          <ChallengeOverview />
          <ChallengeHistory />
        </div>
      </div>
    </div>
  );
};

export default AdminChallengePage;

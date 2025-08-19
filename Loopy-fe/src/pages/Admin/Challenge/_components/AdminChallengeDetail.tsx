import { useParams, useNavigate } from 'react-router-dom';
import CommonSideBar from '../../../../components/admin/sideBar/CommonSideBar';
import CommonTopBar from '../../../../components/admin/topBar/CommonTopBar';
import ChallengeInfoCard from './ChallengeInfoCard';
import { useAdminCafe } from '../../../../contexts/AdminContext';
import { useChallengeDetail } from '../../../../hooks/query/admin/challenge/useChallengeDetail';

const AdminChallengeDetail = () => {
  const navigate = useNavigate();
  const { challengeId } = useParams<{ challengeId: string }>();
  const { activeCafeId } = useAdminCafe();
  const cafeId = activeCafeId ?? 1;

  const numericChallengeId = challengeId ? Number(challengeId) : 0;

  const { data, isLoading, isError } = useChallengeDetail(
    cafeId,
    numericChallengeId,
  );

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !data?.data)
    return <div>챌린지 정보를 불러올 수 없습니다.</div>;

  const {
    title,
    thumbnailUrl,
    description,
    startDate,
    endDate,
    rewardDetail,
    rewardPoint,
    participantCount,
    completedCount,
  } = data.data;

  return (
    <div className="w-full min-h-screen flex font-suit text-[#252525]">
      <CommonSideBar />
      <div className="flex-1 flex flex-col ml-[12.875rem]">
        <CommonTopBar
          title="챌린지 정보"
          profileImageUrl=""
          onBack={() => navigate(-1)}
        />
        <div className="flex flex-col">
          <div className="flex gap-8">
            <img src={thumbnailUrl} alt={title} className="w-[8.5rem] h-auto" />
            <div className="mb-6">
              <p className="text-[0.75rem] text-[#6970F3] font-semibold mb-2 leading-none">
                챌린지
              </p>
              <p className="text-[1.25rem] text-[#252525] font-bold mb-4 leading-none">
                {title}
              </p>
              <p className="h-[5rem] w-[24rem] p-10 text-[1rem] font-semibold text-center items-center whitespace-break-spaces mt-4 py-4 border-y border-[#DFDFDF]">
                {rewardDetail}
              </p>
            </div>
          </div>
          <p className="text-[0.875rem] pr-60 text-black font-normal whitespace-break-spaces">
            {description}
          </p>
          <ChallengeInfoCard
            period={`${startDate} ~ ${endDate}`}
            points={rewardPoint}
            participants={participantCount}
            complete={completedCount}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminChallengeDetail;

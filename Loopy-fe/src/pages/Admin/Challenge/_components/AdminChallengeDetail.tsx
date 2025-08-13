import { useParams, useNavigate } from 'react-router-dom';
import CommonSideBar from '../../../../components/admin/sideBar/CommonSideBar';
import CommonTopBar from '../../../../components/admin/topBar/CommonTopBar';
import { CHALLENGE_CONFIG } from '../_constants/ChallengeConfig';
import type { ChallengeType } from '../_constants/ChallengeConfig';
import ChallengeInfoCard from './ChallengeInfoCard';

const AdminChallengeDetail = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: ChallengeType }>();

  if (!type || !(type in CHALLENGE_CONFIG)) {
    return <div>존재하지 않는 챌린지입니다.</div>;
  }

  const {
    title,
    image: Image,
    description,
    detailText,
    period,
    points,
    participants,
    complete,
  } = CHALLENGE_CONFIG[type];

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
            <Image className="w-[8.5rem] h-auto" />
            <div className="mb-6">
              <p className="text-[0.75rem] text-[#6970F3] font-semibold mb-2 leading-none">
                8월의 루피 챌린지
              </p>
              <p className="text-[1.25rem] text-[#252525] font-bold mb-4 leading-none">
                {title}
              </p>
              <p className="h-[5rem] w-[24rem] text-[1rem] font-semibold text-center items-center whitespace-break-spaces mt-4 py-4 border-y border-[#DFDFDF]">
                {description}
              </p>
            </div>
          </div>
          <p className="text-[0.875rem] text-black font-normal whitespace-break-spaces">
            {detailText}
          </p>
          <ChallengeInfoCard
            period={period}
            points={points}
            participants={participants}
            complete={complete}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminChallengeDetail;

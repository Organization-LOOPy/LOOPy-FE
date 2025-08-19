import { useParams, useNavigate } from 'react-router-dom';
import CommonHeader from '../../../components/header/CommonHeader';
import Calendar from '../../../assets/images/Calendar.svg';
import Crown from '../../../assets/images/Crown.svg';
import Info from '../../../assets/images/Info.svg?react';
import EmptyStamp from '../../../assets/images/EmptyStamp.svg?react';
import ChallengeDetailSkeleton from './Skeleton/ChallengeDetailSkeleton';
import AcronStamp from '../../../assets/images/AcronStamp.svg?react';
import { useChallengeDetail } from '../../../hooks/query/challenge/useChallengeDetail';

const ChallengeDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const challengeId = Number(id);

  const {
    challengeDetail: challenge,
    isLoading,
    isError,
  } = useChallengeDetail(challengeId);

  if (isLoading) return <ChallengeDetailSkeleton />;
  if (isError) return <div>챌린지를 불러오는 중 오류가 발생했습니다.</div>;
  if (!challenge) return <div>챌린지를 찾을 수 없습니다.</div>;

  return (
    <div className="min-h-screen flex flex-col mb-8">
      <CommonHeader title="챌린지 정보" onBack={() => navigate(-1)} />

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col items-center mt-6">
          {/* 이미지 */}
          <div className="w-[6rem] h-[6rem] rounded-full overflow-hidden">
            <img
              src={challenge.thumbnailUrl}
              alt={challenge.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 텍스트 */}
          <p className="text-xs text-[#6970F3] font-normal mt-8">
            루피만의 챌린지
          </p>
          <h1 className="text-lg font-bold mt-2 text-center">
            {challenge.title}
          </h1>

          {challenge.isParticipated && (
            <p className="bg-[#F0F1FE] rounded text-[#6970F3] text-[0.875rem] font-semibold mt-6 px-[0.75rem] py-[0.25rem]">
              카페 위니에서 참여 중
            </p>
          )}

          {/* 구분선 */}
          <div className="w-full max-w-md h-px bg-[#E0E0E0] mt-6 mb-4" />

          {/* 설명 */}
          <p className="text-[1rem] font-medium text-center whitespace-pre-line">
            {challenge.description}
          </p>

          {/* 구분선 */}
          <div className="w-full max-w-md h-px bg-[#E0E0E0] mt-4 mb-6" />

          {/* 상세 설명 */}
          <p className="text-[0.875rem] font-regular leading-relaxed mb-6">
            {challenge.goalDescription}
          </p>

          {/* 정보 카드 */}
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between bg-[#F0F1FE] p-4 rounded-[8px] h-[52px]">
              <div className="flex items-center gap-1">
                <img src={Calendar} alt="달력 아이콘" className="w-4 h-4" />
                <span className="text-[1rem] font-semibold text-[#6970F3]">
                  기간
                </span>
              </div>
              <span className="text-[1rem] font-medium">
                {challenge.startDate} ~ {challenge.endDate}
              </span>
            </div>

            <div className="flex items-center justify-between bg-[#F0F1FE] p-4 rounded-[8px] h-[52px]">
              <div className="flex items-center gap-1">
                <img src={Crown} alt="왕관 아이콘" className="w-4 h-4" />
                <span className="text-[1rem] font-medium text-[#6970F3]">
                  챌린지 혜택
                </span>
              </div>
              <span className="text-[1rem] font-medium">
                +{challenge.rewardPoint}p
              </span>
            </div>
          </div>

          {challenge.isParticipated && (
            <div>
              <div className="flex justify-center gap-[1rem] mt-8">
                {Array.from({ length: challenge.goalCount }).map((_, index) => {
                  if (challenge.joinedCount && index < challenge.joinedCount) {
                    return (
                      <AcronStamp key={index} className="w-[5rem] h-[5rem]" />
                    );
                  } else {
                    return (
                      <EmptyStamp key={index} className="w-[5rem] h-[5rem]" />
                    );
                  }
                })}
              </div>

              <div className="flex flex-col bg-[#F3F3F3] p-4 rounded-[8px] mt-8">
                <div className="flex text-[#7F7F7F] gap-2">
                  <Info className="w-4 h-4" />
                  <p className="text-[#7F7F7F] text-[1rem] font-semibold leading-none">
                    챌린지 인증 방법
                  </p>
                </div>
                <p className="text-[#7F7F7F] text-[0.875rem] font-normal mt-2">
                  챌린지를 인증받으시려면, 카페에서 마이페이지의 통합 멤버십 QR
                  코드를 제시해 주세요.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 하단 버튼 (참여 안 한 경우만) */}
      {!challenge.isParticipated && (
        <div className="fixed bottom-2 left-0 right-0  px-4 pb-8 flex justify-center">
          <button
            onClick={() => navigate(`/challenge/${challengeId}/stores`)}
            className="w-full max-w-md bg-[#6970F3] text-white py-3 rounded-xl font-semibold"
          >
            참여 가능 매장 찾기
          </button>
        </div>
      )}
    </div>
  );
};

export default ChallengeDetailPage;

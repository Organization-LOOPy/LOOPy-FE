import DetailButton from './DetailButton';
import { useNavigate } from 'react-router-dom';

interface ProfileCardProps {
  username: string;
  level: string;
  image?: React.ReactNode;
  receivedStamps: number;
  ongoingChallenges: number;
  totalStamps: number;
  points: number;
}

const ProfileCard = ({
  username,
  level,
  image,
  receivedStamps,
  ongoingChallenges,
  totalStamps,
  points,
}: ProfileCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="text-white">
      <div className="text-[1.5rem] font-bold leading-none">{username}님은</div>
      <div className="flex items-center justify-between mt-2">
        <div className="text-[1.5rem] font-bold text-[#E3F389] leading-none">
          {level}
        </div>
        <DetailButton
          onClick={() => navigate('/level')}
          textColor="text-white"
          label="레벨 전체보기"
        />
      </div>

      {/* 이미지 + 우측 정보 */}
      <div className="flex justify-center gap-[19px] mt-6">
        {/* 프로필 이미지 */}
        <div className="w-[10.875rem] h-[9.75rem] overflow-hidden flex-shrink-0">
          {image ? (
            image
          ) : (
            <div className="w-full h-full bg-[#ddd] flex items-center justify-center text-black">
              이미지
            </div>
          )}
        </div>

        {/*현황 + 카드 */}
        <div className="flex flex-col justify-between">
          {/* 이번달 현황 */}
          <div>
            <div className="text-[1rem] font-semibold leading-none mb-3">
              이번달 현황
            </div>
            <div className="flex justify-between text-[0.875rem] text-[#E3F389] pr-4 mb-2">
              <div className="font-normal leading-none ">받은 스탬프</div>
              <div className="font-semibold leading-none">
                {receivedStamps}개
              </div>
            </div>
            <div className="flex justify-between text-[0.875rem] text-[#E3F389] pr-4">
              <div className="font-normal leading-none">진행 중인 챌린지</div>
              <div className="font-semibold leading-none">
                {ongoingChallenges}개
              </div>
            </div>
          </div>

          {/* 하단 카드 */}
          <div className="flex gap-[0.5rem] mt-5">
            <div className="w-[4.5rem] h-[4.5rem] bg-white/30 rounded-[4px] p-2 text-center">
              <div className="text-[0.875rem] font-semibold mt-0.5">
                총 스탬프
              </div>
              <div className="text-[1.125rem] font-bold text-[#E3F389] mt-1">
                {totalStamps}개
              </div>
            </div>
            <div className="w-[4.5rem] h-[4.5rem] bg-white/30 rounded-[4px] p-2 text-center">
              <div className="text-[0.875rem] font-semibold mt-0.5">포인트</div>
              <div className="text-[1.125rem] font-bold text-[#E3F389] mt-1">
                {points}p
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

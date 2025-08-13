import CommonHeader from '../../../../components/header/CommonHeader';
import { useNavigate } from 'react-router-dom';

const ChallengeStoreListSkeleton = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* 헤더 */}
      <CommonHeader title="카공 챌린지 가능 매장" onBack={() => navigate(-1)} />

      {/* 위치 라벨 */}
      <div className="mt-[1.5rem] mb-[1rem] animate-pulse">
        <div className="w-32 h-5 bg-gray-300 rounded"></div>
      </div>

      {/* 매장 리스트 스켈레톤 */}
      <div className="space-y-4">
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="flex items-center gap-4 animate-pulse">
            <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="w-32 h-5 bg-gray-300 rounded"></div>
              <div className="w-24 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="w-13 h-8 bg-gray-300 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeStoreListSkeleton;

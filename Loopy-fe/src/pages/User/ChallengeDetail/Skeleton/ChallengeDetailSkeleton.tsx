import CommonHeader from '../../../../components/header/CommonHeader';
import { useNavigate } from 'react-router-dom';

const ChallengeDetailSkeleton = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col mb-8">
      {/* 헤더 */}
      <CommonHeader title="챌린지 정보" onBack={() => navigate(-1)} />

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col items-center mt-6 animate-pulse">
          {/* 이미지 */}
          <div className="w-[6rem] h-[6rem] rounded-full bg-gray-300" />

          {/* 텍스트 */}
          <div className="h-4 w-32 bg-gray-300 mt-8 rounded" />
          <div className="h-6 w-48 bg-gray-300 mt-2 rounded" />

          <div className="h-6 w-40 bg-gray-200 mt-6 rounded" />

          {/* 구분선 */}
          <div className="w-full max-w-md h-px bg-gray-200 mt-6 mb-4" />

          {/* 설명 */}
          <div className="w-4/5 h-15 bg-gray-300 rounded" />

          {/* 구분선 */}
          <div className="w-full max-w-md h-px bg-gray-200 mt-4 mb-6" />

          {/* 상세 설명 */}
          <div className="w-full h-24 bg-gray-300 rounded mb-6" />

          {/* 정보 카드 */}
          <div className="w-full max-w-md space-y-2">
            <div className="flex justify-between items-center bg-gray-200 p-4 rounded-[8px] h-[52px]">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-400 rounded" />
                <div className="w-16 h-4 bg-gray-400 rounded" />
              </div>
              <div className="w-32 h-4 bg-gray-400 rounded" />
            </div>

            <div className="flex justify-between items-center bg-gray-200 p-4 rounded-[8px] h-[52px]">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-400 rounded" />
                <div className="w-20 h-4 bg-gray-400 rounded" />
              </div>
              <div className="w-24 h-4 bg-gray-400 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailSkeleton;

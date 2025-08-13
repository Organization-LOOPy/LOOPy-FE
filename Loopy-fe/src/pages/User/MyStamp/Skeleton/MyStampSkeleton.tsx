import CommonHeader from '../../../../components/header/CommonHeader';
import { useNavigate } from 'react-router-dom';

const MyStampSkeleton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#6970F3] to-[#3D418D] z-0" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <CommonHeader title="내 스탬프지" onBack={() => navigate(-1)} white />
        {/* 카페 이름 및 주소 */}
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex gap-2">
            <div className="w-20 h-6 bg-white/40 rounded animate-pulse" />
            <div className="w-40 h-6 bg-white/20 rounded animate-pulse" />
          </div>
          <div className="w-48 h-4 bg-white/40 rounded animate-pulse" />
        </div>

        {/* 스탬프지 정보 및 스탬프 */}
        <div className="bg-white rounded-t-xl mt-6 pt-6 pb-6 flex-grow -mx-[1.5rem] px-[1.5rem]">
          <div className="flex gap-2 mb-4">
            <div className="w-20 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-28 h-5 bg-[#6970F3]/30 rounded animate-pulse" />
          </div>
          <div className="my-20 flex justify-center">
            <div className="w-[307px] h-[426.44px] bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStampSkeleton;

import { useNavigate } from 'react-router-dom';
import CommonHeader from '../../../../components/header/CommonHeader';

const BookMarkPageSkeleton = () => {
  const navigate = useNavigate();

  return (
    <div>
      <CommonHeader title="북마크한 카페" onBack={() => navigate(-1)} />
      <div className="mt-[1.5rem] flex flex-col gap-6 animate-pulse">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="flex w-full bg-white rounded-lg">
            {/* 이미지 자리 */}
            <div className="w-[6.125rem] h-[6.125rem] bg-gray-200 rounded-[0.5rem] mr-[1rem]" />

            {/* 텍스트 & 태그 자리 */}
            <div className="flex-1 flex flex-col justify-between py-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-4 bg-gray-300 rounded" />
                  <div className="w-10 h-3 bg-gray-200 rounded" />
                </div>
                <div className="w-6 h-6 bg-gray-300 rounded-sm" />
              </div>

              <div className="mt-2 w-40 h-3 bg-gray-200 rounded" />

              <div className="flex gap-2 mt-[0.75rem]">
                <div className="w-14 h-5 bg-gray-200 rounded-full" />
                <div className="w-12 h-5 bg-gray-200 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookMarkPageSkeleton;

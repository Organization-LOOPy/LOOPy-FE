const ProfileCardSkeleton = () => {
  return (
    <div className="text-white">
      {/* 이름 + 레벨 + 레벨 전체보기 */}
      <div className="h-6 w-35 bg-gray-300 rounded-md animate-pulse" />
      <div className="flex items-center justify-between mt-2">
        <div className="h-6 w-50 bg-gray-300 rounded-md animate-pulse" />
        <div className="h-5 w-20 bg-gray-300 rounded-md animate-pulse" />
      </div>

      {/* 이미지 + 정보 묶음 */}
      <div className="flex justify-center gap-[19px] mt-6">
        {/* 프로필 이미지 자리 */}
        <div className="w-[10.875rem] h-[9.75rem] bg-gray-300 rounded-md animate-pulse" />

        {/* 우측 텍스트 정보 + 카드 */}
        <div className="flex flex-col justify-between">
          {/* 이번달 현황 */}
          <div className="space-y-1">
            <div className="h-4 w-24 bg-gray-300 rounded-md animate-pulse" />
            <div className="flex justify-between mt-3">
              <div className="h-4 w-20 bg-gray-300 rounded-md animate-pulse" />
              <div className="h-4 w-7 bg-gray-300 rounded-md animate-pulse" />
            </div>
            <div className="flex justify-between">
              <div className="h-4 w-24 bg-gray-300 rounded-md animate-pulse" />
              <div className="h-4 w-7 bg-gray-300 rounded-md animate-pulse" />
            </div>
          </div>

          {/* 하단 카드 2개 */}
          <div className="flex gap-2 mt-4">
            {[1, 2].map((idx) => (
              <div
                key={idx}
                className="w-[4.5rem] h-[4.5rem] bg-gray-300 rounded-[4px] animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardSkeleton;

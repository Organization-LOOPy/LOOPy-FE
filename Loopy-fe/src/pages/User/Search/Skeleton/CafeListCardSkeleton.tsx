export default function CafeListCardSkeleton() {
  return (
    <div className="flex w-full bg-transparent rounded-lg relative animate-pulse">
      {/* 이미지 스켈레톤 */}
      <div className="w-[6.125rem] h-[6.125rem] rounded-[0.5rem] bg-gray-200 mr-[1rem]" />

      {/* 텍스트 및 태그 영역 */}
      <div className="flex-1 flex flex-col justify-between py-[0.125rem]">
        {/* 상단: 카페명 + 거리 + 북마크 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[0.5rem]">
            <div className="w-[5rem] h-[1.125rem] bg-gray-300 rounded" />
            <div className="w-[2rem] h-[0.75rem] bg-gray-200 rounded" />
          </div>
          <div className="w-[1.5rem] h-[1.5rem] bg-gray-300 rounded-[0.25rem]" />
        </div>

        {/* 주소 */}
        <div className="mt-[0.5rem] w-[80%] h-[0.875rem] bg-gray-200 rounded" />

        {/* 키워드 태그 */}
        <div className="mt-[0.75rem] flex gap-[0.25rem]">
          <div className="h-[1.625rem] w-[3.5rem] bg-gray-200 rounded-[0.25rem]" />
          <div className="h-[1.625rem] w-[3.5rem] bg-gray-200 rounded-[0.25rem]" />
        </div>
      </div>
    </div>
  );
}

import CafeInfoContentSkeleton from "./CafeInfoContentSkeleton";

export default function CafeInfoPanelSkeleton() {
  return (
    <div className="w-full px-[1.5rem] pt-[1.5625rem] pb-[2rem] bg-white rounded-t-[0.75rem] animate-pulse">
      {/* 이름 + 알림 + 북마크 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[1rem]">
          {/* 이름 자리 */}
          <div className="w-[6rem] h-[1.875rem] bg-gray-300 rounded" />
          {/* 알림 버튼 */}
          <div className="w-[4.875rem] h-[1.5625rem]  bg-gray-300 rounded-[0.25rem]" />
        </div>

        {/* 북마크 */}
        <div className="w-[1.5rem] h-[1.5rem] bg-gray-300 rounded" />
      </div>

      {/* 주소 */}
      <div className="mt-[0.5rem] w-[15rem] h-[1.5rem] bg-gray-200 rounded" />

      {/* 태그 영역 */}
      <div className="mt-[0.75rem] flex flex-col gap-y-[0.5rem]">
        <div className="flex gap-x-[0.375rem] flex-wrap items-center">
          {/* 태그 2개 */}
          <div className="w-[6.875rem] h-[1.875rem] bg-gray-200 rounded-full" />
          <div className="w-[6.875rem] h-[1.875rem] bg-gray-200 rounded-full" />
        </div>
      </div>

      {/* 탭 버튼 영역 */}
      <div className="mt-[2rem] h-[2.5rem] bg-gray-100 rounded" />

      {/* 탭 아래 콘텐츠 스켈레톤 */}
      <div className="mt-[1.5rem]">
        <CafeInfoContentSkeleton />
      </div>
    </div>
  );
}

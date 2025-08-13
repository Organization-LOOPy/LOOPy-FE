import EventCardSkeleton from "../../Search/Skeleton/EventCardSkeleton";

export default function CafeInfoContentSkeleton() {
  return (
    <div className="mt-[1.5rem] flex flex-col text-[0.875rem] text-[#3B3B3B] animate-pulse">
      {/* 영업시간 */}
      <div className="flex items-center gap-[0.5rem]">
        <div className="w-[1rem] h-[1rem] bg-gray-300 rounded" />
        <div className="w-[6rem] h-[0.875rem] bg-gray-300 rounded" />
      </div>

      {/* 전화번호 */}
      <div className="mt-[0.75rem] flex items-center gap-[0.5rem]">
        <div className="w-[1rem] h-[1rem] bg-gray-300 rounded" />
        <div className="w-[5rem] h-[0.875rem] bg-gray-300 rounded" />
      </div>

      {/* 인스타그램 */}
      <div className="mt-[0.75rem] flex items-center gap-[0.5rem]">
        <div className="w-[1rem] h-[1rem] bg-gray-300 rounded" />
        <div className="w-[6rem] h-[0.875rem] bg-gray-300 rounded" />
      </div>

      {/* 설명 */}
      <div className="mt-[1rem] space-y-[0.375rem]">
        <div className="w-full h-[0.875rem] bg-gray-200 rounded" />
        <div className="w-[80%] h-[0.875rem] bg-gray-200 rounded" />
      </div>

      {/* 키워드 */}
      <div className="mt-[1rem] flex flex-wrap gap-[0.25rem]">
        {Array.from({ length: 2 }).map((_, idx) => (
          <div key={idx} className="w-[4rem] h-[1.25rem] bg-gray-200 rounded-[0.25rem]" />
        ))}
      </div>

      {/* 구분선 */}
      <div className="mt-[1.5rem] w-full h-[1px] bg-[#F3F3F3]" />

      {/* 스탬프 카드 */}
      <div className="mt-[1.5rem] space-y-[1rem]">
        <div className="flex items-center justify-between">
          <div className="w-[4rem] h-[1rem] bg-gray-300 rounded" />
          <div className="w-[5rem] h-[0.875rem] bg-gray-300 rounded" />
        </div>

        <div className="flex items-center gap-[1rem]">
          <div className="w-[3.5rem] h-[1.5rem] bg-gray-300 rounded" />
          <div className="flex-1 h-[0.625rem] bg-gray-200 rounded-full" />
        </div>

        <div className="flex justify-end">
          <div className="w-[8rem] h-[0.875rem] bg-gray-300 rounded" />
        </div>
      </div>

      {/* 챌린지 제목 */}
      <div className="mt-[2rem] w-[6rem] h-[1rem] bg-gray-300 rounded" />

      {/* 챌린지 카드 */}
      <div className="mt-[1rem]">
        <EventCardSkeleton />
      </div>

      {/* 쿠폰 제목 */}
      <div className="mt-[2rem] w-[5rem] h-[1rem] bg-gray-300 rounded" />

      {/* 쿠폰 카드 */}
      <div className="mt-[1rem]">
        <EventCardSkeleton />
      </div>

      {/* 대표 메뉴 */}
      <div className="mt-[2rem] flex items-center justify-between">
        <div className="w-[5rem] h-[1rem] bg-gray-300 rounded" />
        <div className="w-[6rem] h-[0.875rem] bg-gray-200 rounded" />
      </div>

      <div className="mt-[1rem] flex flex-col gap-[1.5rem]">
        {Array.from({ length: 2 }).map((_, idx) => (
          <div key={idx} className="flex gap-[1rem]">
            <div className="w-[7.25rem] h-[7.25rem] bg-gray-300 rounded" />
            <div className="flex-1 flex flex-col justify-between py-[0.25rem]">
              <div className="space-y-[0.75rem]">
                <div className="w-[6rem] h-[1rem] bg-gray-300 rounded" />
                <div className="w-[80%] h-[0.875rem] bg-gray-200 rounded" />
              </div>
              <div className="w-[4rem] h-[1rem] bg-gray-300 rounded self-end" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CafeReviewContentSkeleton() {
  return (
    <div className="flex flex-col gap-[2rem] animate-pulse">
      {[...Array(2)].map((_, i) => (
        <div key={i}>
          {/* 프로필 + 닉네임 + 날짜 */}
          <div className="flex gap-[0.75rem]">
            <div className="w-[2.5rem] h-[2.5rem] rounded-full bg-gray-300" />
            <div className="flex-1">
              <div className="w-[6rem] h-[0.875rem] bg-gray-300 rounded" />
              <div className="flex justify-between items-center mt-[0.375rem]">
                <div className="w-[4rem] h-[0.75rem] bg-gray-200 rounded" />
                <div className="w-[3rem] h-[0.75rem] bg-gray-200 rounded" />
              </div>
            </div>
          </div>

          {/* 이미지 */}
          <div className="mt-[0.75rem] flex gap-[0.5rem] overflow-x-auto custom-scrollbar">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="w-[10.5rem] h-[10.5rem] rounded bg-gray-200 shrink-0"
              />
            ))}
          </div>

          {/* 리뷰 텍스트 */}
          <div className="mt-[0.75rem] space-y-[0.5rem]">
            <div className="w-full h-[0.875rem] bg-gray-200 rounded" />
            <div className="w-[85%] h-[0.875rem] bg-gray-200 rounded" />
          </div>

          {/* 구분선 */}
          {i !== 1 && <div className="w-full h-[1px] bg-[#F3F3F3] mt-[1.5rem]" />}
        </div>
      ))}
    </div>
  );
}

export default function MenuCardSkeleton() {
  return (
    <div className="flex gap-[1rem] animate-pulse">
      {/* 이미지 영역 */}
      <div className="w-[7.25rem] h-[7.25rem] bg-gray-300 rounded-[0.5rem]" />

      {/* 텍스트 영역 */}
      <div className="flex flex-col justify-between flex-1 py-[0.25rem]">
        {/* 상단: 이름 + 설명 */}
        <div>
          <div className="w-[6rem] h-[1rem] bg-gray-300 rounded" />
          <div className="mt-[0.75rem] w-[11rem] h-[0.875rem] bg-gray-200 rounded" />
        </div>

        {/* 하단: 가격 */}
        <div className="w-[4rem] h-[1rem] bg-gray-300 rounded self-end" />
      </div>
    </div>
  );
}

const ChallengeCardSkeleton = () => {
  return (
    <div className="flex items-center animate-pulse">
      {/* 좌측 원형 이미지 */}
      <div className="w-[4.5rem] h-[4.5rem] bg-gray-300 rounded-full mr-4" />

      {/* 중앙 텍스트 영역 */}
      <div className="flex-1">
        <div className="w-24 h-3 bg-gray-300 rounded mb-2" />
        <div className="w-45 h-4 bg-gray-300 rounded mb-2" />
        <div className="w-40 h-3 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default ChallengeCardSkeleton;

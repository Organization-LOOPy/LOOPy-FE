const SkeletonBox = ({ className }: { className: string }) => (
  <div className={`bg-[#EDEDED] rounded-[4px] animate-pulse ${className}`} />
);

const StampHistoryItemSkeleton = () => {
  return (
    <div className="flex items-start justify-center mt-[1.5rem]">
      <div className="flex gap-3 w-full items-start">
        <SkeletonBox className="w-[5rem] h-[5rem] rounded-[8px]" />
        <div className="flex flex-col flex-1">
          <SkeletonBox className="w-[7.5rem] h-[1.5rem] mb-[0.5rem]" />
          <SkeletonBox className="w-[11.5rem] h-[1.25rem] mb-[0.5rem]" />
          <SkeletonBox className="w-[6rem] h-[1.125rem]" />
        </div>
      </div>
    </div>
  );
};

export default StampHistoryItemSkeleton;

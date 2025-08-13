const SkeletonBox = ({ className }: { className: string }) => (
  <div className={`bg-[#EDEDED] rounded-[4px] animate-pulse ${className}`} />
);

const StampBookItemSkeleton = () => {
  return (
    <div className="flex items-start justify-center mt-[1.5rem]">
      <div className="flex gap-3 w-full items-start">
        <SkeletonBox className="w-[5rem] h-[5rem] rounded-[8px]" />

        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between">
            <SkeletonBox className="w-[8rem] h-[1.75rem]" /> 
            <SkeletonBox className="w-[3rem] h-[1.865rem] rounded-[6px]" />
          </div>
          <SkeletonBox className="w-[11.5rem] h-[1.25rem] mt-[0.25rem]" />

          <div className="mt-[0.5rem] flex items-center gap-2">
            <SkeletonBox className="w-[3.25rem] h-[1.25rem]" /> 
            <SkeletonBox className="flex-1 h-[0.875rem] rounded-full" />
            <SkeletonBox className="w-[3rem] h-[1.25rem]" /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default StampBookItemSkeleton;

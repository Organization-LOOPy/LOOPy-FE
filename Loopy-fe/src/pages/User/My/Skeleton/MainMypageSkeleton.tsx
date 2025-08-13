import CommonBottomBar from "../../../../components/bottomBar/CommonBottomBar";
import CommonCard from "../../../../components/card/CommonCard";

const SkeletonBox = ({ className }: { className: string }) => (
  <div className={`bg-[#EDEDED] rounded-[8px] animate-pulse ${className}`} />
);

const MainMyPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F3F3F3] text-[#252525] overflow-y-auto -mx-[1.5rem] px-[1.5rem] pb-[6rem]">
      <div className="py-[1.5rem] flex justify-between items-center">
        <SkeletonBox className="w-[8rem] h-[2rem] bg-white" />
        <SkeletonBox className="w-[2rem] h-[2rem] bg-[#fff]" />
      </div>

      <CommonCard padding="p-[1.5rem]" className="bg-white mb-[1rem]">
        <div className="flex gap-[1rem] items-start">
          <SkeletonBox className="w-[4.5rem] h-[4.5rem] rounded-full" />
          <div className="flex-1 flex flex-col gap-[0.5rem]">
            <SkeletonBox className="w-[5rem] h-[1.8rem]" />
            <SkeletonBox className="w-[9rem] h-[1.75rem]" />
          </div>
          <SkeletonBox className="w-[3rem] h-[3rem]" />
        </div>

        <div className="w-full mt-[1.75rem] flex">
          <SkeletonBox className="flex-1 h-[3.5rem] mr-[0.5rem]" />
          <SkeletonBox className="flex-1 h-[3.5rem] ml-[0.5rem]" />
        </div>

        <div className="mt-8 flex gap-[0.5rem]">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonBox key={i} className="flex-1 h-[6rem]" />
          ))}
        </div>
      </CommonCard>

      <CommonCard padding="p-[1.5rem]" className="bg-white mb-[1rem]">
        <SkeletonBox className="w-[7rem] h-[2rem] mb-[1.5rem]" />
        <div className="flex flex-col gap-[1.5rem]">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonBox key={i} className="w-full h-[1.75rem]" />
          ))}
        </div>
      </CommonCard>

      <CommonCard padding="p-[1.5rem]" className="bg-white mb-[1.5rem]">
        <div className="flex items-start justify-between">
          <div className="w-[4.5rem] h-[4.5rem] bg-[#EDEDED] rounded-full animate-pulse" />
            <div className="flex flex-col flex-1 ml-[1rem] mt-[0.25rem]">
            <SkeletonBox className="w-[8.75rem] h-[1.875rem] mb-[0.5rem]" /> 
            <SkeletonBox className="w-[12.5rem] h-[1.625rem]" /> 
          </div>
        </div>
      </CommonCard>

      <CommonBottomBar active="mypage" onChange={(tab) => console.log(tab)} />
    </div>
  );
};

export default MainMyPageSkeleton;

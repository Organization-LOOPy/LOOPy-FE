import ArrowRight from '../../../../../assets/images/ArrowRight.svg?react';

const ReviewListSkeleton = () => {
  return (
    <div className="flex flex-col gap-[2.125rem] mt-[1.5rem] mb-[3rem] px-[1.5rem]">
      <div className="w-[9rem] h-[1.5rem] bg-[#E0E0E0] rounded-[4px]" />
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="space-y-[0.5rem] animate-pulse">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-[0.25rem]">
                <div className="w-[6rem] h-[1.5rem] bg-gray-300 rounded" />
                <ArrowRight
                  className="w-[1.125rem] h-[1.125rem] cursor-pointer text-[#252525]"
                />
              </div>
              <div className="w-[4rem] h-[0.75rem] bg-gray-200 mt-[0.25rem] rounded" />
            </div>
            <div className="flex gap-[0.5rem]">
              <div className="w-[3rem] h-[1.875rem] bg-gray-200 rounded-[6px]" />
              <div className="w-[3rem] h-[1.875rem] bg-gray-200 rounded-[6px]" />
            </div>
          </div>

          <div className="space-y-[0.25rem]">
            <div className="w-full h-[1rem] bg-gray-200 rounded" />
            <div className="w-[90%] h-[1rem] bg-gray-200 rounded" />
            <div className="w-[80%] h-[1rem] bg-gray-200 rounded" />
          </div>

          <div className="flex gap-[0.5rem] overflow-hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-[10.5rem] h-[10.5rem] bg-gray-200 rounded-[0.5rem] flex-shrink-0"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewListSkeleton;

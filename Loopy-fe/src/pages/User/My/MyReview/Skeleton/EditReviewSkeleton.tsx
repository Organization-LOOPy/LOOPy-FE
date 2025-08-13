const EditReviewPageSkeleton = () => {
  return (
    <div className="animate-pulse w-full mt-[1.5rem]">
      <div className="h-[2rem] w-[6rem] bg-[#E0E0E0] rounded mb-[1rem]" />
      <div className="h-[3.5rem] bg-[#E0E0E0] rounded-[0.5rem] mb-[0.5rem]" />

      <div className="h-[10rem] bg-[#E0E0E0] rounded-[0.5rem]" />

      <div className="mt-[1.5rem] h-[2rem] w-[6rem] bg-[#E0E0E0] rounded mb-[1rem]" />

      <div className="grid grid-cols-3 gap-[0.5rem]">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-[6.875rem] h-[6.875rem] bg-[#E0E0E0] rounded-[0.5rem] mb-[0.625rem]"
          />
        ))}
      </div>

      <div className="absolute bottom-[2rem] left-0 w-full px-[1.5rem]">
        <div className="w-full h-[3.5rem] bg-[#E0E0E0] rounded-[0.5rem] animate-pulse" />
      </div>
    </div>
  );
};

export default EditReviewPageSkeleton;

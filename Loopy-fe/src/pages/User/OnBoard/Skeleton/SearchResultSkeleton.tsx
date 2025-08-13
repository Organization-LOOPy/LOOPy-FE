const SearchResultSkeleton = () => {
  return (
    <div className="mb-4">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className="mb-[0.75rem] h-[3.5rem] bg-[#EDEDED] rounded-[8px] animate-pulse"
        />
      ))}
    </div>
  );
};

export default SearchResultSkeleton;

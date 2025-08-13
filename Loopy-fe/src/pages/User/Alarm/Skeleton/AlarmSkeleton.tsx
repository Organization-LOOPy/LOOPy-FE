const AlarmSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col gap-2 px-4 py-3 border-b border-gray-200">
      <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
      <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
    </div>
  );
};

export default AlarmSkeleton;

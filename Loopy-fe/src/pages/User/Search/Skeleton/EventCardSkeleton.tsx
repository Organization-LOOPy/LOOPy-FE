export default function EventCardSkeleton() {
  return (
    <div className="flex items-center justify-between bg-[#F0F1FE] h-[6.5rem] rounded-[0.5rem] px-4 animate-pulse">
      <div className="flex items-center overflow-hidden">
        <div className="w-[3.875rem] h-[3.875rem] rounded-full bg-gray-300" />

        <div className="ml-[1rem] flex flex-col">
          <div className="w-[4rem] h-[0.75rem] bg-gray-300 rounded" />
          <div className="mt-[0.75rem] w-[10rem] h-[1rem] bg-gray-300 rounded" />
          <div className="mt-[0.5rem] w-[8rem] h-[0.875rem] bg-gray-200 rounded" />
        </div>
      </div>

      <div className="ml-[1rem] w-[1.5rem] h-[1.5rem] bg-gray-300 rounded" />
    </div>
  );
}

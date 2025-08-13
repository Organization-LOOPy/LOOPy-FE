export default function TopPhotoSectionSkeleton() {
  return (
    <div className="w-full flex h-[16.9375rem] overflow-hidden animate-pulse">
      <div className="flex-1 h-full bg-gray-300" />

      <div className="flex flex-col">
        <div className="w-[8.125rem] h-[8.125rem] bg-gray-300" />

        <div className="relative w-[8.125rem] h-[8.8125rem] bg-gray-300 mt-[0.0rem]">
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-[1rem] font-normal leading-none" />
        </div>
      </div>
    </div>
  );
}

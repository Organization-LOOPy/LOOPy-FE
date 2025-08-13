import PinIcon from "/src/assets/images/PinIcon.svg?react";

export default function LocationLabelSkeleton() {
  return (
    <div className="flex items-center animate-pulse">
      <PinIcon
        className="w-[1rem] h-[1rem] mr-[0.25rem]"
      />
      
      <div className="w-[4rem] h-[0.875rem] bg-gray-200 rounded" />
    </div>
  );
}

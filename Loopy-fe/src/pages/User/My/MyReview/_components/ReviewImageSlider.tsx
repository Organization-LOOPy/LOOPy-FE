import { useRef } from "react";

interface Props {
  images: string[];
}

const ReviewImageSlider = ({ images }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative -mr-[1.5rem]">
      <div
        ref={containerRef}
        className="flex gap-[0.5rem] overflow-x-auto custom-scrollbar h-[10.5rem] pr-[1.5rem]"
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`review-${i}`}
            className="w-[10.5rem] h-[10.5rem] object-cover rounded-[0.5rem] flex-shrink-0"
            onError={(e) => {
              e.currentTarget.src = "https://picsum.photos/300/200?grayscale&blur=1";
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewImageSlider;

import { useState } from "react";
import SlideNavButton from "../../../../components/button/SlideButton";
import CloseWhiteIcon from "/src/assets/images/Close-White.svg?react";

interface CafePhotoModalProps {
    images: string[];
    onClose: () => void;
}

export default function CafePhotoModal({ images, onClose }: CafePhotoModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [thumbIndex, setThumbIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < images.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        if (currentIndex >= thumbIndex + 2 && thumbIndex < images.length - 3) {
            setThumbIndex((prev) => prev + 1);
        }
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
        if (currentIndex <= thumbIndex && thumbIndex > 0) {
            setThumbIndex((prev) => prev - 1);
        }
        }
    };

    return (
        <div className="absolute inset-0 z-[100] flex items-center justify-center">
            <div className="relative w-full max-w-[393px] h-full bg-black/70 flex flex-col items-center justify-center">
                <button
                onClick={onClose}
                className="absolute top-[1.5rem] right-[1.5rem] text-white"
                aria-label="닫기"
                >
                <CloseWhiteIcon className="w-[1.75rem] h-[1.75rem]" />
                </button>

                <div className="relative w-[21.534125rem] h-[14.75rem] flex-shrink-0 overflow-hidden rounded-[0.5rem]">
                    <img
                        src={images[currentIndex]}
                        alt={`cafe-${currentIndex}`}
                        className="w-full h-full object-cover"
                        style={{ aspectRatio: "344.55 / 236.00" }}
                    />
                    {images.length > 1 && (
                        <>
                        <SlideNavButton
                            variant="transparent"
                            direction="left"
                            onClick={handlePrev}
                        />
                        <SlideNavButton
                            variant="transparent"
                            direction="right"
                            onClick={handleNext}
                        />
                        </>
                    )}
                </div>

                <div className="absolute bottom-[2rem] left-0 w-full overflow-hidden px-[1.5rem]">
                    <div
                        className="flex gap-[0.5rem] transition-transform duration-300 ease-in-out"
                        style={{
                            transform: `translateX(-${thumbIndex * 7.375}rem)`, 
                        }}
                    >
                        {images.map((img, idx) => (
                            <div
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-[6.875rem] h-[6.875rem] flex-shrink-0 rounded-[0.5rem] cursor-pointer ${
                                    currentIndex === idx ? "border-[1.5px] border-[#E3F389]" : "opacity-70"
                                }`}
                            >
                                <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover rounded-[0.5rem]" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

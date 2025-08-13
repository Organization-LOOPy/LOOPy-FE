import ImageIcon from "/src/assets/images/Image.svg?react";
import ArrowLeftButton from "/src/assets/images/ArrowLeftWhite.svg?react";

interface TopPhotoSectionProps {
    images: string[];
    onOpenModal: () => void;
    onBack: () => void;
}

export default function TopPhotoSection({ images, onOpenModal, onBack }: TopPhotoSectionProps) {
    const visibleImages = images.slice(0, 3);
    const extraCount = images.length - 3;

    return (
        <div className="w-full flex h-[16.9375rem] overflow-hidden z-0">
            <button
                onClick={onBack}
                className="absolute left-[2.4375rem] top-[1.5rem] z-20"
            >
                <ArrowLeftButton className="w-[0.5625rem] h-[1.5rem]" />
            </button>

            {/* 왼쪽 큰 사진 */}
            <div className="w-full h-full overflow-hidden">
                <img src={visibleImages[0]} className="w-full h-full object-cover" />
            </div>

            {/* 오른쪽 두 장 */}
            <div className="flex flex-col">
                {visibleImages[1] && (
                    <img
                        src={visibleImages[1]}
                        className="w-[8.125rem] h-[8.125rem] object-cover"
                    />
                )}
                {visibleImages[2] && (
                    <div
                        className="relative w-[8.125rem] h-[8.8125rem] overflow-hidden cursor-pointer"
                        onClick={onOpenModal}
                    >
                        <img src={visibleImages[2]} className="w-full h-full object-cover" />
                        {extraCount > 0 && (
                            <div className="absolute inset-0 bg-black/30 border-[] flex items-center justify-center text-white text-[1rem] font-normal leading-none -mt-[1rem]">
                                <ImageIcon className="w-[1.125rem] h-[1.125rem] mr-[0.25rem]"/>+
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

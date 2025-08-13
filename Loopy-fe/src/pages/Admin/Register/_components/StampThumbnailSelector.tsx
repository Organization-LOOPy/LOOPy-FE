import type { ChangeEvent, RefObject } from 'react';
import DeletePic from '/src/assets/images/DeletePic.svg?react';
import CameraIcon from '/src/assets/images/AddStampIcon.svg?react';
import CheckIcon from '/src/assets/images/CheckWhite.svg?react';

interface Props {
    defaultStamps: string[];                 // 기본 이미지 URL 2개
    uploaded: string[];                      // 업로드 이미지 URL (0~2)
    selectedIndex: number | null;            // 0~3, null 허용
    onSelect: (index: number) => void;       // 썸네일 클릭 시
    canAddMore: boolean;
    removeUploadedAt: (index: number) => void;
    handleAddClick: () => void;
    fileRef: RefObject<HTMLInputElement | null>;
    handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean; 
}

export default function StampThumbnailSelector({
    defaultStamps,
    uploaded,
    selectedIndex,
    onSelect,
    canAddMore,
    removeUploadedAt,
    handleAddClick,
    fileRef,
    handleFileChange,
    disabled = false,
}: Props) {
    const SIZE = 'w-[6.875rem] h-[6.875rem]';
    const disabledItemCls = disabled ? 'opacity-60 cursor-not-allowed' : '';


    return (
        <div className="flex items-center gap-[0.5rem]">
            {/* 기본 2개 */}
            {defaultStamps.map((src, i) => {
                const idx = i; // 0,1
                const isSelected = selectedIndex === idx;
                return (
                    <button
                        key={`def-${i}`}
                        type="button"
                        onClick={disabled ? undefined : () => onSelect(idx)}
                        className={`relative ${SIZE} outline-none`}
                        aria-pressed={isSelected}
                    >
                        <div className="w-full h-full rounded-full overflow-hidden bg-[#F3F3F3] flex items-center justify-center">
                        <img src={src} alt={`기본 스탬프 ${i + 1}`} className="w-full h-full object-cover" />
                        </div>

                        {/* 선택 오버레이 (클릭 막지 않도록 pointer-events-none) */}
                        {isSelected && (
                            <div className="pointer-events-none absolute inset-0 rounded-full bg-black/35 flex items-center justify-center">
                                <CheckIcon />
                            </div>
                        )}
                    </button>
                );
            })}

            {/* 업로드 썸네일 */}
            {uploaded.map((src, i) => {
                const idx = defaultStamps.length + i; 
                const isSelected = selectedIndex === idx;
                return (
                    <div key={`up-${i}`} className={`relative ${SIZE}`}>
                        <button
                        type="button"
                        onClick={disabled ? undefined : () => onSelect(idx)}
                        className={`w-full h-full rounded-full overflow-hidden bg-[#F3F3F3] outline-none ${disabledItemCls}`}
                        aria-pressed={isSelected}
                        >
                            <img src={src} alt={`업로드 스탬프 ${i + 1}`} className="w-full h-full object-cover" />
                            {isSelected && (
                                <div className="pointer-events-none absolute inset-0 rounded-full bg-black/35 flex items-center justify-center">
                                <CheckIcon />
                                </div>
                            )}
                        </button>

                        {/* 삭제 버튼 (업로드만) */}
                        {!disabled && (
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); removeUploadedAt(i); }}
                            className="absolute -top-[0.1rem] -right-[0.1rem] z-10 flex items-center justify-center"
                            aria-label="업로드 스탬프 삭제"
                            title="삭제"
                        >
                            <DeletePic className="w-[1.875rem] h-[1.875rem]" />
                        </button>
                        )}
                    </div>
                );
            })}

            {/* 추가 버튼 */}
            {!disabled && canAddMore && (
                <button
                    type="button"
                    onClick={handleAddClick}
                    className="flex items-center justify-center"
                >
                    <CameraIcon />
                </button>
            )}

            {/* 파일 업로드 input */}
            <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={disabled} 
            />
        </div>
    );
}

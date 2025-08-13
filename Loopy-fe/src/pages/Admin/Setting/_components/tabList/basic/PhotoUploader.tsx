import { useEffect, useState, type ChangeEvent } from "react";
import CameraPlus from "../../../../../../assets/images/CameraPlus.svg?react";

type PhotoUploaderProps = {
  photos: File[];
  serverPhotos?: string[];
  maxPhotos: number;
  minPhotos: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDelete: (idx: number) => void;
  onDeleteServerPhoto?: (idx: number) => void;
};

const PhotoUploader = ({
  photos,
  serverPhotos = [],
  maxPhotos,
  minPhotos,
  onChange,
  onDelete,
  onDeleteServerPhoto,
}: PhotoUploaderProps) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const urls = photos
      .filter((f) => f instanceof Blob)
      .map((f) => URL.createObjectURL(f));

    setPreviewUrls(urls);

    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [photos]);

  const totalCount = serverPhotos.length + photos.length;

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="font-semibold text-[1rem]">사진 첨부</span>
        <span className="font-semibold text-[1rem]">
          <span className="text-[#6970F3]">{totalCount}</span>
          <span className="text-[#7F7F7F]">/{maxPhotos}</span>
        </span>
      </div>
      <div className="font-normal text-[0.875rem] text-[#7F7F7F] mb-[1rem]">
        최소 {minPhotos}개 이상의 사진을 첨부해주세요
      </div>

      <div className="flex gap-2 flex-wrap">
        {totalCount < maxPhotos && (
          <label
            className="w-[6.375rem] h-[6.375rem] flex items-center justify-center border border-[#DFDFDF] border-dashed rounded-[8px] bg-[#F3F3F3] cursor-pointer flex-shrink-0"
            style={{ borderWidth: "1.5px" }}
          >
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={onChange}
            />
            <CameraPlus />
          </label>
        )}

        {serverPhotos.map((url, idx) => (
          <div
            key={`srv-${idx}`}
            className="w-[6.375rem] h-[6.375rem] relative rounded-[8px] overflow-hidden flex-shrink-0"
          >
            <img
              src={url}
              alt={`서버사진${idx + 1}`}
              className="object-cover w-full h-full"
            />
            {onDeleteServerPhoto && (
              <button
                type="button"
                className="absolute top-1 right-1 bg-[#6970F3] text-white rounded-full w-5 h-5 flex items-center justify-center text-[0.75rem]"
                onClick={() => onDeleteServerPhoto(idx)}
                aria-label="서버사진 삭제"
              >
                ×
              </button>
            )}
          </div>
        ))}

        {previewUrls.map((src, idx) => (
          <div
            key={`file-${idx}`}
            className="w-[6.375rem] h-[6.375rem] relative rounded-[8px] overflow-hidden flex-shrink-0"
          >
            <img
              src={src}
              alt={`첨부사진${idx + 1}`}
              className="object-cover w-full h-full"
            />
            <button
              type="button"
              className="absolute top-1 right-1 bg-[#6970F3] text-white rounded-full w-5 h-5 flex items-center justify-center text-[0.75rem]"
              onClick={() => onDelete(idx)}
              aria-label="삭제"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoUploader;

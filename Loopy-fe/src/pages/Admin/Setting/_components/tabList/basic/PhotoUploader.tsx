import { useEffect, useState, type ChangeEvent } from "react";
import CameraPlus from "../../../../../../assets/images/CameraPlus.svg?react";
import { useCafePhotos } from "../../../../../../hooks/query/admin/photo/useCafePhotos";
import { useUploadCafePhotos } from "../../../../../../hooks/mutation/admin/photo/useUploadPhoto";
import { useDeleteCafePhoto } from "../../../../../../hooks/mutation/admin/photo/useDeleteCafePhoto";
import type { CafePhoto } from "../../../../../../apis/admin/setting/photo/type";
import LoadingSpinner from "../../../../../../components/loading/LoadingSpinner";

type PhotoUploaderProps = {
  maxPhotos: number;
  minPhotos: number;
  onCountChange?: (count: number) => void; 
};

const PhotoUploader = ({ maxPhotos, minPhotos, onCountChange }: PhotoUploaderProps) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [previewFiles, setPreviewFiles] = useState<File[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const { data: cafePhotos, isLoading, refetch } = useCafePhotos();
  const { mutateAsync: uploadPhotos, isPending: isUploading } = useUploadCafePhotos();
  const { mutateAsync: deleteById, isPending: isDeleting } = useDeleteCafePhoto();

  const serverUrls = cafePhotos?.map((p: CafePhoto) => p.photoUrl) ?? [];
  const serverIds = cafePhotos?.map((p: CafePhoto) => p.id) ?? [];

  useEffect(() => {
    const count = serverUrls.length + previewFiles.length;
    setTotalCount(count);
    onCountChange?.(count);
  }, [serverUrls, previewFiles, onCountChange]);

  useEffect(() => {
    const urls = previewFiles.map((f) => URL.createObjectURL(f));
    setPreviewUrls(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [previewFiles]);

  const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const remain = Math.max(0, maxPhotos - serverUrls.length);
    if (remain <= 0) {
      e.target.value = "";
      return;
    }

    const pickedAll = Array.from(e.target.files);
    const validAll = pickedAll.filter(
      (f) => f.type.startsWith("image/") && f.size <= 10 * 1024 * 1024
    );
    const toUpload = validAll.slice(0, remain);

    if (toUpload.length === 0) {
      e.target.value = "";
      return;
    }

    await uploadPhotos(toUpload);
    await refetch();
    e.target.value = "";
  };

  const handleDeleteServerPhoto = async (idx: number) => {
    const id = serverIds[idx];
    if (typeof id !== "number") return;
    await deleteById(id);
    await refetch();
  };

  const handleDeletePreview = (idx: number) => {
    setPreviewFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  if (isLoading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#6970F3] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  };

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
              onChange={handlePhotoChange}
            />
            <CameraPlus />
          </label>
        )}

        {serverUrls.map((url, idx) => (
          <div
            key={`srv-${idx}`}
            className="w-[6.375rem] h-[6.375rem] relative rounded-[8px] overflow-hidden flex-shrink-0"
          >
            <img src={url} alt={`서버사진${idx + 1}`} className="object-cover w-full h-full" />
            <button
              type="button"
              disabled={isDeleting}
              className="absolute top-1 right-1 bg-[#6970F3] text-white rounded-full w-5 h-5 flex items-center justify-center text-[0.75rem]"
              onClick={() => handleDeleteServerPhoto(idx)}
              aria-label="서버사진 삭제"
            >
              ×
            </button>
          </div>
        ))}

        {previewUrls.map((src, idx) => (
          <div
            key={`file-${idx}`}
            className="w-[6.375rem] h-[6.375rem] relative rounded-[8px] overflow-hidden flex-shrink-0"
          >
            <img src={src} alt={`첨부사진${idx + 1}`} className="object-cover w-full h-full" />
            <button
              type="button"
              className="absolute top-1 right-1 bg-[#6970F3] text-white rounded-full w-5 h-5 flex items-center justify-center text-[0.75rem]"
              onClick={() => handleDeletePreview(idx)}
              aria-label="삭제"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {isUploading && <LoadingSpinner /> }
    </div>
  );
};

export default PhotoUploader;

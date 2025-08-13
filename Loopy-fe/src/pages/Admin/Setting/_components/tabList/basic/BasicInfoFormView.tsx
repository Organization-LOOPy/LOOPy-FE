import type { ChangeEvent } from "react";
import CommonInput from "../../../../../../components/input/CommonInput";
import PhotoUploader from "./PhotoUploader";
import DescriptionArea from "./DescriptionArea";
import SNSInput from "./SNSInput";
import PhoneInput from "./PhoneInput";
import CommonAdminButton from "../../../../../../components/admin/button/CommonAdminButton";
import AddressSearchField from "./AddressSearchField";
import type { BasicInfoForm } from "../../../../../../types/basicInfo";
import { useUploadCafePhotos } from "../../../../../../hooks/mutation/admin/photo/useUploadPhoto";
import { useDeleteCafePhoto } from "../../../../../../hooks/mutation/admin/photo/useDeleteCafePhoto";

interface Props {
  form: BasicInfoForm;
  setField: <K extends keyof BasicInfoForm>(key: K) => (v: BasicInfoForm[K]) => void;
  commit: () => Promise<void | number> | void;
  isValid: boolean;
  isSubmitting: boolean;
  maxPhotos: number;
  minPhotos: number;
}

const BasicInfoFormView = ({
  form, setField, commit, isValid,
  isSubmitting, maxPhotos, minPhotos
}: Props) => {
  const { mutateAsync: uploadPhotos, isPending: isUploading } = useUploadCafePhotos();
  const { mutateAsync: deleteById,   isPending: isDeleting  } = useDeleteCafePhoto();

  const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const currIds  = form.serverPhotoIds  ?? [];
    const currUrls = form.serverPhotoUrls ?? [];

    const remain = Math.max(0, maxPhotos - currUrls.length);
    if (remain <= 0) { e.target.value = ""; return; }

    const pickedAll  = Array.from(e.target.files);
    const validAll   = pickedAll.filter(f => f.type.startsWith("image/") && f.size <= 10 * 1024 * 1024);
    const toUpload   = validAll.slice(0, remain);
    if (toUpload.length === 0) { e.target.value = ""; return; }

    const res = await uploadPhotos(toUpload); 
    const nextIds  = [...currIds,  ...res.map(p => p.id)].slice(0, maxPhotos);
    const nextUrls = [...currUrls, ...res.map(p => p.imageUrl)].slice(0, maxPhotos);

    setField("serverPhotoIds")(nextIds);
    setField("serverPhotoUrls")(nextUrls);
    setField("photos")([]);

    e.target.value = "";
  };

  const handleDeleteServerPhoto = async (idx: number) => {
    const ids  = form.serverPhotoIds  ?? [];
    const urls = form.serverPhotoUrls ?? [];
    const targetId = ids[idx];

    if (typeof targetId !== "number") {
      console.warn("photoId가 없어 서버 삭제를 수행할 수 없습니다. 상세 GET에서 id 동기화 필요.");
      return;
    }

    const ok = await deleteById(targetId);
    if (!ok) return;

    setField("serverPhotoIds")(ids.filter((_, i) => i !== idx));
    setField("serverPhotoUrls")(urls.filter((_, i) => i !== idx));
  };

  const handlePhotoDelete = (idx: number) => {
    setField("photos")((form.photos ?? []).filter((_, i) => i !== idx));
  };

  const setExtra = setField as unknown as (
    key:
      | "region1DepthName"
      | "region2DepthName"
      | "region3DepthName"
      | "latitude"
      | "longitude"
  ) => (v: any) => void;

  const submitDisabled = !isValid || isSubmitting || isUploading || isDeleting;

  return (
    <div className="flex flex-col gap-8">
      <div className="font-bold text-[1.25rem] mb-2">우리 매장의 기본정보를 입력해주세요</div>

      <div>
        <div className="font-semibold text-[1rem] mb-2">업체명</div>
        <CommonInput
          placeholder="업체명을 입력해주세요"
          value={form.storeName}
          onChange={(e) => setField("storeName")(e.target.value)}
        />
      </div>

      <div>
        <div className="font-semibold text-[1rem] mb-2">대표자</div>
        <CommonInput
          placeholder="대표자명을 입력해주세요"
          value={form.ownerName}
          onChange={(e) => setField("ownerName")(e.target.value)}
        />
      </div>

      <AddressSearchField
        address={form.address}
        setAddress={setField("address")}
        detailAddress={form.detailAddress}
        setDetailAddress={setField("detailAddress")}
        onPick={(p) => {
          setField("address")(p.address);
          setExtra("region1DepthName")(p.region1DepthName);
          setExtra("region2DepthName")(p.region2DepthName);
          setExtra("region3DepthName")(p.region3DepthName);
          setExtra("latitude")(p.latitude);
          setExtra("longitude")(p.longitude);
        }}
      />

      <div>
        <div className="font-semibold text-[1rem] mb-2">전화번호</div>
        <PhoneInput value={form.phone} onChange={(raw) => setField("phone")(raw)} />
      </div>

      <PhotoUploader
        photos={form.photos ?? []} 
        serverPhotos={form.serverPhotoUrls ?? []} 
        maxPhotos={maxPhotos}
        minPhotos={minPhotos}
        onChange={handlePhotoChange}
        onDelete={handlePhotoDelete}
        onDeleteServerPhoto={handleDeleteServerPhoto}
      />

      <DescriptionArea
        value={form.description}
        onChange={(e) => setField("description")(e.target.value)}
      />

      <SNSInput
        value={form.sns}
        onChange={(e) => setField("sns")(e.target.value)}
      />

      <CommonAdminButton
        label={
          isUploading
            ? "이미지 업로드 중..."
            : isDeleting
              ? "이미지 삭제 중..."
              : "수정 완료하기"
        }
        disabled={submitDisabled}
        onClick={() => void commit()}
      />
    </div>
  );
};

export default BasicInfoFormView;

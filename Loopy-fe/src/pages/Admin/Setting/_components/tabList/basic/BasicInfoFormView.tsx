import { useEffect, useState } from "react";
import CommonInput from "../../../../../../components/input/CommonInput";
import PhotoUploader from "./PhotoUploader";
import DescriptionArea from "./DescriptionArea";
import SNSInput from "./SNSInput";
import PhoneInput from "./PhoneInput";
import CommonAdminButton from "../../../../../../components/admin/button/CommonAdminButton";
import AddressSearchField from "./AddressSearchField";
import type { BasicInfoForm } from "../../../../../../types/basicInfo";

interface Props {
  form: BasicInfoForm;
  setField: <K extends keyof BasicInfoForm>(
    key: K
  ) => (v: BasicInfoForm[K]) => void;
  commit: () => Promise<void | number> | void;
  isValid: boolean;
  isSubmitting: boolean;
  maxPhotos: number;
  minPhotos: number;
}

const BasicInfoFormView = ({
  form,
  setField,
  commit,
  isSubmitting,
  maxPhotos,
  minPhotos,
}: Props) => {
  const [photoCount, setPhotoCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const setExtra = setField as unknown as (
    key:
      | "region1DepthName"
      | "region2DepthName"
      | "region3DepthName"
      | "latitude"
      | "longitude"
  ) => (v: any) => void;

  const isFormFilled =
    form.storeName.trim() !== "" &&
    form.ownerName.trim() !== "" &&
    form.address.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.description.trim() !== "";

  const finalValid = isFormFilled && photoCount >= minPhotos && photoCount <= maxPhotos;
  const submitDisabled = isSubmitted || !finalValid || isSubmitting;

  const handleSubmit = async () => {
    await commit();
    setIsSubmitted(true);
  };
  
  useEffect(() => {
    if (isSubmitted) {
      setIsSubmitted(false);
    }
  }, [form, photoCount]);

  return (
    <div className="flex flex-col gap-8">
      <div className="font-bold text-[1.25rem] mb-2">
        우리 매장의 기본정보를 입력해주세요
      </div>

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
        <PhoneInput
          value={form.phone}
          onChange={(raw) => setField("phone")(raw)}
        />
      </div>

      <PhotoUploader
        maxPhotos={maxPhotos}
        minPhotos={minPhotos}
        onCountChange={setPhotoCount}
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
        label="수정 완료하기"
        disabled={submitDisabled}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default BasicInfoFormView;

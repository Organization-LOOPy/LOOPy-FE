import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import BasicInput from '../_components/BasicInput';
import AddButton from '../_components/AddButton';
import ModalLocationSelector from '../_components/ModalLocationSelector';
import DeletePicIcon from '/src/assets/images/DeletePic.svg?react';
import PlusPicIcon from '/src/assets/images/PlusPic.svg?react';
import CommonButton from '../../../../components/button/CommonButton';
import { usePostOwnerCafeBasicInfo } from '../../../../hooks/mutation/admin/basic/usePostOwnerCafeBasicInfo';
import { useCafePhotos } from '../../../../hooks/query/admin/photo/useCafePhotos';
import { useUploadCafePhotos } from '../../../../hooks/mutation/admin/photo/useUploadPhoto';
import { useDeleteCafePhoto } from '../../../../hooks/mutation/admin/photo/useDeleteCafePhoto';
import type { PostOwnerCafeBasicInfoRequest } from '../../../../apis/admin/setting/basic/type';
import type { CafePhoto } from '../../../../apis/admin/photo/type';

interface Step2BasicInfoProps {
  cafeId?: number;
  setValid: (valid: boolean) => void;
  onNext: () => void;
}

const MAX_IMAGES = 5;
const MIN_IMAGES = 3;

export default function Step2BasicInfo({ cafeId, setValid, onNext }: Step2BasicInfoProps) {
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [snsLink, setSnsLink] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [region1DepthName, setRegion1DepthName] = useState('');
  const [region2DepthName, setRegion2DepthName] = useState('');
  const [region3DepthName, setRegion3DepthName] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const { data: cafePhotos, isLoading: isPhotosLoading, refetch } = useCafePhotos();
  const serverImages: CafePhoto[] = useMemo(() => cafePhotos ?? [], [cafePhotos]);
  const { mutateAsync: uploadPhotosMutate, isPending: isUploading } = useUploadCafePhotos();
  const { mutateAsync: deletePhotoMutate, isPending: isDeleting } = useDeleteCafePhoto();
  const { mutate: postBasicInfo, isPending } = usePostOwnerCafeBasicInfo();

  const isStepValid =
    !!businessName.trim() &&
    !!ownerName.trim() &&
    !!address.trim() &&
    !!detailAddress.trim() &&
    phone.replace(/\D/g, '').length === 11 &&
    serverImages.length >= MIN_IMAGES &&
    !!region1DepthName.trim() &&
    !!region2DepthName.trim() &&
    !!region3DepthName.trim() &&
    typeof latitude === 'number' &&
    typeof longitude === 'number';

  useEffect(() => {
    setValid(isStepValid);
  }, [
    isStepValid,
    setValid,
    businessName,
    ownerName,
    address,
    detailAddress,
    phone,
    region1DepthName,
    region2DepthName,
    region3DepthName,
    latitude,
    longitude,
    serverImages.length,
  ]);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const pickedAll = Array.from(e.target.files);
    const validAll = pickedAll.filter(
      (f) => f.type.startsWith('image/') && f.size <= 10 * 1024 * 1024
    );

    const remain = Math.max(0, MAX_IMAGES - serverImages.length);
    if (remain <= 0) {
      e.target.value = '';
      return;
    }

    const toUpload = validAll.slice(0, remain);
    if (toUpload.length === 0) {
      e.target.value = '';
      return;
    }

    await uploadPhotosMutate(toUpload);
    await refetch();
    e.target.value = '';
  };

  const handleImageRemove = async (photoId: number) => {
    await deletePhotoMutate(photoId);
    await refetch();
  };

  const handleSubmit = () => {
    if (!cafeId) {
      console.error('cafeId가 없습니다. Step1에서 생성 후 진행해주세요.');
      return;
    }

    const payload: PostOwnerCafeBasicInfoRequest = {
      id: cafeId,
      name: businessName,
      ownerName,
      address: `${address} ${detailAddress}`.trim(),
      region1DepthName,
      region2DepthName,
      region3DepthName,
      phone,
      description,
      websiteUrl: snsLink,
      latitude: latitude ?? undefined,
      longitude: longitude ?? undefined,
    };

    postBasicInfo(payload, {
      onSuccess: () => {
        onNext();
      },
    });
  };

  return (
    <div className="w-full flex-1 bg-white flex flex-col font-suit">
      <div className="flex-1 px-[1.5rem]">
        <div className="w-full max-w-[544px] mx-auto flex flex-col pt-[2rem]">
          <h1 className="text-[1.25rem] font-bold text-[#252525] mb-[2rem]">
            우리 매장의 기본정보를 입력해주세요
          </h1>

          <div className="mb-[2rem]">
            <div className="text-[1rem] font-semibold mb-[0.75rem]">업체명</div>
            <BasicInput
              placeholder="업체명을 입력해주세요"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>

          <div className="mb-[2rem]">
            <div className="text-[1rem] font-semibold mb-[0.75rem]">대표자</div>
            <BasicInput
              placeholder="사업자정보의 대표자 성명을 입력해주세요"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </div>

          <div className="mb-[2rem]">
            <div className="text-[1rem] font-semibold mb-[0.75rem]">전화번호</div>
            <BasicInput
              placeholder="전화번호를 입력해주세요"
              value={phone}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, '').slice(0, 11);
                setPhone(digits);
              }}
            />
          </div>

          <div className="mb-[2rem]">
            <div className="text-[1rem] font-semibold mb-[0.75rem]">주소</div>
            <div className="flex w-full gap-[0.5rem] items-center mb-[0.5rem]">
              <div className="flex-1">
                <BasicInput
                  placeholder="주소를 검색해주세요"
                  value={address}
                  readOnly
                  onChange={() => setIsModalOpen(true)}
                />
              </div>
              <AddButton
                text="주소 검색하기"
                className="text-white"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
            <BasicInput
              placeholder="상세 주소를 입력해주세요"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
            />
          </div>

          <div className="mb-[2rem]">
            <div className="text-[#252525] text-[1rem] font-bold flex items-center">
              사진 첨부
              <span className="ml-[0.5rem] text-[#6970F3]">{serverImages.length}</span>
              <span className="ml-0 text-[#7F7F7F]">/{MAX_IMAGES}</span>
            </div>
            <div className="text-[#7F7F7F] text-[0.875rem] mt-[0.5rem] mb-[1rem]">
              최소 {MIN_IMAGES}개 이상의 사진을 첨부해주세요
            </div>

            {isPhotosLoading ? (
              <div className="w-full h-[6.375rem] rounded-[8px] bg-[#F3F3F3] animate-pulse" />
            ) : (
              <div className="mt-[0.5rem] flex gap-[0.5rem] flex-wrap">
                {serverImages.length < MAX_IMAGES && (
                  <label className="w-[6.375rem] h-[6.375rem] rounded-[0.5rem] border border-dashed border-[#DFDFDF] flex items-center justify-center bg-[#F3F3F3] cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      multiple
                    />
                    <PlusPicIcon />
                  </label>
                )}

                {serverImages.map((img) => (
                  <div key={img.id} className="relative w-[6.375rem] h-[6.375rem]">
                    <img
                      src={img.photoUrl}
                      alt={`cafe-photo-${img.id}`}
                      className="w-full h-full object-cover rounded-[0.5rem]"
                    />
                    <button
                      onClick={() => handleImageRemove(img.id)}
                      disabled={isDeleting}
                      className="absolute top-[0.375rem] right-[0.375rem]"
                      aria-label="서버사진 삭제"
                    >
                      <DeletePicIcon className="w-[1rem] h-[1rem]" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {(isUploading || isDeleting) && (
              <div className="mt-2 text-sm text-[#7F7F7F]">사진을 처리하는 중입니다…</div>
            )}
          </div>

          <div className="mb-[2rem]">
            <div className="text-[1rem] font-semibold mb-[0.75rem]">소개글 (선택)</div>
            <div className="relative">
              <textarea
                placeholder="매장 소개글을 입력해주세요"
                className="w-full h-[10rem] rounded-[0.5rem] bg-[#F3F3F3] px-[1rem] py-[1rem] resize-none text-[0.875rem] text-[#3B3B3B] placeholder:text-[#7F7F7F] border border-transparent focus:border-[#6970F3] outline-none"
                maxLength={500}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="absolute bottom-[0.75rem] right-[1rem] text-[0.75rem] text-[#7F7F7F]">
                {description.length}/500
              </div>
            </div>
          </div>

          <div className="mb-[2rem]">
            <div className="text-[1rem] font-semibold mb-[0.75rem]">SNS 링크 (선택)</div>
            <BasicInput
              placeholder="SNS 링크를 입력해주세요"
              value={snsLink}
              onChange={(e) => setSnsLink(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full px-[1.5rem] pt-[1rem] pb-[2rem] max-w-[1024px] flex justify-center bg-white">
        <CommonButton
          text="다음으로 넘어가기"
          onClick={handleSubmit}
          disabled={!isStepValid || isPending}
          className={`w-full max-w-[34rem] ${
            isStepValid ? 'bg-[#6970F3] text-white' : 'bg-[#CCCCCC] text-[#7F7F7F] pointer-events-none'
          }`}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
          <ModalLocationSelector
            onClose={() => setIsModalOpen(false)}
            onSave={(selected) => {
              setAddress(selected.address);
              setRegion1DepthName(selected.region1DepthName);
              setRegion2DepthName(selected.region2DepthName);
              setRegion3DepthName(selected.region3DepthName);
              setLatitude(selected.latitude);
              setLongitude(selected.longitude);
              setIsModalOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

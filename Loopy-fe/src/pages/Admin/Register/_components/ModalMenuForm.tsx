import { useState, useMemo, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import CloseIcon from '/src/assets/images/Close.svg?react';
import PlusPicIcon from '/src/assets/images/PlusPic.svg?react';
import DeletePicIcon from '/src/assets/images/DeletePic.svg?react';
import BasicInput from './BasicInput';
import AddButton from './AddButton';
import SelectableItem from './SelectableItem';
import { useCreateOwnerMenu } from '../../../../hooks/mutation/admin/menu/useCreateOwnerMenu';

interface ModalMenuFormProps {
  onClose: () => void;
  onSubmit: (menu: {
    imageUrl?: string;
    name: string;
    description: string;
    price: string;
    isRepresentative?: boolean;
  }) => void;
  disableRepresentative?: boolean;
}

export default function ModalMenuForm({
  onClose,
  onSubmit,
  disableRepresentative = false,
}: ModalMenuFormProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isRepresentative, setIsRepresentative] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: createMenu, isPending } = useCreateOwnerMenu();

  const previewUrl = useMemo(() => (image ? URL.createObjectURL(image) : ''), [image]);
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // 이미지 업로드 (프론트에서만)
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setImage(file);
    e.target.value = '';
  };

  // 이미지 제거 (프론트에서만)
  const handleImageRemove = () => {
    setImage(null);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, '');
    setPrice(onlyNumbers);
  };

  const isFormValid =
    name.trim().length > 0 && price.trim().length > 0 && !isPending;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setError(null);
    try {
      const created = await createMenu({
        name,
        price: Number(price),
        description,
        isRepresentative,
        menuImage: image ?? undefined, // 여기서만 서버에 보냄
      });

      onSubmit({
        imageUrl: created.photoUrl,
        name: created.name,
        description: created.description,
        price: String(created.price),
        isRepresentative: created.isRepresentative,
      });

      onClose();
    } catch (e: any) {
      const msg =
        e?.response?.data?.reason ||
        e?.response?.data?.message ||
        e?.message ||
        '메뉴 등록에 실패했습니다.';
      setError(msg);
    }
  };

  return (
    <div className="w-[37rem] h-[35.75rem] bg-white rounded-[1rem] pt-[1.5rem] px-[1.5rem] flex flex-col font-suit">
      <div className="w-full flex justify-between items-center mb-[1.5rem]">
        <h2 className="text-[1.25rem] font-bold text-black">메뉴 추가</h2>
        <button onClick={onClose}>
          <CloseIcon />
        </button>
      </div>

      {error && (
        <div className="mb-[1rem] rounded-[0.5rem] bg-[#FDECEC] text-[#B00020] px-[0.75rem] py-[0.5rem] text-[0.875rem]">
          {error}
        </div>
      )}

      <div className="flex-1 w-full overflow-y-auto custom-scrollbar pr-[0.25rem]">
        {/* 이름 */}
        <div className="mb-[2rem]">
          <div className="text-[1rem] font-semibold mb-[0.75rem]">메뉴 이름</div>
          <BasicInput
            placeholder="메뉴 이름을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* 가격 */}
        <div className="mb-[2rem]">
          <div className="text-[1rem] font-semibold mb-[0.75rem]">가격</div>
          <BasicInput
            placeholder="메뉴 가격을 입력해주세요"
            value={price ? `${price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : ''}
            onChange={handlePriceChange}
          />
        </div>

        {/* 소개글 */}
        <div className="mb-[2rem]">
          <div className="text-[1rem] font-semibold mb-[0.75rem]">소개글</div>
          <div className="relative">
            <textarea
              className="w-full h-[10rem] rounded-[0.5rem] bg-[#F3F3F3] px-[1rem] py-[1rem] resize-none text-[0.875rem] text-[#3B3B3B] font-normal placeholder:text-[#7F7F7F] border border-transparent focus:border-[#6970F3] outline-none"
              placeholder="메뉴 소개글을 입력해주세요"
              maxLength={500}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="absolute bottom-[0.75rem] right-[1rem] text-[0.75rem] text-[#7F7F7F]">
              {description.length}/500
            </div>
          </div>
        </div>

        {/* 사진 첨부 */}
        <div className="mb-[2rem]">
          <div className="text-[1rem] font-bold text-[#252525] mb-[0.5rem]">
            사진 첨부 {image ? 1 : 0}/1 (선택)
          </div>

          <div className="mt-[0.5rem] flex gap-[0.5rem]">
            {!image ? (
              <label
                htmlFor="menu-image"
                className="w-[6.375rem] h-[6.375rem] shrink-0 rounded-[0.5rem] border border-dashed border-[#DFDFDF] flex items-center justify-center bg-[#F3F3F3] cursor-pointer"
              >
                <input
                  id="menu-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <PlusPicIcon />
              </label>
            ) : (
              <div className="relative w-[6.375rem] h-[6.375rem] shrink-0 overflow-hidden rounded-[0.5rem]">
                <img
                  src={previewUrl}
                  alt="preview"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <button
                  onClick={handleImageRemove}
                  className="absolute top-2 right-2 z-10 rounded-full bg-white/80 hover:bg-white shadow-sm"
                  aria-label="사진 삭제"
                  title="사진 삭제"
                >
                  <DeletePicIcon className="block w-4 h-4 pointer-events-none" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 대표 메뉴 설정 */}
        {!disableRepresentative && (
          <div className="mb-[2rem]">
            <div className="text-[1rem] font-bold text-[#252525] mb-[0.25rem]">
              대표 메뉴 설정 (선택)
            </div>
            <div className="text-[0.875rem] text-[#7F7F7F] font-normal mb-[0.5rem]">
              대표 메뉴는 최대 2개까지 설정 가능해요
            </div>
            <SelectableItem
              label="대표 메뉴로 설정하기"
              selected={isRepresentative}
              onClick={() => setIsRepresentative((prev) => !prev)}
            />
          </div>
        )}
      </div>

      {/* 버튼 */}
      <div className="mt-[1.5rem] pb-[2rem]">
        <AddButton
          text={'메뉴 추가하기'}
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full text-[1rem] flex items-center justify-center ${
            isFormValid
              ? 'bg-[#6970F3] text-white'
              : 'bg-[#CCCCCC] text-[#7F7F7F] pointer-events-none'
          }`}
        />
      </div>
    </div>
  );
}

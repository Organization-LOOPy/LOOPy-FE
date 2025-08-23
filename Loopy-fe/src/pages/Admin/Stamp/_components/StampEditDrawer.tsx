import { useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchStampPolicy, patchStampPolicy, fetchStampImages, uploadStampImage, deleteStampImage } from '../../../../apis/admin/stamp/api';
import type { PatchStampPolicyBody } from '../../../../apis/admin/stamp/type';
import CommonTopBar from '../../../../components/admin/topBar/CommonTopBar';
import CommonAdminButton from '../../../../components/admin/button/CommonAdminButton';
import StampThumbnailSelector from '../../Register/_components/StampThumbnailSelector';
import SelectableItem from '../../Register/_components/SelectableItem';
import NumberInput from '../../Register/_components/NumberInput';
import MenuDropdown, { type MenuOption } from '../../Register/_components/MenuDropdown';
import Stamp1 from '/src/assets/images/Stamp1.svg';
import Stamp2 from '/src/assets/images/Stamp2.svg';
import { useOwnerMenus } from '../../../../hooks/query/admin/menu/useOwnerMenus';

const DEFAULT_STAMPS = [Stamp1, Stamp2] as const;

type Basis = 'amount' | 'count';
type Reward = 'amount' | 'sizeup' | 'free';

interface Props {
  open: boolean;
  onClose: () => void;
  token?: string;
  menuOptions?: MenuOption[];
}

type NormalizedModel = {
  selectedImageUrl?: string;
  basis: Basis;
  amountThreshold?: number;
  amountStampCount?: number;
  countDrinkQty?: number;
  countStampCount?: number;
  reward: Reward;
  rewardDiscountAmount?: number;
  freeRewardMenuId?: number | null;
};

export default function StampPolicyEditDrawer({
  open,
  onClose,
  token,
}: Props) {
  const qc = useQueryClient();

  // 드로어 열렸을 때만 정책 조회
  const { data: policy } = useQuery({
    queryKey: ['stampPolicy', token ?? null],
    queryFn: () => fetchStampPolicy(token),
    enabled: open,
    retry: 1,
  });

  // 스탬프 이미지 조회
  const { data: uploadedImages = [] } = useQuery({
    queryKey: ['stampImages', token ?? null],
    queryFn: () => fetchStampImages(token),
    enabled: open,
  });

  // 로컬 상태
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // 새 이미지 파일들 (아직 업로드 안 된 상태)
  const [pendingAddImages, setPendingAddImages] = useState<File[]>([]);
  // 삭제 예약된 이미지 id들
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);

  const [basis, setBasis] = useState<Basis>('amount');
  const [amountThreshold, setAmountThreshold] = useState(''); // minAmount
  const [amountStampCount, setAmountStampCount] = useState(''); // stampPerAmount
  const [amountRewardMenuId, setAmountRewardMenuId] = useState<number | null>(null);

  const [countDrinkQty, setCountDrinkQty] = useState(''); // drinkCount
  const [countStampCount, setCountStampCount] = useState(''); // stampCountDrink

  const [reward, setReward] = useState<Reward>('amount');
  const [rewardDiscountAmount, setRewardDiscountAmount] = useState('');
  const [freeRewardMenuId, setFreeRewardMenuId] = useState<string | null>(null);

  // 보기/수정 모드 + 변경 감지
  const [isEdit, setIsEdit] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const initialModelRef = useRef<NormalizedModel | null>(null);
  
  // 선택된 이미지 URL 계산
  const selectedImageUrl = useMemo(() => {
    if (selectedIdx == null) return undefined;
    if (selectedIdx < DEFAULT_STAMPS.length) return DEFAULT_STAMPS[selectedIdx];

    const i = selectedIdx - DEFAULT_STAMPS.length;

    // uploaded + pendingAdd 합치기
    const merged = [
      ...uploadedImages.filter((img) => !deletedImageIds.includes(img.id)).map((img) => img.imageUrl),
      ...pendingAddImages.map((f) => URL.createObjectURL(f)),
    ];
    return merged[i];
  }, [selectedIdx, uploadedImages, deletedImageIds, pendingAddImages]);

  // 파일 선택 핸들러 (업로드는 안 함)
  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setPendingAddImages((prev) => [...prev, f]); // 예약 추가
    e.currentTarget.value = '';
  };

  // 삭제 핸들러 (즉시 삭제 X, state에만 저장)
  const removeUploadedAt = (upIdx: number) => {
    const merged = [
      ...uploadedImages.filter((img) => !deletedImageIds.includes(img.id)),
      ...pendingAddImages.map((f, idx) => ({ id: -1 - idx, imageUrl: URL.createObjectURL(f) })),
    ];

    const target = merged[upIdx];
    if (!target) return;

    if (target.id >= 0) {
      // 기존 업로드 → 삭제 예약
      setDeletedImageIds((prev) => [...prev, target.id]);
    } else {
      // pending 추가된 거 → 배열에서 제거
      const idx = -1 - target.id;
      setPendingAddImages((prev) => prev.filter((_, i) => i !== idx));
    }
    setSelectedIdx(null);
  };

  const toNum = (s: string) =>
    s.trim() === '' ? undefined : Number(s.replace(/,/g, ''));

  const currentModel: NormalizedModel = useMemo(
    () => ({
      selectedImageUrl,
      basis,
      amountThreshold: toNum(amountThreshold),
      amountStampCount: toNum(amountStampCount),
      countDrinkQty: toNum(countDrinkQty),
      countStampCount: toNum(countStampCount),
      reward,
      rewardDiscountAmount: toNum(rewardDiscountAmount),
      freeRewardMenuId:
        freeRewardMenuId != null && freeRewardMenuId !== ''
          ? Number(freeRewardMenuId)
          : null,
    }),
    [
      selectedImageUrl,
      basis,
      amountThreshold,
      amountStampCount,
      countDrinkQty,
      countStampCount,
      reward,
      rewardDiscountAmount,
      freeRewardMenuId,
    ]
  );

  useEffect(() => {
    if (!open || !policy) return;

    const defaultIdx = DEFAULT_STAMPS.findIndex(
      (u) => u === policy.selectedImageUrl
    );
    if (defaultIdx >= 0) {
      setSelectedIdx(defaultIdx);
    } else if (policy.selectedImageUrl) {
      const uploadedIdx = uploadedImages.findIndex(
        (img) => img.imageUrl === policy.selectedImageUrl
      );
      if (uploadedIdx >= 0) setSelectedIdx(DEFAULT_STAMPS.length + uploadedIdx);
      else setSelectedIdx(null);
    }

    setBasis(policy.conditionType === 'COUNT' ? 'count' : 'amount');
    setAmountThreshold(policy.minAmount != null ? String(policy.minAmount) : '');
    setAmountStampCount(
      policy.stampPerAmount != null ? String(policy.stampPerAmount) : ''
    );
    setCountDrinkQty(policy.drinkCount != null ? String(policy.drinkCount) : '');
    setCountStampCount(
      policy.stampPerCount != null ? String(policy.stampPerCount) : ''
    );

    let rw: Reward = 'amount';
    if (policy.rewardType === 'SIZE_UP') rw = 'sizeup';
    if (policy.rewardType === 'FREE_DRINK') rw = 'free';
    setReward(rw);

    setRewardDiscountAmount(
      policy.discountAmount != null ? String(policy.discountAmount) : ''
    );
    setFreeRewardMenuId(policy.menuId != null ? String(policy.menuId) : null);

    // 보기 모드로 진입
    setIsEdit(false);
    const modelFromPolicy: NormalizedModel = {
      selectedImageUrl: policy.selectedImageUrl ?? undefined,
      basis: policy.conditionType === 'COUNT' ? 'count' : 'amount',
      amountThreshold:
        policy.minAmount != null ? Number(policy.minAmount) : undefined,
      amountStampCount:
        policy.stampPerAmount != null ? Number(policy.stampPerAmount) : undefined,
      countDrinkQty:
        policy.drinkCount != null ? Number(policy.drinkCount) : undefined,
      countStampCount:
        policy.stampPerCount != null ? Number(policy.stampPerCount) : undefined,
      reward:
        policy.rewardType === 'SIZE_UP'
          ? 'sizeup'
          : policy.rewardType === 'FREE_DRINK'
          ? 'free'
          : 'amount',
      rewardDiscountAmount:
        policy.discountAmount != null ? Number(policy.discountAmount) : undefined,
      freeRewardMenuId: policy.menuId ?? null,
    };
    initialModelRef.current = modelFromPolicy;
    setDirty(false);
    setIsValid(false);
  }, [open, policy, uploadedImages]);

  useEffect(() => {
    if (!initialModelRef.current) return;
    setDirty(
      JSON.stringify(initialModelRef.current) !== JSON.stringify(currentModel)
    );
    let valid = true;
    if (basis === 'amount') {
      valid = amountThreshold.trim() !== '' && amountStampCount.trim() !== '';
    } else if (basis === 'count') {
      valid = countDrinkQty.trim() !== '' && countStampCount.trim() !== '';
    }
    if (reward === 'amount') {
      valid = valid && rewardDiscountAmount.trim() !== '';
    } else if (reward === 'free') {
      valid = valid && !!freeRewardMenuId;
    }
    setIsValid(valid);
  }, [
    currentModel,
    basis,
    reward,
    amountThreshold,
    amountStampCount,
    countDrinkQty,
    countStampCount,
    rewardDiscountAmount,
    freeRewardMenuId,
  ]);

  // 메뉴 불러오기
  const { data: menus = [] } = useOwnerMenus(token);

  const menuOptions: MenuOption[] = menus.map((menu) => ({
    id: String(menu.id),
    label: menu.name,
  }));

  const handleAddClick = () => fileRef.current?.click();

  // 저장
  const mutation = useMutation({
    mutationFn: (body: PatchStampPolicyBody) => patchStampPolicy(body, token),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['stampPolicy', token ?? null] });
      qc.invalidateQueries({ queryKey: ['stampImages', token ?? null] });
      onClose();
    },
    onError: (e) => {
      alert(`저장 실패 : ${String((e as Error)?.message ?? e)}`);
    },
  });

  const handleSubmit = async () => {
    if (!isEdit || !dirty || !isValid) return;

    let finalImageUrl = currentModel.selectedImageUrl;

    for (const f of pendingAddImages) {
      try {
        const res = await uploadStampImage(f, token);
        finalImageUrl = res.imageUrl;
      } catch (e) {
        alert('이미지 업로드 실패');
        return;
      }
    }

    // 삭제 예약된 이미지 처리
    for (const id of deletedImageIds) {
      try {
        await deleteStampImage(id, token);
      } catch {
        console.warn(`이미지 삭제 실패: ${id}`);
      }
    }

    const body: PatchStampPolicyBody = {};
    if (finalImageUrl) body.selectedImageUrl = finalImageUrl;
    if (currentModel.selectedImageUrl)
      body.selectedImageUrl = currentModel.selectedImageUrl;

    if (currentModel.basis === 'amount') {
      body.conditionType = 'AMOUNT';
      if (currentModel.amountThreshold !== undefined)
        body.amountThreshold = currentModel.amountThreshold;
      if (currentModel.amountStampCount !== undefined)
        body.stampCountAmount = currentModel.amountStampCount;
    } else {
      body.conditionType = 'COUNT';
      if (currentModel.countDrinkQty !== undefined)
        body.drinkCount = currentModel.countDrinkQty;
      if (currentModel.countStampCount !== undefined)
        body.stampCountDrink = currentModel.countStampCount;
    }

    if (currentModel.reward === 'amount') {
      body.rewardType = 'DISCOUNT';
      if (currentModel.rewardDiscountAmount !== undefined)
        body.discountAmount = currentModel.rewardDiscountAmount;
    } else if (currentModel.reward === 'sizeup') {
      body.rewardType = 'SIZE_UP';
    } else {
      body.rewardType = 'FREE_DRINK';
      if (currentModel.freeRewardMenuId !== null)
        body.menuId = currentModel.freeRewardMenuId;
    }

    try {
      await mutation.mutateAsync(body);
      setPendingAddImages([]);
      setDeletedImageIds([]);
    } catch (e) {
      alert(`저장 실패 : ${String((e as Error)?.message ?? e)}`);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed top-0 right-0 bottom-0 left-[12.875rem] z-[100]">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="absolute inset-0 bg-white overflow-y-auto">
        <div className="pl-[1.5rem] pr-[1.5rem]">
          <CommonTopBar title="스탬프 설정 정보 수정" onBack={onClose} />
        </div>

        <div className="flex flex-col w-full px-[1.5rem]">
          <div className="max-w-[34rem]">
            <div className="mb-[1.5rem] mt-[1rem]">
              <div className="text-[1rem] font-semibold text-[#252525] mb-[0.5rem] leading-[100%]">
                스탬프 사진
              </div>
              <p className="text-[0.875rem] text-[#7F7F7F] leading-[150%]">
                스탬프는 루피에서 제공하는 일러스트를 선택하거나 직접 사진을 추가해서
                등록하실 수 있어요
              </p>
            </div>

            <div className="flex items-center gap-[0.5rem] mb-[2rem]">
              <StampThumbnailSelector
                defaultStamps={DEFAULT_STAMPS as unknown as string[]}
                uploaded={[
                  ...uploadedImages
                    .filter((img) => !deletedImageIds.includes(img.id))
                    .map((img) => img.imageUrl),
                  ...pendingAddImages.map((f) => URL.createObjectURL(f)),
                ]}
                selectedIndex={selectedIdx}
                onSelect={(i) => isEdit && setSelectedIdx(i)}
                canAddMore={
                  isEdit &&
                  uploadedImages.length - deletedImageIds.length + pendingAddImages.length <
                    2
                }
                removeUploadedAt={isEdit ? removeUploadedAt : () => {}}
                handleAddClick={isEdit ? handleAddClick : () => {}}
                fileRef={fileRef}
                handleFileChange={handleFileChange}
                disabled={!isEdit}
              />
            </div>

            {/* 적립 조건 */}
            <div className="mb-[2rem]">
              <div className="text-[1rem] font-semibold text-[#252525] mb-[1.5rem] leading-[100%]">
                적립 조건
              </div>

              <div className="flex items-center gap-[1.5rem] mb-[1rem]">
                <SelectableItem
                  label="금액 기준"
                  selected={basis === 'amount'}
                  onClick={() => setBasis('amount')}
                  disabled={!isEdit}
                />
                <SelectableItem
                  label="횟수 기준"
                  selected={basis === 'count'}
                  onClick={() => setBasis('count')}
                  disabled={!isEdit}
                />
              </div>

              {basis === 'amount' ? (
                <div className="flex items-center flex-wrap gap-[0.75rem]">
                  <NumberInput
                    mode="amount"
                    value={amountThreshold}
                    onChange={setAmountThreshold}
                    placeholder="금액 입력"
                    className="w-[6.25rem]"
                    disabled={!isEdit}
                  />
                  <span className="text-[0.9375rem]">
                    원 이상 구매 시 스탬프
                  </span>
                  <NumberInput
                    mode="count"
                    value={amountStampCount}
                    onChange={setAmountStampCount}
                    placeholder="개수 입력"
                    className="w-[6.25rem]"
                    disabled={!isEdit}
                  />
                  <span className="text-[0.9375rem]">개 적립</span>
                </div>
              ) : (
                <div className="flex items-center flex-wrap gap-[0.75rem]">
                  <span className="text-[0.9375rem]">음료</span>
                  <NumberInput
                    mode="count"
                    value={countDrinkQty}
                    onChange={setCountDrinkQty}
                    placeholder="잔 수 입력"
                    className="w-[6.25rem]"
                    disabled={!isEdit}
                  />
                  <span className="text-[0.9375rem]">잔 구매 시 스탬프</span>
                  <NumberInput
                    mode="count"
                    value={countStampCount}
                    onChange={setCountStampCount}
                    placeholder="개수 입력"
                    className="w-[6.25rem]"
                    disabled={!isEdit}
                  />
                  <span className="text-[0.9375rem]">개 적립</span>
                </div>
              )}
            </div>

            {/* 리워드 */}
            <div className="mb-[2rem]">
              <div className="text-[1rem] font-semibold text-[#252525] mb-[1.5rem] leading-[100%]">
                10번째 적립 리워드
              </div>

              <div className="flex items-center gap-[2rem] mb-[1rem]">
                <SelectableItem
                  label="금액 할인"
                  selected={reward === 'amount'}
                  onClick={() => setReward('amount')}
                  disabled={!isEdit}
                />
                <SelectableItem
                  label="사이즈업"
                  selected={reward === 'sizeup'}
                  onClick={() => setReward('sizeup')}
                  disabled={!isEdit}
                />
                <SelectableItem
                  label="무료 음료"
                  selected={reward === 'free'}
                  onClick={() => setReward('free')}
                  disabled={!isEdit}
                />
              </div>

              {reward === 'amount' && (
                <div className="flex flex-col gap-[0.5rem]">
                  <MenuDropdown
                    options={menuOptions}
                    value={amountRewardMenuId ? String(amountRewardMenuId) : null} 
                    onChange={(id: string) => setAmountRewardMenuId(Number(id))} 
                    className="w-full"
                    placeholder="할인 적용할 메뉴를 선택해주세요"
                    disabled={!isEdit}
                  />

                  <div className="flex items-center gap-[0.75rem]">
                    <NumberInput
                      mode="amount"
                      value={rewardDiscountAmount}
                      onChange={setRewardDiscountAmount}
                      placeholder="금액 입력"
                      className="w-[6.25rem]"
                      disabled={!isEdit}
                    />
                    <span className="text-[0.9375rem]">원 할인</span>
                  </div>
                </div>
              )}

              {reward === 'free' && (
                <MenuDropdown
                  options={menuOptions}
                  value={freeRewardMenuId}
                  onChange={setFreeRewardMenuId}
                  className="mt-[0.5rem]"
                  placeholder="무료 리워드로 적용할 메뉴를 선택해주세요"
                  disabled={!isEdit}
                />
              )}
            </div>

            {/* 버튼 */}
            {!isEdit ? (
              <CommonAdminButton
                className="flex justify-center items-center"
                label="수정하기"
                onClick={() => setIsEdit(true)}
              />
            ) : (
              <CommonAdminButton
                disabled={!dirty || mutation.isPending || !isValid}
                className="flex justify-center items-center"
                label={mutation.isPending ? '저장 중...' : '수정 완료하기'}
                onClick={handleSubmit}
              />
            )}
          </div>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchStampPolicy, patchStampPolicy } from '../../../../apis/admin/stamp/api';
import type { PatchStampPolicyBody } from '../../../../apis/admin/stamp/type';
import CommonTopBar from '../../../../components/admin/topBar/CommonTopBar';
import CommonAdminButton from '../../../../components/admin/button/CommonAdminButton';
import StampThumbnailSelector from '../../Register/_components/StampThumbnailSelector';
import SelectableItem from '../../Register/_components/SelectableItem';
import NumberInput from '../../Register/_components/NumberInput';
import MenuDropdown, { type MenuOption } from '../../Register/_components/MenuDropdown';
import Stamp1 from '/src/assets/images/Stamp1.svg';
import Stamp2 from '/src/assets/images/Stamp2.svg';

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
  menuOptions = [],
}: Props) {
  const qc = useQueryClient();

  // 드로어 열렸을 때만 정책 조회
  const { data: policy } = useQuery({
    queryKey: ['stampPolicy'],
    queryFn: () => fetchStampPolicy(token),
    enabled: open,
  });

  // Step5Stamp 동일한 로컬 상태
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [uploaded, setUploaded] = useState<string[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const [basis, setBasis] = useState<Basis>('amount');
  const [amountThreshold, setAmountThreshold] = useState('');   // minAmount
  const [amountStampCount, setAmountStampCount] = useState(''); // stampPerAmount

  const [countDrinkQty, setCountDrinkQty] = useState('');       // drinkCount
  const [countStampCount, setCountStampCount] = useState('');   // stampCountDrink

  const [reward, setReward] = useState<Reward>('amount');
  const [rewardDiscountAmount, setRewardDiscountAmount] = useState('');
  const [freeRewardMenuId, setFreeRewardMenuId] = useState<string | null>(null);

  // 보기/수정 모드 + 변경 감지
  const [isEdit, setIsEdit] = useState(false);
  const [dirty, setDirty] = useState(false);
  const initialModelRef = useRef<NormalizedModel | null>(null);

  const selectedImageUrl = useMemo(() => {
    if (selectedIdx == null) return undefined;
    if (selectedIdx < DEFAULT_STAMPS.length) return DEFAULT_STAMPS[selectedIdx];
    const i = selectedIdx - DEFAULT_STAMPS.length;
    return uploaded[i];
  }, [selectedIdx, uploaded]);

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

  // 정책 → 폼 초기화 + initialModel 저장
  useEffect(() => {
    if (!open || !policy) return;

    const defaultIdx = DEFAULT_STAMPS.findIndex((u) => u === policy.selectedImageUrl);
    if (defaultIdx >= 0) {
      setUploaded([]);
      setSelectedIdx(defaultIdx);
    } else {
      setUploaded(policy.selectedImageUrl ? [policy.selectedImageUrl] : []);
      setSelectedIdx(policy.selectedImageUrl ? DEFAULT_STAMPS.length : null);
    }

    setBasis(policy.conditionType === 'COUNT' ? 'count' : 'amount');
    setAmountThreshold(policy.minAmount != null ? String(policy.minAmount) : '');
    setAmountStampCount(policy.stampPerAmount != null ? String(policy.stampPerAmount) : '');
    setCountDrinkQty(policy.drinkCount != null ? String(policy.drinkCount) : '');
    setCountStampCount(policy.stampPerCount != null ? String(policy.stampPerCount) : '');

    let rw: Reward = 'amount';
    if (policy.rewardType === 'SIZE_UP') rw = 'sizeup';
    if (policy.rewardType === 'FREE_DRINK') rw = 'free';
    setReward(rw);

    setRewardDiscountAmount(policy.discountAmount != null ? String(policy.discountAmount) : '');
    setFreeRewardMenuId(policy.menuId != null ? String(policy.menuId) : null);

    // 보기 모드로 진입
    setIsEdit(false);
    const modelFromPolicy: NormalizedModel = {
      selectedImageUrl: policy.selectedImageUrl ?? undefined,
      basis: policy.conditionType === 'COUNT' ? 'count' : 'amount',
      amountThreshold: policy.minAmount ?? undefined,
      amountStampCount: policy.stampPerAmount ?? undefined,
      countDrinkQty: policy.drinkCount ?? undefined,
      countStampCount: policy.stampPerCount ?? undefined,
      reward: policy.rewardType === 'SIZE_UP' ? 'sizeup' : policy.rewardType === 'FREE_DRINK' ? 'free' : 'amount',
      rewardDiscountAmount: policy.discountAmount ?? undefined,
      freeRewardMenuId: policy.menuId ?? null,
    };
    initialModelRef.current = modelFromPolicy;
    setDirty(false);
  }, [open, policy]);

  useEffect(() => {
    if (!initialModelRef.current) return;
    const a = JSON.stringify(initialModelRef.current);
    const b = JSON.stringify(currentModel);
    setDirty(a !== b);
  }, [currentModel]);

  const canAddMore = uploaded.length < 2;
  const handleAddClick = () => fileRef.current?.click();
  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setUploaded((prev) => (prev.length < 2 ? [...prev, url] : prev));
    setSelectedIdx(DEFAULT_STAMPS.length + uploaded.length);
    e.currentTarget.value = '';
  };
  const removeUploadedAt = (upIdx: number) => {
    const absoluteIdx = DEFAULT_STAMPS.length + upIdx;
    setSelectedIdx((prev) => (prev === absoluteIdx ? null : prev));
    setUploaded((prev) => prev.filter((_, i) => i !== upIdx));
  };

  // 저장
  const mutation = useMutation({
    mutationFn: (body: PatchStampPolicyBody) => patchStampPolicy(body, token),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['stampPolicy'] });
      onClose();
    },
  });

  const handleSubmit = () => {
    if (!isEdit || !dirty) return;

    const body: PatchStampPolicyBody = {};
    if (currentModel.selectedImageUrl) body.selectedImageUrl = currentModel.selectedImageUrl;

    if (currentModel.basis === 'amount') {
      body.conditionType = 'AMOUNT';
      if (currentModel.amountThreshold != null) body.minAmount = currentModel.amountThreshold;
      if (currentModel.amountStampCount != null) body.stampPerAmount = currentModel.amountStampCount;
    } else {
      body.conditionType = 'COUNT';
      if (currentModel.countDrinkQty != null) body.drinkCount = currentModel.countDrinkQty;
      if (currentModel.countStampCount != null) body.stampCountDrink = currentModel.countStampCount; // 서버 키
    }

    if (currentModel.reward === 'amount') {
      body.rewardType = 'DISCOUNT';
      if (currentModel.rewardDiscountAmount != null) body.discountAmount = currentModel.rewardDiscountAmount;
    } else if (currentModel.reward === 'sizeup') {
      body.rewardType = 'SIZE_UP';
    } else {
      body.rewardType = 'FREE_DRINK';
      if (currentModel.freeRewardMenuId != null) body.menuId = currentModel.freeRewardMenuId;
    }

    mutation.mutate(body);
  };

  if (!open) return null;

return (
    <div className="fixed top-0 right-0 bottom-0 left-[12.875rem] z-[100]">
      {/* 사이드바 제외 영역만 반투명 */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="absolute inset-0 bg-white overflow-y-auto">
        {/* 헤더 */}
        <div className="pl-[1.5rem] pr-[1.5rem]">
          <CommonTopBar title="매장 정보 수정" onBack={onClose} />
        </div>

        {/* 본문 */}
        <div className="flex flex-col w-full px-[1.5rem]">
          <div className="max-w-[34rem]">
            {/* 스탬프 사진 */}
            <div className="mb-[1.5rem] mt-[1rem]">
              <div className="text-[1rem] font-semibold text-[#252525] mb-[0.5rem] leading-[100%]">스탬프 사진</div>
              <p className="text-[0.875rem] text-[#7F7F7F] leading-[150%]">
                스탬프는 루피에서 제공하는 일러스트를 선택하거나 직접 사진을 추가해서 등록하실 수 있어요
              </p>
            </div>

            <div className="flex items-center gap-[0.5rem] mb-[2rem]">
              <StampThumbnailSelector
                defaultStamps={DEFAULT_STAMPS as unknown as string[]}
                uploaded={uploaded}
                selectedIndex={selectedIdx}
                onSelect={(i) => isEdit && setSelectedIdx(i)}
                canAddMore={isEdit && canAddMore}
                removeUploadedAt={isEdit ? removeUploadedAt : () => {}}
                handleAddClick={isEdit ? handleAddClick : () => {}}
                fileRef={fileRef}
                handleFileChange={handleFileChange}
                disabled={!isEdit}
              />
            </div>

            {/* 적립 조건 */}
            <div className="mb-[2rem]">
              <div className="text-[1rem] font-semibold text-[#252525] mb-[1.5rem] leading-[100%]">적립 조건</div>

              <div className="flex items-center gap-[1.5rem] mb-[1rem]">
                <SelectableItem label="금액 기준" selected={basis === 'amount'} onClick={() => setBasis('amount')} disabled={!isEdit} />
                <SelectableItem label="횟수 기준" selected={basis === 'count'} onClick={() => setBasis('count')} disabled={!isEdit} />
              </div>

              {basis === 'amount' ? (
                <div className="flex items-center flex-wrap gap-[0.75rem]">
                  <NumberInput mode="amount" value={amountThreshold} onChange={setAmountThreshold} placeholder="금액 입력" className="w-[6.25rem]" disabled={!isEdit} />
                  <span className="text-[0.9375rem]">원 이상 구매 시 스탬프</span>
                  <NumberInput mode="count" value={amountStampCount} onChange={setAmountStampCount} placeholder="개수 입력" className="w-[6.25rem]" disabled={!isEdit} />
                  <span className="text-[0.9375rem]">개 적립</span>
                </div>
              ) : (
                <div className="flex items-center flex-wrap gap-[0.75rem]">
                  <span className="text-[0.9375rem]">음료</span>
                  <NumberInput mode="count" value={countDrinkQty} onChange={setCountDrinkQty} placeholder="잔 수 입력" className="w-[6.25rem]" disabled={!isEdit} />
                  <span className="text-[0.9375rem]">잔 구매 시 스탬프</span>
                  <NumberInput mode="count" value={countStampCount} onChange={setCountStampCount} placeholder="개수 입력" className="w-[6.25rem]" disabled={!isEdit} />
                  <span className="text-[0.9375rem]">개 적립</span>
                </div>
              )}
            </div>

            {/* 리워드 */}
            <div className="mb-[2rem]">
              <div className="text-[1rem] font-semibold text-[#252525] mb-[1.5rem] leading-[100%]">10번째 적립 리워드</div>

              <div className="flex items-center gap-[2rem] mb-[1rem]">
                <SelectableItem label="금액 할인" selected={reward === 'amount'} onClick={() => setReward('amount')} disabled={!isEdit} />
                <SelectableItem label="사이즈업" selected={reward === 'sizeup'} onClick={() => setReward('sizeup')} disabled={!isEdit} />
                <SelectableItem label="무료 음료" selected={reward === 'free'} onClick={() => setReward('free')} disabled={!isEdit} />
              </div>

              {reward === 'amount' && (
                <div className="flex items-center gap-[0.75rem]">
                  <NumberInput mode="amount" value={rewardDiscountAmount} onChange={setRewardDiscountAmount} placeholder="금액 입력" className="w-[6.25rem]" disabled={!isEdit} />
                  <span className="text-[0.9375rem]">원 할인</span>
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

            {/* 버튼: 수정하기 / 수정 완료하기 */}
            {!isEdit ? (
              <CommonAdminButton className="flex justify-center items-center" label="수정하기" onClick={() => setIsEdit(true)} />
            ) : (
              <CommonAdminButton
                disabled={!dirty || mutation.isPending}
                className="flex justify-center items-center"
                label={mutation.isPending ? '저장 중...' : '수정 완료하기'}
                onClick={handleSubmit}
              />
            )}
          </div>
        </div>

        <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </div>
    </div>
  );
}

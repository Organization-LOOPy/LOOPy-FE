import { useEffect, useRef, useState } from 'react';
import StampThumbnailSelector from '../_components/StampThumbnailSelector';
import SelectableItem from '../_components/SelectableItem';
import Stamp1 from '/src/assets/images/Stamp1.svg';
import Stamp2 from '/src/assets/images/Stamp2.svg';
import NumberInput from '../_components/NumberInput';
import MenuDropdown from '../_components/MenuDropdown';
import type { MenuOption } from '../_components/MenuDropdown';

interface Step5StampProps {
    onBack?: () => void;
    setValid?: (v: boolean) => void;
    isDefault?: boolean;
}

type Basis = 'amount' | 'count';
type Reward = 'amount' | 'sizeup' | 'free';

const DEFAULT_STAMPS = [Stamp1, Stamp2];

export default function Step5Stamp({ setValid }: Step5StampProps) {
    const [uploaded, setUploaded] = useState<string[]>([]);
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [basis, setBasis] = useState<Basis>('amount');
    const [amountThreshold, setAmountThreshold] = useState('');     
    const [amountStampCount, setAmountStampCount] = useState('');
    const [countDrinkQty, setCountDrinkQty] = useState('');          
    const [countStampCount, setCountStampCount] = useState('');     
    const [reward, setReward] = useState<Reward>('amount');
    const [rewardDiscountAmount, setRewardDiscountAmount] = useState('');

    const mockMenus: MenuOption[] = [
        { id: 'm1', label: '초코 드리즐라떼' },
        { id: 'm2', label: '바닐라 라떼' },
        { id: 'm3', label: '카라멜 마끼아또' },
    ];
    const [freeRewardMenuId, setFreeRewardMenuId] = useState<string | null>(null);

    useEffect(() => {
        setValid?.(true);
    }, [setValid]);

    const canAddMore = uploaded.length < 2;

    const handleAddClick = () => fileRef.current?.click();
    const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        const url = URL.createObjectURL(f);
        setUploaded(prev => (prev.length < 2 ? [...prev, url] : prev));
        e.currentTarget.value = '';
    };

    const removeUploadedAt = (upIdx: number) => {
        const absoluteIdx = DEFAULT_STAMPS.length + upIdx;
        setSelectedIdx(prev => (prev === absoluteIdx ? null : prev));
        setUploaded(prev => prev.filter((_, i) => i !== upIdx));
    };

    return (
        <div className="relative w-full bg-white px-[1.5rem] pt-[2rem] pb-[8rem] font-suit gap-[2rem]">
            <div className="max-w-[34rem] mx-auto flex flex-col">
                <h1 className="text-[1.25rem] font-bold text-[#252525] mb-[1.5rem] leading-[100%]">
                    스탬프를 등록해주세요
                </h1>

                <div className="mb-[1.5rem]">
                    <div className="text-[1rem] font-semibold text-[#252525] mb-[0.5rem] leading-[100%]">스탬프 사진</div>
                    <p className="text-[0.875rem] text-[#7F7F7F] leading-[150%]">
                        스탬프는 루피에서 제공하는 일러스트를 선택하거나 직접 사진을 추가해서 등록하실 수 있어요
                    </p>
                </div>

                <div className="flex items-center gap-[0.5rem] mb-[2rem]">
                    <StampThumbnailSelector
                        defaultStamps={DEFAULT_STAMPS}
                        uploaded={uploaded}
                        selectedIndex={selectedIdx}
                        onSelect={setSelectedIdx}
                        canAddMore={canAddMore}
                        removeUploadedAt={removeUploadedAt}
                        handleAddClick={handleAddClick}
                        fileRef={fileRef}
                        handleFileChange={handleFileChange}
                    />
                </div>

                <div className="mb-[2rem]">
                    <div className="text-[1rem] font-semibold text-[#252525] mb-[1.5rem] leading-[100%]">적립 조건</div>

                    <div className="flex items-center gap-[1.5rem] mb-[1rem]">
                        <SelectableItem
                            label="금액 기준"
                            selected={basis === 'amount'}
                            onClick={() => setBasis('amount')}
                        />
                        <SelectableItem
                            label="횟수 기준"
                            selected={basis === 'count'}
                            onClick={() => setBasis('count')}
                        />
                    </div>

                    {basis === 'amount' && (
                        <div className="flex items-center flex-wrap gap-[0.75rem]">
                            <NumberInput
                                mode="amount"
                                value={amountThreshold}
                                onChange={setAmountThreshold}
                                placeholder="금액 입력"
                                className="w-[6.25rem]"
                            />
                            <span className="text-[0.9375rem]">원 이상 구매 시 스탬프</span>
                            <NumberInput
                                mode="count"
                                value={amountStampCount}
                                onChange={setAmountStampCount}
                                placeholder="개수 입력"
                                className="w-[6.25rem]"
                            />
                            <span className="text-[0.9375rem]">개 적립</span>
                        </div>
                    )}

                    {basis === 'count' && (
                        <div className="flex items-center flex-wrap gap-[0.75rem]">
                            <span className="text-[0.9375rem]">음료</span>
                            <NumberInput
                                mode="count"
                                value={countDrinkQty}
                                onChange={setCountDrinkQty}
                                placeholder="잔 수 입력"
                                className="w-[6.25rem]"
                            />
                            <span className="text-[0.9375rem]">잔 구매 시 스탬프</span>
                            <NumberInput
                                mode="count"
                                value={countStampCount}
                                onChange={setCountStampCount}
                                placeholder="개수 입력"
                                className="w-[6.25rem]"
                            />
                            <span className="text-[0.9375rem]">개 적립</span>
                        </div>
                    )}
                </div>

                <div className="mb-[2rem]">
                    <div className="text-[1rem] font-semibold text-[#252525] mb-[1.5rem] leading-[100%]">10번째 적립 리워드</div>

                    <div className="flex items-center gap-[2rem] mb-[1rem]">
                        <SelectableItem
                            label="금액 할인"
                            selected={reward === 'amount'}
                            onClick={() => setReward('amount')}
                        />
                        <SelectableItem
                            label="사이즈업"
                            selected={reward === 'sizeup'}
                            onClick={() => setReward('sizeup')}
                        />
                        <SelectableItem
                            label="무료 음료"
                            selected={reward === 'free'}
                            onClick={() => setReward('free')}
                        />
                    </div>

                    {reward === 'amount' && (
                        <div className="flex items-center gap-[0.75rem]">
                            <NumberInput
                                mode='amount'
                                value={rewardDiscountAmount}
                                onChange={setRewardDiscountAmount}
                                placeholder="금액 입력"
                                className="w-[6.25rem]" 
                            />
                            <span className="text-[0.9375rem]">원 할인</span>
                        </div>
                    )}
                    {reward === 'free' && (
                        <MenuDropdown
                            options={mockMenus}
                            value={freeRewardMenuId}
                            onChange={setFreeRewardMenuId}
                            className="mt-[0.5rem]"
                            placeholder="무료 리워드로 적용할 메뉴를 선택해주세요"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

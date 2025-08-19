import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StampThumbnailSelector from "../_components/StampThumbnailSelector";
import SelectableItem from "../_components/SelectableItem";
import Stamp1 from "/src/assets/images/Stamp1.svg";
import Stamp2 from "/src/assets/images/Stamp2.svg";
import NumberInput from "../_components/NumberInput";
import MenuDropdown from "../_components/MenuDropdown";
import type { MenuOption } from "../_components/MenuDropdown";
import { useUploadStampImage } from "../../../../hooks/mutation/admin/stamp/useUploadStampImage";
import { useDeleteStampImage } from "../../../../hooks/mutation/admin/stamp/useDeleteStampImage";
import { useCreateStampPolicy } from "../../../../hooks/mutation/admin/stamp/useCreateStampPolicy";
import type { CreateStampPolicyBody } from "../../../../apis/admin/register/stamp/type";

interface Step5StampProps {
  onBack?: () => void;
  setValid?: (v: boolean) => void;
  isDefault?: boolean;
}

type Basis = "amount" | "count";
type Reward = "amount" | "sizeup" | "free";

const DEFAULT_STAMPS = [Stamp1, Stamp2];

export default function Step5Stamp({ setValid }: Step5StampProps) {
  const navigate = useNavigate();

  const [uploaded, setUploaded] = useState<{ id: number; imageUrl: string }[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const [basis, setBasis] = useState<Basis>("amount");
  const [amountThreshold, setAmountThreshold] = useState("");
  const [amountStampCount, setAmountStampCount] = useState("");
  const [countDrinkQty, setCountDrinkQty] = useState("");
  const [countStampCount, setCountStampCount] = useState("");

  const [reward, setReward] = useState<Reward>("amount");
  const [rewardDiscountAmount, setRewardDiscountAmount] = useState("");

  const mockMenus: MenuOption[] = [
    { id: "1", label: "초코 드리즐라떼" },
    { id: "2", label: "바닐라 라떼" },
    { id: "3", label: "카라멜 마끼아또" },
  ];
  const [freeRewardMenuId, setFreeRewardMenuId] = useState<string | null>(null);

  const { mutateAsync: uploadImageMutate } = useUploadStampImage();
  const { mutateAsync: deleteImageMutate } = useDeleteStampImage();
  const { mutateAsync: createPolicyMutate } = useCreateStampPolicy();

  const handleAddClick = () => fileRef.current?.click();
  const canAddMore = uploaded.length < 2;

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    if (!canAddMore) {
      alert("스탬프 이미지는 최대 2개까지만 업로드할 수 있습니다.");
      e.currentTarget.value = "";
      return;
    }

    try {
      const uploadedData = await uploadImageMutate(f);
      setUploaded((prev) => [...prev, uploadedData]);
    } catch (err) {
      console.error("스탬프 이미지 업로드 실패", err);
    }

    e.currentTarget.value = "";
  };

  const removeUploadedAt = async (upIdx: number) => {
    const target = uploaded[upIdx];
    if (target) {
      try {
        await deleteImageMutate(target.id);
        setUploaded((prev) => prev.filter((_, i) => i !== upIdx));
      } catch (err) {
        console.error("스탬프 이미지 삭제 실패", err);
      }
    }
  };

  useEffect(() => {
    const isImageSelected = selectedIdx !== null;
    const isConditionValid =
      (basis === "amount" &&
        amountThreshold.trim() !== "" &&
        amountStampCount.trim() !== "") ||
      (basis === "count" &&
        countDrinkQty.trim() !== "" &&
        countStampCount.trim() !== "");

    const isRewardValid =
      (reward === "amount" && rewardDiscountAmount.trim() !== "") ||
      reward === "sizeup" ||
      (reward === "free" && freeRewardMenuId !== null);

    const valid = isImageSelected && isConditionValid && isRewardValid;

    setValid?.(valid);
  }, [
    selectedIdx,
    basis,
    amountThreshold,
    amountStampCount,
    countDrinkQty,
    countStampCount,
    reward,
    rewardDiscountAmount,
    freeRewardMenuId,
    setValid,
  ]);

  const handleSubmit = async () => {
    const selectedImageUrl =
      selectedIdx !== null && selectedIdx < DEFAULT_STAMPS.length
        ? DEFAULT_STAMPS[selectedIdx]
        : selectedIdx !== null
        ? uploaded[selectedIdx - DEFAULT_STAMPS.length]?.imageUrl
        : null;

    if (!selectedImageUrl) {
      alert("스탬프 이미지를 선택해주세요.");
      return;
    }

    const body: CreateStampPolicyBody = {
      selectedImageUrl,
      conditionType: basis === "amount" ? "AMOUNT" : "COUNT",
      ...(basis === "amount"
        ? {
            amountThreshold: Number(amountThreshold),
            stampCountAmount: Number(amountStampCount),
          }
        : {
            drinkCount: Number(countDrinkQty),
            stampCountDrink: Number(countStampCount),
          }),
      rewardType:
        reward === "amount"
          ? "DISCOUNT"
          : reward === "sizeup"
          ? "SIZE_UP"
          : "FREE_DRINK",
      ...(reward === "amount" && {
        discountAmount: Number(rewardDiscountAmount),
      }),
      ...(reward === "free" && {
        menuId: freeRewardMenuId ? Number(freeRewardMenuId) : null,
      }),
    };

    try {
      const created = await createPolicyMutate(body);
      console.log("스탬프 정책 등록 완료", created);
      navigate("/admin/home");
    } catch (err) {
      console.error("스탬프 정책 등록 실패", err);
    }
  };

  return (
    <div className="relative w-full bg-white px-[1.5rem] pt-[2rem] pb-[8rem] font-suit gap-[2rem]">
      <div className="max-w-[34rem] mx-auto flex flex-col">
        <h1 className="text-[1.25rem] font-bold text-[#252525] mb-[1.5rem]">
          스탬프를 등록해주세요
        </h1>
        <div className="mb-[1.5rem]">
          <div className="text-[1rem] font-semibold mb-[0.5rem]">스탬프 사진</div>
          <p className="text-[0.875rem] text-[#7F7F7F]">
            스탬프는 루피에서 제공하는 일러스트를 선택하거나 직접 사진을 추가해서 등록하실 수 있어요
          </p>
        </div>

        <div className="flex items-center gap-[0.5rem] mb-[2rem]">
          <StampThumbnailSelector
            defaultStamps={DEFAULT_STAMPS}
            uploaded={uploaded.map((u) => u.imageUrl)}
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
          <div className="text-[1rem] font-semibold mb-[1.5rem]">적립 조건</div>
          <div className="flex items-center gap-[1.5rem] mb-[1rem]">
            <SelectableItem label="금액 기준" selected={basis === "amount"} onClick={() => setBasis("amount")} />
            <SelectableItem label="횟수 기준" selected={basis === "count"} onClick={() => setBasis("count")} />
          </div>

          {basis === "amount" && (
            <div className="flex items-center flex-wrap gap-[0.75rem]">
              <NumberInput
                mode="amount"
                value={amountThreshold}
                onChange={setAmountThreshold}
                placeholder="금액 입력"
                className="w-[6.25rem]"
              />
              <span>원 이상 구매 시 스탬프</span>
              <NumberInput
                mode="count"
                value={amountStampCount}
                onChange={setAmountStampCount}
                placeholder="개수 입력"
                className="w-[6.25rem]"
              />
              <span>개 적립</span>
            </div>
          )}

          {basis === "count" && (
            <div className="flex items-center flex-wrap gap-[0.75rem]">
              <span>음료</span>
              <NumberInput
                mode="count"
                value={countDrinkQty}
                onChange={setCountDrinkQty}
                placeholder="잔 수 입력"
                className="w-[6.25rem]"
              />
              <span>잔 구매 시 스탬프</span>
              <NumberInput
                mode="count"
                value={countStampCount}
                onChange={setCountStampCount}
                placeholder="개수 입력"
                className="w-[6.25rem]"
              />
              <span>개 적립</span>
            </div>
          )}
        </div>

        <div className="mb-[2rem]">
          <div className="text-[1rem] font-semibold mb-[1.5rem]">10번째 적립 리워드</div>
          <div className="flex items-center gap-[2rem] mb-[1rem]">
            <SelectableItem label="금액 할인" selected={reward === "amount"} onClick={() => setReward("amount")} />
            <SelectableItem label="사이즈업" selected={reward === "sizeup"} onClick={() => setReward("sizeup")} />
            <SelectableItem label="무료 음료" selected={reward === "free"} onClick={() => setReward("free")} />
          </div>

          {reward === "amount" && (
            <div className="flex items-center gap-[0.75rem]">
              <NumberInput
                mode="amount"
                value={rewardDiscountAmount}
                onChange={setRewardDiscountAmount}
                placeholder="금액 입력"
                className="w-[6.25rem]"
              />
              <span>원 할인</span>
            </div>
          )}
          {reward === "free" && (
            <MenuDropdown
              options={mockMenus}
              value={freeRewardMenuId}
              onChange={setFreeRewardMenuId}
              className="mt-[0.5rem]"
              placeholder="무료 리워드로 적용할 메뉴를 선택해주세요"
            />
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={setValid ? undefined : false} 
          className="bg-[#6970F3] text-white py-[0.75rem] rounded-lg font-semibold disabled:bg-gray-300"
        >
          다음으로 넘어가기
        </button>
      </div>
    </div>
  );
}

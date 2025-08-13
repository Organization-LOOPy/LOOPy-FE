import { useState } from "react";
import CommonButton from "../../../../components/button/CommonButton";
import { useOnboardingContext } from "../../../../contexts/OnboardingContext";
import { usePatchPreferredKeywords } from "../../../../hooks/mutation/onboard/usePreferredArea";
import TagSection from "./TagSection";

const storeTags = ["노트북", "1인석", "단체석", "주차 가능", "예약 가능", "와이파이 제공", "애견 동반", "24시간 운영"];
const takeawayTags = ["텀블러 할인", "포장 할인"];
const menuTags = ["비건", "저당/무가당", "글루텐프리", "디카페인"];

const StepCafeInfo = ({ onNext }: { onNext: () => void }) => {
  const { tags, setTags } = useOnboardingContext();
  const [selectedTags, setSelectedTags] = useState<string[]>(tags);
  const { mutate } = usePatchPreferredKeywords();

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleComplete = () => {
    setTags(selectedTags);
    const pureTags = selectedTags.map((t) => t.split("/")[1]);

    mutate(
      { preferredKeywords: pureTags },
      {
        onSuccess: () => {
          onNext();
        },
        onError: (err) => {
          console.error("선호 키워드 저장 실패:", err);
        },
      }
    );
  };

  return (
    <div className="pb-[6rem]">
      <div className="flex items-center mb-[0.5rem]">
        <h2 className="text-[1.5rem] text-[#323232] font-bold">
          관심 있는 카페 정보를 골라주세요
        </h2>
      </div>

      <div className="flex flex-col items-start gap-[0.25rem] mb-[3rem]">
        <p className="text-[0.875rem] text-[#7F7F7F] font-medium">
          해당하는 카페를 먼저 추천드릴게요
        </p>
        <span className="text-[#A8A8A8] text-[0.875rem] font-normal">
          (1 ~ 5개 선택 필수)
        </span>
      </div>

      <TagSection
        title="매장 이용"
        tagPrefix="store"
        tags={storeTags}
        selectedTags={selectedTags}
        onToggle={toggleTag}
      />

      <TagSection
        title="테이크아웃"
        tagPrefix="takeout"
        tags={takeawayTags}
        selectedTags={selectedTags}
        onToggle={toggleTag}
      />

      <TagSection
        title="메뉴"
        tagPrefix="menu"
        tags={menuTags}
        selectedTags={selectedTags}
        onToggle={toggleTag}
      />

      <div className="absolute left-0 w-full bottom-[2rem] px-[1.5rem]">
        <CommonButton
          text="완료하기"
          onClick={handleComplete}
          autoStyle={false}
          className={`w-full mt-[1.5rem] ${
            selectedTags.length >= 1 && selectedTags.length <= 5
              ? "bg-[#6970F3] text-white"
              : "bg-[#CCCCCC] text-[#7F7F7F] pointer-events-none"
          }`}
          disabled={selectedTags.length < 1 || selectedTags.length > 5}
        />
      </div>
    </div>
  );
};

export default StepCafeInfo;

import { useState } from "react";
import CommonHeader from "../../../../components/header/CommonHeader";
import CommonButton from "../../../../components/button/CommonButton";
import SelectableButton from "../../../../components/button/SelectableButton";

interface FilterProps {
  onBack: () => void;
}

const storeTags = [
  "노트북", "1인석", "단체석", "주차 가능", "예약 가능", "와이파이 제공", "애견 동반", "24시간 운영"
];
const takeawayTags = ["텀블러 할인", "포장 할인"];
const menuTags = ["비건", "저당/무가당", "글루텐프리", "디카페인"];

type Mode = "view" | "edit";

const FilterPage = ({ onBack }: FilterProps) => {
  const [mode, setMode] = useState<Mode>("view");
  const [selectedTags, setSelectedTags] = useState<string[]>(["store/노트북", "store/예약 가능"]);

  const toggleTag = (tag: string) => {
    if (mode !== "edit") return;
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : prev.length < 5
          ? [...prev, tag]
          : prev
    );
  };

  const handleComplete = () => {
    console.log("선택된 필터:", selectedTags);
    setMode("view"); 
  };

  const renderTags = (category: string, tags: string[]) => (
    <div className="flex flex-wrap gap-[0.5rem] mb-[2.75rem]">
      {tags.map((tag) => {
        const key = `${category}/${tag}`;
        return (
          <SelectableButton
            key={key}
            label={tag}
            selected={selectedTags.includes(key)}
            onClick={() => toggleTag(key)}
          />
        );
      })}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-white text-[#252525]">
      <CommonHeader
        title={mode === "edit" ? "나의 추천 필터 수정" : "나의 추천 필터"}
        onBack={() => {
          if (mode === "edit") setMode("view");
          else onBack();
        }}
      />

      {mode === "edit" && (
        <div className="text-[#7F7F7F] text-[0.875rem] font-normal mb-[0.5rem] mt-[1.5rem]">
          1 ~ 5개 선택 필수
        </div>
      )}

      <div className="mt-[1.5rem]">
        <div className="mb-[1rem] font-semibold text-[1rem]">매장 이용</div>
        {renderTags("store", storeTags)}

        <div className="mb-[1rem] font-semibold text-[1rem]">테이크아웃</div>
        {renderTags("takeout", takeawayTags)}

        <div className="mb-[1rem] font-semibold text-[1rem]">메뉴</div>
        {renderTags("menu", menuTags)}
      </div>

      <div className="absolute left-0 w-full bottom-[2rem]">
        {mode === "view" ? (
          <CommonButton
            text="수정하기"
            onClick={() => setMode("edit")}
            autoStyle={false}
            className="w-full bg-[#6970F3] text-white"
          />
        ) : (
          <CommonButton
            text="수정 완료하기"
            onClick={handleComplete}
            autoStyle={false}
            className={`w-full ${
              selectedTags.length >= 1 && selectedTags.length <= 5
                ? "bg-[#6970F3] text-white"
                : "bg-[#CCCCCC] text-[#7F7F7F] pointer-events-none"
            }`}
            disabled={selectedTags.length < 1 || selectedTags.length > 5}
          />
        )}
      </div>
    </div>
  );
};

export default FilterPage;

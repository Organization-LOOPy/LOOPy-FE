import CommonButton from "../../../../../components/button/CommonButton";
import TagButton from "../../../../../components/button/TagButton";
import { useState, useEffect, useMemo } from "react";
import { filterGroups } from "../../../../../constants/filterGroup";
import ResetIcon from "/src/assets/images/Reset.svg?react";

interface FilterPopupProps {
  onClose: () => void;
  selectedGroup?: string;
  initialSelected?: Record<string, string[]>;          
  onSave?: (next: Record<string, string[]>) => void;
}

export default function FilterPopup({ onClose, selectedGroup, initialSelected = {}, onSave, }: FilterPopupProps) {
  const [localSelected, setLocalSelected] = useState<Record<string, string[]>>(initialSelected);

  useEffect(() => {
    const normalized: Record<string, string[]> = {};
    filterGroups.forEach(g => {
      normalized[g.title] = [...(initialSelected[g.title] ?? [])];
    });
    setLocalSelected(normalized);
  }, []); 

  const groupsToShow = useMemo(
    () => (selectedGroup ? filterGroups.filter(g => g.title === selectedGroup) : filterGroups),
    [selectedGroup]
  );

  const toggleTag = (groupTitle: string, tag: string) => {
    setLocalSelected(prev => {
      const prevArr = prev[groupTitle] ?? [];
      const nextArr = prevArr.includes(tag)
        ? prevArr.filter(t => t !== tag)
        : [...prevArr, tag];
      return { ...prev, [groupTitle]: nextArr };
    });
  };

  const handleReset = () => {
    if (selectedGroup) {
      setLocalSelected(prev => ({ ...prev, [selectedGroup]: [] }));
    } else {
      // 전체 초기화
      const cleared: Record<string, string[]> = {};
      filterGroups.forEach(g => (cleared[g.title] = []));
      setLocalSelected(cleared);
    }
  };

  const handleSave = () => {
    // 단일 그룹 팝업이면 해당 그룹만 갱신, 아니면 전체 갱신
    if (selectedGroup) {
      onSave?.({ ...initialSelected, [selectedGroup]: localSelected[selectedGroup] ?? [] });
    } else {
      onSave?.(localSelected);
    }
    onClose();
  };

  return (
    <div className="w-full bg-white rounded-t-[1rem] px-[1.5rem] pt-[2.5rem] pb-[10rem] relative">

      {/* 헤더 */}
      <div className="flex justify-between items-center mb-[1rem]">
        <h2 className="text-[1.25rem] font-bold">
          {selectedGroup ?? "세부 필터"}
        </h2>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-[0.75rem] text-[#3B3B3B]"
        >
          <ResetIcon className="w-3 h-3" />
          전체 초기화
        </button>
      </div>

      {/* 그룹별 필터 태그 */}
      <div className="flex flex-col gap-[1rem]">
        {groupsToShow.map((group) => (
          <div key={group.title}>
            {!selectedGroup && (
              <div className="text-[1rem] font-bold mb-[1rem]">{group.title}</div>
            )}
            <div className="flex flex-wrap gap-[0.5rem]">
              {group.tags.map((tag) => (
                <TagButton
                  key={tag}
                  label={tag}
                  selected={(localSelected[group.title] ?? []).includes(tag)}
                  onClick={() => toggleTag(group.title, tag)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 하단 버튼 */}
      <div className="absolute bottom-[2.25rem] left-0 w-full px-[1.5rem] flex flex-col gap-[0.5rem]">
        <CommonButton
          text="저장하기"
          autoStyle
          className="text-[1rem] h-[3.125rem] bg-[#6970F3] text-white font-semibold flex items-center justify-center"
          onClick={handleSave}
        />
        <CommonButton
          text="닫기"
          autoStyle={false}
          className="text-[1rem] h-[3.125rem] bg-[#DFDFDF] text-[#7F7F7F] font-semibold flex items-center justify-center"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

import NextIcon from "../../../../assets/images/Next.svg?react";
import type { MyPageStep } from "../../../../types/mySteps";

interface Props {
  onNavigate: (step: MyPageStep) => void;
}

type Menu = {
  label: string;
  step: MyPageStep;
};

const ActivityList = ({ onNavigate }: Props) => {
  const menus: Menu[] = [
    { label: "스탬프 히스토리", step: "stampHistory" },
    { label: "내가 작성한 리뷰", step: "review" },
    { label: "나의 추천 필터", step: "filter" },
  ];

  return (
    <>
      <p className="text-[0.875rem] font-semibold mb-[1.5rem]">나의 루피 활동</p>
      <div className="flex flex-col">
        {menus.map(({ label, step }) => (
          <button
            key={label}
            onClick={() => onNavigate(step)}
            className={`flex items-center justify-between text-left ${
              label === "내가 작성한 리뷰" ? "my-[1rem]" : ""
            }`}
          >
            <span className="text-[1rem] font-normal">{label}</span>
            <NextIcon className="w-[1rem] h-[1rem] text-[#A8A8A8]" />
          </button>
        ))}
      </div>
    </>
  );
};

export default ActivityList;

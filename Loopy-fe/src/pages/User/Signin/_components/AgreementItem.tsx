import CheckCircle from "./CheckCircle";
import NextIcon from "../../../../assets/images/Next.svg?react";

interface AgreementItemProps {
  label: string;
  checked: boolean;
  onClick: () => void;
  onArrowClick: () => void;
}

const AgreementItem = ({ label, checked, onClick, onArrowClick }: AgreementItemProps) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      className="flex items-center justify-between w-full py-3 cursor-pointer"
    >
      <div className="flex items-center gap-[0.75rem]">
        <CheckCircle checked={checked} />
        <span className="text-[0.875rem] font-normal text-[#252525]">{label}</span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation(); 
          onArrowClick();
        }}
      >
        <NextIcon />
      </button>
    </div>
  );
};

export default AgreementItem;

import CheckIcon from "../../../../assets/images/Check.svg?react";

interface CheckCircleProps {
  checked: boolean;
  disabled?: boolean;
}

const CheckCircle = ({ checked, disabled = false }: CheckCircleProps) => {
  const base =
    "w-[1.25rem] h-[1.25rem] rounded-full flex items-center justify-center border-[1.5px]";

  if (disabled) {
    const box = checked
      ? "bg-[#DFDFDF] border-[#DFDFDF]"
      : "bg-transparent border-[#DFDFDF]";
    const mark = checked ? "text-[#A8A8A8]" : "text-[#DFDFDF]";
    return (
      <div className={`${base} ${box}`}>
        <CheckIcon className={`w-3 h-2 ${mark}`} />
      </div>
    );
  }

  const box = checked ? "bg-[#6970F3] border-none" : "bg-transparent border-[#A8A8A8]";
  const mark = checked ? "text-white" : "text-[#A8A8A8]";

  return (
    <div className={`${base} ${box}`}>
      <CheckIcon className={`w-3 h-2 ${mark}`} />
    </div>
  );
};

export default CheckCircle;

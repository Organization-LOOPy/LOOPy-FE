import LoopyIconGreen from "../../../../assets/images/LoopyIconGreen.svg?react";
import LoopyTitle from "../../../../assets/images/LoopyTitle.svg?react";

const LoopyIconSection = () => {
  return (
    <div className="absolute top-0 left-0 right-0 w-full h-[24rem] z-0">
      <svg
        viewBox="0 0 393 160"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 L0,126 Q124,116 203,133 Q370,163 396,124 L393,0 Z"
          fill="#6970F3"
        />
      </svg>
      <div className="flex flex-col absolute top-0 left-0 w-full h-full flex justify-center items-center gap-[0.928rem] z-10">
        <LoopyIconGreen className="w-[4.75rem] h-[4.75rem]"/>
        <LoopyTitle />
      </div>
    </div>
  );
};

export default LoopyIconSection;

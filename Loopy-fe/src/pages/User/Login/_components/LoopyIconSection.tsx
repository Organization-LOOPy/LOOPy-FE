import LoopyIconGreen from "../../../../assets/images/LoopyIconGreen.svg?react";
import LoopyLogo from "../../../../assets/images/LoopyLogo.svg?react";

const LoopyIconSection = () => {
  return (
    <div className="absolute top-0 left-0 right-0 w-full h-[24rem] z-0">
      <svg
        viewBox="0 0 393 160"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="bgGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6970F3" stopOpacity="1" />
            <stop offset="100%" stopColor="#575DC9" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d="M0,0 L0,126 Q124,116 203,133 Q370,163 396,124 L393,0 Z"
          fill="url(#bgGradient)"
        />
      </svg>

      <div className="flex flex-col absolute top-0 left-0 w-full h-full flex justify-center items-center gap-[0.928rem] z-10">
        <LoopyIconGreen className="w-[4.75rem] h-[4.75rem]"/>
        <LoopyLogo className="w-[8.375rem] h-[2.75rem]"/>
      </div>
    </div>
  );
};

export default LoopyIconSection;

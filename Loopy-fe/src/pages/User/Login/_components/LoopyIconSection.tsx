import LoopyIconGreen from "../../../../assets/images/LoopyIconGreen.svg?react";
import LoopyLogo from "../../../../assets/images/LoopyLogo.svg?react";

const LoopyIconSection = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-[0.928rem] mt-[4.25rem]">
      <LoopyIconGreen className="w-[4.75rem] h-[4.75rem]" />
      <LoopyLogo className="w-[8.375rem] h-[2.75rem]" />
    </div>
  );
};

export default LoopyIconSection;

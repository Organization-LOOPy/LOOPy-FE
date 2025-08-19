import Vector from '../../../../assets/images/Vector.svg?react';
import StampDiscount from '../../../../assets/images/StampDiscount.svg?react';
import StampSizeUp from '../../../../assets/images/StampSizeUp.svg?react';
import StampFree from '../../../../assets/images/StampFree.svg?react';
import AcronStamp from '../../../../assets/images/AcronStamp.svg?react';

interface StampProps {
  currentStep: number;
  rewardType?: 'FREE_DRINK' | 'DISCOUNT' | 'SIZE_UP';
}

const StampPaper: React.FC<StampProps> = ({
  currentStep,
  rewardType = null,
}) => {
  const baseWidth = 307;
  const baseHeight = 426.4375;

  const positions = [
    { top: 345.44, left: 192 },
    { top: 360.44, left: 67 },
    { top: 273.44, left: 158 },
    { top: 186.44, left: 247 },
    { top: 203.44, left: 119 },
    { top: 210.44, left: 2 },
    { top: 130.44, left: 86 },
    { top: 84.44, left: 190 },
    { top: -6, left: 204.31 },
  ];

  const Step10Icon =
    rewardType === 'FREE_DRINK'
      ? StampFree
      : rewardType === 'DISCOUNT'
        ? StampDiscount
        : StampSizeUp;

  return (
    <div className="relative w-full sm:max-w-[393px] mx-auto aspect-[307/426.44]">
      <div className="absolute inset-0 scale-[1] origin-top-left">
        <Vector className="w-full h-full pointer-events-none object-contain" />

        {positions.map((pos, index) => {
          const step = index + 1;
          const isDone = step <= currentStep;

          return (
            <div
              key={step}
              className="absolute z-20"
              style={{
                top: `${(pos.top / baseHeight) * 100}%`,
                left: `${(pos.left / baseWidth) * 100}%`,
                width: '18.2%',
                height: '13.1%',
              }}
            >
              {isDone ? (
                <div className="w-full h-full rounded-full overflow-hidden">
                  <AcronStamp className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-full h-full rounded-full flex items-center justify-center text-white text-[1.25rem] font-bold border-[5px] border-[#DFDFDF] bg-[#A8A8A8]">
                  {step}
                </div>
              )}
            </div>
          );
        })}

        {/* rewardType에 따른 10단계 아이콘 */}
        <Step10Icon
          className="absolute z-30"
          style={{
            top: `${(14 / baseHeight) * 100}%`,
            left: `${(85 / baseWidth) * 100}%`,
            width: `${(85 / baseWidth) * 100}%`,
            height: `${(85 / baseHeight) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default StampPaper;

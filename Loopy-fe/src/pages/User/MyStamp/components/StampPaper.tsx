import Step10 from '../../../../assets/images/Step10.svg?react';
import Vector from '../../../../assets/images/Vector.svg?react';
import AcronStamp from '../../../../assets/images/AcronStamp.svg?react';

interface StampProps {
  currentStep: number; // 1~9
}

const StampPaper: React.FC<StampProps> = ({ currentStep }) => {
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

  return (
    <div className="relative w-full sm:max-w-[393px] mx-auto aspect-[307/426.44]">
      <div className="absolute inset-0 scale-[1] origin-top-left">
        <Vector className="w-full h-full pointer-events-none object-contain" />

        {/* 각 스텝 */}
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
                width: '18.2%', // 56 / 307
                height: '13.1%', // 56 / 426.44
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

        {/* 10단계 아이콘 */}
        <Step10
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

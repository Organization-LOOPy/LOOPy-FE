import { useNavigate } from "react-router-dom";
import type { MyPageSteps } from "../../../../types/mySteps";
import type { SVGProps, ComponentType } from "react";
import MyCoupon from "../../../../assets/images/MyCoupon.svg?react";
import MyStamp from "../../../../assets/images/MyStamp.svg?react";  
import MyChallenge from "../../../../assets/images/MyChallenge.svg?react";

interface Props {
  onNavigate: (step: keyof MyPageSteps, context: (prev: any) => any) => void;
  onRoute?: (path: string) => void;
}

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

type Menu = {
  label: string;
  step?: keyof MyPageSteps;
  path?: string;
  Icon: SvgIcon;
};

const QuickAccessMenu = ({ onNavigate, onRoute }: Props) => {
  const navigate = useNavigate();

  const menus: Menu[] = [
    { label: "스탬프 환전", step: "stampExchange", Icon: MyStamp },
    { label: "챌린지", path: "/challenge", Icon: MyChallenge },
    { label: "쿠폰함", step: "couponBox", Icon: MyCoupon },
  ];

  return (
    <div className="mt-4 flex gap-[0.5rem]">
      {menus.map(({ label, step, path, Icon }) => (
        <div
          key={label}
          className="flex-1 bg-[#F3F3F3] rounded-[8px] px-[0.5rem] py-[0.75rem] min-w-0"
        >
          <button
            onClick={() => {
              if (path === "/challenge") {
                navigate("/challenge");
              } else if (path) {
                onRoute?.(path);
              } else if (step) {
                onNavigate(step, () => ({}));
              }
            }}
            className="w-full flex flex-col items-center justify-center"
          >
            <Icon className="w-[2.5rem] h-[2.5rem]" />
            <span className="text-[0.875rem] font-semibold text-[#252525] mt-[0.5rem] text-center break-keep">
              {label}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default QuickAccessMenu;

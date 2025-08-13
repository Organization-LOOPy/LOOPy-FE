import React from 'react';
import clsx from 'clsx';
import CheckCircle from '../../../pages/User/Signin/_components/CheckCircle';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  showCheckText?: boolean;    
  agree?: boolean;             
  onToggleAgree?: () => void;  
}

const CommonAdminButton = ({
  label,
  disabled = false,
  className = '',
  showCheckText = false,
  agree = false,
  onToggleAgree,
  ...props
}: Props) => {
  return (
    <div
      className={clsx(
        `
        fixed bottom-0 left-[1.5rem] right-0 ml-[12.875rem] max-w-[34rem] w-full z-30
        bg-white py-6
        flex flex-col items-center
        shadow-[0_0_32px_0_rgba(60,62,74,0.02)]
        `
      )}
    >
      <div className="w-full flex flex-col items-start">
        {showCheckText && (
          <div
            className="flex items-center gap-[0.5rem] mb-[1.25rem] cursor-pointer"
            onClick={onToggleAgree}
          >
            <CheckCircle checked={agree} />
            <span className="text-[1rem] text-[#3A3D40] font-normal">
              안내 사항을 모두 확인하였으며, 이에 동의합니다.
            </span>
          </div>
        )}
        <button
          type="button"
          disabled={disabled}
          className={clsx(
            `
            w-full
            py-[0.875rem] text-[1rem] rounded-[8px]
            text-center transition-colors duration-200 
            border-none outline-none
            focus:border-none focus:outline-none
            active:border-none active:outline-none
            `,
            disabled
              ? 'bg-[#DFDFDF] text-[#7F7F7F]'
              : 'bg-[#6970F3] text-white',
            className
          )}
          {...props}
        >
          {label}
        </button>
      </div>
    </div>
  );
};

export default CommonAdminButton;

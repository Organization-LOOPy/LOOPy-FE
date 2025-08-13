interface CommonButtonProps {
  text: string;
  onClick?: () => void;
  className?: string; 
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  autoStyle?: boolean; 
}

const CommonButton = ({
  text,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  autoStyle = true,
}: CommonButtonProps) => {
  const baseStyle = "w-full py-[1rem] text-center font-suit font-semibold text-[1rem] rounded-[8px]";
  const active = "bg-[#6970F3] text-white";
  const inactive = "bg-[#DFDFDF] text-[#7F7F7F] pointer-events-none";

  const appliedClass = autoStyle
    ? `${baseStyle} ${disabled ? inactive : active}`
    : baseStyle;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${appliedClass} ${className}`}
    >
      {text}
    </button>
  );
};

export default CommonButton;

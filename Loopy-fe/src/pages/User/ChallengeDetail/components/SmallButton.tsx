interface SmallButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const SmallButton = ({ text, onClick, className = '' }: SmallButtonProps) => {
  const baseStyle = `
    w-[52px]
    h-[32px]
    px-[12px]
    py-[8px]
    rounded-[6px]
    flex
    items-center
    justify-center
    text-[1rem]
    font-semibold
    bg-[#6970F3]
    text-white
    hover:bg-[#5b62d8]
  `;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyle} ${className}`}
    >
      {text}
    </button>
  );
};

export default SmallButton;

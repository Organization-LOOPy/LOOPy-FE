type HomeButtonProps = {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  onClick: () => void;
  'aria-label'?: string;
};

const HomeButton: React.FC<HomeButtonProps> = ({
  Icon,
  label,
  onClick,
  'aria-label': ariaLabel,
}) => {
  return (
    <button
      aria-label={ariaLabel || label}
      className="flex flex-col items-center justify-center gap-2.5 p-4 bg-[#F0F1FE] text-[#6970F3] rounded-lg h-[8.938rem] w-full"
      onClick={onClick}
    >
      <Icon className="h-16 w-auto" aria-hidden="true" />
      <span className="text-[1rem] font-semibold text-center">{label}</span>
    </button>
  );
};

export default HomeButton;

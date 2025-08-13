interface DetailButtonProps {
  onClick?: () => void;
  textColor?: string;
  label?: string;
}

const DetailButton = ({ onClick, textColor, label }: DetailButtonProps) => {
  return (
    <button
      className={`flex items-center gap-1 text-[0.875rem] font-normal ${textColor}`}
      onClick={onClick}
    >
      <span>{label}</span>
      <span>→</span>
    </button>
  );
};

export default DetailButton;

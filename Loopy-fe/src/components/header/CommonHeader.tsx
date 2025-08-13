import BackIcon from "../../assets/images/Back.svg?react";

interface CommonHeaderProps {
  title: string;
  onBack?: () => void;
  white?: boolean;
}

const CommonHeader = ({ title, onBack, white = false }: CommonHeaderProps) => {
  const textColor = white ? "text-white" : "text-[#000000]";

  return (
    <div className="w-full h-[3rem] flex items-center justify-between">
      {onBack ? (
        <button onClick={onBack}>
          <BackIcon className={textColor} />
        </button>
      ) : (
        <div className="w-[1.5rem]" />
      )}
      <h1 className={`text-[1.125rem] font-bold ${textColor}`}>{title}</h1>
      <div className="w-[1.5rem]" />
    </div>
  );
};

export default CommonHeader;

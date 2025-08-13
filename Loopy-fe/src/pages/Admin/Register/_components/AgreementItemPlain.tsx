import CheckCircle from "../../../User/Signin/_components/CheckCircle";

interface AgreementItemPlainProps {
  label: string;
  checked: boolean;
  onClick: () => void;
}

const AgreementItemPlain = ({ label, checked, onClick }: AgreementItemPlainProps) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
      className="flex items-center justify-between w-full py-3 cursor-pointer"
    >
      <div className="flex items-center gap-[0.75rem]">
        <CheckCircle checked={checked} />
        <span className="text-[0.875rem] font-normal text-[#252525]">{label}</span>
      </div>
    </div>
  );
};

export default AgreementItemPlain;

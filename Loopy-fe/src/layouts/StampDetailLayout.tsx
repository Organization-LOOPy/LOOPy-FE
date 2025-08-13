import CommonHeader from "../components/header/CommonHeader";

interface Props {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}

const StampDetailLayout = ({ title, onBack, children }: Props) => {
  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full sm:max-w-[393px] px-[1.5rem]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#6970F3] to-[#3D418D] z-0" />
        <div className="relative z-10 flex flex-col min-h-screen">
          <CommonHeader title={title} onBack={onBack} white />
          {children}
        </div>
      </div>
    </div>
  );
};

export default StampDetailLayout;

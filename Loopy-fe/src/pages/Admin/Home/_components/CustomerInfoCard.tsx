type CustomerInfoCardProps = {
  expiry: string;
  title: string;
  type: '사용' | '인증';
  onClick: () => void; // 모달 열기 위한 콜백
};

const CustomerInfoCard = ({
  expiry,
  title,
  type,
  onClick,
}: CustomerInfoCardProps) => {
  return (
    <div className="flex justify-between w-full h-[4.25rem] bg-white p-4 rounded-lg mb-2">
      <div className="flex flex-col gap-2">
        <div className="text-[0.75rem] text-[#7F7F7F] leading-none">
          기한 | ~ {expiry}
        </div>
        <div className="text-[1rem] text-[#252525] font-semibold leading-none">
          {title}
        </div>
      </div>
      <button
        onClick={onClick}
        className="text-white text-[0.875rem] font-semibold bg-[#6970F3] px-4 py-2.5 rounded-md leading-none"
      >
        {type}
      </button>
    </div>
  );
};

export default CustomerInfoCard;

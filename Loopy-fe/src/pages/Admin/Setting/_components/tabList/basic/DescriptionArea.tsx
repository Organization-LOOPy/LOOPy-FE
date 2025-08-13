interface DescriptionAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCompositionStart?: () => void;
  onCompositionEnd?: () => void;
}

const MAX_LENGTH = 500;

const DescriptionArea = ({ value, onChange, onCompositionStart, onCompositionEnd }: DescriptionAreaProps) => {
  const isOver = value.length > MAX_LENGTH;

  return (
    <div>
      <div className="font-semibold text-[1rem] mb-3">소개글</div>
      <div className="relative custom-scrollbar">
        <textarea
          className={`
            w-full min-h-[10rem] p-4 rounded-[8px] outline-none bg-[#F3F3F3] text-[0.875rem] font-normal resize-none
            ${isOver ? "border border-[#FF0000]" : "border-none focus:border focus:border-[#6970F3]"}
            transition-colors
          `}
          placeholder="소개글을 입력해주세요"
          maxLength={MAX_LENGTH}
          value={value}
          onChange={onChange}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
        />
        <div className="absolute bottom-3 right-4 text-[0.75rem] select-none font-semibold">
          <span className={isOver ? "text-[#FF0000]" : "text-[#252525]"}>{value.length}</span>
          <span className="text-[#7F7F7F] font-normal">/{MAX_LENGTH}</span>
        </div>
      </div>
    </div>
  );
};

export default DescriptionArea;

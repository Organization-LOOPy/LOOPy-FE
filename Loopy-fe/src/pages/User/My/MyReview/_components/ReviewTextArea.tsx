interface ReviewTextAreaProps {
  value: string;
  onChange: (v: string) => void;
}

const ReviewTextArea = ({ value, onChange }: ReviewTextAreaProps) => {
  return (
    <div className="relative gap-[1rem] mt-[0.5rem]">
      <div
        className="h-[10rem] rounded-[0.5rem] px-[1rem] pb-[2.25rem] py-[1rem] bg-[#F3F3F3]
        border border-transparent focus-within:border-[#6970F3]"
      >
        <textarea
          placeholder="내용을 입력해주세요"
          className="w-full h-full resize-none bg-transparent text-[0.875rem] text-[#3B3B3B] font-normal placeholder:text-[#7F7F7F] outline-none custom-scrollbar"
          maxLength={500}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <div className="absolute bottom-[0.75rem] mt-[0.5rem] right-[1rem] text-[0.75rem] text-[#7F7F7F] font-medium">
        <span className="text-[#252525]">{value.length}</span>
        <span className="text-[#7F7F7F]">/500</span>
      </div>
    </div>
  );
};

export default ReviewTextArea;

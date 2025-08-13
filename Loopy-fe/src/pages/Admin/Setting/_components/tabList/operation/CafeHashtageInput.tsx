import { useState } from "react";
import CommonInput from "../../../../../../components/input/CommonInput";

interface CafeHashtagInputProps {
  hashtags: string[];
  setHashtags: (tags: string[]) => void;
}

const MAX_TAGS = 2;

const CafeHashtagInput = ({ hashtags, setHashtags }: CafeHashtagInputProps) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed || hashtags.includes(trimmed) || hashtags.length >= MAX_TAGS) return;
    setHashtags([...hashtags, trimmed]);
    setInput("");
  };

  const handleRemove = (tag: string) => {
    setHashtags(hashtags.filter((h) => h !== tag));
  };

  const addDisabled = !input.trim();

  return (
    <div>
      <div className="font-semibold text-[1rem] mb-3">대표 해시태그</div>
      <div className="text-[0.95rem] text-[#A8A8A8] mb-2">
        해시태그는 최대 {MAX_TAGS}개까지 가능해요 (예시 : 말차 맛집)
      </div>

      <div className="flex gap-2 items-center">
        <div className="flex-[77_0_0%]">
          <CommonInput
            placeholder="대표 해시태그를 입력해주세요"
            value={input}
            onChange={e => setInput(e.target.value)}
            maxLength={15}
            onKeyDown={e => {
              if (e.key === "Enter") handleAdd();
            }}
          />
        </div>

        <button
          type="button"
          className={`
            flex-[23_0_0%] h-[3.375rem] py-0 rounded-[8px] text-[0.95rem] font-semibold transition
            ${addDisabled ? "bg-[#DFDFDF] text-[#7F7F7F] cursor-not-allowed" : "bg-[#6970F3] text-white"}
          `}
          onClick={handleAdd}
          disabled={addDisabled} 
        >
          추가하기
        </button>
      </div>

      <div className="flex gap-2">
        {hashtags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-[4px] bg-[#F0F1FE] px-2 py-1 text-[0.75rem] text-[#6970F3] font-normal mt-2"
          >
            #{tag}
            <button
              type="button"
              className="ml-2 text-[#6970F3] text-[1.125rem]"
              onClick={() => handleRemove(tag)}
              aria-label="해시태그 삭제"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default CafeHashtagInput;

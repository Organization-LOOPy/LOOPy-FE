import SearchIcon from "../../../../../assets/images/Search.svg?react";

interface Props {
  input: string;
  setInput: (val: string) => void;
  onSearch: () => void;
}

const SearchInputSection = ({ input, setInput, onSearch }: Props) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="flex items-center font-regular mb-4 bg-[#F3F3F3] rounded-[8px] p-[1rem]">
      <input
        type="text"
        placeholder="시/군/구로 검색해주세요"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        className="flex-1 text-[1rem] placeholder:text-[#A8A8A8] text-[#252525] bg-transparent outline-none"
      />
      <SearchIcon onClick={onSearch} className="w-5 h-5 cursor-pointer" />
    </div>
  );
};

export default SearchInputSection;

interface KeywordTagsProps {
  keywords: string[];
}

const KeywordTags = ({ keywords }: KeywordTagsProps) => {
  return (
    <div className="flex flex-wrap gap-[0.25rem]">
      {keywords.map((keyword, index) => (
        <span
          key={index}
          className="bg-[#F0F1FE] px-[0.5rem] py-[0.25rem] rounded-[0.25rem] text-[0.75rem] text-[#6970F3]"
        >
          #{keyword}
        </span>
      ))}
    </div>
  );
};

export default KeywordTags;

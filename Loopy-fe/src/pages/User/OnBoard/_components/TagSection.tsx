import SelectableButton from "../../../../components/button/SelectableButton";

interface TagSectionProps {
  title: string;
  tagPrefix: string;
  tags: string[];
  selectedTags: string[];
  onToggle: (tag: string) => void;
}

const TagSection = ({ title, tagPrefix, tags, selectedTags, onToggle }: TagSectionProps) => {
  return (
    <div className="mb-[2.75rem]">
      <div className="mb-[1rem] font-semibold text-[1rem] text-[#252525]">{title}</div>
      <div className="flex flex-wrap gap-[0.5rem]">
        {tags.map((tag) => {
          const key = `${tagPrefix}/${tag}`;
          return (
            <SelectableButton
              key={key}
              label={tag}
              selected={selectedTags.includes(key)}
              onClick={() => onToggle(key)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TagSection;

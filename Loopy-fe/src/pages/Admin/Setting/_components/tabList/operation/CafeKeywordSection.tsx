import { filterGroups } from '../../../../../../constants/filterGroup';
import TagButton from '../../../../../../components/button/TagButton';

type Props = {
  keywordList: string[];
  setKeywordList: (list: string[]) => void;
};

const CafeKeywordSection = ({ keywordList, setKeywordList }: Props) => {
  const toggleTag = (tag: string) => {
    setKeywordList(
      keywordList.includes(tag)
        ? keywordList.filter((t) => t !== tag)
        : [...keywordList, tag]
    );
  };

  const lineBreaks: Record<string, number[]> = {
    '매장 이용': [2, 5],
    '메뉴': [1], 
  };

  return (
    <div className="mb-[8rem]">
      <div className="font-semibold text-[1rem] mb-3">카페 키워드</div>

      <div className="flex flex-col gap-[2rem] p-6 bg-[#F3F3F3] rounded-[8px]">
        {filterGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-[1rem] font-semibold leading-[100%] mb-[1rem]">
              {group.title}
            </h3>

            <div className="flex flex-wrap gap-[0.5rem]">
              {group.tags.map((tag, idx) => (
                <div key={tag} className="contents">
                  <TagButton
                    label={tag}
                    selected={keywordList.includes(tag)}
                    onClick={() => toggleTag(tag)}
                  />
                  {lineBreaks[group.title]?.includes(idx) && (
                    <span className="w-full shrink-0 -mb-[1rem]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CafeKeywordSection;

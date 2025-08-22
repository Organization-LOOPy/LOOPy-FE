import TagButton from '../../../../components/button/TagButton';
import { filterGroups } from '../../../../constants/filterGroup';

type Props = {
  storeFilters: string[];
  setStoreFilters: (list: string[]) => void;
  takeOutFilters: string[];
  setTakeOutFilters: (list: string[]) => void;
  menuFilters: string[];
  setMenuFilters: (list: string[]) => void;
};

export default function KeywordSelector({
  storeFilters, setStoreFilters,
  takeOutFilters, setTakeOutFilters,
  menuFilters, setMenuFilters,
}: Props) {
  // 그룹별 state 매핑
  const filterMap: Record<
    string,
    [string[], (list: string[]) => void]
  > = {
    '매장 이용': [storeFilters, setStoreFilters],
    '테이크아웃': [takeOutFilters, setTakeOutFilters],
    '메뉴': [menuFilters, setMenuFilters],
  };

  const lineBreaks: Record<string, number[]> = {
    '매장 이용': [2, 5], 
    '메뉴': [1],        
  };

  return (
    <div className="bg-[#F5F5F5] p-[1.5rem] rounded-[0.75rem] flex flex-col gap-[2rem]">
      {filterGroups.map((group) => {
        const [filters, setFilters] = filterMap[group.title] ?? [[], () => {}];

        const toggleTag = (tag: string) => {
          setFilters(
            filters.includes(tag)
              ? filters.filter((t) => t !== tag)
              : [...filters, tag]
          );
        };

        return (
          <div key={group.title}>
            <h3 className="text-[1rem] font-semibold leading-[100%] mb-[1rem]">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-[0.5rem]">
              {group.tags.map((tag, idx) => (
                <div key={tag} className="contents">
                  <TagButton
                    label={tag}
                    selected={filters.includes(tag)}
                    onClick={() => toggleTag(tag)}
                  />
                  {lineBreaks[group.title]?.includes(idx) && (
                    <span className="w-full shrink-0 -mb-[1rem]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

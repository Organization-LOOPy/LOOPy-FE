import { generateRegionKey } from "../../../../../utils/region";
import type { KakaoPlace } from "../../../../../types/location";

interface Props {
  results: KakaoPlace[];
  selected: KakaoPlace | null;
  onSelect: (place: KakaoPlace) => void;
}

const SearchResultList = ({ results, selected, onSelect }: Props) => {
  return (
    <div className="mb-4">
      {results.map((place) => {
        const isSelected =
          selected && generateRegionKey(selected) === generateRegionKey(place);
        return (
          <div
            key={generateRegionKey(place)}
            className={`px-[1rem] py-[1.5rem] rounded-[8px] text-[1rem] text-black font-medium cursor-pointer flex items-center gap-2 transition
              ${isSelected ? "bg-[#F0F1FE]" : "bg-white"}`}
            onClick={() => onSelect(place)}
          >
            {place.region_1depth_name} {place.region_2depth_name}{" "}
            {place.region_3depth_name}
          </div>
        );
      })}
    </div>
  );
};

export default SearchResultList;

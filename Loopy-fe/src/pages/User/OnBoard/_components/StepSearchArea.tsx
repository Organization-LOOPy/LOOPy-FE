import { useSearchRegion } from "../../../../hooks/useSearchRegion";
import CommonButton from "../../../../components/button/CommonButton";
import SearchInputSection from "./search/SearchInputSection";
import CurrentLocationButton from "./search/CurrentLocationButton";
import SearchResultList from "./search/SearchResultList";
import SearchResultSkeleton from "../Skeleton/SearchResultSkeleton";
import { useOnboardingContext } from "../../../../contexts/OnboardingContext"; 
import { usePatchPreferredArea } from "../../../../hooks/mutation/onboard/usePreferredArea";

const StepSearchArea = ({ onNext }: { onNext: () => void }) => {
  const {
    input,
    setInput,
    selected,
    setSelected,
    handleSearch,
    handleCurrentLocation,
    filteredResults,
    isLoading,
  } = useSearchRegion();

  const { setRegion } = useOnboardingContext(); 
  const { mutate } = usePatchPreferredArea();

  const handleNext = () => {
    if (!selected) return;

    const preferredArea = `${selected.region_1depth_name} ${selected.region_2depth_name} ${selected.region_3depth_name}`;

    setRegion(selected); 

    mutate(
      { preferredArea }, 
      {
        onSuccess: () => {
          console.log("PATCH 성공:", preferredArea);
          onNext(); 
        },
        onError: (error) => {
          console.error("지역 저장 실패", error);
        }
      }
    );
  };

  // const handleNext = () => {
  //   if (!selected) return;

  //   setRegion(selected); 

  //   console.log("선택된 장소 정보:", {
  //     name: `${selected.region_1depth_name} ${selected.region_2depth_name} ${selected.region_3depth_name}`,
  //     x: selected.x,
  //     y: selected.y,
  //   });

  //   onNext();
  // };

  return (
    <div className="relative flex flex-col h-[calc(100vh-3rem)] overflow-hidden">
      <div className="shrink-0">
        <h2 className="text-[1.5rem] text-[#323232] font-bold mb-[0.5rem]">
          자주 가는 동네를 설정해주세요
        </h2>
        <p className="text-[1rem] text-[#7F7F7F] mb-[2rem]">
          해당 지역을 기본으로 설정해드려요
        </p>

        <SearchInputSection input={input} setInput={setInput} onSearch={handleSearch} />
        <CurrentLocationButton onClick={handleCurrentLocation} />
      </div>

      <div className="flex-1 overflow-y-auto mb-[8rem] custom-scrollbar">
        {isLoading ? (
          <SearchResultSkeleton />
        ) : (
          <SearchResultList
            results={filteredResults}
            selected={selected}
            onSelect={setSelected}
          />
        )}
      </div>

      <div
        className="fixed bottom-[5.5rem] left-0 w-full h-[6rem] pointer-events-none z-10"
        style={{
          background: `linear-gradient(to top, 
            rgba(255, 255, 255, 0.95) 0%, 
            rgba(255, 255, 255, 0.75) 30%, 
            rgba(255, 255, 255, 0.4) 65%, 
            rgba(255, 255, 255, 0.0) 100%)`,
        }}
      />
      <div className="absolute bottom-[2rem] left-0 w-full z-20">
        <CommonButton
          text="다음으로 넘어가기"
          onClick={handleNext}
          autoStyle={false}
          className={`w-full ${
            selected
              ? "bg-[#6970F3] text-white"
              : "bg-[#CCCCCC] text-[#7F7F7F] pointer-events-none"
          }`}
          disabled={!selected}
        />
      </div>
    </div>
  );
};

export default StepSearchArea;
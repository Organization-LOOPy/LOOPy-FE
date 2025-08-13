import { useNavigate } from "react-router-dom";
import { useSearchRegion } from "../../../hooks/useSearchRegion";
import CommonButton from "../../../components/button/CommonButton";
import CommonHeader from "../../../components/header/CommonHeader";
import SearchIcon from "/src/assets/images/Search.svg?react";
import LocationIcon from "/src/assets/images/Location.svg?react";
import SearchResultSkeleton from "../OnBoard/Skeleton/SearchResultSkeleton";
import SearchResultList from "../OnBoard/_components/search/SearchResultList";
import { useSelectedLocationStore } from "../../../store/locationStore";
import { withMapSearchProviders } from "../../../layouts/MapSearchProviderLayout";

const LocationPage = () => {
    const navigate = useNavigate();
    
    const { applyFromPlace } = useSelectedLocationStore();

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

    function toKakaoLikePlace(s: any) {
        return {
            x: String(s.x), // kakao 원형은 문자열
            y: String(s.y),
            address_name: `${s.region_1depth_name} ${s.region_2depth_name} ${s.region_3depth_name}`,
            // normalizeRegion에서 읽을 수 있도록 depth도 같이 넘김
            region_1depth_name: s.region_1depth_name,
            region_2depth_name: s.region_2depth_name,
            region_3depth_name: s.region_3depth_name,
        } as any;
    }

    const handleSave = () => {
        if (!selected) return;

        applyFromPlace(toKakaoLikePlace(selected));

        navigate(-1);
    };
    
    return (
        <div className="relative bg-white min-h-screen">
            <div className="mt-[1.5rem] left-0 right-0">
                <CommonHeader title="위치 설정" onBack={() => navigate(-1)} />
            </div>

            <div className="mt-[1.625rem]">
                <div className="h-[48px] px-[1rem] py-[0.75rem] bg-[#F5F5F5] rounded-[0.5rem] flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="동까지 입력"
                        className="flex-1 text-[1rem] bg-transparent border-none outline-none"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch();
                        }}
                    />
                    <SearchIcon
                        className="w-4 h-4 ml-2"
                        onClick={handleSearch}
                    />
                </div>
            </div>

            <div className="mt-[0.5rem]">
                <button 
                    onClick={handleCurrentLocation}
                    className="w-full h-[48px] rounded-[0.5rem] bg-[#6970F3] text-white text-[0.875rem] font-medium flex justify-center items-center gap-[0.25rem]"
                >
                    <LocationIcon
                        className="w-4 h-4"
                    /> 
                    현재 위치로 설정하기
                </button>
            </div>

            <div
                className="relative overflow-y-auto custom-scrollbar mt-[1.5rem]"
                style={{ height: "calc(100vh - 47px - 48px - 26px - 48px - 172px)" }}
            >
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

            <div className="absolute bottom-0 left-0 right-0 h-[172px] z-10">
                <div className="absolute bottom-[91px] left-0 right-0 h-[81px] bg-gradient-to-t from-white to-transparent" />
                <div className="flex flex-col justify-end h-full pb-[31px]">
                    <CommonButton
                        text="저장하기"
                        onClick={handleSave}
                        disabled={!selected}
                        autoStyle={false}
                        className={`w-full ${
                        selected
                            ? "bg-[#6970F3] text-white"
                            : "bg-[#CCCCCC] text-[#7F7F7F] pointer-events-none"
                        }`}
                    />
                </div>
            </div>
        </div>
    );
};

export default withMapSearchProviders(LocationPage);

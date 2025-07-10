import { useState } from 'react';
import CommonBottomBar from '../../../components/bottomBar/CommonBottomBar';
import SearchBar from '../../../components/input/SearchBar';
import FilterBar from '../Map/_components/filter/FilterBar';
import EventCard from '../../../components/card/EventCard';
import CafeListCard from '../../../components/card/CafeListCard';
import FilterPopup from '../Map/_components/filter/FilterPopup';
import LocationLabel from '../../../components/etc/LocationLabel';
import MapViewToggleButton from '../../../components/button/MapViewToggleButton';

interface Cafe {
  id: number;
  name: string;
  lat: number;
  lng: number;
  hasStamp: boolean;
}

const dummyCafes: Cafe[] = [
  { id: 1, name: "카페 A", lat: 37.5563, lng: 126.9355, hasStamp: false },
  { id: 2, name: "카페 B", lat: 37.5558, lng: 126.937, hasStamp: true },
  { id: 3, name: "카페 C", lat: 37.5545, lng: 126.9362, hasStamp: false },
];

const cafeMockDetail = {
  distanceText: "500m", 
  address: "서울 서대문구 이화여대길 52",
  images: ["src/assets/images/CafePic.svg", "/sample2.jpg", "/sample3.jpg"],
  keywords: ["분위기좋음", "조용한"],
};

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string | undefined>(undefined);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [isMapView, setIsMapView] = useState(false);

  const handleOpenFilterPopup = (group?: string) => {
    setSelectedGroup(group);
    setIsFilterPopupOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white relative overflow-y-hidden">
      <SearchBar
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="취향에 맞는 카페를 찾아보세요!"
        variant="search"
      />

      <FilterBar onOpenFilterPopup={handleOpenFilterPopup} variant="search"/>

      {isFilterPopupOpen && (
        <>
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-[40]" />

          <div className="absolute bottom-0 left-0 right-0 z-[100]" style={{ bottom: "4.5rem" }}>
            <FilterPopup
              selectedGroup={selectedGroup}
              onClose={() => setIsFilterPopupOpen(false)}
            />
          </div>
        </>
      )}

      <div className="mt-[11.25rem]">
        <EventCard
          imageSrc="src/assets/images/RedImage.svg"
          monthLabel="8월의 이벤트"
          title="친구와 함께 카공하면 스탬프..."
          description="지금 바로 근처 매장을 찾아보세요!"
          onClick={() => {}}
        />
      </div>

      <div className="mt-[1.5rem] mb-[1rem]">
        <LocationLabel dongName="서대문구 연희동" />
      </div>

      <div className="flex-1 overflow-y-auto pb-[5.5rem]">
        {dummyCafes.map((cafe) => (
          <div key={cafe.id} className="mb-[1.25rem]">
            <CafeListCard
              id={cafe.id}
              name={cafe.name}
              distanceText={cafeMockDetail.distanceText}
              address={cafeMockDetail.address}
              images={cafeMockDetail.images}
              keywords={cafeMockDetail.keywords}
              isBookmarked={false}
              onToggleBookmark={(id) => {
                console.log("북마크 토글:", id);
              }}
            />
          </div>
        ))}
      </div>

      <div className="absolute right-0
            flex justify-between items-center
            h-[3.5rem]
            pointer-events-auto
            transition-all bottom-[6.25rem] z-50">
        <MapViewToggleButton
          isMapView={isMapView}
          onClick={() => setIsMapView((prev) => !prev)}
        />
      </div>

      <CommonBottomBar
        active="search"
        onChange={(tab) => {
          console.log("탭 변경:", tab);
        }}
      />
    </div>
  );
};

export default SearchPage;

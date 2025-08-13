import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCafeListQuery } from '../../../hooks/query/cafe/useCafeList';
import { serializeForListBody, serializeFromTitlesToParams } from '../../../features/filter/filterMapping';
import CommonBottomBar from '../../../components/bottomBar/CommonBottomBar';
import SearchBar from '../../../components/input/SearchBar';
import FilterBar from '../Map/_components/filter/FilterBar';
import CafeListCard from '../../../components/card/CafeListCard';
import FilterPopup from '../Map/_components/filter/FilterPopup';
import LocationLabel from '../../../components/etc/LocationLabel';
import MapViewToggleButton from '../../../components/button/MapViewToggleButton';
import CafeListCardSkeleton from './Skeleton/CafeListCardSkeleton';
import LocationLabelSkeleton from './Skeleton/LocationLabel';
import { useSelectedLocationStore } from '../../../store/locationStore';
import { useFilterStore } from '../../../store/filterStore';
import { calcDistanceMeters, formatDistance } from '../../../utils/geo';

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | undefined>(undefined);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(true);

  const navigate = useNavigate();
  const { selected, reset } = useSelectedLocationStore();
  const { selectedByGroup, setSelectedByGroup } = useFilterStore();

  const [didUserType, setDidUserType] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setSkeletonLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  // 지역 지정 여부: selected가 있으면 지역 지정, 없으면 전국 검색
  const regionAssigned = !!selected;
  const baseX = selected?.lng ?? 126.9368;
  const baseY = selected?.lat ?? 37.5553;
  const baseZoom = regionAssigned ? 3 : 6;

  // 리스트용 바디
  const listBody = useMemo(() => {
    const base = serializeForListBody(selectedByGroup);
    return selected?.addressInfo ? { ...base, addressInfo: selected.addressInfo } : base;
  }, [selectedByGroup, selected?.addressInfo, selected?.updatedAt]);

  // 리스트용 쿼리
  const listQuery = useMemo(
    () => ({
      x: baseX,
      y: baseY,
      searchQuery: searchValue || undefined,
      cursor: undefined as number | undefined,
    }),
    [baseX, baseY, searchValue, selected?.updatedAt]
  );

  // 리스트 호출
  const { data: listRes, isLoading: isQueryLoading } = useCafeListQuery(listQuery, listBody, {
    enabled: !!baseX && !!baseY,
  });

  const loading = skeletonLoading || isQueryLoading;
  const cafes = listRes?.success?.data ?? [];

  // 지도 페이지로 넘길 쿼리 스냅샷
  const mapQuerySnapshot = useMemo(() => {
    const p = serializeFromTitlesToParams(selectedByGroup);
    return {
      x: baseX,
      y: baseY,
      zoom: baseZoom,
      store: p.store?.join(','),
      menu: p.menu?.join(','),
      takeout: p.takeout?.join(','),
    };
  }, [baseX, baseY, baseZoom, selectedByGroup]);

  // 동일 집합 보장용 id 세트 + isStamped 스냅샷 (옵션)
  const listIds = useMemo(() => cafes.map((c) => c.id), [cafes]);
  const stampById = useMemo(() => Object.fromEntries(cafes.map((c) => [c.id, !!c.isStamped])), [cafes]);

  // detailById 스냅샷(주소/이미지/키워드) → Map으로 전달
  const detailById = useMemo(
    () =>
      Object.fromEntries(
        cafes.map((c) => [
          c.id,
          {
            address: c.address ?? '',
            images: (c.photos ?? []).map((p) => p.photoUrl || p.url || '').filter(Boolean),
            keywords: c.keywords ?? [],
          },
        ])
      ),
    [cafes]
  );

  const handleOpenFilterPopup = (group?: string) => {
    setSelectedGroup(group);
    setIsPopupVisible(true);
    setTimeout(() => setIsFilterPopupOpen(true), 10);
  };

  const handleCloseFilterPopup = () => {
    setIsFilterPopupOpen(false);
    setTimeout(() => setIsPopupVisible(false), 150);
  };

  const onChangeKeyword = (v: string) => {
    if (!didUserType) {
      reset();
      setDidUserType(true);
    }
    setSearchValue(v);
  };

  useEffect(() => {
    document.body.style.overflow = isFilterPopupOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFilterPopupOpen]);

  return (
    <>
      <div className="w-full flex justify-center bg-white">
        <div className="w-full h-screen overflow-y-auto custom-scrollbar relative">
          <div className="pt-[1.5rem] pb-[7.5rem]">
            <SearchBar
              value={searchValue}
              onChange={(e) => onChangeKeyword(e.target.value)}
              placeholder="취향에 맞는 카페를 찾아보세요!"
              variant="search"
            />

            <div className="mt-[0.75rem] pb-[1.5rem]">
              <FilterBar onOpenFilterPopup={handleOpenFilterPopup} variant="search" />
            </div>

            <div className="mt-[1.5rem]">
              {loading ? (
                <LocationLabelSkeleton />
              ) : (
                <LocationLabel
                  dongName={selected ? selected.region : '위치를 설정해주세요'}
                  isPlaceholder={!selected}
                />
              )}
            </div>

            <div className="mt-[1rem] flex flex-col gap-[1.25rem]">
              {loading
                ? Array.from({ length: 5 }).map((_, i) => <CafeListCardSkeleton key={i} />)
                : cafes.map((cafe) => {
                    // distanceText: 서버 distance 우선, 없으면 현재 기준점(baseX/baseY)과 계산
                    const meters =
                      typeof cafe.distance === 'number'
                        ? cafe.distance
                        : calcDistanceMeters(cafe.latitude, cafe.longitude, baseY, baseX);

                    return (
                      <CafeListCard
                        key={cafe.id}
                        id={cafe.id}
                        name={cafe.name}
                        distanceText={formatDistance(meters)}
                        address={cafe.address}
                        images={(cafe.photos ?? [])
                          .map((p) => p.photoUrl || p.url || '')
                          .filter(Boolean)}
                        keywords={cafe.keywords ?? []}
                        onClick={() =>
                          navigate('/map', {
                            state: {
                              listParams: mapQuerySnapshot, 
                              detailById,                   
                              focusCafeId: cafe.id,  
                              userCoord: { x: baseX, y: baseY }, 
                            },
                          })
                        }
                      />
                    );
                  })}
            </div>
          </div>

          <div
            className="
              fixed bottom-[6.25rem]
              right-[1.5rem]
              sm:left-auto sm:w-auto
              sm:right-[calc((100vw-24.5625rem)/2+1.5rem)]
              z-50 flex justify-end pointer-events-none
            "
          >
            <div className="pointer-events-auto">
              <MapViewToggleButton
                isMapView={false} // 검색 페이지이므로 false 고정
                onClick={() =>
                  navigate('/map', {
                    state: { listParams: mapQuerySnapshot, listIds, stampById, detailById },
                  })
                }
              />
            </div>
          </div>

          <CommonBottomBar
            active="search"
            onChange={(tab) => {
              console.log('탭 변경:', tab);
            }}
          />
        </div>
      </div>

      {isPopupVisible && (
        <div className="fixed inset-0 z-50 flex justify-center">
          <div
            className="
              absolute top-0 bottom-0
              left-0 right-0
              sm:left-[calc((100vw-24.5625rem)/2)]
              sm:right-[calc((100vw-24.5625rem)/2)]
              bg-black/50
              z-[205]
            "
            onClick={handleCloseFilterPopup}
          />
          <div
            className={`
              absolute bottom-0
              left-[1.5rem] right-[1.5rem]
              sm:left-[calc((100vw-24.5625rem)/2)]
              sm:right-[calc((100vw-24.5625rem)/2)]
              transition-transform duration-150 ease-in-out
              ${isFilterPopupOpen ? 'translate-y-0' : 'translate-y-full'}
              z-[210]
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <FilterPopup
              key={selectedGroup ?? 'all'}
              onClose={handleCloseFilterPopup}
              selectedGroup={selectedGroup}
              initialSelected={selectedByGroup}
              onSave={setSelectedByGroup}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SearchPage;

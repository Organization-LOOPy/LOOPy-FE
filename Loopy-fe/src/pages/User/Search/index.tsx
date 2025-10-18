import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCafeListInfiniteQuery } from '../../../hooks/query/cafe/useCafeList';
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
import { useToggleBookmark } from '../../../hooks/mutation/cafe/useToggleBookmark';

const DEFAULT_X = 126.9539;
const DEFAULT_Y = 37.5446;

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | undefined>(undefined);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(true);

  const navigate = useNavigate();
  const { selected, reset } = useSelectedLocationStore();
  const { selectedByGroup, setSelectedByGroup } = useFilterStore();
  const { mutate: toggleBookmark } = useToggleBookmark();

  const [didUserType, setDidUserType] = useState(false);

  // skeleton delay
  useEffect(() => {
    const t = setTimeout(() => setSkeletonLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const renderSkeletons = (count: number) =>
    Array.from({ length: count }).map((_, i) => <CafeListCardSkeleton key={i} />);

  // 기본 좌표
  const baseX = selected?.lng ?? DEFAULT_X;
  const baseY = selected?.lat ?? DEFAULT_Y;
  const baseZoom = selected ? 3 : 6;

  // 리스트 쿼리
  const listQuery = useMemo(
    () => ({
      x: baseX,
      y: baseY,
      searchQuery: searchValue?.trim() ? searchValue : undefined,
    }), [baseX, baseY, searchValue]);

  const listBody = useMemo(() => ({
    ...serializeForListBody(selectedByGroup),
    ...(selected?.addressInfo && { addressInfo: selected.addressInfo }),
  }), [selectedByGroup, selected?.addressInfo]);

  const {
    data,
    isLoading: isQueryLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCafeListInfiniteQuery(listQuery, listBody, { enabled: !!baseX && !!baseY });

  const cafes = data?.pages.flatMap((p) => p.success?.data ?? []) ?? [];
  const loading = useMemo(() => skeletonLoading || isQueryLoading, [skeletonLoading, isQueryLoading]);

  // 무한스크롤
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) fetchNextPage();
    });
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 데이터 로깅 (디버깅용)
  useEffect(() => {
    if (!data?.pages?.length) return;
    const cafes = data.pages.flatMap((p) => p.success?.data ?? []);
    console.log(`📡 불러온 카페 ${cafes.length}개`, cafes[0] && `첫 번째: ${cafes[0].name}`);
  }, [data]);

  // 필터 팝업 열기/닫기
  const togglePopup = (open: boolean, group?: string) => {
    if (open) {
      setSelectedGroup(group);
      setIsPopupVisible(true);
      setTimeout(() => setIsFilterPopupOpen(true), 10);
    } else {
      setIsFilterPopupOpen(false);
      setTimeout(() => setIsPopupVisible(false), 150);
    }
  };
  const handleOpenFilterPopup = (group?: string) => togglePopup(true, group);
  const handleCloseFilterPopup = () => togglePopup(false);

  const onChangeKeyword = (v: string) => {
    if (!didUserType && v.trim()) {
      reset();
      setDidUserType(true);
    }
    setSearchValue(v);
  };

  const handleBookmarkToggle = useCallback(
    (id: number, newState: boolean) => toggleBookmark({ cafeId: id, newState }),
    [toggleBookmark]
  )

  // body scroll lock
  useEffect(() => {
    document.body.style.overflow = isFilterPopupOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = '' };
  }, [isFilterPopupOpen]);

  // detail data snapshot
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

  const mapQuerySnapshot = useMemo(() => {
    const p = serializeFromTitlesToParams(selectedByGroup);
    return { x: baseX, y: baseY, zoom: baseZoom, ...p };
  }, [baseX, baseY, baseZoom, selectedByGroup]);

  return (
    <>
      <div className="w-full flex justify-center bg-white">
        <div className="w-full h-screen overflow-y-auto custom-scrollbar relative">
          <div className="pt-[1.5rem] pb-[7.5rem]">
            {/* 검색바 */}
            <SearchBar
              value={searchValue}
              onChange={(e) => onChangeKeyword(e.target.value)}
              placeholder="취향에 맞는 카페를 찾아보세요!"
              variant="search"
            />

            {/* 필터바 */}
            <div className="mt-[0.75rem] overflow-x-auto no-scrollbar">
              <FilterBar onOpenFilterPopup={handleOpenFilterPopup} variant="search" />
            </div>

            {/* 지역 표시 */}
            <div className="mt-[1rem]">
              {loading ? (
                <LocationLabelSkeleton />
              ) : (
                <LocationLabel
                  dongName={selected ? selected.region : '위치를 설정해주세요'}
                  isPlaceholder={!selected}
                />
              )}
            </div>

            {/* 리스트 */}
            <div className="mt-[1rem] flex flex-col gap-[1.25rem]">
              {loading && !cafes.length
                ? renderSkeletons(5)
                : cafes.map((cafe) => {
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
                        images={(cafe.photos ?? []).map((p) => p.photoUrl || p.url || '').filter(Boolean)}
                        keywords={cafe.keywords ?? []}
                        isBookmarked={cafe.isBookmarked ?? false}
                        onBookmarkToggle={handleBookmarkToggle}
                        onClick={() =>
                          navigate('/map', {
                            state: {
                              detailById,
                              focusCafeId: cafe.id,
                              userCoord: { x: cafe.longitude, y: cafe.latitude },
                            },
                          })
                        }
                      />
                    );
                  })}
              {isFetchingNextPage && renderSkeletons(3)}
              <div ref={loadMoreRef} />
            </div>
          </div>

          {/* 지도 보기 버튼 */}
          <div className="fixed bottom-[6.25rem] right-[1.5rem] sm:right-[calc((100vw-24.5625rem)/2+1.5rem)] z-50 flex justify-end pointer-events-none">
            <div className="pointer-events-auto">
              <MapViewToggleButton
                isMapView={false}
                onClick={() =>
                  navigate('/map', {
                    state: { listParams: mapQuerySnapshot, detailById },
                  })
                }
              />
            </div>
          </div>

          <CommonBottomBar active="search" onChange={(tab) => { console.log('탭 변경:', tab); }} />
        </div>
      </div>

      {isPopupVisible && (
        <div className="fixed inset-0 z-50 flex justify-center">
          <div
            className="absolute top-0 bottom-0 left-0 right-0 sm:left-[calc((100vw-24.5625rem)/2)] sm:right-[calc((100vw-24.5625rem)/2)] bg-black/50 z-[205]"
            onClick={handleCloseFilterPopup}
          />
          <div
            className={`absolute bottom-0 left-0 right-0 transition-transform duration-150 ease-in-out ${
              isFilterPopupOpen ? 'translate-y-0' : 'translate-y-full'
            } z-[210]`}
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

import { useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSelectedLocationStore } from '../../../store/locationStore';
import { useMapViewStore } from '../../../store/mapviewStore';
import { useFilterStore } from '../../../store/filterStore';
import { useMapCafesQuery } from '../../../hooks/useMapSearch';
import { serializeFromTitlesToParams } from '../../../features/filter/filterMapping';
import { mapSearchSimilarTop15 } from '../../../apis/mapSearch/mock';
import { useMapCafeDetailQuery } from '../../../hooks/query/cafe/useMapCafeDetail';
import type { MapCafeDetail } from '../../../apis/mapCafeDetail/api';
import MapViewToggleButton from '../../../components/button/MapViewToggleButton';
import StampLegend from '../../../components/modal/StampLegend';
import CafeDetailCard from '../../../components/card/MapCafeDetailCard';
import SearchBar from '../../../components/input/SearchBar';
import FilterBar from './_components/filter/FilterBar';
import FilterPopup from './_components/filter/FilterPopup';
import CommonBottomBar from '../../../components/bottomBar/CommonBottomBar';
import StampActiveMarker from '/src/assets/images/StampActiveMarker.svg';
import StampDefaultMarker from '/src/assets/images/StampDefaultMarker.svg';
import NoStampActiveMarker from '/src/assets/images/NoStampActiveMarker.svg';
import NoStampDefaultMarker from '/src/assets/images/NoStampDefaultMarker.svg';
import { calcDistanceMeters, formatDistance } from '../../../utils/geo';

declare global {
  interface Window { kakao: any }
}

type SelectedCafe = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  hasStamp: boolean;
  distanceText: string;
  detail: MapCafeDetail; 
};

const getMarkerImage = (hasStamp: boolean, isActive: boolean) => {
  const imagePath = hasStamp
    ? (isActive ? StampActiveMarker : StampDefaultMarker)
    : (isActive ? NoStampActiveMarker : NoStampDefaultMarker);

  const size = isActive
    ? new window.kakao.maps.Size(40, 52)
    : new window.kakao.maps.Size(24, 24);

  return new window.kakao.maps.MarkerImage(imagePath, size);
};

const MapPage = () => {
  const nav = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const activeMarkerRef = useRef<any>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<Map<number, any>>(new Map());

  const { selected, shouldApplyOnMap, markAppliedOnMap } = useSelectedLocationStore();
  const { view, setView } = useMapViewStore();
  const { selectedByGroup, setSelectedByGroup } = useFilterStore();

  const { state } = useLocation() as {
    state?: {
      focusCafeId?: number;
      listParams?: { x: number; y: number; zoom: number };
      detailById?: Record<number, MapCafeDetail>;
      userCoord?: { x: number; y: number }; 
    };
  };
  const pendingFocusIdRef = useRef<number | null>(state?.focusCafeId ?? null);
  const didFocusOnceRef = useRef(false);

  useEffect(() => {
    if (state?.focusCafeId != null) {
      pendingFocusIdRef.current = state.focusCafeId;
      didFocusOnceRef.current = false;
    }
  }, [state?.focusCafeId]);

  const detailByIdRef = useRef<Record<number, MapCafeDetail> | undefined>(state?.detailById);
  useEffect(() => {
    if (state?.detailById) detailByIdRef.current = state.detailById;
  }, [state?.detailById]);

  const [selectedCafe, setSelectedCafe] = useState<SelectedCafe | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string | undefined>(undefined);
  const [searchValue] = useState('');

  const setDetailVar = () => {
    const root = document.documentElement;
    const h = detailRef.current?.getBoundingClientRect().height ?? 0;
    root.style.setProperty('--detail-h', selectedCafe ? `${h}px` : '0px');
  };

  const userCoord =
    state?.userCoord ??
    (state?.listParams ? { x: state.listParams.x, y: state.listParams.y } : undefined) ??
    (selected ? { x: selected.lng, y: selected.lat } : undefined);

  const { data: detailData } = useMapCafeDetailQuery(selectedCafe?.id ?? null, {
    enabled: !!selectedCafe,
    coord: userCoord ? { x: userCoord.x, y: userCoord.y } : undefined,
    fallback: () =>
      (selectedCafe && detailByIdRef.current?.[selectedCafe.id]) ??
      { address: '', images: [], keywords: [] },
  });

  useEffect(() => {
    if (detailData) console.log('[DETAIL]', detailData);
  }, [detailData]);

  useEffect(() => {
    if (!selectedCafe?.id || !detailData) return;
    setSelectedCafe(prev => (prev && prev.id === selectedCafe.id) ? { ...prev, detail: detailData } : prev);
  }, [selectedCafe?.id, detailData]);

  const handleOpenFilterPopup = (group?: string) => {
    const prev = activeMarkerRef.current;
    if (prev) prev.setImage(getMarkerImage(!!prev.__hasStamp, false));
    activeMarkerRef.current = null;
    setSelectedCafe(null);
    setSelectedGroup(group);
    setIsPopupVisible(true);
    setTimeout(() => setIsFilterPopupOpen(true), 10);
  };

  const handleCloseFilterPopup = () => {
    setIsFilterPopupOpen(false);
    setTimeout(() => setIsPopupVisible(false), 150);
  };

  useLayoutEffect(() => { setDetailVar(); }, [selectedCafe]);

  useEffect(() => {
    const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY;
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false&libraries=services,clusterer`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = mapRef.current;
        if (!container) return;

        const initialCenter = state?.listParams
          ? { lat: state.listParams.y, lng: state.listParams.x }
          : (selected?.lat && selected?.lng)
            ? { lat: selected.lat, lng: selected.lng }
            : (view?.center ?? { lat: 37.5553, lng: 126.9368 });

        const initialZoom = state?.listParams?.zoom ?? (view?.zoom ?? 3);

        const map = new window.kakao.maps.Map(container, {
          center: new window.kakao.maps.LatLng(initialCenter.lat, initialCenter.lng),
          level: initialZoom,
        });

        setView({ center: { lat: initialCenter.lat, lng: initialCenter.lng }, zoom: initialZoom });

        window.kakao.maps.event.addListener(map, 'idle', () => {
          const c = map.getCenter();
          const level = map.getLevel();
          setView({ center: { lat: c.getLat(), lng: c.getLng() }, zoom: level });
          const b = map.getBounds();
          const ne = b.getNorthEast();

          const northEdge = new window.kakao.maps.LatLng(ne.getLat(), c.getLng());
          const eastEdge  = new window.kakao.maps.LatLng(c.getLat(), ne.getLng());

          const h = calcDistanceMeters(c.getLat(), c.getLng(), northEdge.getLat(), northEdge.getLng());
          const w = calcDistanceMeters(c.getLat(), c.getLng(), eastEdge.getLat(), eastEdge.getLng());
          const radius = Math.max(h, w);

          console.log(`[MAP] level=${level}  radius≈${Math.round(radius)}m  (h=${Math.round(h)}m, w=${Math.round(w)}m)`);
        });
        
        window.kakao.maps.event.addListener(map, 'click', () => {
          const prev = activeMarkerRef.current;
          if (prev) {
            prev.setImage(getMarkerImage(!!prev.__hasStamp, false));
            prev.setZIndex(0);
            activeMarkerRef.current = null;
          }
          setSelectedCafe(null);
          setIsFilterPopupOpen(false);
        });

        (mapRef.current as any).__map = map;
        setMapReady(true);
      });
    };

    return () => {
      // document.head.removeChild(script);
    };
  }, []); 

  // 리스트에서 위치 설정 후 돌아오면 1회 리센터
  useEffect(() => {
    const map: any = (mapRef.current as any)?.__map;
    if (!map || !selected) return;
    if (shouldApplyOnMap) {
      map.setCenter(new window.kakao.maps.LatLng(selected.lat, selected.lng));
      markAppliedOnMap();
    }
  }, [selected?.updatedAt, shouldApplyOnMap, markAppliedOnMap]);

  // 필터 직렬화 → 쿼리 파라미터
  const filterParams = useMemo(
    () => serializeFromTitlesToParams(selectedByGroup),
    [selectedByGroup]
  );

  const x = userCoord?.x ?? view?.center?.lng ?? 126.9368;
  const y = userCoord?.y ?? view?.center?.lat ?? 37.5553;
  const rawZoom = view?.zoom ?? 3; // kakao: 작을수록 더 확대
  const apiZoom = Math.max(rawZoom, 5);

  const queryParams = useMemo(
    () => ({ x, y, zoom: apiZoom, ...filterParams }),
    [x, y, apiZoom, filterParams]
  );

  const { data: mapData } = useMapCafesQuery(queryParams, {
    enabled: mapReady,
    mockOnEmpty: mapSearchSimilarTop15,
  });

  const resetActiveMarker = () => {
    const prev = activeMarkerRef.current;
    if (prev) {
      prev.setImage(getMarkerImage(!!prev.__hasStamp, false));
      prev.setZIndex(0);
    }
    activeMarkerRef.current = null;
  };

  const focusMarker = (marker: any) => {
    resetActiveMarker();
    marker.setImage(getMarkerImage(!!marker.__hasStamp, true));
    marker.setZIndex(100);
    activeMarkerRef.current = marker;
  };

  useEffect(() => {
    console.log('[MAP]', 'cafes=', mapData?.success?.cafes?.length ?? 0, 'zoom=', view?.zoom);
  }, [mapData, view?.zoom]);

  useEffect(() => {
    const map: any = (mapRef.current as any)?.__map;
    if (!map) return;

    const cafes = mapData?.success?.cafes ?? [];
    if (cafes.length === 0) return;

    const nextIds = new Set<number>(cafes.map((c) => c.id));
    const markers = markersRef.current;

    markers.forEach((marker, id) => {
      if (!nextIds.has(id)) {
        marker.setMap(null);
        markers.delete(id);
      }
    });

    cafes.forEach((c: any) => {
      const id = c.id;
      const isActive = activeMarkerRef.current?.__cafeId === id;
      const image = getMarkerImage(c.isStamped, isActive);

      let marker = markers.get(id);
      if (!marker) {
        marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(c.latitude, c.longitude),
          image,
          map,
        });

        marker.__cafeId = id;
        marker.__hasStamp = c.isStamped;

        marker.addListener('click', () => {
          focusMarker(marker);

          const meters = typeof c.distance === 'number'
            ? c.distance
            : calcDistanceMeters(
                c.latitude,
                c.longitude,
                userCoord?.y ?? map.getCenter().getLat(),
                userCoord?.x ?? map.getCenter().getLng()
              );
          const distanceText = formatDistance(meters);

          const snapshot = detailByIdRef.current?.[c.id] ?? { address: '', images: [], keywords: [] };

          if (map.getLevel() !== 4) map.setLevel(4);
          map.panTo(marker.getPosition());

          setSelectedCafe({
            id: c.id,
            name: c.name,
            lat: c.latitude,
            lng: c.longitude,
            hasStamp: c.isStamped,
            distanceText,
            detail: snapshot,
          });

          didFocusOnceRef.current = true;
          pendingFocusIdRef.current = null;
        });

        markers.set(id, marker);
      } else {
        marker.setPosition(new window.kakao.maps.LatLng(c.latitude, c.longitude));
        marker.__hasStamp = c.isStamped;
        const isActiveNow = activeMarkerRef.current?.__cafeId === id;
        marker.setImage(getMarkerImage(c.isStamped, isActiveNow));
        marker.setZIndex(isActiveNow ? 100 : 0);
        marker.setMap(map);
      }
    });

    if (!didFocusOnceRef.current && pendingFocusIdRef.current != null) {
      const focusId = pendingFocusIdRef.current;
      const marker = markersRef.current.get(focusId);
      if (marker) {
        // 포커스 표시 + zIndex
        focusMarker(marker);

        // 자동 줌 4 + 이동
        if (map.getLevel() !== 4) map.setLevel(4);
        map.panTo(marker.getPosition());

        // 상세 카드 채우기
        const c = (mapData?.success?.cafes ?? []).find(v => v.id === focusId);
        if (c) {
          const center = map.getCenter();
          const meters = typeof (c as any).distance === 'number'
            ? (c as any).distance
            : calcDistanceMeters(c.latitude, c.longitude, center.getLat(), center.getLng());
          const distanceText = formatDistance(meters);
          const snapshot = detailByIdRef.current?.[c.id] ?? { address: '', images: [], keywords: [] };

          setSelectedCafe({
            id: c.id,
            name: c.name,
            lat: c.latitude,
            lng: c.longitude,
            hasStamp: c.isStamped,
            distanceText,
            detail: snapshot,
          });
        }

        // 한 번만 실행
        didFocusOnceRef.current = true;
        pendingFocusIdRef.current = null;
      }
    }
  }, [mapData]);

  return (
    <>
      <Helmet>
        <meta name="theme-color" content="transparent" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Helmet>

      <div className="h-[env(safe-area-inset-top)] bg-transparent" />

      <div className="relative -mx-[1.5rem]">
        <div ref={mapRef} className="w-full h-[100dvh] z-[0]" />
      </div>

      <div className="absolute top-[env(safe-area-inset-top)] left-0 right-0 z-[10] flex justify-center">
        <div className="w-full px-[1.5rem] mt-[1.5rem]">
          <SearchBar
            value={searchValue}
            onChange={() => {}}
            placeholder="취향에 맞는 카페를 찾아보세요!"
          />
          <button
            onClick={() => nav('/search')}
            className="absolute inset-0"
            aria-label="검색 페이지로 이동"
          />
          <div className="mt-[0.5rem]">
            <FilterBar onOpenFilterPopup={handleOpenFilterPopup} />
          </div>
        </div>
      </div>

      <div
        className="
          fixed
          left-[1.5rem] right-[1.5rem]
          sm:left-[calc((100vw-24.5625rem)/2+1.5rem)]
          sm:right-[calc((100vw-24.5625rem)/2+1.5rem)]
          z-[60] flex items-center
          transition-[bottom] duration-150 ease-in-out
          bottom-[calc(var(--detail-h,_0px)+6.25rem)]
        "
      >
        <div className="w-full">
          <StampLegend />
        </div>
        <div className="ml-[0.75rem]">
          <MapViewToggleButton isMapView onClick={() => nav('/search')} />
        </div>
      </div>

      {selectedCafe && (
        <div
          ref={detailRef}
          className={`absolute bottom-[4.5625rem] left-0 right-0 flex justify-center transition-transform duration-300 ease-in-out pointer-events-auto z-[999] ${selectedCafe ? 'translate-y-0' : 'translate-y-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <CafeDetailCard
            name={selectedCafe.name}
            distanceText={selectedCafe.distanceText}
            {...selectedCafe.detail}
            onClick={() => nav(`/detail/${selectedCafe.id}`)}
          />
        </div>
      )}

      {isPopupVisible && (
        <div className="fixed inset-0 z-[200] flex justify-center" onClick={handleCloseFilterPopup}>
          <div
            className="
              absolute top-0 bottom-0
              left-0 right-0
              sm:left-[calc((100vw-24.5625rem)/2)]
              sm:right-[calc((100vw-24.5625rem)/2)]
              bg-black/50
              z-[205]
            "
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

      <CommonBottomBar
        active="search"
        onChange={(tab) => {
          console.log('탭 변경:', tab);
        }}
      />
    </>
  );
};

export default MapPage;

import axiosInstance from '../axios';
import type { MapSearchParams, MapSearchResponse } from './type';

export const MAP_SEARCH_PATH = '/api/v1/search/map';

const joinOrUndefined = (arr?: string[]) =>
  Array.isArray(arr) && arr.length ? arr.join(',') : undefined;

const sort = (arr?: string[]) => (arr ? [...arr].sort() : undefined);

export const getMapCafes = async (rawParams: MapSearchParams) => {
  const params = {
    x: rawParams.x,
    y: rawParams.y,
    zoom: rawParams.zoom,
    store: joinOrUndefined(sort(rawParams.store)),
    menu: joinOrUndefined(sort(rawParams.menu)),
    takeout: joinOrUndefined(sort(rawParams.takeout)),
  };
  
  const res = await axiosInstance.get<MapSearchResponse>(MAP_SEARCH_PATH, { params });
  const data = res.data;

  // 클라에서 북마크 상태 보정
  if (data?.success?.cafes) {
    data.success.cafes = data.success.cafes.map((cafe: any) => ({
      ...cafe,
      isBookmarked: (cafe.bookmarkedBy?.length ?? 0) > 0,
    }));
  }

  return data;
};

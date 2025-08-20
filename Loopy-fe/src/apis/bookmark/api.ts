import axiosInstance from '../axios';
import type { Bookmark, BookmarkListResponse } from './type';
import { bookmarkListMock } from './mock';

// 북마크 목록 조회
export const fetchBookmarkedCafes = async (): Promise<Bookmark[]> => {
  try {
    const res = await axiosInstance.get<BookmarkListResponse>(
      '/api/v1/users/me/bookmarks',
    );

    if (res.data.resultType === 'SUCCESS' && res.data.success?.bookmarks) {
      return res.data.success.bookmarks;
    }

    console.warn('응답이 기대한 형식이 아님:', res.data);
    return [];
  } catch (e) {
    console.error('북마크한 카페 목록 조회 실패:', e);
    return bookmarkListMock;
  }
};

// 북마크 토글 (등록/해제 모두 처리)
export const toggleBookmark = async (cafeId: string) => {
  const { data } = await axiosInstance.post(`/api/v1/cafes/${cafeId}/bookmark`);
  return data;
};
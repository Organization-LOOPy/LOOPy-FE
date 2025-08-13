import axiosInstance from '../axios';
import type { Bookmark, BookmarkListResponse } from './type';
import { bookmarkListMock } from './mock';

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

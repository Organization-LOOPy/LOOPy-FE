import axiosInstance from '../axios';
import type { CafeListResponse, CafeListQueryParams, CafeListBody } from './type';

export const LIST_SEARCH_PATH = '/api/v1/search/list';

/**
 * 리스트 검색 API
 * - query: x, y, searchQuery?, cursor?
 * - body : { storeFilter, takeOutFilter, menuFilter, addressInfo? }
 * - 서버 장애 시 목으로 대체하려면 options.mockOnError 전달
 */
export async function postCafeList(
  rawQuery: CafeListQueryParams,
  body: CafeListBody,
  options?: { mockOnError?: () => CafeListResponse }
): Promise<CafeListResponse> {
  const params = {
    x: rawQuery.x,
    y: rawQuery.y,
    searchQuery: rawQuery.searchQuery || undefined,
    cursor: rawQuery.cursor ?? undefined,
  };

  try {
    const { data } = await axiosInstance.post<CafeListResponse>(
      LIST_SEARCH_PATH,
      body,
      { params }
    );
    return data;
  } catch (err) {
    // 서버 연결 실패 시 목 데이터로 대체 (옵션 주입 방식)
    if (options?.mockOnError) {
      return options.mockOnError();
    }
    throw err;
  }
}

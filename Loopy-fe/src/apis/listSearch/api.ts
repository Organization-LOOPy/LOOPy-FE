import axiosInstance from '../axios';
import type { CafeListResponse, CafeListQueryParams, CafeListBody } from './type';

export const LIST_SEARCH_PATH = '/api/v1/search/list';

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
    if (data?.success?.data) {
      data.success.data = data.success.data.map((cafe) => ({
        ...cafe,
        isBookmarked: (cafe.bookmarkedBy?.length ?? 0) > 0,
      }));
    }
    return data;
  } catch (err) {
    if (options?.mockOnError) {
      return options.mockOnError();
    }
    throw err;
  }
}

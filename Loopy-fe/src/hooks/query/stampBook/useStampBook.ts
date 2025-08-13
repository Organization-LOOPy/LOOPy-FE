import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import type { StampBook } from '../../../apis/stampBook/type';
import { fetchStampBooks } from '../../../apis/stampBook/api';

interface UseStampBookOptions {
  sortBy?: 'mostStamped' | 'shortestDeadline';
}

export const useStampBooks = ({
  sortBy,
}: UseStampBookOptions = {}): UseQueryResult<StampBook[], Error> => {
  return useQuery<StampBook[], Error>({
    queryKey: ['stampBooks', sortBy],
    queryFn: () => fetchStampBooks(sortBy),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

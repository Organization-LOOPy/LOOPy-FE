import { useMutation } from '@tanstack/react-query';
import { extendStampBook } from '../../../apis/stampBook/extendStampBook/api';

export const useExtendStampBook = () => {
  return useMutation({
    mutationFn: (stampBookId: number) => extendStampBook(stampBookId),
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOwnerAccount } from '../../../../apis/auth/ownerDelete/api';
import type { OwnerWithdrawSuccessResponse } from '../../../../apis/auth/ownerDelete/type';
import Storage from '../../../../utils/storage';

export const useOwnerWithdraw = () => {
  const qc = useQueryClient();

  return useMutation<OwnerWithdrawSuccessResponse, unknown, void>({
    mutationFn: () => deleteOwnerAccount(),
    onSuccess: () => {
      qc.clear();
      Storage.clearStorage();
    },
  });
};

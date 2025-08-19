import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { Customer } from './modal/KeypadModal';
import AdminStampIcon from '../../../../assets/images/AdminStampIcon.svg?react';
import HomeButton from '../_components/HomeButton';
import KeypadModal from './modal/KeypadModal';
import CommonCompleteModal from '../../../../components/admin/modal/CommonCompleteModal';
import { searchUserByPhone } from '../../../../apis/admin/home/search/api';
import type {
  ApiResponse,
  UserSearchResponseData,
} from '../../../../apis/admin/home/search/type';

const HomeStampButton = () => {
  const [isKeypadOpen, setIsKeypadOpen] = useState(false);
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);

  const queryClient = useQueryClient();

  const lookupCustomer = async (phone: string): Promise<Customer | null> => {
    if (!phone) {
      throw new Error('전화번호가 비어 있습니다.');
    }

    const data = await queryClient.fetchQuery<
      ApiResponse<UserSearchResponseData>
    >({
      queryKey: ['searchUserByPhone', phone],
      queryFn: () => searchUserByPhone(phone),
    });

    if (data && data.resultType === 'SUCCESS' && data.success) {
      const user = data.success;

      return {
        userId: user.userId,
        name: user.nickname,
        points: user.point.total,
        stamps: user.stamp.totalCount,
        stampBook: user.stamp.currentStampBook?.stampBookId ?? 0,
        actionToken: user.actionToken,
      };
    }

    return null;
  };

  const handleApplyStamp = (phone: string, customer: Customer) => {
    console.log(`${phone} 고객에게 스탬프 적용`, customer);
    setIsCompleteOpen(true);
    setIsKeypadOpen(false);
  };

  return (
    <>
      <HomeButton
        Icon={AdminStampIcon}
        label="스탬프 적립"
        onClick={() => setIsKeypadOpen(true)}
      />
      {isKeypadOpen && (
        <KeypadModal
          onClose={() => setIsKeypadOpen(false)}
          lookupCustomer={lookupCustomer}
          onApplyStamp={handleApplyStamp}
        />
      )}
      {isCompleteOpen && (
        <CommonCompleteModal
          message="스탬프가 성공적으로 적용되었습니다."
          onClose={() => setIsCompleteOpen(false)}
        />
      )}
    </>
  );
};

export default HomeStampButton;

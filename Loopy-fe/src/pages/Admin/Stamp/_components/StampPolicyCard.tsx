import type { JSX } from 'react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchStampPolicy } from '../../../../apis/admin/stamp/api';
import type {
  StampPolicyData,
  ConditionType,
  RewardType,
} from '../../../../apis/admin/stamp/type';
import EditIcon from '/src/assets/images/Pencil.svg?react';
import StampIcon from '/src/assets/images/StampIcon.svg?react';
import StampPolicyEditDrawer from './StampEditDrawer';
import StampPolicyCardSkeleton from '../Skeleton/StampPolicyCardSkeleton';

function formatNumber(n?: number | null) {
  if (n == null) return '-';
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const conditionTag: Record<ConditionType, string> = {
  COUNT: '횟수 기준',
  AMOUNT: '금액 기준',
};

const rewardTag: Record<RewardType, string> = {
  FREE_DRINK: '무료 음료',
  DISCOUNT: '금액 할인',
  SIZE_UP: '사이즈업',
};

const getConditionLabel = (t?: ConditionType) =>
  conditionTag[t ?? 'AMOUNT'] ?? '금액 기준';

const getRewardLabel = (t?: RewardType) =>
  rewardTag[t ?? 'DISCOUNT'] ?? '금액 할인';

function conditionText(p: StampPolicyData) {
  if (p.conditionType === 'AMOUNT') {
    const min = formatNumber(p.minAmount ?? 0);
    const per = p.stampPerAmount ?? p.stampPerCount ?? 1;
    return `${min}원 이상 구매 시 스탬프 ${per}개 적립`;
  }
  const per = p.stampPerCount ?? 1;
  return `${p.drinkCount ?? 1}잔 구매 시 스탬프 ${per}개 적립`;
}

function rewardText(p: StampPolicyData) {
  switch (p.rewardType) {
    case 'DISCOUNT':
      return `${formatNumber(p.discountAmount ?? 0)}원 할인`;
    case 'FREE_DRINK':
      return '무료 음료';
    case 'SIZE_UP':
      return '사이즈업';
    default:
      return '-';
  }
}

export default function StampPolicyCard({ token }: { token?: string }) {
  const [openEdit, setOpenEdit] = useState(false);

  const {
    data: policy,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['stampPolicy', token ?? null],
    queryFn: () => fetchStampPolicy(token),
    retry: 1,
  });

  let content: JSX.Element;
  if (isLoading) {
    content = <StampPolicyCardSkeleton />
  } else if (isError || !policy) {
    content = (
      <div className="w-full min-h-[13.5rem] rounded-[1rem] p-[1.5rem] bg-[#FFF2F2] text-red-500 text-[1rem] flex items-center justify-center">
        {(error as Error)?.message ?? '데이터 로드 실패'}
      </div>
    );
  } else {
    content = (
      <div className="w-full min-h-[13.5rem] bg-[#F0F1FE] rounded-[1rem] p-[1.5rem]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[0.5rem]">
            <StampIcon className="w-[1rem] h-[1rem] text-[#6A6FF3]" />
            <span className="text-[1rem] font-semibold leading-[100%] text-[#222]">
              스탬프 설정정보
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpenEdit(true)}
            className="inline-flex items-center gap-[0.5rem] text-[1rem] font-medium leading-[100%] text-[#7F7F7F]"
          >
            <EditIcon className="w-[1rem] h-[1rem]" />
            수정하기
          </button>
        </div>

        <div className="mt-[2rem] flex gap-[1.5rem]">
          {/* 스탬프 이미지 */}
          <div className="w-[7.5rem] h-[7.5rem] rounded-full overflow-hidden bg-white shrink-0">
            {policy.selectedImageUrl ? (
              <img
                src={policy.selectedImageUrl}
                alt="stamp"
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>

          {/* 오른쪽 내용 */}
          <div className="flex flex-col justify-center gap-[1rem]">
            {/* 적립 조건 */}
            <div className="flex items-center">
              <span className="w-[10.75rem] text-[1.125rem] font-bold leading-[100%] text-[#222] whitespace-nowrap">
                적립 조건
              </span>
              <span className="inline-flex items-center rounded-[0.5rem] bg-[#6970F3] px-[1rem] py-[0.5rem] text-white text-[0.875rem] font-semibold leading-[100%]">
                {getConditionLabel(policy.conditionType)}
              </span>
              <span className="ml-[1rem] text-[1rem] font-medium leading-[100%] text-[#222]">
                {conditionText(policy)}
              </span>
            </div>

            {/* 10번째 적립 리워드 */}
            <div className="flex items-center">
              <span className="w-[10.75rem] text-[1.125rem] font-bold leading-[100%] text-[#222] whitespace-nowrap">
                10번째 적립 리워드
              </span>
              <span className="inline-flex items-center rounded-[0.5rem] bg-[#6970F3] px-[1rem] py-[0.5rem] text-white text-[0.875rem] font-semibold leading-[100%]">
                {getRewardLabel(policy.rewardType)}
              </span>
              <span className="ml-[1rem] text-[1rem] font-medium leading-[100%] text-[#222]">
                {rewardText(policy)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {content}
      <StampPolicyEditDrawer
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        token={token}
      />
    </>
  );
}

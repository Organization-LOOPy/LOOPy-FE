import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchStampStats } from '../../../../apis/admin/stamp/api';
import StampStatsSkeleton from '../Skeleton/StampStatsSkeleton';

const fmt = (v: unknown) => {
  const n =
    typeof v === 'number'
      ? v
      : typeof v === 'string'
      ? Number(v)
      : Number.NaN;
  return Number.isFinite(n) ? n.toLocaleString() : '-';
};

interface Props {
  token?: string;
}

const StampStatsBar = ({ token }: Props) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['stampStats', token ?? null],
    queryFn: () => fetchStampStats(token),

    refetchOnWindowFocus: true,   // 창 다시 볼 때 즉시 갱신
    refetchOnReconnect: true,     // 네트워크 재연결 시 갱신
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData, 
  });

  if (isLoading) return <StampStatsSkeleton />;

  if (isError || !data) {
    return (
      <div className="flex w-full">
        <div className="flex-1 h-[4rem] px-[2rem] flex items-center justify-center text-[1rem] text-red-500">
          {(error as Error)?.message ?? '데이터를 불러오는 중 오류가 발생했습니다.'}
        </div>
      </div>
    );
  }

  const stats = [
    { label: '오늘 적립 수', value: `${fmt(data.todayStampCount)}개` },
    { label: '이번 주 적립 수', value: `${fmt(data.thisWeekStampCount)}개` },
    { label: '누적 적립 수', value: `${fmt(data.totalStampCount)}개` },
    { label: '리워드 지급 건수', value: `${fmt(data.rewardGivenCount)}건` },
  ];

  return (
    <div className="flex w-full">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`flex-1 h-[4rem] px-[2rem] ${
            i < stats.length - 1 ? 'border-r border-[#DFDFDF]' : ''
          }`}
        >
          <div className="flex flex-col justify-center gap-[1.5rem] text-center">
            <div className="text-[1rem] text-[#7F7F7F] font-semibold leading-none">
              {s.label}
            </div>
            <div className="text-[1.5rem] text-[#000000] font-bold leading-none">
              {s.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StampStatsBar;

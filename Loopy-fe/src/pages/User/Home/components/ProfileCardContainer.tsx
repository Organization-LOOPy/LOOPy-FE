import ProfileCard from './ProfileCard';
import { useHomeProfile } from '../../../../hooks/query/homeProfile/useHomeProfile';
import Level1 from '../../../../assets/images/Level1.svg?react';
import type { FC, SVGProps } from 'react';

const levelImageMap: Record<number, FC<SVGProps<SVGSVGElement>>> = {
  1: Level1,
};

const ProfileCardContainer = () => {
  const { data, isLoading, error } = useHomeProfile();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  const LevelImage = levelImageMap[data.loopyLevel.level];

  return (
    <ProfileCard
      username={data.nickname}
      level={data.loopyLevel.label}
      image={LevelImage ? <LevelImage className="w-full h-full" /> : undefined}
      receivedStamps={data.thisMonthStampCount}
      ongoingChallenges={data.thisMonthChallengeCount}
      totalStamps={data.totalStampCount}
      points={data.totalPoint}
    />
  );
};

export default ProfileCardContainer;

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CommonHeader from '../../../components/header/CommonHeader';
import ChallengeTab from './components/ChallengeTab';
import ParticipatingChallengeList from './components/ParticipatingChallengeList';
import AllChallengeList from './components/AllChallengeList';
import ChallengeListSkeleton from './Skeleton/ChallengeListSkeleton';

import {
  useAllChallengeList,
  useParticipatingChallengeList,
} from '../../../hooks/query/challenge/useChallengeList';

const ChallengePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'participating' | 'all'>(
    'participating',
  );

  const {
    allChallengeList,
    isLoading: isLoadingAll,
    isError: isErrorAll,
  } = useAllChallengeList();
  const {
    participatingChallengeList,
    isLoading: isLoadingPart,
    isError: isErrorPart,
  } = useParticipatingChallengeList();

  const isLoading =
    activeTab === 'participating' ? isLoadingPart : isLoadingAll;
  const isError = activeTab === 'participating' ? isErrorPart : isErrorAll;

  return (
    <div className="w-full min-h-screen bg-white">
      <CommonHeader title="챌린지" onBack={() => navigate(-1)} />
      <ChallengeTab activeTab={activeTab} onChangeTab={setActiveTab} />
      <div className="mt-[1.5rem] mb-[3rem]">
        {isLoading ? (
          <ChallengeListSkeleton />
        ) : isError ? (
          <div className="text-center text-red-500">
            챌린지 목록을 불러오지 못했습니다.
          </div>
        ) : activeTab === 'participating' ? (
          <ParticipatingChallengeList
            participatingChallengeList={participatingChallengeList}
          />
        ) : (
          <AllChallengeList allChallengeList={allChallengeList} />
        )}
      </div>
    </div>
  );
};

export default ChallengePage;

interface ChallengeTabProps {
  activeTab: 'participating' | 'all';
  onChangeTab: (tab: 'participating' | 'all') => void;
}

const ChallengeTab = ({ activeTab, onChangeTab }: ChallengeTabProps) => {
  return (
    <div className="flex justify-between mt-4 w-full">
      <button
        onClick={() => onChangeTab('participating')}
        className={`flex-1 pb-2 text-sm border-b text-center ${
          activeTab === 'participating'
            ? 'text-[#6970F3] font-semibold border-[#6970F3]'
            : 'text-[#A8A8A8] font-medium border-[#F3F3F3]'
        }`}
      >
        참여 중인 챌린지
      </button>
      <button
        onClick={() => onChangeTab('all')}
        className={`flex-1 pb-2 text-sm border-b text-center ${
          activeTab === 'all'
            ? 'text-[#6970F3] font-semibold border-[#6970F3]'
            : 'text-[#A8A8A8] font-medium border-[#F3F3F3]'
        }`}
      >
        전체 챌린지
      </button>
    </div>
  );
};

export default ChallengeTab;

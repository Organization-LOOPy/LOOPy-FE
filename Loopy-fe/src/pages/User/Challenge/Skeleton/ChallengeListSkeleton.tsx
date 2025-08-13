import ChallengeCardSkeleton from './ChallengeCardSkeleton';

const ChallengeListSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <ChallengeCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ChallengeListSkeleton;

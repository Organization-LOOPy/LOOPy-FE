interface ChallengeCardProps {
  challengeName: string;
  challengeImage: string;
}

const ChallengeCard = ({
  challengeName,
  challengeImage,
}: ChallengeCardProps) => {
  return (
    <div className="w-[10.5rem] h-[10.5rem] min-w-[10.5rem] flex-shrink-0 bg-[#F0F1FE] rounded-lg flex flex-col items-center justify-center">
      <div className="text-[1rem] font-semibold self-start px-4 line-clamp-2 leading-6">
        {challengeName}
      </div>
      <img
        src={challengeImage}
        alt={challengeName}
        className="w-[8.5rem] h-[5.25rem] object-cover mb-2 mt-2.5"
      />
    </div>
  );
};

export default ChallengeCard;

const NoLevelCard = () => {
  return (
    <div className="w-[10.875rem] h-[9.75rem] border border-dashed border-white rounded-lg flex flex-col items-center justify-center">
      <div className="text-[1rem] font-bold text-white">아직 레벨이 없어요</div>
      <div className="text-[0.875rem] text-[#DFDFDF] mt-1 font-normal text-center">
        카페 루틴을 채워가면
        <br />
        루피 레벨이 생겨요!
      </div>
    </div>
  );
};

export default NoLevelCard;

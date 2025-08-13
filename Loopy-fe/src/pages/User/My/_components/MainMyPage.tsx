import { useState, useEffect } from "react";
import CommonBottomBar from "../../../../components/bottomBar/CommonBottomBar";
import CommonCard from "../../../../components/card/CommonCard";
import type { MyPageSteps } from "../../../../types/mySteps";
import SettingIcon from "../../../../assets/images/Setting.svg?react";
import ActivityList from "./ActivityList";
import CafeNotification from "./CafeNotification";
import ProfileSection from "./ProfileSection";
import QuickAccessMenu from "./QuickAccessMenu";
import MainMyPageSkeleton from "../Skeleton/MainMypageSkeleton";

interface Props {
  onNavigate: (step: keyof MyPageSteps) => void; 
}

const MainMyPage = ({ onNavigate }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <MainMyPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#F3F3F3] text-[#252525] overflow-y-auto -mx-[1.5rem] px-[1.5rem] pb-[6rem]">
      <div className="py-[1.5rem] flex justify-between items-center">
        <h1 className="text-[1.25rem] font-bold">마이페이지</h1>
        <SettingIcon
          className="w-[1.5rem] h-[1.5rem]"
          onClick={() => onNavigate("setting")}
        />
      </div>

      <CommonCard padding="p-[1.5rem]" className="bg-white mb-[1rem]">
        <ProfileSection />
        <QuickAccessMenu onNavigate={onNavigate} />
      </CommonCard>

      <CommonCard padding="p-[1.5rem]" className="bg-white mb-[1rem]">
        <ActivityList onNavigate={(step) => onNavigate(step)} />
      </CommonCard>

      <CommonCard padding="p-[1.5rem]" className="bg-white mb-[1.5rem]">
        <CafeNotification onNavigate={() => onNavigate("cafeNotice")} />
      </CommonCard>

      <CommonBottomBar active="mypage" onChange={(tab) => console.log(tab)} />
    </div>
  );
};

export default MainMyPage;

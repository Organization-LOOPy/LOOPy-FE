import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMyStampQuery } from "../../../hooks/mutation/detail/useMyStampQuery";
import TopPhotoSection from "./_components/TopPhotoSection";
import CafeInfoPanel from "./_components/CafeInfoPanel";
import CafePhotoModal from "./_components/CafePhotoModal";
import ReviewButton from "./_components/ReviewButton";
import TopPhotoSectionSkeleton from "./Skeleton/TopPhotoSectionSkeleton";
import CafeInfoPanelSkeleton from "./Skeleton/CafeInfoPanelSkeleton";

import { cafeDetailMock } from "../../../mock/cafeDetailMock";
import { getCafeDetail } from "../../../apis/cafeDetail/api";
import type { CafeDetailSuccess, CafeDetailResponse } from "../../../apis/cafeDetail/type";

const DetailPage = () => {
  const { cafeId } = useParams<{ cafeId: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"info" | "review">("info");

  const handleBack = () => navigate(-1);

  const { data, isLoading } = useQuery<CafeDetailSuccess>({
    queryKey: ["cafeDetail", cafeId],
    enabled: !!cafeId,                            
    queryFn: async () => {
      const id = cafeId!; // 또는: if (!cafeId) throw new Error('no cafeId');
      const raw = (await getCafeDetail(id)) as CafeDetailSuccess | CafeDetailResponse;
      return 'success' in raw ? raw.success : raw;
    },
  });

  const cafe = data?.cafe;
  const photos = data?.photos || [];
  const { data: myStampData } = useMyStampQuery(cafeId ?? '');
  const hasStamp = !!myStampData?.stampBookId && myStampData.currentCount > 0;

  return (
    <div className="relative -mx-[1.5rem] h-screen overflow-y-scroll custom-scrollbar bg-white flex justify-center z-[100]">
      <div className="w-full relative">
        <div className="z-0 relative">
          {isLoading ? (
            <TopPhotoSectionSkeleton />
          ) : (
            <TopPhotoSection
              images={photos.map((p) => p.url)}
              onOpenModal={() => setIsModalOpen(true)}
              onBack={handleBack}
            />
          )}
        </div>

        <div className="z-10 relative -mt-[1.5rem]">
          {isLoading || !cafe ? (
            <CafeInfoPanelSkeleton />
          ) : (
            <CafeInfoPanel
              name={cafe.name}
              address={cafe.address}
              tags={[]}
              keywords={cafe.keywords ?? []}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              businessHourType={cafe.businessHourType}
              businessHours={cafe.businessHours}
              breakTime={cafe.breakTime ?? null}
              phone={cafe.phone ?? ""}
              instagram={cafe.websiteUrl ?? ""} // 기존 prop 이름 유지
              description={cafe.description ?? ""}
              isLoading={isLoading}
              storeFilters={cafe.storeFilters ?? {}}
              takeOutFilters={cafe.takeOutFilters ?? {}}
              menuFilters={cafe.menuFilters ?? {}}
              coupons={data?.coupons ?? cafeDetailMock.coupons ?? []}
              cafeId={String(cafe.id)}
              cafeName={cafe.name}
              menu={data.menu ?? []} 
            />
          )}
        </div>

        <div className="fixed bottom-[1.5rem] left-1/2 -translate-x-1/2 w-full max-w-[393px] flex justify-end px-[1.5rem] z-30">
          {selectedTab === "review" && hasStamp && (
            <ReviewButton />
          )}
        </div>

        {isModalOpen && (
          <CafePhotoModal
            images={photos.map((p) => p.url)}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        
      </div>
    </div>
  );
}

export default DetailPage;
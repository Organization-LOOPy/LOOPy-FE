import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import { useToggleBookmark } from "../../../hooks/mutation/cafe/useToggleBookmark";
import mixpanel from "mixpanel-browser";

const DetailPage = () => {
  const { cafeId } = useParams<{ cafeId: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"info" | "review">("info");
  const [_localBookmarked, setLocalBookmarked] = useState<boolean | null>(null);
  const queryClient = useQueryClient();

  const handleBack = () => navigate('/map', {
    replace: true,
    state: {
      focusCafeId: Number(cafeId),
    },
  });

  const { data, isLoading } = useQuery<CafeDetailSuccess>({
    queryKey: ["cafeDetail", cafeId],
    enabled: !!cafeId,                            
    queryFn: async () => {
      const id = cafeId!;
      const raw = (await getCafeDetail(id)) as CafeDetailSuccess | CafeDetailResponse;
      return "success" in raw ? raw.success : raw;
    },
  });

  const { mutate: toggleBookmark } = useToggleBookmark();

  const handleBookmarkToggle = (id: number, newState: boolean) => {
    setLocalBookmarked(newState);
    toggleBookmark(
      { cafeId: id, newState },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["bookmarkedCafes"] });
          queryClient.invalidateQueries({ queryKey: ["cafeDetail", cafeId] });
        },
        onError: () => setLocalBookmarked((prev) => !prev), // 실패 시 롤백
      }
    );
  };

  const cafe = data?.cafe;
  const photos = data?.photos || [];
  const { data: myStampData } = useMyStampQuery(cafeId ?? '');
  const hasStamp = !!myStampData?.stampBookId && myStampData.currentCount > 0;

  const photoModalStartRef = useRef<number | null>(null);

  const trackPhotoModalViewed = () => {
  const startedAt = photoModalStartRef.current;
  if (startedAt == null) return;

  const durationSec = Math.max(0, Math.round((Date.now() - startedAt) / 1000));

  mixpanel.track("photo_section_viewed", {
      user_role: "customer",
      store_id: cafeId ? `cafe_${cafeId}` : "unknown",
      view_duration_sec: durationSec,
      platform: "web",
   });

    photoModalStartRef.current = null;
  };

  const handleOpenPhotoModal = () => {
    photoModalStartRef.current = Date.now();
    setIsModalOpen(true);
  };

  const handleClosePhotoModal = () => {
    trackPhotoModalViewed();
    setIsModalOpen(false);
  };
  
  return (
    <div className="relative -mx-[1.5rem] h-screen overflow-y-scroll custom-scrollbar bg-white flex justify-center z-[100]">
      <div className="w-full relative">
        <div className="z-0 relative">
          {isLoading ? (
            <TopPhotoSectionSkeleton />
          ) : (
            <>
              <TopPhotoSection
                images={photos.map((p) => p.url)}
                onOpenModal={handleOpenPhotoModal}
                onBack={handleBack}
              />

              
            </>
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
              instagram={cafe.websiteUrl ?? ""}
              description={cafe.description ?? ""}
              isLoading={isLoading}
              storeFilters={cafe.storeFilters ?? {}}
              takeOutFilters={cafe.takeOutFilters ?? {}}
              menuFilters={cafe.menuFilters ?? {}}
              coupons={data?.coupons ?? cafeDetailMock.coupons ?? []}
              challenge={data?.challenge ?? []}
              stampBook={data?.stampBook ?? null} 
              cafeId={String(cafe.id)}
              cafeName={cafe.name}
              menu={data?.menu ?? []} 
              isBookmarked={data?.bookmark.isBookmarked ?? false}
              onBookmarkToggle={handleBookmarkToggle}
              isAlramSet={data?.alram?.isAlramSet}
            />
          )}
        </div>

        <div className="fixed bottom-[1.5rem] left-1/2 -translate-x-1/2 w-full max-w-[393px] flex justify-end px-[1.5rem] z-30">
          {selectedTab === "review" && (
            <ReviewButton hasStamp={hasStamp} cafeId={String(cafe?.id ?? '')} cafeName={cafe?.name ?? ''} />
          )}
        </div>

        {isModalOpen && (
                <CafePhotoModal
                  images={photos.map((p) => p.url)}
                  onClose={handleClosePhotoModal}
                />
                
              )}
      </div>
    </div>
  );
};

export default DetailPage;

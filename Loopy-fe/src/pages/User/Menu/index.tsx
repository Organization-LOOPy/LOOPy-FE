import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { getCafeDetail } from "../../../apis/cafeDetail/api";
import { cafeDetailMock } from "../../../mock/cafeDetailMock";
import MenuCard from "../Detail/_components/MenuCard";
import CommonHeader from "../../../components/header/CommonHeader";
import MenuCardSkeleton from "./Skeleton/MenuCardSkeleton";
import mixpanel from "mixpanel-browser";

export default function MenuListPage() {
    const navigate = useNavigate();
    const { cafeId } = useParams();

    const pageEnterAtRef = useRef<number>(Date.now());

    const trackedRef = useRef(false);

  const trackMenuSectionViewed = () => {
    if (trackedRef.current) return;
    trackedRef.current = true;

    const durationSec = Math.max(
      0,
      Math.round((Date.now() - pageEnterAtRef.current) / 1000)
    );

    mixpanel.track("menu_section_viewed", {
        user_role: "customer",
        store_id: cafeId ? `cafe_${cafeId}` : "unknown",
        view_duration_sec: durationSec,
        platform: "web",
        });
    };

    useEffect(() => {
        // 페이지가 백그라운드로 가는 케이스도 포함
        const onVisibilityChange = () => {
        if (document.visibilityState === "hidden") {
            trackMenuSectionViewed();
        }
        };

        window.addEventListener("visibilitychange", onVisibilityChange);

        return () => {
        window.removeEventListener("visibilitychange", onVisibilityChange);
        trackMenuSectionViewed();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cafeId]);

    const { data, isLoading } = useQuery({
        queryKey: ["cafeDetail", cafeId],
        queryFn: async () => {
        try {
            return await getCafeDetail(cafeId!);
        } catch (error) {
            console.error("서버 요청 실패, mock 데이터 사용:", error);
            return cafeDetailMock;
        }
        },
        enabled: !!cafeId,
    });

    return (
        <div className="relative bg-white h-screen overflow-hidden">
            <div className="absolute inset-0 pb-[2rem] overflow-y-auto custom-scrollbar">
                <CommonHeader
                title={data?.cafe?.name ? `${data.cafe.name} 메뉴` : "카페 메뉴"}
                onBack={() => navigate(-1)}
                />

                <div className="mt-[1.5rem] flex flex-col gap-[1.5rem]">
                    {isLoading
                        ? Array.from({ length: 4 }).map((_, idx) => (
                            <MenuCardSkeleton key={idx} />
                        ))
                        : data?.menu?.map((menu, idx) => (
                            <MenuCard
                            key={idx}
                            name={menu.name}
                            price={menu.price.toString()}
                            description={menu.description}
                            imageUrl={menu.imgUrl}
                            isRepresentative={menu.isRepresentative}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}
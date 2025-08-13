import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { getCafeDetail } from "../../../apis/cafeDetail/api";
import { cafeDetailMock } from "../../../mock/cafeDetailMock";
import MenuCard from "../Detail/_components/MenuCard";
import CommonHeader from "../../../components/header/CommonHeader";
import MenuCardSkeleton from "./Skeleton/MenuCardSkeleton";

export default function MenuListPage() {
    const navigate = useNavigate();
    const { cafeId } = useParams();

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
            <div className="absolute inset-0 pt-[1.5rem] pb-[2rem] overflow-y-auto custom-scrollbar">
                <CommonHeader
                title={data?.cafe?.name ? `${data.cafe.name} 메뉴` : "카페 메뉴"}
                onBack={() => navigate(-1)}
                />

                <div className="mt-[3rem] flex flex-col gap-[1.5rem]">
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
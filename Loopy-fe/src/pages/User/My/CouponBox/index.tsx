import { useMemo, useState } from "react";
import CommonHeader from "../../../../components/header/CommonHeader";
import CouponCard from "./_components/CouponCard";
import type { UserCoupon } from "../../../../apis/my/coupon/type";
import { useUserCoupons } from "../../../../hooks/query/my/useUserCoupon";
import InfoCircle from "../../../../assets/images/InfoCircle.svg?react"

interface CouponBoxPageProps {
  onBack: () => void;
}

type CafeGroup = {
  cafeId: number;
  cafeName: string;
  cafeImage: string;
  coupons: UserCoupon[];
};

const CouponBoxPage = ({ onBack }: CouponBoxPageProps) => {
  const [activeTab, setActiveTab] = useState<"valid" | "past">("valid");
  const { data } = useUserCoupons(
    activeTab === "valid" ? "usable" : "past"
  );
  const coupons: UserCoupon[] = data?.data ?? [];

  const cafeGroups = useMemo<CafeGroup[]>(() => {
    const map = new Map<number, CafeGroup>();
    for (const c of coupons) {
      if (!map.has(c.cafeId)) {
        map.set(c.cafeId, {
          cafeId: c.cafeId,
          cafeName: c.cafeName,
          cafeImage: c.cafeImage,
          coupons: [],
        });
      }
      map.get(c.cafeId)!.coupons.push(c);
    }
    return Array.from(map.values());
  }, [coupons]);

  return (
    <div>
      <CommonHeader title="쿠폰함" onBack={onBack} />

      <div className="flex relative mt-6 border-b-2 border-[#F3F3F3]">
        <button
          onClick={() => setActiveTab("valid")}
          className={`relative flex-1 pb-2 text-[1rem] font-semibold text-center
            ${activeTab === "valid" ? "text-[#6970F3]" : "text-[#A8A8A8]"}
          `}
        >
          사용 가능한 쿠폰
          {activeTab === "valid" && (
            <span className="absolute left-0 bottom-[-2px] h-[2px] w-full bg-[#6970F3]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("past")}
          className={`relative flex-1 pb-2 text-[1rem] font-semibold text-center
            ${activeTab === "past" ? "text-[#6970F3]" : "text-[#A8A8A8]"}
          `}
        >
          지난 쿠폰
          {activeTab === "past" && (
            <span className="absolute left-0 bottom-[-2px] h-[2px] w-full bg-[#6970F3]" />
          )}
        </button>
      </div>

      <div className="mt-[1.5rem] mb-[8.5rem] flex flex-col gap-[1.5rem]">
        {cafeGroups.length > 0 ? (
          cafeGroups.map((g) => (
            <section key={g.cafeId} className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <img
                  src={g.cafeImage}
                  alt={g.cafeName}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-[0.875rem] font-semibold text-[#252525]">
                  {g.cafeName}
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {g.coupons.map((c) => (
                  <CouponCard
                    key={c.id}
                    coupon={c}
                    isPast={activeTab === "past"}
                    showCafeHeader={false}
                  />
                ))}
              </div>
              <div className="h-[1px] bg-[#F3F3F3]" />
            </section>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-13rem)] text-center">
            <p className="text-[#6970F3] text-[1.125rem] font-bold">
              아직 쿠폰이 없어요!
            </p>
            <p className="text-[#7F7F7F] text-[0.875rem] mt-2">
              루피와 함께 쿠폰을 받아보세요
            </p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full border-transparent p-6 pb-8">
        <div className="text-[0.875rem] text-[#7F7F7F] leading-[150%] p-4 bg-[#F3F3F3] rounded-[8px]">
          <div className="flex items-center gap-2 mb-2">
            <InfoCircle className="w-4 h-4" />
            <span className="font-semibold text-[#7F7F7F] text-[0.875rem] leading-[100%]">
              쿠폰 사용 방법
            </span>
          </div>

          쿠폰을 사용하시려면, 사용을 원하는 카페에서 마이페이지의 동일 멤버십 QR 코드를 제시해주세요.
        </div>
      </div>
    </div>
  );
};

export default CouponBoxPage;

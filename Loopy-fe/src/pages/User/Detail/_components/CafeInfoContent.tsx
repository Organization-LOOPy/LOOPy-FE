import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useIssueCoupon } from "../../../../hooks/mutation/detail/useIssueCoupon";
import BusinessTimeSection from "./BusinessTimeSection";
import KeywordTags from "../../../../components/etc/KeywordTags";
import MyStampCard from "./MyStampCard";
import EventCard from "../../../../components/card/EventCard";
import CouponCard from "./CouponCard";
import MenuCard from "./MenuCard";
import PhoneIcon from "/src/assets/images/Phone.svg?react";
import GlobeIcon from "/src/assets/images/Globe.svg?react";
import ArrowRightIcon from "/src/assets/images/ArrowRight_Grey2.svg?react";
import CouponReceivedModal from "./CouponModal";
import { couponIssueMock } from "../../../../mock/couponIssueMock";
import { handleIssueCoupon } from "../../../../utils/handleIssueCoupon";
import type { BusinessHourType, SameAllDaysHours, WeekdayWeekendHours, EachDayHour, Coupon, MenuItem, StampBook, CafeChallenge } from "../../../../apis/cafeDetail/type";

export interface BusinessHour {
    day: string; 
    time: string; 
}

type Props = {
  businessHourType: BusinessHourType;
  businessHours: SameAllDaysHours | WeekdayWeekendHours | EachDayHour[];
  breakTime?: string | null;

  phone: string | null;
  websiteUrl: string | null;
  description: string | null;
  keywords: string[] | null;

  menu: MenuItem[];
  coupons: Coupon[];
  challenge: CafeChallenge[];
  stampBook: StampBook | null;

  cafeId: string;
  cafeName: string;
};

export default function CafeInfoContent({
    businessHourType,
    businessHours,
    breakTime,
    phone,
    websiteUrl,
    description,
    keywords,
    menu = [],
    coupons = [],
    challenge = [],
    stampBook,
    cafeId,
    cafeName,
}: Props) {
    const navigate = useNavigate();
    const [showCouponModal, setShowCouponModal] = useState(false);
    const [_issuedCoupon, setIssuedCoupon] = useState(couponIssueMock); 
    const { mutateAsync: issueCoupon } = useIssueCoupon();

    const [downloadedCouponIds, setDownloadedCouponIds] = useState<number[]>(
        () =>
        coupons
            .filter((c) => c.isIssued || (c.userCoupons?.length ?? 0) > 0)
            .map((c) => c.id)
    );

    const markAsDownloaded = (couponId: number) => {
        setDownloadedCouponIds((prev) =>
        prev.includes(couponId) ? prev : [...prev, couponId]
        );
    };

    const representativeMenus = menu.filter((m) => m.isRepresentative);

    const formatPrice = (n: number) =>
        `${(n ?? 0).toLocaleString("ko-KR")}`;

    const formatDate = (iso: string) => {
        const d = new Date(iso);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}.${m}.${day}`;
    };

    const formatDateRange = (start: string, end: string) =>
        `${formatDate(start)} ~ ${formatDate(end)}`;

    return (
        <>
            <div className="mt-[1.5rem] flex flex-col text-[0.875rem] font-normal text-[#3B3B3B] leading-none">
                {/* 영업시간 */}
                <BusinessTimeSection
                    businessHourType={businessHourType}
                    businessHours={businessHours}
                    breakTime={breakTime}
                />

                {/* 전화번호 */}
                {phone && (
                    <div className="mt-[0.75rem] flex items-center gap-[0.5rem]">
                        <PhoneIcon className="h-[1rem]" />
                        <span>{phone}</span>
                    </div>
                )}

                {/* 웹사이트 */}
                {websiteUrl && (
                    <div className="mt-[0.75rem] flex items-center gap-[0.5rem]">
                        <GlobeIcon className="h-[1rem]" />
                        <a
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                        >
                        {websiteUrl}
                        </a>
                    </div>
                )}

                {/* 설명 */}
                {description && (
                    <div className="mt-[1rem] leading-[1.3125rem]">{description}</div>
                )}

                {/* 키워드 태그 */}
                {(keywords?.length ?? 0) > 0 && (
                    <div className="mt-[1rem]">
                        <KeywordTags keywords={keywords as string[]} />
                    </div>
                )}

                {/* 하단 바 */}
                <div className="mt-[1.5rem] w-full h-[1px] bg-[#F3F3F3]" />

                {/* 스탬프 카드 */}
                {stampBook && (
                    <div className="mt-[1.5rem]">
                        <MyStampCard
                            current={stampBook.currentCount}
                            total={stampBook.goalCount}
                            dueDate={formatDate(stampBook.expiresAt)}
                        />
                    </div>
                )}

                {/* 챌린지*/}
                {challenge.length > 0 && (
                    <>
                        <div className="mt-[2rem] text-[1rem] font-semibold text-[#000000] leading-none">
                            챌린지 정보
                        </div>
                        <div className="mt-[1rem] flex flex-col gap-[1rem]">
                        {challenge.map((ch) => (
                            <EventCard
                            key={ch.id}
                            imageSrc={ch.thumbnailUrl}
                            monthLabel={`${new Date(ch.startDate).getMonth() + 1}월의 챌린지`}
                            title={ch.title}
                            description={`${formatDate(ch.startDate)} ~ ${formatDate(
                                ch.endDate
                            )}`}
                            onClick={() => navigate(`/challenge/${ch.challengeId}`)}
                            />
                        ))}
                        </div>
                    </>
                )}

                {coupons.length > 0 && (
                    <>
                        <div className="mt-[2rem] text-[1rem] font-semibold text-[#000000] leading-none">
                            할인 쿠폰
                        </div>
                        <div className="mt-[1rem] flex flex-col gap-[1rem]">
                            {coupons.map((coupon) => (
                                <CouponCard
                                    key={coupon.id}
                                    imageSrc="/src/assets/images/RedImage.svg"
                                    storeName={cafeName}
                                    title={coupon.name}
                                    description={formatDateRange(
                                        coupon.createdAt,
                                        coupon.expiredAt
                                    )}
                                    cafeId={cafeId}
                                    couponTemplateId={coupon.id}
                                    onDownload={async () => {
                                        await handleIssueCoupon({
                                            issueCoupon,
                                            cafeId,
                                            couponTemplateId: coupon.id,
                                            createdAt: coupon.createdAt,
                                            expiredAt: coupon.expiredAt,
                                            onSuccess: (data) => {
                                                setIssuedCoupon(data);
                                                setShowCouponModal(true);
                                                markAsDownloaded(coupon.id);
                                            },
                                            onAlreadyIssued: () => {
                                                alert("이미 발급받은 쿠폰입니다.");
                                                markAsDownloaded(coupon.id);
                                            },
                                            onError: (e) => {
                                                console.error("쿠폰 발급 중 오류", e);
                                            },
                                        });
                                    }}
                                    isDownloaded={downloadedCouponIds.includes(coupon.id)}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* 대표 메뉴 */}
                {representativeMenus.length > 0 && (
                    <>
                        <div className="mt-[2rem] flex items-center justify-between">
                            <span className="text-[1rem] font-semibold text-[#000000]">
                                대표 메뉴
                            </span>
                            <button
                                onClick={() => navigate(`/detail/${cafeId}/menu`)}
                                className="text-[0.875rem] font-normal text-[#7F7F7F] flex items-center leading-none"
                            >
                                메뉴 전체보기
                                <ArrowRightIcon className="h-[0.625rem] ml-[0.5rem]" />
                            </button>
                        </div>

                        <div className="mt-[1rem] flex flex-col gap-[1.5rem]">
                            {representativeMenus.map((m) => (
                                <MenuCard
                                    key={m.id}
                                    name={m.name}
                                    description={m.description}
                                    price={formatPrice(m.price)}
                                    imageUrl={m.imgUrl}
                                    isRepresentative={m.isRepresentative}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {showCouponModal && (
                <>
                    {/* 배경 */}
                    <div className="fixed inset-0 flex justify-center z-40">
                        <div className="w-full max-w-[393px] bg-black/50" />
                    </div>

                    {/* 모달 */}
                    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[393px] z-50">
                        <CouponReceivedModal
                            onClose={() => setShowCouponModal(false)}
                            onConfirm={() => {
                                setShowCouponModal(false);
                                // 필요하면 쿠폰함으로 이동 추가
                            }}
                        />
                    </div>
                </>
            )}
        </>
    );
}

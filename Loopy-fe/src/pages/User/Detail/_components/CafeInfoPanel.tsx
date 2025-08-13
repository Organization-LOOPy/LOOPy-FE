import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import CafeTagButton from "./CafeTagButton";
import CafeInfoContent from "./CafeInfoContent";
import { cafeReviewMock } from "../../../../mock/cafeReviewMock";
import { formatReview } from "../../../../utils/formatReview";
import { getCafeReviews } from "../../../../apis/review/get/api";
import CafeReviewContent from "./CafeReviewContent";
import AlarmSubscribeButton from "./AlarmSubscribeButton";
import BookmarkButton from "../../../../components/button/BookmarkButton";
import ArrowDownIcon from "/src/assets/images/ArrowDown_Grey2.svg?react";
import ArrowUpIcon from "/src/assets/images/ArrowUp_Grey2.svg?react";
import CafeInfoContentSkeleton from "../Skeleton/CafeInfoContentSkeleton";
import CafeReviewContentSkeleton from "../Skeleton/CafeReviewSkeleton";
import type { 
    BusinessHourType,
    SameAllDaysHours,
    WeekdayWeekendHours,
    EachDayHour,
    MenuItem,
    Coupon,
} from "../../../../apis/cafeDetail/type";

interface CafeInfoPanelProps {
    name: string;
    address: string;
    tags: string[];
    keywords: string[] | null;

    selectedTab: "info" | "review";
    onTabChange: (tab: "info" | "review") => void;

    businessHourType: BusinessHourType;
    businessHours: SameAllDaysHours | WeekdayWeekendHours | EachDayHour[];
    breakTime?: string | null;

    isLoading: boolean;
    phone: string | null;
    instagram: string | null;
    description: string | null;

    menu: MenuItem[];                
    storeFilters?: Record<string, boolean> | null;
    takeOutFilters?: Record<string, boolean> | null;
    menuFilters?: Record<string, boolean> | null;
    coupons: Coupon[];

    cafeId: string;
    cafeName: string;
}

export default function CafeInfoPanel({
    name, address, tags, keywords,
    selectedTab, onTabChange,
    phone, instagram, description,
    isLoading,
    businessHourType, businessHours, breakTime,
    menu, storeFilters, takeOutFilters, menuFilters, coupons,
}: CafeInfoPanelProps) {
    const [showAllTags, setShowAllTags] = useState(false);
    const Icon = showAllTags ? ArrowUpIcon : ArrowDownIcon;
    const [isTabLoading, setIsTabLoading] = useState(false);
    const prevTabRef = useRef<"info" | "review">(selectedTab);
    const { cafeId } = useParams();
    const token = localStorage.getItem("accessToken");
    const { data: reviewData, isLoading: isReviewLoading } = useQuery({
        queryKey: ["cafeReviews", cafeId],
        queryFn: async () => {
            try {
                return await getCafeReviews(cafeId!, undefined, token!);
            } catch (e) {
                console.error("리뷰 조회 실패. 목데이터로 대체합니다.", e);
                return cafeReviewMock;
            }
        },
        enabled: selectedTab === "review" && !!cafeId && !!token,
    });

    const getActiveFilterTags = (): string[] => {
        const filters = [storeFilters, takeOutFilters, menuFilters];
        return filters
        .flatMap((filter) =>
            Object.entries(filter || {})
            .filter(([, value]) => value)
            .map(([key]) => key)
        );
    };

    const allTags = [...tags, ...getActiveFilterTags()];

    useEffect(() => {
        if (prevTabRef.current !== selectedTab) {
            setIsTabLoading(true);
            const timer = setTimeout(() => setIsTabLoading(false), 1000);
            prevTabRef.current = selectedTab;
            return () => clearTimeout(timer);
        }
    }, [selectedTab]);

    return (
        <div className="w-full px-[1.5rem] pt-[1.5625rem] pb-[2rem] bg-white rounded-t-[0.75rem]">
            <div className="shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[1rem]">
                        <div className="text-[1.5rem] font-bold whitespace-nowrap">{name}</div>
                        <AlarmSubscribeButton />
                    </div>

                    <BookmarkButton/>
                </div>

                <div className="mt-[0.25rem] text-[#7F7F7F] text-[1rem] font-normal">
                    {address}
                </div>

                <div className="mt-[0.75rem] flex flex-col gap-y-[0.5rem]">
                    <div className="flex gap-x-[0.375rem] flex-wrap items-center">
                        {allTags.slice(0, 2).map((tag, idx) => (
                            <CafeTagButton key={idx} label={tag} />
                        ))}
                        <div className="flex px-[0.625rem]">
                            {allTags.length > 2 && (
                                <button
                                onClick={() => setShowAllTags(!showAllTags)}
                                className="flex items-center text-[0.875rem] text-[#7F7F7F] whitespace-nowrap gap-[0.25rem]"
                                >
                                태그 더보기
                                <Icon className="w-[0.75rem] h-[0.75rem] shrink-0" />
                                </button>
                            )}
                        </div>
                    </div>

                    {showAllTags && (
                        <div className="flex flex-wrap gap-x-[0.375rem] gap-y-[0.5rem]">
                            {allTags.slice(2).map((tag, idx) => (
                                <CafeTagButton key={`more-${idx}`} label={tag} />
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-[2rem] flex flex-col items-center border-b border-[#E0E0E0]">
                    <div className="w-full relative"> {/* 344px */}
                        <div className="flex">
                            {["카페 정보", "리뷰"].map((label, index) => {
                                const key = index === 0 ? "info" : "review";
                                const isSelected = selectedTab === key;
                                return (
                                <button
                                    key={label}
                                    onClick={() => onTabChange(key as "info" | "review")}
                                    className={`w-1/2 text-[1rem] font-semibold pb-[0.75rem] text-center leading-none ${
                                        isSelected ? "text-[#6970F3]" : "text-[#A8A8A8]"
                                    }`}
                                >
                                    {label}
                                </button>
                                );
                            })}
                        </div>

                        <div
                        className={`absolute bottom-0 h-[0.125rem] bg-[#6970F3] transition-all duration-200 w-1/2 ${
                            selectedTab === "info" ? "left-0" : "left-1/2"
                        }`}
                        />
                    </div>
                </div>
            </div>

            <div className="pb-[2rem]">
                {selectedTab === "info" && (
                    isLoading || isTabLoading ? (
                    <CafeInfoContentSkeleton />
                    ) : (
                        <CafeInfoContent
                            businessHourType={businessHourType}
                            businessHours={businessHours}
                            breakTime={breakTime}             
                            phone={phone}
                            websiteUrl={instagram}   
                            description={description}
                            keywords={keywords ?? []}
                            menu={menu ?? []}
                            coupons={coupons}
                            challenge={[]}                   
                            stampBook={null}                   
                            cafeId={cafeId!}
                            cafeName={name}
                        />
                    )
                )}
                {selectedTab === "review" && (
                    isTabLoading || isReviewLoading ? (
                        <div className="mt-[1.5rem] flex flex-col gap-[2rem]">
                            <CafeReviewContentSkeleton />
                        </div>
                    ) : (
                        <div className="mt-[1.5rem] flex flex-col gap-[2rem]">
                            <CafeReviewContent
                                reviews={(reviewData?.reviews || cafeReviewMock.reviews).map(formatReview)} 
                            />
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
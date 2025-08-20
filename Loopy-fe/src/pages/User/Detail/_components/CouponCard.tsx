import CommonCard from "../../../../components/card/CommonCard";
import DownloadIcon from "/src/assets/images/Download.svg?react";
import SuccessDownloadIcon from "/src/assets/images/SuccessDownload.svg?react";
import type { Coupon } from "../../../../apis/cafeDetail/type";
import { couponTypeMeta } from "../../../../utils/couponTypeMeta";
import { formatCouponTitle } from "../../../../utils/formatCouponTitle";
import dayjs from "dayjs";

interface CouponCardProps {
    coupon: Coupon;
    storeName: string;
    onDownload: () => Promise<void>;
    isDownloaded: boolean;
}

const CouponCard = ({ coupon, onDownload, isDownloaded }: CouponCardProps) => {
    const { icon: Icon } = couponTypeMeta[coupon.discountType];
    const title = formatCouponTitle(coupon);

    return (
        <CommonCard
        padding="p-4"
        className="flex items-center justify-between bg-white border-[0.03125rem] border-[#DFDFDF]"
        >
        <div className="flex items-center overflow-hidden">
            <div className="w-[3.875rem] h-[3.875rem] rounded-full bg-[#F6F6F6] flex items-center justify-center shrink-0">
                <Icon className="w-[2rem] h-[2rem] text-[#6970F3]" />
            </div>

            <div className="ml-[1rem] flex flex-col">
                {coupon.usageCondition && (
                    <span className="text-[0.75rem] font-normal text-[#252525] leading-[100%]">
                        {coupon.usageCondition}
                    </span>
                )}
                <span className="mt-[0.5rem] text-[1rem] font-semibold text-[#000000] leading-[100%]">
                    {title}
                </span>
                <span className="mt-[0.5rem] text-[0.75rem] text-[#7F7F7F]">
                    {dayjs(coupon.createdAt).format('YYYY.MM.DD')} ~ {coupon.expiredAt ? dayjs(coupon.expiredAt).format('YYYY.MM.DD') : ''}
                </span>
            </div>
        </div>

            <button
                onClick={!isDownloaded ? onDownload : undefined}
                disabled={isDownloaded}
                className={`ml-[1rem] shrink-0 ${isDownloaded ? 'cursor-not-allowed' : ''}`}
            >
                {isDownloaded ? (
                    <SuccessDownloadIcon className="w-[2rem] h-[2rem]" />
                ) : (
                    <DownloadIcon className="w-[2rem] h-[2rem]" />
                )}
            </button>
        </CommonCard>
    );
};

export default CouponCard;

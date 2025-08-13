import { useEffect, useRef, useState } from "react";
import ArrowRightIcon from "/src/assets/images/ArrowRight_Grey2.svg?react";

interface MyStampCardProps {
    current: number;
    total: number;
    dueDate: string; 
}

export default function MyStampCard({ current, total, dueDate }: MyStampCardProps) {
    const barRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [barWidth, setBarWidth] = useState(0);
    const targetWidth = Math.min(current, total) * 29.4;

    // intersection observer로 뷰포트 진입 감지
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.4 }
        );

        if (barRef.current) observer.observe(barRef.current);
        return () => {
            if (barRef.current) observer.unobserve(barRef.current);
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            const timeout = setTimeout(() => {
                setBarWidth(targetWidth);
            }, 100); 
            return () => clearTimeout(timeout);
        }
    }, [isVisible, targetWidth]);

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between">
                <span className="text-[1rem] font-semibold text-[#000000] leading-none">내 스탬프</span>
                <button
                onClick={() => console.log("전체보기 클릭")}
                className="text-[0.875rem] font-normal text-[#7F7F7F] flex items-center leading-none"
                >
                    전체보기
                    <ArrowRightIcon className="h-[0.625rem] ml-[0.5rem]"/>
                </button>
            </div>

            <div className="mt-[1rem] flex items-center gap-[1rem]">
                {/* 숫자 */}
                <div className="min-w-fit flex items-baseline leading-none">
                    <span className="text-[1.5rem] font-semibold text-[#6970F3]">{current}</span>
                    <span className="text-[0.875rem] font-semibold text-[#A8A8A8]">
                        /{total}
                    </span>
                </div>

                {/* 바 */}
                <div
                ref={barRef}
                className="relative flex-1 h-[0.625rem] rounded-[1.25rem] bg-[#DFDFDF] overflow-hidden"
                >
                <div
                    className="absolute left-0 top-0 h-full bg-[#6970F3] rounded-[1.25rem] transition-all duration-500"
                    style={{ width: `${barWidth}px` }}
                />
                </div>
            </div>

            <div className="mt-[0.5rem] flex justify-end">
                <span className="text-[0.875rem] font-normal text-[#6970F3] leading-none">
                    스탬프 기한 ~{dueDate}
                </span>
            </div>
        </div>
    );
}

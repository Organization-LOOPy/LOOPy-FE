import RepiMenuIcon from '/src/assets/images/RepiMenu.svg?react';

interface MenuCardProps {
    imageUrl?: string;
    name: string;
    description: string;
    price: string;
    isRepresentative?: boolean;
}

export default function MenuCard({
    imageUrl,
    name,
    description,
    price,
    isRepresentative = false,
}: MenuCardProps) {
    return (
        <div
            className={`flex gap-[1rem] h-[7.25rem]`} // 높이 고정
        >
            {imageUrl && (
                <div className="w-[7.25rem] h-[7.25rem] rounded-[0.5rem] overflow-hidden bg-[#F3F3F3] flex items-center justify-center">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div
                className={`flex flex-col justify-between ${
                imageUrl ? 'flex-1' : 'w-full'
                }`}
            >
                <div>
                    <div className="text-[1rem] font-semibold text-black flex items-center gap-[0.25rem]">
                        {isRepresentative && (
                        <RepiMenuIcon className="h-[1rem] align-middle -ml-[0.25rem]" />
                        )}
                        {name}
                    </div>
                    <div className="mt-[0.75rem] text-[0.875rem] font-normal text-[#3B3B3B] leading-none">
                        {description}
                    </div>
                </div>
                <div className="text-[1rem] font-semibold text-right text-black leading-none">
                    {price}원
                </div>
            </div>
        </div>
    );
}
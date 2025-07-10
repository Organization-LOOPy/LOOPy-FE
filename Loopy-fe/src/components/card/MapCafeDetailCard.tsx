import KeywordTags from "../etc/KeywordTags";

interface Props {
    name: string;
    distanceText: string;
    address: string;
    images: string[];
    keywords: string[];
}

const CafeDetailCard = ({ name, distanceText, address, images, keywords }: Props) => {
    const imagesToShow = images.slice(0, 3);

    return (
        <div
            style={{
                width: "24.5625rem", 
                height: "15.75rem",
                padding: "1.5rem 1.5rem 1.5rem", // 40px top, 24px sides, 16px bottom
                backgroundColor: "#fff",
                borderTopLeftRadius: "1rem",
                borderTopRightRadius: "1rem",
                boxSizing: "border-box",
                position: "relative",
            }}
        >
            <img
                src="/src/assets/images/GrabHandle.svg"
                alt="드래그 핸들"
                style={{
                width: "2rem", // 32px
                height: "0.5rem",
                borderRadius: "0.25rem", // 4px
                position: "absolute",
                top: "0.75rem", // 12px
                left: "50%",
                transform: "translateX(-50%)",
                }}
            />

            {/* 타이틀 + 거리 */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1.25rem", fontWeight: 700 }}>{name}</span>
                <span style={{ fontSize: "0.875rem", fontWeight: 400, color: "#A8A8A8" }}>
                    {distanceText}
                </span>
                {/* 북마크 아이콘 */}
                <img
                    src="/src/assets/images/Bookmark.svg"
                    alt="북마크"
                    style={{
                        position: "absolute",
                        right: "1.5rem", // 24px
                        width: "1.5rem",
                        height: "1.5rem",
                    }}
                />
            </div>

            {/* 주소 */}
            <div style={{ fontSize: "0.875rem", fontWeight: 400, color: "#7F7F7F", marginTop: "0.25rem" }}>
                {address}
            </div>

            {/* 이미지 리스트 */}
            {imagesToShow.length > 0 ? (
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                    {imagesToShow.map((src, i) => (
                        <img
                        key={i}
                        src={src}
                        alt={`카페 이미지 ${i + 1}`}
                        style={{
                            width: "6.875rem", // 110px
                            height: "6.875rem",
                            objectFit: "cover",
                            borderRadius: "0.5rem",
                        }}
                        />
                    ))}
                </div>
            ) : (
                <div style={{ height: "6.875rem", marginTop: "0.75rem" }} />
            )}

            {/* 키워드 태그 */}
            <KeywordTags keywords={keywords} />
        </div>
    );
};

export default CafeDetailCard;

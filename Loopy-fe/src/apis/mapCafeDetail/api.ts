import axiosInstance from '../axios';

export type MapCafeDetail = {
    address: string;
    images: string[];
    keywords: string[];
};

function toMapCafeDetail(raw: any): MapCafeDetail {
    const base = raw?.success ?? raw;
    const cafe = base?.cafe ?? base ?? {};

    const photosSrc = Array.isArray(base?.photos) ? base.photos : cafe?.photos ?? [];
    const keywordsSrc = cafe?.keywords ?? base?.keywords ?? [];

    return {
        address: String(cafe?.address ?? ''),
        images: Array.isArray(photosSrc)
        ? photosSrc
            .map((p: any) => p?.photoUrl || p?.url || '')
            .filter(Boolean)
        : [],
        keywords: Array.isArray(keywordsSrc)
        ? Array.from(new Set(
            keywordsSrc
                .map((k: any) => String(k ?? '').trim())
                .filter(Boolean)
            ))
        : [],
    };
}

export async function getMapCafeDetail(
    cafeId: number, 
    coord?: { x: number; y: number }
): Promise<MapCafeDetail> {
    const { data } = await axiosInstance.get(`/api/v1/search/${cafeId}`, {
        params: coord, // { x, y }
    });
    return toMapCafeDetail(data);
}

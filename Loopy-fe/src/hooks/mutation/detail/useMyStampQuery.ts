import { useQuery } from "@tanstack/react-query";
import { getMyStamp } from "../../../apis/cafeStamp/api";
import type { MyStampSuccess } from "../../../apis/cafeStamp/type";

export const useMyStampQuery = (cafeId: string) => {
    return useQuery<MyStampSuccess | undefined>({
        queryKey: ['myStamp', cafeId],
        queryFn: async () => {
        try {
            const res = await getMyStamp(cafeId);
            return res.success;
        } catch (e: any) {
            if (e?.response?.status === 404) {
            console.info('스탬프 적립 내역 없음 (404)');
            } else {
            console.warn('getMyStamp failed:', e);
            }
            return undefined;
        }
        },
        enabled: !!cafeId,
    });
};
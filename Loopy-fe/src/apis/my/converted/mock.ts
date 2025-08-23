import type { ConvertedStampBookGroup } from "./type";

export async function getConvertedStampbooksMock(): Promise<ConvertedStampBookGroup[]> {
  return [
    {
      cafeId: 1,
      cafeName: "Mock 카페",
      cafeAddress: "서울 어딘가",
      cafeImageUrl: "https://example.com/mock.jpg",
      totalCount: 2,
      convertedCount: 1,
      completedCount: 1,
      items: [
        {
          stampBookId: 101,
          round: 1,
          status: "converted",
          isConverted: true,
          completedAt: "2025-08-20T10:00:00.000Z",
          convertedAt: "2025-08-20T10:00:00.000Z",
          displayText: "Mock 스탬프 환전 완료",
        },
      ],
    },
  ];
}

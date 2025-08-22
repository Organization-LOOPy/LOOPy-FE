export interface ConvertedStampBookItem {
  stampBookId: number;
  round: number;
  status: "completed" | "converted";
  isConverted: boolean;
  completedAt: string;
  convertedAt: string;
  displayText: string;
}

export interface ConvertedStampBookGroup {
  cafeId: number;
  cafeName: string;
  cafeAddress: string;
  cafeImageUrl: string;
  totalCount: number;
  convertedCount: number;
  completedCount: number;
  items: ConvertedStampBookItem[];
}

export interface GetConvertedStampbooksSuccess {
  status: "SUCCESS";
  code: 200;
  message: string;
  data: ConvertedStampBookGroup[];
}

export interface ErrorResponse {
  errorCode: string;
  reason: string;
  data: null;
}

export type GetConvertedStampbooksResponse =
  | GetConvertedStampbooksSuccess
  | ErrorResponse;

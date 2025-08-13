export interface ConvertedStampBookItem {
  stampBookId: number;
  cafeId: number;
  cafeName: string;
  cafeAddress: string;
  cafeImageUrl: string;
  round: number;          
  displayText: string;   
  convertedAt: string;  
}

export interface GetConvertedStampbooksSuccess {
  status: "SUCCESS";
  code: 200;
  message: string; 
  data: ConvertedStampBookItem[];
}

export interface ErrorResponse {
  errorCode: string;
  reason: string;
  data: null;
}

export type GetConvertedStampbooksResponse =
  | GetConvertedStampbooksSuccess
  | ErrorResponse;

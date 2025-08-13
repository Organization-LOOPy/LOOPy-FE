import type { ApiResponse } from "../types/ApiResponse";

export interface PreferredAreaRequest {
  preferredArea: string;
}

export interface PreferredAreaResponse {
  message: string;
  preferredArea: string;
}

export interface PreferredKeywordsRequest {
  preferredKeywords: string[];
}

export interface PreferredKeywordsResponse {
  message: string;
  preferredKeywords: string[];
}

export type PreferredResponse = ApiResponse<PreferredAreaResponse>;
export type PreferredKeywordsApiResponse = ApiResponse<PreferredKeywordsResponse>;


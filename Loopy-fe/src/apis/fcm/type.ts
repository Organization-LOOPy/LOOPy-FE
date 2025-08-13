import type { ApiResponse } from "../types/ApiResponse";

export interface FcmTokenRequest {
    fcmToken: string;
};

export type FcmTokenResponse = ApiResponse<FcmTokenRequest>;
export interface MyStampResponse {
    resultType: "SUCCESS" | "FAILURE";
    error: string | null;
    success: MyStampSuccess;
}

export interface MyStampSuccess {
    stampBookId: number;
    currentCount: number;
    goalCount: number;
    expiresAt: string;
}
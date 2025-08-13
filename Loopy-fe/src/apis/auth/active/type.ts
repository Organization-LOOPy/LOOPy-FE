import type { ApiResponse } from "../../types/ApiResponse";

export interface UserStatus {
  id: string;
  status: "active" | "inactive";
  inactivedAt: string | null;
}

export interface UserStatusSuccess {
  message: string;
  user: UserStatus;
}

export type UserStatusResponse = ApiResponse<UserStatusSuccess>;

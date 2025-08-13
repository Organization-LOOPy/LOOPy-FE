export interface LoginRequest {
  email: string;
  password: string;
  role: "CUSTOMER" | "OWNER";
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    nickname: string;
    currentRole: "CUSTOMER" | "OWNER";
  };
}

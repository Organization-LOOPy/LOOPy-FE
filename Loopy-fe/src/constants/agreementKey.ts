import type { AgreementKey } from "../types/agreement";

export const AGREEMENT_KEYS_BY_AUDIENCE: Record<"user" | "admin", AgreementKey[]> = {
  user: ["terms", "privacy", "location", "marketing"],
  admin: ["terms", "privacy", "location"], 
};

export const REQUIRED_KEYS_BY_AUDIENCE: Record<"user" | "admin", AgreementKey[]> = {
  user: ["terms", "privacy", "location"],
  admin: ["terms", "privacy", "location"],
};

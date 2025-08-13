export type AgreementKey = "terms" | "privacy" | "location" | "marketing";

export type AgreementState = {
  terms: boolean;
  privacy: boolean;
  location: boolean;
  marketing: boolean;
};

export type Audience = "user" | "admin";

export interface AgreementSection {
  heading: string;
  body: string; 
}

export type AgreementDoc = Partial<Record<AgreementKey, AgreementSection[]>>;

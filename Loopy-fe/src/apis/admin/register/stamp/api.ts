import axiosInstance from "../../../axios";
import type {
  CreateStampPolicyBody,
  CreateStampPolicyResponse,
  StampPolicy,
} from "./type";

export async function createStampPolicy(
  body: CreateStampPolicyBody
): Promise<StampPolicy> {
  const res = await axiosInstance.post<CreateStampPolicyResponse>(
    "/api/v1/owner/stamps/stamp-policy",
    body
  );
  return res.data.data;
}

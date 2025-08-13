import type { StampPolicyData, StampPolicyResponse, PatchStampPolicyBody, PatchResponse, StampStats, StampStatsResponse } from "./type";
import { mockStampPolicy, mockPatchedPolicy, mockStampStats } from "./mocks";

const USE_MOCK_FALLBACK = true; // 서버 미연결 시 true 유지

async function getJson<T>(url: string, token?: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: 'include',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

// GET: 스탬프 정책 조회
export async function fetchStampPolicy(token?: string): Promise<StampPolicyData> {
  try {
    const json = await getJson<StampPolicyResponse>(
      '/api/v1/owner/stamps/stamp-policy',
      token
    );
    return json.data;
  } catch (e) {
    if (USE_MOCK_FALLBACK) return mockStampPolicy;
    throw e;
  }
}

// PATCH: 스탬프 정책 수정 (부분 업데이트)
export async function patchStampPolicy(
  body: PatchStampPolicyBody,
  token?: string
): Promise<StampPolicyData> {
  try {
    const res = await fetch('/api/v1/owner/stamps/stamp-policy', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as PatchResponse;
    return json.data;
  } catch (e) {
    if (USE_MOCK_FALLBACK) return mockPatchedPolicy(body);
    throw e;
  }
}

// GET: 스탬프 통계
export async function fetchStampStats(token?: string): Promise<StampStats> {
  try {
    const json = await getJson<StampStatsResponse>(
      '/api/v1/owner/dashboard/stamp-stats',
      token
    );
    return json.data;
  } catch (e) {
    if (USE_MOCK_FALLBACK) return mockStampStats;
    throw e;
  }
}

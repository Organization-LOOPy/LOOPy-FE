import axiosInstance from '../../axios';
import type {
  StampPolicyData,
  StampPolicyResponse,
  PatchStampPolicyBody,
  PatchResponse,
  StampStats,
  StampStatsResponse,
  StampImage,
} from './type';
import {
  mockStampPolicy,
  mockPatchedPolicy,
  mockStampStats,
} from './mocks';

const USE_MOCK_FALLBACK = true;

const authCfg = (token?: string) =>
  token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;

export async function fetchStampPolicy(token?: string): Promise<StampPolicyData> {
  try {
    const { data } = await axiosInstance.get<StampPolicyResponse>(
      '/api/v1/owner/stamps/stamp-policy',
      authCfg(token)
    );
    return data.data;
  } catch (e) {
    if (USE_MOCK_FALLBACK) {
      console.warn('[fetchStampPolicy] 실패. 목데이터로 대체합니다.', e);
      return mockStampPolicy;
    }
    throw e;
  }
}

export async function patchStampPolicy(
  body: PatchStampPolicyBody,
  token?: string
): Promise<StampPolicyData> {
  try {
    const { data } = await axiosInstance.patch<PatchResponse>(
      '/api/v1/owner/stamps/stamp-policy',
      body,
      authCfg(token)
    );
    return data.data;
  } catch (e) {
    if (USE_MOCK_FALLBACK) {
      console.warn('[patchStampPolicy] 실패. 목데이터 응답으로 대체합니다.', e);
      return mockPatchedPolicy(body);
    }
    throw e;
  }
}

export async function fetchStampStats(token?: string): Promise<StampStats> {
  try {
    const { data } = await axiosInstance.get<StampStatsResponse>(
      '/api/v1/owner/dashboard/stamp-stats',
      authCfg(token)
    );
    return data.data;
  } catch (e) {
    if (USE_MOCK_FALLBACK) {
      console.warn('[fetchStampStats] 실패. 목데이터로 대체합니다.', e);
      return mockStampStats;
    }
    throw e;
  }
}

export async function fetchStampImages(token?: string): Promise<StampImage[]> {
  try {
    const { data } = await axiosInstance.get(
      '/api/v1/owner/stamps/stamp-images',
      authCfg(token)
    );
    return data.data;
  } catch (e) {
    console.error('[fetchStampImages] 실패', e);
    throw e;
  }
}

export async function uploadStampImage(file: File, token?: string) {
  try {
    const formData = new FormData();
    formData.append('images', file);

    const { data } = await axiosInstance.post(
      '/api/v1/owner/stamps/stamp-images',
      formData,
      {
        ...authCfg(token),
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    return data.data[0]; // { id, imageUrl }
  } catch (e) {
    console.error('[uploadStampImage] 실패', e);
    throw e;
  }
}

export async function deleteStampImage(imageId: number, token?: string) {
  try {
    const { data } = await axiosInstance.delete(
      `/api/v1/owner/stamps/stamp-images/${imageId}`,
      authCfg(token)
    );
    return data;
  } catch (e) {
    console.error('[deleteStampImage] 실패', e);
    throw e;
  }
}

export interface OwnerCafeBasicPhoto {
  photoUrl: string;
}

export interface OwnerCafeBasic {
  id: number;
  name: string;
  ownerName: string;
  address: string;
  region1DepthName: string;
  region2DepthName: string;
  region3DepthName: string;
  phone: string;
  description: string;
  websiteUrl: string;
  photos: OwnerCafeBasicPhoto[];
}

export type PostOwnerCafeBasicInfoRequest = Omit<OwnerCafeBasic, 'photos'> & {
  latitude?: number;
  longitude?: number;
};

export type PostOwnerCafeBasicInfoResponse = {
  message: string;
  cafe: {
    id: number;
    name: string;
    ownerName: string;
    address: string;
    region1DepthName: string;
    region2DepthName: string;
    region3DepthName: string;
    latitude: number;
    longitude: number;
    phone: string;
    websiteUrl: string;
    description: string;
  };
};

export interface BusinessHour {
    day: string;
    time: string;
}

export interface Menu {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  isRepresentative: boolean;
}

export interface Review {
    id: number;
    user: {
        profileImage: string;
        nickname: string;
        stampStatus: string;
    };
    date: string;
    images: string[];
    content: string;
}

export interface CafeDetailData {
    name: string;
    address: string;
    tags: string[];
    keywords: string[];
    phone: string;
    instagram: string;
    description: string;
    hours: BusinessHour[];
    menus?: Menu[];
    reviews?: Review[];
}

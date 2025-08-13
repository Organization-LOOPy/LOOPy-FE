import type { CafeDetailSuccess } from './type';

export function toDetailViewModel(success: CafeDetailSuccess) {
  const cafe = success.cafe;

  const images =
    Array.isArray(success.photos)
      ? success.photos.map(p => p.url).filter(Boolean)
      : [];

  const keywords =
    Array.isArray(cafe.keywords)
      ? cafe.keywords.filter(Boolean)
      : [];

  return {
    id: cafe.id,
    name: cafe.name,
    address: cafe.address,
    description: cafe.description ?? '',
    phone: cafe.phone ?? '',
    websiteUrl: cafe.websiteUrl ?? '',
    images,
    keywords,
    menu: (success.menu ?? []).map(m => ({
      id: m.id,
      name: m.name,
      price: m.price,
      description: m.description ?? '',
      imageUrl: m.imgUrl || '',
      isSoldOut: !!m.isSoldOut,
      isRepresentative: !!m.isRepresentative,
    })),
    coupons: success.coupons ?? [],
    stampPolicyMessage: success.stampPolicyMessage ?? '',
    isBookmarked: !!success.bookmark?.isBookmarked,
  };
}

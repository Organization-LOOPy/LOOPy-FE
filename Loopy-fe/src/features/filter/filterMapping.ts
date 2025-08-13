import { filterGroups } from "../../constants/filterGroup";

export const TITLE_TO_GROUP = {
  '매장 이용': 'store',
  '테이크아웃': 'takeOut',
  '메뉴': 'menu',
} as const;

export type GroupTitleKo = keyof typeof TITLE_TO_GROUP;
export type ServerGroupKey = typeof TITLE_TO_GROUP[GroupTitleKo]; // 'store' | 'takeOut' | 'menu'

// 2) 서버용 영어키 ↔ UI 한글태그 매핑 (단일 소스 오브 트루스)
export const EN_TO_KO = {
  store: {
    single_seat: '1인석',
    group_seat: '단체석',
    laptop_seat: '노트북석',
    pet_friendly: '애견 동반',
    reservation: '예약 가능',
    parking: '주차 가능',
    '24hours': '24시간 운영',
    wifi: '와이파이 제공',
  },
  takeOut: {
    tumbler_discount: '텀블러 할인',
    package_discount: '포장 할인',
  },
  menu: {
    vegan: '비건',
    sugar_free: '저당/무가당',
    gluten_free: '글루텐프리',
    decaf: '디카페인',
  },
} as const;

type EnKey<T extends ServerGroupKey> = keyof typeof EN_TO_KO[T];

// 3) 역매핑: 한글태그 → 영어키
const invert = <T extends Record<string, string>>(obj: T) =>
  Object.fromEntries(Object.entries(obj).map(([en, ko]) => [ko, en])) as Record<string, keyof T>;

export const KO_TO_EN = {
  store: invert(EN_TO_KO.store),
  takeOut: invert(EN_TO_KO.takeOut),
  menu: invert(EN_TO_KO.menu),
} as const;

// 4) 개발 중 커버리지 검증: filterGroups의 모든 태그가 매핑에 존재하는지 검사
(() => {
  if (import.meta.env?.MODE !== 'production') {
    const groupByTitle: Record<GroupTitleKo, Set<string>> = {
      '매장 이용': new Set(),
      '테이크아웃': new Set(),
      '메뉴': new Set(),
    };

    filterGroups.forEach((g) => {
      if ((g.title as GroupTitleKo) in groupByTitle) {
        g.tags.forEach((t) => groupByTitle[g.title as GroupTitleKo].add(t));
      }
    });

    const warnMissing = (title: GroupTitleKo, koToEn: Record<string, string>) => {
      const declared = groupByTitle[title];
      const missing = [...declared].filter((ko) => !koToEn[ko as keyof typeof koToEn]);
      if (missing.length) {
        // 누락 태그가 있으면 콘솔 경고
        // (운영 중 크래시 방지 위해 throw 대신 warn 사용)
        // eslint-disable-next-line no-console
        console.warn(`[filterMapping] '${title}' 매핑 누락 태그:`, missing);
      }
    };

    warnMissing('매장 이용', KO_TO_EN.store);
    warnMissing('테이크아웃', KO_TO_EN.takeOut);
    warnMissing('메뉴', KO_TO_EN.menu);
  }
})();

// 5) 직렬화: 선택된 한글 태그들을 서버 쿼리 파라미터(영어키 배열)로 변환
//    - 내부 상태가 { store, menu, takeOut } 형태일 때 사용
export function serializeSelectedFiltersToParams(input: {
  store?: string[];
  menu?: string[];
  takeOut?: string[];
}): { store?: string[]; menu?: string[]; takeout?: string[] } {
  const toEn = <T extends ServerGroupKey>(group: T, arr?: string[]) =>
    arr?.map((ko) => KO_TO_EN[group][ko as keyof typeof KO_TO_EN[T]]).filter(Boolean) as
      | EnKey<T>[]
      | undefined;

  return {
    store: toEn('store', input.store),
    menu: toEn('menu', input.menu),
    // 서버 쿼리 키는 takeout (케멀/스네이크 아님)
    takeout: toEn('takeOut', input.takeOut),
  };
}

// 6) 타이틀 기반 직렬화(필요 시): {'매장 이용':[], '테이크아웃':[], '메뉴':[]} 형태를 서버 파라미터로
export function serializeFromTitlesToParams(inputByTitle: Partial<Record<GroupTitleKo, string[]>>) {
  const store = inputByTitle['매장 이용'];
  const takeOut = inputByTitle['테이크아웃'];
  const menu = inputByTitle['메뉴'];
  return serializeSelectedFiltersToParams({ store, takeOut, menu });
}

// 7) (옵션) 서버 응답의 영어키 맵을 한글 키로 변환해야 할 때 사용
export function convertFiltersToKorean(
  filters: Record<string, boolean>,
  type: ServerGroupKey
): Record<string, boolean> {
  const map = EN_TO_KO[type];
  const out: Record<string, boolean> = {};
  Object.keys(filters).forEach((en) => {
    const ko = map[en as keyof typeof map];
    if (ko) out[ko] = filters[en];
  });
  return out;
}

export function serializeForListBody(
  inputByTitle: Partial<Record<'매장 이용'|'테이크아웃'|'메뉴', string[]>>
) {
  const toObj = (group: 'store'|'takeOut'|'menu', arr?: string[]) => {
    const map = KO_TO_EN[group];
    return (arr ?? []).reduce<Record<string, boolean>>((acc, ko) => {
      const en = map[ko as keyof typeof map];
      if (en) acc[en as string] = true;
      return acc;
    }, {});
  };

  return {
    storeFilter:  toObj('store',   inputByTitle['매장 이용']),
    takeOutFilter: toObj('takeOut', inputByTitle['테이크아웃']),
    menuFilter:   toObj('menu',    inputByTitle['메뉴']),
  };
}

import { filterGroups } from "../constants/filterGroup";

export const toServerKeywords = (keywordList: string[]) => {
  return {
    storeFilters: filterGroups
      .find((g) => g.title === "매장 이용")!
      .tags.filter((tag) => keywordList.includes(tag)),

    takeOutFilters: filterGroups
      .find((g) => g.title === "테이크아웃")!
      .tags.filter((tag) => keywordList.includes(tag)),

    menuFilters: filterGroups
      .find((g) => g.title === "메뉴")!
      .tags.filter((tag) => keywordList.includes(tag)),
  };
};

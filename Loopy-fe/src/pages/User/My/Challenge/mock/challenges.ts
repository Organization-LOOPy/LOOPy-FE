import type { Challenge } from "../types/challenges";

export const challenges: Challenge[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `${7 + Math.floor(i / 5)}월의 이벤트`,
  store: `카페 위니 ${i + 1}호점`,
  description: `아메리카노 ${500 + (i % 3) * 100}원 할인`,
  period: `2025.07.${(i % 30) + 1} ~ 2025.07.${(i % 30) + 7}`,
}));
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type SelectedByGroup = Record<string, string[]>;

interface FilterCtx {
  selectedByGroup: SelectedByGroup;
  setSelectedByGroup: (next: SelectedByGroup) => void;
  clearGroup: (title: string) => void;
  clearAll: () => void;
}

const FilterContext = createContext<FilterCtx | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [selectedByGroup, setSelectedByGroup] = useState<SelectedByGroup>({
    '매장 이용': [],
    '테이크아웃': [],
    '메뉴': [],
  });

  const value = useMemo<FilterCtx>(() => ({
    selectedByGroup,
    setSelectedByGroup,
    clearGroup: (title) =>
      setSelectedByGroup(prev => ({ ...prev, [title]: [] })),
    clearAll: () =>
      setSelectedByGroup({
        '매장 이용': [],
        '테이크아웃': [],
        '메뉴': [],
      }),
  }), [selectedByGroup]);

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function useFilterStore() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilterStore must be used within FilterProvider');
  return ctx;
}

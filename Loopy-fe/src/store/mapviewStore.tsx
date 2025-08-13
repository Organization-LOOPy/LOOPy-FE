import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface MapView { center: { lat: number; lng: number }; zoom: number; }
interface MapViewCtx { view: MapView | null; setView: (v: MapView) => void; }

const MapViewContext = createContext<MapViewCtx | null>(null);

export function MapViewProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<MapView | null>(null);
  const value = useMemo(() => ({ view, setView }), [view]);
  return <MapViewContext.Provider value={value}>{children}</MapViewContext.Provider>;
}

export const useMapViewStore = () => {
  const ctx = useContext(MapViewContext);
  if (!ctx) throw new Error('useMapViewStore must be used within MapViewProvider');
  return ctx;
};

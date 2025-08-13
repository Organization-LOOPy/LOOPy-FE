import type { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { LocationProvider } from '../store/locationStore';
import { MapViewProvider } from '../store/mapviewStore';
import { FilterProvider } from '../store/filterStore';

export default function MapSearchProviders({ children }: PropsWithChildren) {
  return (
    <LocationProvider>
      <MapViewProvider>
        <FilterProvider>
          {children}
        </FilterProvider>
      </MapViewProvider>
    </LocationProvider>
  );
}

export function MapSearchProvidersRoute() {
  return (
    <MapSearchProviders>
      <Outlet />
    </MapSearchProviders>
  );
}

export function withMapSearchProviders<C extends React.ComponentType<any>>(Component: C) {
  type Props = React.ComponentProps<C>;
  const Wrapped: React.FC<Props> = (props) => (
    <MapSearchProviders>
      <Component {...props} />
    </MapSearchProviders>
  );
  Wrapped.displayName = `withMapSearchProviders(${Component.displayName || Component.name || 'Component'})`;
  return Wrapped as React.ComponentType<Props>;
}
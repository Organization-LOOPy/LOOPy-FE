export function calcDistanceMeters(
  lat1: number, lng1: number, lat2: number, lng2: number
): number {
  const R = 6371e3;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export function formatDistance(m: number): string {
  if (m < 1000) return `${m}m`;
  const km = m / 1000;
  return `${km >= 10 ? Math.round(km) : Number(km.toFixed(1))}km`;
}

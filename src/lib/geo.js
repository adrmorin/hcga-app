// Utilidades geográficas puras (sin dependencias de React ni de Leaflet)

// Esri Canvas: mapa base de líneas (sin relleno de satélite) que no requiere API key
export function tileUrlForTheme(theme) {
  const style = theme === 'light' ? 'World_Light_Gray_Base' : 'World_Dark_Gray_Base';
  return `https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/${style}/MapServer/tile/{z}/{y}/{x}`;
}

export const TILE_ATTRIBUTION = 'Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap';

export function distanceMiles(a, b) {
  const R = 3958.8;
  const toRad = d => d * Math.PI / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Distancia acumulada en millas de cada vértice de una ruta
export function cumulativeMiles(points) {
  const cum = [0];
  for (let i = 1; i < points.length; i++) {
    cum.push(cum[i - 1] + distanceMiles(points[i - 1], points[i]));
  }
  return cum;
}

// Punto de la ruta a `mile` millas del inicio, y el tramo recorrido hasta ahí
export function pointAtMile(points, cum, mile) {
  for (let i = 1; i < points.length; i++) {
    if (mile <= cum[i]) {
      const t = (mile - cum[i - 1]) / (cum[i] - cum[i - 1]);
      const a = points[i - 1];
      const b = points[i];
      const p = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
      return { latlng: p, traveled: points.slice(0, i).concat([p]) };
    }
  }
  return { latlng: points[points.length - 1], traveled: points.slice() };
}

// Punto a una fracción del recorrido de una ruta y tramo ya recorrido
export function alongRoute(points, fraction) {
  const seg = [];
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const d = distanceMiles(points[i - 1], points[i]);
    seg.push(d);
    total += d;
  }
  let target = total * fraction;
  for (let i = 1; i < points.length; i++) {
    if (target <= seg[i - 1]) {
      const t = seg[i - 1] ? target / seg[i - 1] : 0;
      const a = points[i - 1];
      const b = points[i];
      const p = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
      return { latlng: p, done: points.slice(0, i).concat([p]) };
    }
    target -= seg[i - 1];
  }
  return { latlng: points[points.length - 1], done: points.slice() };
}

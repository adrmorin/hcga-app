import L from 'leaflet';
import { alongRoute } from './geo';
import { FLEET_UNITS, HUB, TRIP_ROUTE_COLOR, UNIT_STATUS } from '../data/geo';

// Marcadores HTML de Leaflet. Las clases son utilidades de Tailwind (Tailwind escanea este archivo).
const LABEL_CLASS = 'map-pin-label';

export function pinIcon(stopId, letter) {
  const bg = stopId === 'pilot' ? 'bg-status-warning' : 'bg-status-success';
  return L.divIcon({
    className: '',
    html: `<div class="grid place-items-center w-[22px] h-[22px] rounded-circle [font:700_10px/1_var(--font-family-body)] text-[#000] border-2 border-solid border-[rgba(0,0,0,0.35)] ${bg}">${letter}</div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11]
  });
}

export function truckIcon() {
  return L.divIcon({
    className: '',
    html: '<div class="grid place-items-center w-[26px] h-[26px] rounded-circle bg-brand-bright border-2 border-solid border-[#fff] text-[#fff] shadow-brand [&>svg]:w-[14px] [&>svg]:h-[14px]"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div>',
    iconSize: [26, 26],
    iconAnchor: [13, 13]
  });
}

export function dotMarker(latlng, color, label, permanent) {
  return L.marker(latlng, {
    icon: L.divIcon({
      className: '',
      html: `<div class="w-[16px] h-[16px] rounded-circle bg-[var(--dot)] border-[3px] border-solid border-[#ffffff] [box-shadow:0_0_0_3px_color-mix(in_srgb,var(--dot)_35%,transparent),var(--shadow-sm)]" style="--dot:${color}"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    })
  }).bindTooltip(label, { permanent, direction: 'top', offset: [0, -10], className: LABEL_CLASS });
}

export const tooltipOptions = (direction, offset, permanent = false) => ({ permanent, direction, offset, className: LABEL_CLASS });

/** Dibuja una ruta de envío: línea naranja discontinua, tramo recorrido sólido y marcadores. */
export function drawRoute(map, route, withLabels) {
  L.polyline(route.points, { color: TRIP_ROUTE_COLOR, weight: 3, opacity: 0.9, dashArray: '8 6' }).addTo(map);
  const { latlng, done } = alongRoute(route.points, route.progress);
  if (route.progress > 0) L.polyline(done, { color: TRIP_ROUTE_COLOR, weight: 4 }).addTo(map);
  const start = route.points[0];
  const end = route.points[route.points.length - 1];
  dotMarker(start, '#64748b', `Origen: ${route.label.split(' → ')[0]}`, false).addTo(map);
  dotMarker(end, '#64748b', `Destino: ${route.label.split(' → ')[1]}`, false).addTo(map);
  const pct = Math.round(route.progress * 100);
  dotMarker(latlng, route.color, `${route.id} · ${route.progress > 0 ? pct + '%' : 'en origen'}`, withLabels).addTo(map);
  return L.latLngBounds(route.points);
}

/** Dibuja las unidades de la flotilla y el hub de Miami. */
export function drawFleet(map, withLabels) {
  FLEET_UNITS.forEach(u => {
    const s = UNIT_STATUS[u.status];
    dotMarker(u.latlng, s.color, `${u.id} · ${u.driver} · ${s.label}`, withLabels).addTo(map);
  });
  dotMarker(HUB.latlng, HUB.color, HUB.label, withLabels).addTo(map);
  return L.latLngBounds(FLEET_UNITS.map(u => u.latlng).concat([HUB.latlng]));
}

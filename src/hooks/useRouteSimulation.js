import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import { MAP_TRUCK_STOPS, ROUTE_I95, SIMULATION, TRIP_ROUTE_COLOR } from '../data/geo';
import { cumulativeMiles, pointAtMile } from '../lib/geo';
import { pinIcon, tooltipOptions, truckIcon } from '../lib/mapLayers';

const shortName = name => name.replace(' Travel Center', '').replace(' Truck Stop', '');

/**
 * Simula la unidad del chofer avanzando por la I-95 N (no usa el GPS del dispositivo).
 * Dibuja ruta, truck stops y camión en `map`, avanza cada 250 ms (se pausa con la pestaña
 * oculta o con "reducir movimiento") y permite seguir a la unidad o ver la ruta completa.
 */
export function useRouteSimulation(map) {
  const cum = useMemo(() => cumulativeMiles(ROUTE_I95), []);
  const totalMiles = cum[cum.length - 1];
  const stopMiles = useMemo(() => Object.fromEntries(MAP_TRUCK_STOPS.map(stop => {
    const idx = ROUTE_I95.findIndex(p => p[0] === stop.latlng[0] && p[1] === stop.latlng[1]);
    return [stop.id, cum[idx]];
  })), [cum]);

  const [mile, setMile] = useState(SIMULATION.startMile);
  const [follow, setFollow] = useState(false);
  const followRef = useRef(false);
  followRef.current = follow;
  const layers = useRef(null);

  // Capas del mapa: ruta pendiente (discontinua), tramo recorrido (sólido), paradas y unidad
  useEffect(() => {
    if (!map) return undefined;
    const halo = L.polyline(ROUTE_I95, { color: TRIP_ROUTE_COLOR, weight: 8, opacity: 0.25 }).addTo(map);
    const route = L.polyline(ROUTE_I95, { color: TRIP_ROUTE_COLOR, weight: 3, dashArray: '8 6' }).addTo(map);
    const traveled = L.polyline([], { color: TRIP_ROUTE_COLOR, weight: 4 }).addTo(map);
    const stops = MAP_TRUCK_STOPS.map(stop => {
      const marker = L.marker(stop.latlng, { icon: pinIcon(stop.id, stop.letter) })
        .addTo(map)
        .bindTooltip(stop.name, tooltipOptions('bottom', [0, 10], true));
      marker.stopId = stop.id;
      return marker;
    });
    const unit = L.marker(ROUTE_I95[0], { icon: truckIcon(), zIndexOffset: 900 })
      .addTo(map)
      .bindTooltip('Unidad HC-9402', tooltipOptions('top', [0, -14]));

    const routeBounds = route.getBounds();
    map.fitBounds(routeBounds, { padding: [16, 16] });

    const stopFollowing = () => setFollow(false);
    map.on('dragstart', stopFollowing);

    layers.current = { traveled, stops, unit, routeBounds };
    return () => {
      map.off('dragstart', stopFollowing);
      [halo, route, traveled, unit, ...stops].forEach(layer => layer.remove());
      layers.current = null;
    };
  }, [map]);

  // Avance de la simulación (solo con la pestaña visible y sin "reducir movimiento")
  useEffect(() => {
    if (!map) return undefined;
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timer = null;
    const tick = () => setMile(m => {
      const next = m + SIMULATION.milesPerTick;
      return next > totalMiles ? 0 : next; // Reinicia la ruta de demostración
    });
    const start = () => { if (!timer) timer = setInterval(tick, SIMULATION.tickMs); };
    const stop = () => { clearInterval(timer); timer = null; };
    const onVisibility = () => {
      if (document.hidden) stop();
      else if (!reduceMotion) start();
    };

    if (!reduceMotion) start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [map, totalMiles]);

  // Paradas por delante de la unidad, ordenadas por distancia en ruta
  const ahead = useMemo(() => MAP_TRUCK_STOPS
    .map(stop => ({ stop, miles: stopMiles[stop.id] - mile }))
    .sort((x, y) => x.miles - y.miles), [stopMiles, mile]);
  const next = ahead.find(x => x.miles > 0) || null;

  // Posición de la unidad y etiquetas de distancia en cada tick
  useEffect(() => {
    const l = layers.current;
    if (!map || !l) return;
    const { latlng, traveled } = pointAtMile(ROUTE_I95, cum, mile);
    l.unit.setLatLng(latlng);
    l.traveled.setLatLngs(traveled);
    if (followRef.current) map.panTo(latlng, { animate: false });
    ahead.forEach(({ stop, miles }) => {
      const marker = l.stops.find(m => m.stopId === stop.id);
      if (marker) marker.setTooltipContent(miles > 0 ? `${stop.name} (${Math.round(miles)} mi)` : `${stop.name} (pasado)`);
    });
  }, [map, mile, cum, ahead]);

  const followUnit = useCallback(() => {
    if (!map || !layers.current) return;
    setFollow(true);
    map.setView(layers.current.unit.getLatLng(), 11);
  }, [map]);

  const showRoute = useCallback(() => {
    if (!map || !layers.current) return;
    setFollow(false);
    map.fitBounds(layers.current.routeBounds, { padding: [16, 16] });
  }, [map]);

  const statusText = map
    ? `Ubicación simulada · I-95 N · ${SIMULATION.speedMph} mph · milla ${mile.toFixed(1)} de ${Math.round(totalMiles)}`
    : 'Ubicación simulada · I-95 N';

  const nextStop = next
    ? { label: `${shortName(next.stop.name)} (${Math.round(next.miles)} mi):`, info: next.stop.info }
    : null;

  return { statusText, nextStop, follow, followUnit, showRoute };
}

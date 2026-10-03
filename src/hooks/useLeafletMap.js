import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useAppState } from '../context/AppStateContext';
import { TILE_ATTRIBUTION, tileUrlForTheme } from '../lib/geo';

/**
 * Crea un mapa Leaflet con el mapa base de líneas (Esri Canvas) dentro de `containerRef`.
 * - Cambia las teselas al cambiar el tema claro/oscuro.
 * - Recalcula el tamaño cuando cambia el contenedor (rotación, redimensionado).
 * Devuelve la instancia del mapa (null hasta que se crea).
 */
export function useLeafletMap(containerRef, { zoomControl = true } = {}) {
  const { state } = useAppState();
  const [map, setMap] = useState(null);
  const tilesRef = useRef(null);
  const themeRef = useRef(state.theme);
  themeRef.current = state.theme;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const instance = L.map(el, { zoomControl, attributionControl: true, scrollWheelZoom: false, zoomSnap: 0.25 });
    instance.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>');
    tilesRef.current = L.tileLayer(tileUrlForTheme(themeRef.current), { maxZoom: 16, attribution: TILE_ATTRIBUTION }).addTo(instance);

    let observer;
    if ('ResizeObserver' in window) {
      observer = new ResizeObserver(() => instance.invalidateSize());
      observer.observe(el);
    }

    setMap(instance);
    return () => {
      observer?.disconnect();
      instance.remove();
      tilesRef.current = null;
      setMap(null);
    };
  }, [containerRef, zoomControl]);

  useEffect(() => {
    tilesRef.current?.setUrl(tileUrlForTheme(state.theme));
  }, [state.theme]);

  return map;
}

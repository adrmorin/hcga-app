import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useLeafletMap } from '../../hooks/useLeafletMap';
import { MapCanvas, MapLegend } from '../../components/ui/MapCanvas';
import { SHIPMENT_ROUTES } from '../../data/geo';
import { drawFleet, drawRoute } from '../../lib/mapLayers';

/** Mapa de líneas genérico: `draw(map)` dibuja las capas y devuelve los límites a encuadrar. */
function LineMap({ tall, label, legend, draw, padding }) {
  const ref = useRef(null);
  const map = useLeafletMap(ref);

  useEffect(() => {
    if (!map) return;
    map.fitBounds(draw(map), { padding });
  }, [map, draw, padding]);

  return (
    <>
      <MapCanvas ref={ref} tall={tall} label={label} />
      <MapLegend items={legend} />
    </>
  );
}

const FLEET_LEGEND = [
  { label: 'En tránsito', color: 'var(--color-info-fg)' },
  { label: 'Descanso HOS', color: 'var(--color-warning-fg)' },
  { label: 'Disponible', color: 'var(--color-success-fg)' },
  { label: 'Hub Miami', color: 'var(--color-danger-solid)' }
];

const SHIPPER_LEGEND = [
  { label: 'SH-8821 en tránsito', color: 'var(--color-danger-solid)' },
  { label: 'SH-8822 reservado', color: 'var(--color-info-fg)' },
  { label: 'Ruta del viaje', line: true }
];

const OPS_LEGEND = [
  { label: 'Hub Miami', color: 'var(--color-danger-solid)' },
  { label: 'En tránsito', color: 'var(--color-info-fg)' },
  { label: 'Descanso HOS', color: 'var(--color-warning-fg)' },
  { label: 'Disponible', color: 'var(--color-success-fg)' },
  { label: 'Rutas de los viajes', line: true }
];

const PAD_40 = [40, 40];
const PAD_24 = [24, 24];

const drawFleetMap = map => drawFleet(map, true);

const drawShipments = map => {
  const bounds = L.latLngBounds([]);
  SHIPMENT_ROUTES.filter(r => r.id.startsWith('SH-')).forEach(r => bounds.extend(drawRoute(map, r, true)));
  return bounds;
};

const drawOps = map => {
  const bounds = L.latLngBounds([]);
  SHIPMENT_ROUTES.forEach(r => bounds.extend(drawRoute(map, r, false)));
  bounds.extend(drawFleet(map, false));
  return bounds;
};

/** Flotilla: posición de cada camión y el hub de Miami */
export const FleetMap = () => (
  <LineMap tall label="Mapa de posiciones de los camiones de la flotilla" legend={FLEET_LEGEND} draw={drawFleetMap} padding={PAD_40} />
);

/** Embarcador: rutas de los envíos activos con su avance */
export const ShipmentsMap = () => (
  <LineMap label="Mapa de rutas de los envíos activos" legend={SHIPPER_LEGEND} draw={drawShipments} padding={PAD_24} />
);

/** Torre de Control: hub, unidades y todas las rutas activas */
export const OpsMap = () => (
  <LineMap tall label="Mapa nacional de operaciones: hub, unidades y rutas activas" legend={OPS_LEGEND} draw={drawOps} padding={PAD_24} />
);

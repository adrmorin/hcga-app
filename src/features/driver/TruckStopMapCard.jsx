import { useEffect, useRef } from 'react';
import { useLeafletMap } from '../../hooks/useLeafletMap';
import { useRouteSimulation } from '../../hooks/useRouteSimulation';
import { Badge } from '../../components/ui/Badge';
import { Card, CardHeader } from '../../components/ui/Card';
import { MapCanvas } from '../../components/ui/MapCanvas';
import { CrosshairIcon, NavigationIcon, TrendingUpIcon } from '../../components/icons/Icons';

const MAP_BTN =
  'grid place-items-center w-[36px] h-[36px] rounded-sm bg-translucent border border-solid border-border-default text-fg-primary shadow-sm cursor-pointer ' +
  'aria-pressed:bg-brand-bright aria-pressed:border-brand-bright aria-pressed:text-[#ffffff] hover:border-accent [&>svg]:w-[18px] [&>svg]:h-[18px]';

/**
 * Mapa GPS de la ruta (I-95 N) con truck stops y la unidad simulada.
 * `onNextStopChange` informa del texto de la próxima parada (lo usa el Copiloto).
 */
export function TruckStopMapCard({ onNextStopChange }) {
  const mapRef = useRef(null);
  const map = useLeafletMap(mapRef, { zoomControl: false });
  const sim = useRouteSimulation(map);

  const nextStopText = sim.nextStop ? `${sim.nextStop.label} ${sim.nextStop.info}` : 'Sin más truck stops en este tramo de la ruta.';
  useEffect(() => { onNextStopChange?.(nextStopText); }, [nextStopText, onNextStopChange]);

  return (
    <Card>
      <CardHeader icon={NavigationIcon} title="Truck Stop GPS & Amenidades" aside={<Badge variant="info">EN RUTA I-95 N</Badge>} />
      <MapCanvas ref={mapRef} tall role="application" label="Mapa GPS de la ruta y truck stops">
        <div className="absolute top-xs right-xs z-[500] flex flex-col gap-[6px]">
          <button type="button" className={MAP_BTN} aria-label="Seguir a la unidad" aria-pressed={sim.follow} title="Seguir unidad" onClick={sim.followUnit}>
            <CrosshairIcon />
          </button>
          <button type="button" className={MAP_BTN} aria-label="Ver ruta completa" title="Ver ruta" onClick={sim.showRoute}>
            <TrendingUpIcon />
          </button>
        </div>
      </MapCanvas>
      <div className="flex items-center gap-[6px] text-xs text-fg-secondary mb-2xs">
        <span className="w-[8px] h-[8px] rounded-circle shrink-0 bg-status-success [box-shadow:0_0_0_0_rgba(16,185,129,0.6)] animate-live-map-pulse" />
        <span>{sim.statusText}</span>
      </div>
      <div className="flex justify-between text-xs text-fg-secondary">
        <span>
          {sim.nextStop
            ? <><strong>{sim.nextStop.label}</strong> {sim.nextStop.info}</>
            : 'Sin más truck stops en este tramo de la ruta.'}
        </span>
      </div>
    </Card>
  );
}

import { forwardRef } from 'react';
import { cx } from '../../lib/cx';

/**
 * Contenedor de mapa (.map-canvas--live). `tall` limita la altura (mapas a lo ancho).
 * El div interno con ref es donde Leaflet dibuja el mapa.
 */
export const MapCanvas = forwardRef(function MapCanvas({ tall = false, label, role = 'img', children }, ref) {
  return (
    <div
      className={cx(
        'w-full min-h-[260px] [background:var(--map-canvas-bg)] border border-solid border-border-default rounded-md relative overflow-hidden mb-xs isolate',
        tall ? 'aspect-auto h-[clamp(300px,45vh,420px)]' : 'aspect-video'
      )}
    >
      <div ref={ref} className="live-map absolute inset-0 bg-transparent font-body" role={role} aria-label={label} />
      {children}
    </div>
  );
});

/** Leyenda de colores bajo el mapa. `line` muestra la muestra de la línea naranja de ruta. */
export function MapLegend({ items }) {
  return (
    <div className="flex flex-wrap gap-x-md gap-y-2xs mt-xs mb-2xs text-xs text-fg-secondary">
      {items.map(item => (
        <span key={item.label} className="inline-flex items-center gap-[6px]">
          {item.line
            ? <span className="w-[18px] [border-block-start:3px_solid_#f97316]" />
            : <span className="w-[10px] h-[10px] rounded-circle" style={{ background: item.color }} />}
          {item.label}
        </span>
      ))}
    </div>
  );
}

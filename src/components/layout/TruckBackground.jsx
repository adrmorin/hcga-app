import { memo } from 'react';
import { cx } from '../../lib/cx';
import { LANES, TRUCKS } from '../../data/truckArt';

/** Fondo animado de camiones en carriles (fijo detrás del contenido). */
export const TruckBackground = memo(function TruckBackground() {
  return (
    <div
      className="truck-bg fixed inset-0 z-0 overflow-hidden pointer-events-none text-[rgba(200,215,240,0.35)] [transition:color_0.3s_ease] light:text-[rgba(30,41,59,0.35)]"
      aria-hidden="true"
    >
      {LANES.map(lane => (
        <div
          key={lane.type}
          className={cx('absolute left-1/2 w-[150vmax] h-[110px]', lane.desktopOnly && 'tablet-max:hidden')}
          style={{ top: `${lane.top}%`, transform: `translate(-50%,-50%) rotate(${lane.angle}deg)` }}
        >
          <span className="absolute left-0 right-0 bottom-[4px] [border-top:2px_dashed_currentColor] opacity-[0.35]" />
          <div
            className={cx(
              'absolute left-0 bottom-[5px] w-[300px] tablet-max:w-[190px] [will-change:translate] motion-reduce:!animate-none',
              lane.dir < 0
                ? 'animate-truck-bg-drive-reverse [scale:calc(-1*var(--truck-scale,1))_var(--truck-scale,1)]'
                : 'animate-truck-bg-drive [scale:var(--truck-scale,1)]'
            )}
            style={{ animationDuration: `${lane.duration}s`, animationDelay: `${lane.delay}s`, '--truck-scale': lane.scale }}
          >
            {/* Dibujo SVG estático del camión (texto fijo de truckArt.js) */}
            <svg
              viewBox="0 0 400 104"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="block w-full h-auto overflow-visible"
              dangerouslySetInnerHTML={{ __html: TRUCKS[lane.type] || TRUCKS.dryVan }}
            />
          </div>
        </div>
      ))}
    </div>
  );
});

import { cx } from '../../lib/cx';

// Color del subtexto/valor según el estado
export const TONE_TEXT = {
  success: 'text-status-success',
  warning: 'text-status-warning',
  info: 'text-status-info',
  error: 'text-status-error'
};

// .metric-box (contenedor), reutilizado también con contenido libre
export const METRIC_BOX_CLASSES = 'bg-elevated border border-solid border-border-subtle rounded-sm p-md flex flex-col gap-2xs';

export function MetricBox({ label, value, valueId, valueTone, subtext, subtextTone, className }) {
  return (
    <div className={cx(METRIC_BOX_CLASSES, className)}>
      <span className="font-mono text-xs font-semibold text-muted uppercase tracking-[0.1em]">{label}</span>
      <span id={valueId} className={cx('type-display text-xl', valueTone ? TONE_TEXT[valueTone] : 'text-fg-primary')}>
        {value}
      </span>
      {subtext && <span className={cx('text-xs font-semibold', subtextTone && TONE_TEXT[subtextTone])}>{subtext}</span>}
    </div>
  );
}

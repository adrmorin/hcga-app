import { cx } from '../../lib/cx';

const BASE = 'inline-flex items-center gap-1 text-caption font-token-bold py-1 px-3 rounded-full whitespace-nowrap';

const VARIANTS = {
  success: 'bg-success-bg text-success-fg border border-solid border-success-fg',
  warning: 'bg-warning-bg text-warning-fg border border-solid border-warning-fg',
  error: 'bg-danger-bg text-danger-fg border border-solid border-danger-fg',
  info: 'bg-info-bg text-info-fg border border-solid border-info-fg'
};

// .badge--dot: punto del color del texto antes de la etiqueta
const DOT = "before:content-[''] before:w-[6px] before:h-[6px] before:rounded-circle before:bg-current";

export function Badge({ variant = 'info', dot = false, className, children }) {
  return <span className={cx(BASE, VARIANTS[variant], dot && DOT, className)}>{children}</span>;
}

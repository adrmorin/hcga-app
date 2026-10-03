import { forwardRef } from 'react';
import { cx } from '../../lib/cx';

// .btn — touch target ≥ 44px; hover sube 1px y al pulsar se reduce a 0.98 (transform exacto)
const BASE =
  'inline-flex items-center justify-center gap-2 font-body font-token-bold rounded-sm ' +
  'transition-[background-color,border-color,transform,box-shadow] duration-fast ease-standard ' +
  'whitespace-nowrap select-none cursor-pointer hover:[transform:translateY(-1px)] active:[transform:scale(0.98)] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-focus focus-visible:outline-offset-2 ' +
  'disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed';

const VARIANTS = {
  primary: 'bg-action text-on-primary shadow-brand hover:bg-action-hover hover:shadow-md active:bg-action-pressed',
  secondary: 'bg-action-secondary text-action-secondary-fg border border-solid border-border-default hover:bg-subtle hover:border-border-strong',
  ghost: 'bg-transparent text-muted hover:bg-subtle hover:text-fg',
  danger: 'bg-danger-solid text-on-primary hover:bg-red-700'
};

const SIZES = {
  sm: 'py-1 px-3 min-h-[36px] text-caption',
  md: 'py-3 px-4 min-h-[var(--touch-target-min)] text-body-md',
  lg: 'py-4 px-6 min-h-[48px] text-body-lg'
};

export const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', block = false, className, type = 'button', ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(BASE, VARIANTS[variant], SIZES[size], block && 'w-full', className)}
      {...props}
    />
  );
});

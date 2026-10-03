import { forwardRef } from 'react';
import { cx } from '../../lib/cx';

// .form-input / .form-select
export const FIELD_CLASSES =
  'w-full bg-elevated border border-solid border-border-default rounded-sm py-sm px-md text-fg-primary text-sm outline-none ' +
  'transition-[border-color,box-shadow] duration-fast ease-standard focus:border-border-focus focus:[box-shadow:0_0_0_3px_var(--color-brand-red-glow)]';

export const Input = forwardRef(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cx(FIELD_CLASSES, className)} {...props} />;
});

export function Select({ className, children, ...props }) {
  return <select className={cx(FIELD_CLASSES, className)} {...props}>{children}</select>;
}

/** Grupo etiqueta + campo */
export function FormGroup({ label, htmlFor, children }) {
  return (
    <div className="flex flex-col gap-2xs mb-md">
      <label htmlFor={htmlFor} className="text-xs font-bold text-fg-secondary">{label}</label>
      {children}
    </div>
  );
}

import { cx } from '../../lib/cx';

// .card — fondo translúcido con desenfoque para dejar ver el fondo de camiones
export const CARD_CLASSES =
  'bg-card backdrop-blur-[6px] border border-solid border-border-subtle rounded-md p-md shadow-sm ' +
  'transition-[border-color,transform,box-shadow] duration-fast ease-standard hover:border-border-default';

export function Card({ as: Tag = 'div', className, children, ...props }) {
  return (
    <Tag className={cx(CARD_CLASSES, className)} {...props}>
      {children}
    </Tag>
  );
}

/** Cabecera de tarjeta: icono + título a la izquierda y una insignia o acción a la derecha. */
export function CardHeader({ icon: Icon, title, aside }) {
  return (
    // flex-wrap: con Saira (más ancha) la insignia baja de línea si no cabe junto al título
    <div className="flex flex-wrap items-center justify-between gap-xs mb-md pb-xs [border-block-end:1px_solid_var(--color-border-subtle)]">
      <h3 className="text-md font-bold flex items-center gap-xs [&>svg]:w-[20px] [&>svg]:h-[20px] [&>svg]:shrink-0 [&>svg]:text-icon">
        {Icon && <Icon />}
        {title}
      </h3>
      {aside}
    </div>
  );
}

import { PLATFORM_ICONS } from '../icons/Icons';

/** Banner superior de cada pantalla: icono, título, descripción y acción opcional. */
export function SummaryBanner({ as: Heading = 'h2', icon, title, description, action }) {
  const Icon = icon ? PLATFORM_ICONS[icon] : null;
  return (
    <section className="bg-[linear-gradient(135deg,rgba(137,0,0,0.25)_0%,var(--color-bg-surface)_100%)] border border-solid border-border-default [border-inline-start:4px_solid_var(--color-brand-red-bright)] rounded-md p-[clamp(12px,3vw,20px)] mb-[clamp(14px,3vw,24px)] flex flex-col gap-xs backdrop-blur-glass md:flex-row md:items-center md:justify-between md:gap-md">
      <div>
        <Heading className="text-lg flex items-center gap-sm">
          {Icon && (
            <span className="grid place-items-center shrink-0 w-[40px] h-[40px] rounded-sm bg-brand-glow text-icon [&>svg]:w-[22px] [&>svg]:h-[22px]" aria-hidden="true">
              <Icon />
            </span>
          )}
          {Icon ? <span>{title}</span> : title}
        </Heading>
        <p className="text-sm text-fg-secondary mt-2xs">{description}</p>
      </div>
      {action && <div>{action}</div>}
    </section>
  );
}

import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { HOME_META, PLATFORM_GROUPS, PLATFORMS } from '../data/platforms';
import { AppHeader } from '../components/layout/AppHeader';
import { MainLayout } from '../components/layout/MainLayout';
import { SummaryBanner } from '../components/layout/SummaryBanner';
import { CARD_CLASSES } from '../components/ui/Card';
import { ChevronRightIcon, PLATFORM_ICONS } from '../components/icons/Icons';

function PlatformCard({ role, title, description }) {
  const platform = PLATFORMS[role];
  const Icon = PLATFORM_ICONS[platform.icon];
  return (
    <Link to={platform.path} className={`${CARD_CLASSES} flex items-center gap-md text-fg-primary`}>
      <span className="grid place-items-center shrink-0 w-[48px] h-[48px] rounded-sm bg-brand-glow text-icon [&>svg]:w-[24px] [&>svg]:h-[24px]">
        <Icon />
      </span>
      <span className="flex flex-col gap-[2px] min-w-0 flex-1">
        <span className="font-bold">{title}</span>
        <span className="text-xs text-fg-secondary">{description}</span>
      </span>
      <ChevronRightIcon className="w-[20px] h-[20px] shrink-0 text-fg-secondary" />
    </Link>
  );
}

/** Página de inicio: elegir la plataforma según el tipo de usuario. */
export default function PlatformSelectorPage() {
  usePageMeta(HOME_META.pageTitle, HOME_META.pageDescription);

  return (
    <>
      <AppHeader badge="SELECCIONA TU PLATAFORMA" homeLink={false} />
      <MainLayout>
        <SummaryBanner as="h1" title="Plataformas HCGA Trading LLC" description="Elige la plataforma que corresponde a tu tipo de usuario." />

        {PLATFORM_GROUPS.map(group => (
          <section key={group.id} className="mt-lg" aria-labelledby={group.id}>
            <header className="mb-sm">
              <h2 className="text-xs font-bold tracking-[0.08em] uppercase text-accent" id={group.id}>{group.title}</h2>
              <p className="text-xs text-fg-secondary">{group.description}</p>
            </header>
            <div className="grid grid-cols-[minmax(0,1fr)] gap-md md:grid-cols-[repeat(2,minmax(0,1fr))]">
              {group.items.map(item => <PlatformCard key={item.role} {...item} />)}
            </div>
          </section>
        ))}
      </MainLayout>
    </>
  );
}

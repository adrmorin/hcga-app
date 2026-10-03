/** Columna central con márgenes laterales del 5% y espacio inferior para el botón del chat. */
export function MainLayout({ children }) {
  return (
    <main className="relative z-[2] w-[var(--page-inline-size)] mx-auto py-[clamp(12px,3vw,24px)] px-0 pb-[calc(var(--space-2xl)_+_80px_+_env(safe-area-inset-bottom,0px))]">
      {children}
    </main>
  );
}

/** Vista de tablero con la animación de entrada (.dashboard-view.active) */
export function DashboardView({ id, children }) {
  return <section id={id} className="block animate-fade-in-view">{children}</section>;
}

// Rejillas de tarjetas (.grid-container y variantes)
export const GRID = 'grid grid-cols-[minmax(0,1fr)] gap-md';
export const GRID_2COL = `${GRID} md:grid-cols-[repeat(2,minmax(0,1fr))]`;
export const GRID_4COL = `${GRID} md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))]`;

import { PlatformPage } from '../components/layout/PlatformPage';
import { FleetMapCard, FleetMetrics, FleetRosterCard } from '../features/fleet/FleetCards';

/** Plataforma Panel de Flotilla (Fleet Manager) */
export default function FleetPage() {
  return (
    <PlatformPage role="fleet">
      <FleetMetrics />
      <FleetMapCard />
      <FleetRosterCard />
    </PlatformPage>
  );
}

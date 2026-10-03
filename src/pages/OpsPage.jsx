import { PlatformPage } from '../components/layout/PlatformPage';
import { GRID_2COL } from '../components/layout/MainLayout';
import { DetentionCard, DotComplianceCard, OpsMapCard } from '../features/ops/OpsCards';

/** Plataforma Torre de Control & Seguridad */
export default function OpsPage() {
  return (
    <PlatformPage role="ops">
      <OpsMapCard />
      <div className={GRID_2COL}>
        <DotComplianceCard />
        <DetentionCard />
      </div>
    </PlatformPage>
  );
}

import { PlatformPage } from '../components/layout/PlatformPage';
import { GRID_2COL } from '../components/layout/MainLayout';
import { ShipmentsCard } from '../features/shipper/ShipmentsCard';
import { CarrierVettingCard } from '../features/shipper/CarrierVettingCard';
import { ApiLogsCard } from '../features/shipper/ApiLogsCard';

/** Plataforma Portal de Embarcador / Broker */
export default function ShipperPage() {
  return (
    <PlatformPage role="shipper">
      <div className={`${GRID_2COL} mb-lg`}>
        <ShipmentsCard />
        <CarrierVettingCard />
      </div>
      <ApiLogsCard />
    </PlatformPage>
  );
}

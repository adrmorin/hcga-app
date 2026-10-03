import { Badge } from '../../components/ui/Badge';
import { Card, CardHeader } from '../../components/ui/Card';
import { Timeline, TimelineItem } from '../../components/ui/Timeline';
import { BoxIcon } from '../../components/icons/Icons';
import { ShipmentsMap } from '../maps/PlatformMaps';

/** Envíos activos: línea de tiempo con temperatura reefer y mapa de rutas. */
export function ShipmentsCard() {
  return (
    <Card>
      <CardHeader icon={BoxIcon} title="Envíos Activos & Temperatura Reefer" aside={<Badge variant="success">LÍNEA DE TIEMPO VIVA</Badge>} />
      <Timeline>
        <TimelineItem state="completed">
          <strong>SH-8821: Tampa, FL → Charlotte, NC (En Tránsito - 65%)</strong>
          <span>Conductor: Alex Vance (TRK-101) · Temp Reefer: <strong className="text-status-success">34°F ✓</strong></span>
        </TimelineItem>
        <TimelineItem state="active">
          <strong>SH-8822: Miami, FL → Dallas, TX (Reservado / Inspección)</strong>
          <span>Conductor: Elena Rostova (TRK-103) · Temp Reefer: -10°F (Congelado)</span>
        </TimelineItem>
      </Timeline>
      <ShipmentsMap />
    </Card>
  );
}

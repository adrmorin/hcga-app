import { FLEET_METRICS, FLEET_ROSTER_ROWS } from '../../data/mockData';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader } from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';
import { MetricBox } from '../../components/ui/MetricBox';
import { GRID_4COL } from '../../components/layout/MainLayout';
import { MapPinIcon, UserGroupIcon } from '../../components/icons/Icons';
import { FleetMap } from '../maps/PlatformMaps';

/** Métricas de la flotilla */
export function FleetMetrics() {
  return (
    <div className={`${GRID_4COL} mb-lg`}>
      {FLEET_METRICS.map(m => (
        <MetricBox key={m.label} label={m.label} value={m.value} subtext={m.subtext} subtextTone={m.tone} />
      ))}
    </div>
  );
}

/** Mapa de posiciones de las unidades */
export function FleetMapCard() {
  return (
    <Card className="mb-lg">
      <CardHeader icon={MapPinIcon} title="Mapa de Flotilla (Posición de Unidades)" aside={<Badge variant="info">3 UNIDADES · FLORIDA</Badge>} />
      <FleetMap />
    </Card>
  );
}

const COLUMNS = ['ID Camión', 'Conductor Asignado', 'Estado Operativo', 'Horas HOS Disponibles', 'Ubicación Actual', 'VIN', 'Acción'];

/** Roster de camiones y conductores con acciones de despacho */
export function FleetRosterCard() {
  return (
    <Card>
      <CardHeader
        icon={UserGroupIcon}
        title="Roster de Camiones y Conductores Asignados"
        aside={<Button variant="secondary" size="sm" onClick={() => alert('Modal para agregar camión abre aquí')}>+ Agregar Camión</Button>}
      />
      <DataTable
        columns={COLUMNS}
        rows={FLEET_ROSTER_ROWS}
        renderRow={row => [
          <strong>{row.id}</strong>,
          row.driver,
          <Badge variant={row.status.variant}>{row.status.label}</Badge>,
          row.hos,
          row.location,
          <span className="font-mono text-[12px]">{row.vin}</span>,
          <Button variant={row.action.variant} size="sm" onClick={() => alert(row.action.alert)}>{row.action.label}</Button>
        ]}
      />
    </Card>
  );
}

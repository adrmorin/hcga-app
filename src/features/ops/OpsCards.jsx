import { DOT_COMPLIANCE } from '../../data/mockData';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader } from '../../components/ui/Card';
import { MetricBox } from '../../components/ui/MetricBox';
import { AlertCircleIcon, FileIcon, GlobeIcon } from '../../components/icons/Icons';
import { OpsMap } from '../maps/PlatformMaps';

/** Command Center: mapa nacional de operaciones */
export function OpsMapCard() {
  return (
    <Card className="mb-lg">
      <CardHeader icon={GlobeIcon} title="Command Center: Mapa de Operaciones Nacionales" aside={<Badge variant="success">RED NACIONAL ACTIVA</Badge>} />
      <OpsMap />
    </Card>
  );
}

/** Matriz de cumplimiento DOT */
export function DotComplianceCard() {
  return (
    <Card>
      <CardHeader icon={FileIcon} title="Matriz de Cumplimiento Digital DOT" aside={<Badge variant="success">AUDITORÍA AL DÍA</Badge>} />
      <ul className="list-none flex flex-col gap-3 text-sm">
        {DOT_COMPLIANCE.map((item, i) => (
          <li
            key={item.label}
            className={i < DOT_COMPLIANCE.length - 1 ? 'flex justify-between [border-bottom:1px_solid_var(--color-border-subtle)] pb-2' : 'flex justify-between'}
          >
            <span>{item.label}</span>
            <Badge variant="success">{item.badge}</Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/** Gestión de detention e incidentes */
export function DetentionCard() {
  return (
    <Card>
      <CardHeader icon={AlertCircleIcon} title="Gestión de Detention & Incidentes" aside={<Badge variant="warning">PROTECCIÓN AL CHOFER</Badge>} />
      <p className="text-xs mb-sm">Reclamaciones de tiempo de espera excesivo en muelle (2h libres, luego $50/hora):</p>
      <MetricBox
        className="mb-3"
        label="Detention Acumulado (Mes)"
        value="$1,450.00"
        valueTone="warning"
        subtext="29 horas reembolsadas automáticamente"
      />
      <Button variant="secondary" size="sm" block onClick={() => alert('Solicitud de reclamación de detention enviada a procesamiento.')}>
        Registrar Nueva Reclamación Detention
      </Button>
    </Card>
  );
}

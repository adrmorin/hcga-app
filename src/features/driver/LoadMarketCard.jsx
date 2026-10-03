import { LOAD_MARKET } from '../../data/mockData';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader } from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';
import { ClipboardIcon } from '../../components/icons/Icons';

const COLUMNS = ['Ruta (Origen → Destino)', 'Equipo / Peso', 'Millas', 'Tarifa Total', '$/Milla', 'Broker / MC', 'Acción'];

/** Mercado de cargas con tarifa fijada. */
export function LoadMarketCard() {
  return (
    <Card className="mb-lg">
      <CardHeader icon={ClipboardIcon} title="Mercado de Cargas Transparentes" aside={<Badge variant="success">PAGOS GARANTIZADOS</Badge>} />
      <DataTable
        columns={COLUMNS}
        rows={LOAD_MARKET}
        renderRow={row => [
          <strong>{row.route}</strong>,
          row.equipment,
          row.miles,
          <strong className="text-status-success">{row.rate}</strong>,
          row.perMile,
          <>{row.broker} <Badge variant={row.brokerBadge.variant}>{row.brokerBadge.label}</Badge></>,
          <Button variant={row.action.variant} size="sm" onClick={() => alert(row.action.alert)}>{row.action.label}</Button>
        ]}
      />
    </Card>
  );
}

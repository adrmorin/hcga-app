import { useState } from 'react';
import { useMcLookup } from '../../hooks/useMcLookup';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Form';
import { ShieldIcon } from '../../components/icons/Icons';

const STATUS_VARIANT = { APTO: 'success', REVISAR: 'warning', 'NO APTO': 'error' };

function McResult({ query, data }) {
  if (!data) {
    return (
      <Card className="mt-[12px] [border-inline-start:4px_solid_var(--color-status-error)]">
        <p><strong>MC #{query} no encontrado</strong> en la caché local FMCSA. Verifique el número de registro.</p>
      </Card>
    );
  }
  return (
    <Card className="mt-[12px]">
      <div className="flex justify-between items-center">
        <h4>{data.name} (MC #{query})</h4>
        <Badge variant={STATUS_VARIANT[data.status] || 'success'}>{data.status}</Badge>
      </div>
      <div className="grid grid-cols-[1fr_1fr] gap-[8px] mt-[10px] text-[13px]">
        <div><strong>Autoridad FMCSA:</strong> {data.authority}</div>
        <div><strong>USDOT #:</strong> {data.dot}</div>
        <div><strong>Calificación de Seguridad:</strong> {data.safetyRating}</div>
        <div><strong>Póliza Seguro Carga:</strong> {data.insurance}</div>
      </div>
    </Card>
  );
}

/** Carrier Vetting: auditoría FMCSA de un número MC. */
export function CarrierVettingCard() {
  const [mc, setMc] = useState('');
  const { result, lookup } = useMcLookup();

  return (
    <Card>
      <CardHeader icon={ShieldIcon} title="Carrier Vetting (Auditoría FMCSA en Tiempo Real)" aside={<Badge variant="info">API FMCSA SAFER</Badge>} />
      <p className="text-xs mb-sm">Consulte el estado legal, póliza de seguro y calificación de seguridad de cualquier número MC de prueba (ej: 451207, 118845, 204477):</p>
      <div className="flex gap-xs">
        <Input type="text" id="input-mc-number" placeholder="Ingrese número MC (ej: 451207)" aria-label="Número MC" value={mc} onChange={e => setMc(e.target.value)} />
        <Button id="btn-mc-search" onClick={() => lookup(mc)}>Verificar MC</Button>
      </div>
      {result && (
        <div id="mc-lookup-result" className="block">
          <McResult query={result.query} data={result.data} />
        </div>
      )}
    </Card>
  );
}

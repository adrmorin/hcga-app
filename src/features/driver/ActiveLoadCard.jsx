import { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { useToast } from '../../context/ToastContext';
import { DVIR_CHECKS } from '../../data/mockData';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader } from '../../components/ui/Card';
import { METRIC_BOX_CLASSES } from '../../components/ui/MetricBox';
import { TruckIcon } from '../../components/icons/Icons';

// Saira (titulares) no tiene el carácter →: la flecha se dibuja con Inter
const RouteArrow = () => <span className="font-body not-italic">→</span>;

function AvailableLoad({ load, onAccept }) {
  return (
    <div className={METRIC_BOX_CLASSES}>
      <div className="flex justify-between items-center">
        <div>
          <Badge variant="warning">DISPONIBLE</Badge>
          <h3 className="mt-[6px]">{load.origin} <RouteArrow /> {load.destination}</h3>
          <p>{load.miles} millas · {load.equipment} · {load.weight}</p>
          <p><strong>Broker:</strong> {load.broker} (Verificado ✓)</p>
        </div>
        <div className="text-right">
          <div className="type-display text-[1.8rem] text-status-success">{`$${load.rate.toLocaleString()}`}</div>
          <small className="text-muted">Tarifa Bloqueada</small>
          <div className="mt-[8px]">
            <Button id="btn-accept-load" onClick={onAccept}>Aceptar Carga</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DvirChecklist({ onSubmit }) {
  const [checked, setChecked] = useState(() => DVIR_CHECKS.map(() => false));
  const toggle = i => setChecked(list => list.map((v, j) => (j === i ? !v : v)));

  return (
    <Card className="[border-inline-start:4px_solid_var(--color-status-warning)]">
      <h3>Inspección Pre-Viaje (DVIR Checklist)</h3>
      <p>Confirme el estado de los 6 puntos clave de seguridad antes de encender el motor:</p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[10px] my-[14px]">
        {DVIR_CHECKS.map((label, i) => (
          <label key={label}>
            <input type="checkbox" checked={checked[i]} onChange={() => toggle(i)} /> {label}
          </label>
        ))}
      </div>
      <Button id="btn-submit-dvir" onClick={() => onSubmit(checked.every(Boolean))}>Confirmar DVIR & Iniciar Tránsito</Button>
    </Card>
  );
}

function InTransitLoad({ load, onArrive }) {
  return (
    <Card className="[border-inline-start:4px_solid_var(--color-brand-red-bright)]">
      <div className="flex justify-between items-center">
        <div>
          <Badge variant="info" dot>EN TRÁNSITO</Badge>
          <h3 className="mt-[4px]">{load.origin} <RouteArrow /> {load.destination}</h3>
          <p>ETA Estimado: 4 hrs 15 min · Velocidad GPS: 65 mph</p>
        </div>
        <div>
          <Button id="btn-arrive-destination" variant="secondary" onClick={onArrive}>Registrar Llegada / Subir BOL</Button>
        </div>
      </div>
    </Card>
  );
}

function DeliveredLoad({ load }) {
  return (
    <Card className="[border-inline-start:4px_solid_var(--color-status-success)]">
      <Badge variant="success">ENTREGADO</Badge>
      <h3 className="mt-[4px]">Carga {load.id} Completada con Éxito</h3>
      <p>BOL firmado adjunto. Pago en proceso según política de 2 días tras la entrega.</p>
    </Card>
  );
}

/** Estado de la carga activa: disponible → inspección DVIR → en tránsito → entregada (firma BOL). */
export function ActiveLoadCard({ onArrive }) {
  const { state, actions } = useAppState();
  const showToast = useToast();
  const load = state.activeLoad;

  const accept = () => {
    if (load.status !== 'AVAILABLE') return;
    actions.acceptLoad();
    showToast('Carga aceptada. Proceda con la inspección pre-viaje DVIR.', 'success');
  };

  const submitDvir = allChecked => {
    if (!allChecked) {
      showToast('Debe marcar los 6 puntos de inspección DVIR para continuar.', 'error');
      return;
    }
    actions.completeDvir();
    showToast('DVIR registrado correctamente. Tránsito iniciado.', 'success');
  };

  return (
    <Card>
      <CardHeader icon={TruckIcon} title="Estado de Carga & Flujo de Viaje" aside={<Badge variant="info">TARIFAS BLOQUEADAS</Badge>} />
      <div id="active-load-status-box">
        {load.status === 'AVAILABLE' && <AvailableLoad load={load} onAccept={accept} />}
        {load.status === 'INSPECTION' && <DvirChecklist onSubmit={submitDvir} />}
        {load.status === 'IN_TRANSIT' && <InTransitLoad load={load} onArrive={onArrive} />}
        {load.status === 'DELIVERED' && <DeliveredLoad load={load} />}
      </div>
    </Card>
  );
}

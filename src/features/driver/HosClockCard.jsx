import { useHosClock } from '../../hooks/useHosClock';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader } from '../../components/ui/Card';
import { MetricBox } from '../../components/ui/MetricBox';
import { ClockIcon } from '../../components/icons/Icons';

/** Reloj de cumplimiento HOS/ELD con el simulador de horas y descanso. */
export function HosClockCard() {
  const hos = useHosClock();

  return (
    <Card>
      <CardHeader
        icon={ClockIcon}
        title="Reloj HOS (Horas de Servicio FMCSA)"
        aside={<Badge variant={hos.status.variant}>{hos.status.label}</Badge>}
      />
      <div className="grid grid-cols-[repeat(3,1fr)] gap-xs text-center my-sm">
        <MetricBox label="Manejo Restante" value={`${hos.driveLeft} hrs`} subtext="Límite 11.0h" subtextTone="success" />
        <MetricBox label="Ventana Turno" value={`${hos.dutyLeft} hrs`} subtext="Límite 14.0h" subtextTone="warning" />
        <MetricBox label="Próximo Descanso" value={`${hos.restNeededIn} hrs`} subtext="Regla 8.0h" subtextTone="info" />
      </div>
      <div className="flex flex-wrap gap-xs mt-sm">
        <Button id="btn-eld-add-hours" variant="secondary" size="sm" onClick={hos.addDrivingHours}>+2h Manejo (Simulador ELD)</Button>
        <Button id="btn-eld-rest" variant="secondary" size="sm" onClick={hos.registerRest}>Registrar Descanso 30m</Button>
      </div>
    </Card>
  );
}

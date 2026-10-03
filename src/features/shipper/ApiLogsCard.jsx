import { useAppState } from '../../context/AppStateContext';
import { Badge } from '../../components/ui/Badge';
import { Card, CardHeader } from '../../components/ui/Card';
import { TerminalIcon } from '../../components/icons/Icons';

/** Registro de integraciones API (últimos 5 eventos). */
export function ApiLogsCard() {
  const { state } = useAppState();
  return (
    <Card>
      <CardHeader icon={TerminalIcon} title="Registro de Integraciones API en Tiempo Real" aside={<Badge variant="info">LOGS AUDITABLES</Badge>} />
      <div id="api-logs-container">
        {state.apiLogs.slice(0, 5).map((log, i) => (
          <div key={`${i}-${log}`} className="font-mono text-[11px] py-[4px] px-0 [border-bottom:1px_solid_var(--color-border-subtle)] text-muted">
            {log}
          </div>
        ))}
      </div>
    </Card>
  );
}

import { useAppState } from '../context/AppStateContext';
import { useToast } from '../context/ToastContext';

/** Reloj HOS/ELD: horas restantes, estado de cumplimiento y acciones del simulador. */
export function useHosClock() {
  const { state, actions } = useAppState();
  const showToast = useToast();
  const { hosClock } = state;

  const driveLeft = (hosClock.maxDriving - hosClock.drivingHours).toFixed(1);
  const dutyLeft = (hosClock.maxDuty - hosClock.dutyHours).toFixed(1);
  const restNeededIn = (hosClock.maxRestThreshold - hosClock.sinceRestHours).toFixed(1);

  let status = { variant: 'success', label: 'CONFORME (FMCSA ELD)' };
  if (restNeededIn <= 0) {
    status = { variant: 'error', label: 'DESCANSO 30M REQUERIDO' };
  } else if (driveLeft <= 0 || dutyLeft <= 0) {
    status = { variant: 'error', label: 'LÍMITE DE HORAS ALCANZADO (DESCANSO 10H)' };
  }

  const addDrivingHours = () => {
    actions.addDrivingHours();
    showToast('Telemetría ELD: Se registraron +2.0 horas de manejo', 'info');
  };

  const registerRest = () => {
    actions.registerRest();
    showToast('Registro ELD: Descanso obligatorio de 30 min completado', 'success');
  };

  return { driveLeft, dutyLeft, restNeededIn, status, addDrivingHours, registerRest };
}

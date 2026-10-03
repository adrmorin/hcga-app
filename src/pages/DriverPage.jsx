import { useCallback, useRef, useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { useToast } from '../context/ToastContext';
import { PlatformPage } from '../components/layout/PlatformPage';
import { GRID, GRID_2COL } from '../components/layout/MainLayout';
import { ActiveLoadCard } from '../features/driver/ActiveLoadCard';
import { HosClockCard } from '../features/driver/HosClockCard';
import { LoadMarketCard } from '../features/driver/LoadMarketCard';
import { TruckStopMapCard } from '../features/driver/TruckStopMapCard';
import { SignatureModal } from '../features/driver/SignatureModal';

/** Plataforma Chofer (Owner Operator) */
export default function DriverPage() {
  const { actions } = useAppState();
  const showToast = useToast();
  const [signatureOpen, setSignatureOpen] = useState(false);

  // Texto de la próxima parada para el Copiloto ("Próximo truck stop")
  const nextStopRef = useRef('');
  const onNextStopChange = useCallback(text => { nextStopRef.current = text; }, []);
  const chatExtras = useCallback(() => ({ nextStopText: nextStopRef.current }), []);

  const confirmSignature = () => {
    actions.signBol();
    setSignatureOpen(false);
    showToast('Firma digital grabada en BOL. Envío completado.', 'success');
  };

  return (
    <PlatformPage role="driver" chatExtras={chatExtras}>
      {/* Fila de Estado Activo y HOS ELD */}
      <div className={`${GRID_2COL} mb-lg`}>
        <ActiveLoadCard onArrive={() => setSignatureOpen(true)} />
        <HosClockCard />
      </div>

      <LoadMarketCard />

      {/* Navegador Truck Stop GPS */}
      <div className={GRID}>
        <TruckStopMapCard onNextStopChange={onNextStopChange} />
      </div>

      <SignatureModal open={signatureOpen} onClose={() => setSignatureOpen(false)} onConfirm={confirmSignature} />
    </PlatformPage>
  );
}

import { useRef } from 'react';
import { useSignaturePad } from '../../hooks/useSignaturePad';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';

/** Firma digital del BOL al registrar la llegada. */
export function SignatureModal({ open, onClose, onConfirm }) {
  const canvasRef = useRef(null);
  const { clear } = useSignaturePad(canvasRef, open);

  return (
    <Modal id="modal-signature" titleId="modal-sig-title" title="Firma Digital de Conocimiento de Embarque (BOL)" open={open} onClose={onClose}>
      <p className="text-xs mb-md">Dibuje su firma en el recuadro para validar la recepción conforme de la carga:</p>

      <div className="bg-[#ffffff] rounded-sm overflow-hidden touch-none border border-solid border-border-strong">
        <canvas ref={canvasRef} width="480" height="160" className="block w-full h-[160px] touch-none cursor-crosshair" />
      </div>

      <div className="flex justify-between gap-xs mt-md">
        <Button variant="secondary" onClick={clear}>Limpiar Lienzo</Button>
        <Button onClick={onConfirm}>Confirmar & Firmar BOL</Button>
      </div>
    </Modal>
  );
}

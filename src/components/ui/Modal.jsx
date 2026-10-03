import { cx } from '../../lib/cx';
import { Button } from './Button';

/**
 * Modal: permanece montado y solo se muestra/oculta (como el original), así los campos
 * del formulario conservan lo escrito entre aperturas.
 */
export function Modal({ id, open, onClose, title, titleId, children }) {
  return (
    <div
      id={id}
      className={cx(
        'fixed inset-0 z-modal bg-[rgba(0,0,0,0.75)] backdrop-blur-[8px] p-md items-center justify-center',
        open ? 'flex' : 'hidden'
      )}
      role="dialog"
      aria-labelledby={titleId}
      aria-modal="true"
    >
      <div className="bg-surface [border:1.5px_solid_var(--color-border-strong)] rounded-lg w-full max-w-[540px] max-h-[90vh] overflow-y-auto p-lg shadow-lg animate-modal-slide-up">
        <div className="flex justify-between items-center mb-sm">
          <h3 id={titleId}>{title}</h3>
          <Button variant="ghost" size="sm" aria-label="Cerrar modal" onClick={onClose}>&times;</Button>
        </div>
        {children}
      </div>
    </div>
  );
}

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ErrorIcon, InfoIcon, SuccessIcon } from '../components/icons/Icons';

const ToastContext = createContext(null);

const TOAST_ICONS = {
  info: <InfoIcon width="18" height="18" />,
  success: <SuccessIcon width="18" height="18" stroke="#10b981" />,
  error: <ErrorIcon width="18" height="18" stroke="#ef4444" />
};

let nextId = 1;

/** Notificaciones tipo toast: se ocultan a los 4 s y se eliminan 300 ms después (igual que el original). */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = nextId++;
    setToasts(list => [...list, { id, message, type, leaving: false }]);
    setTimeout(() => {
      setToasts(list => list.map(t => (t.id === id ? { ...t, leaving: true } : t)));
      setTimeout(() => setToasts(list => list.filter(t => t.id !== id)), 300);
    }, 4000);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed bottom-lg left-1/2 [transform:translateX(-50%)] z-toast flex flex-col gap-xs pointer-events-none"
        aria-live="polite"
      >
        {toasts.map(t => (
          <div
            key={t.id}
            className="pointer-events-auto bg-elevated border border-solid border-border-strong text-fg-primary py-sm px-lg rounded-full text-sm font-semibold shadow-md flex items-center gap-xs animate-toast-in"
            style={t.leaving ? { opacity: 0, transform: 'translate(-50%, 10px)' } : undefined}
          >
            {TOAST_ICONS[t.type] || TOAST_ICONS.info} <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast debe usarse dentro de <ToastProvider>');
  return ctx.showToast;
}

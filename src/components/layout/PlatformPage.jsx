import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { useToast } from '../../context/ToastContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import { PLATFORMS } from '../../data/platforms';
import { AppHeader } from './AppHeader';
import { DashboardView, MainLayout } from './MainLayout';
import { SummaryBanner } from './SummaryBanner';
import { Button } from '../ui/Button';
import { Chatbot } from '../chatbot/Chatbot';
import { PostLoadModal } from '../../features/loads/PostLoadModal';

/**
 * Estructura común de cada plataforma: cabecera, banner, tablero, modal de
 * "Publicar carga" (si aplica) y Copiloto IA identificado con la plataforma.
 * `chatExtras` se mezcla con el contexto que recibe el Copiloto al responder.
 */
export function PlatformPage({ role, chatExtras, children }) {
  const platform = PLATFORMS[role];
  const { state, actions } = useAppState();
  const showToast = useToast();
  const [postLoadOpen, setPostLoadOpen] = useState(false);

  usePageMeta(platform.pageTitle, platform.pageDescription);

  // Cada plataforma registra el rol activo, como hacía cada página HTML
  useEffect(() => { actions.setRole(role); }, [actions, role]);

  // El Copiloto lee siempre el estado más reciente al responder
  const stateRef = useRef(state);
  stateRef.current = state;
  const extrasRef = useRef(chatExtras);
  extrasRef.current = chatExtras;
  const getChatContext = useCallback(() => ({ state: stateRef.current, ...extrasRef.current?.() }), []);

  const submitLoad = () => {
    setPostLoadOpen(false);
    showToast('Nueva carga publicada en el Tablero con Tarifa Fijada', 'success');
  };

  return (
    <>
      <AppHeader badge={platform.badge} userRole={platform.userRole} />
      <MainLayout>
        <SummaryBanner
          icon={platform.icon}
          title={platform.title}
          description={platform.description}
          action={platform.canPostLoad && (
            <Button id="btn-open-post-load" onClick={() => setPostLoadOpen(true)}>+ Publicar Carga Nueva</Button>
          )}
        />
        <DashboardView id={`view-${role}`}>{children}</DashboardView>
      </MainLayout>

      {platform.canPostLoad && (
        <PostLoadModal open={postLoadOpen} onClose={() => setPostLoadOpen(false)} onSubmit={submitLoad} />
      )}

      <Chatbot role={role} getContext={getChatContext} />
    </>
  );
}

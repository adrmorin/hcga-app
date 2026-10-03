import { useEffect } from 'react';
import { useAppState } from '../context/AppStateContext';

/** Aplica el tema guardado (dark/light) en <html data-theme> y devuelve el tema y el conmutador. */
export function useTheme() {
  const { state, actions } = useAppState();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  return { theme: state.theme, toggleTheme: actions.toggleTheme };
}

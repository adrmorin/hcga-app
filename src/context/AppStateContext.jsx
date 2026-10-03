import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { INITIAL_STATE, STORAGE_KEY } from '../data/mockData';

const AppStateContext = createContext(null);

// Igual que el original: el estado guardado se mezcla (superficialmente) sobre el inicial
function loadState() {
  const base = structuredClone(INITIAL_STATE);
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return Object.assign(base, JSON.parse(saved));
  } catch (e) {
    console.warn('No se pudo leer localStorage', e);
  }
  return base;
}

/**
 * Estado global de la app (tema, carga activa, reloj HOS, logs de API…),
 * persistido en localStorage con la misma clave que la versión original.
 */
export function AppStateProvider({ children }) {
  const [state, setState] = useState(loadState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Error al guardar estado', e);
    }
  }, [state]);

  const update = useCallback(fn => setState(prev => fn(structuredClone(prev))), []);

  const actions = useMemo(() => ({
    toggleTheme: () => update(s => { s.theme = s.theme === 'dark' ? 'light' : 'dark'; return s; }),
    setRole: role => update(s => { s.currentRole = role; return s; }),

    // Simulador ELD
    addDrivingHours: () => update(s => {
      s.hosClock.drivingHours += 2;
      s.hosClock.dutyHours += 2;
      s.hosClock.sinceRestHours += 2;
      return s;
    }),
    registerRest: () => update(s => { s.hosClock.sinceRestHours = 0; return s; }),

    // Flujo de la carga activa: AVAILABLE → INSPECTION → IN_TRANSIT → DELIVERED
    acceptLoad: () => update(s => { if (s.activeLoad.status === 'AVAILABLE') s.activeLoad.status = 'INSPECTION'; return s; }),
    completeDvir: () => update(s => { s.activeLoad.status = 'IN_TRANSIT'; s.activeLoad.dvirCompleted = true; return s; }),
    signBol: () => update(s => { s.activeLoad.signedBol = true; s.activeLoad.status = 'DELIVERED'; return s; }),

    addApiLog: entry => update(s => { s.apiLogs.unshift(entry); return s; })
  }), [update]);

  const value = useMemo(() => ({ state, actions }), [state, actions]);
  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState debe usarse dentro de <AppStateProvider>');
  return ctx;
}

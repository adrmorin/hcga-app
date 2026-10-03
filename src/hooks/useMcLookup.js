import { useState } from 'react';
import { MOCK_MC_DATABASE } from '../data/mockData';
import { useAppState } from '../context/AppStateContext';

/** Verificación FMCSA de un número MC (base de datos simulada) y registro en los logs de API. */
export function useMcLookup() {
  const { actions } = useAppState();
  // null = aún no se ha consultado (el resultado no se muestra)
  const [result, setResult] = useState(null);

  const lookup = mcNumber => {
    const query = mcNumber.toString().trim();
    const data = MOCK_MC_DATABASE[query];
    setResult({ query, data: data || null });
    if (data) actions.addApiLog(`GET /v1/fmcsa/authority?mc=${query} → 200 OK (0.28s)`);
  };

  return { result, lookup };
}

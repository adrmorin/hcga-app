// --- Datos geográficos de los mapas (todos simulados: la app opera en EE. UU.) ---

// Naranja: línea de la ruta de los viajes en todos los mapas
export const TRIP_ROUTE_COLOR = '#f97316';

// Ruta del chofer sobre la I-95 N con posición simulada
export const ROUTE_I95 = [
  [34.985, -78.925], [35.080, -78.830], [35.180, -78.735], [35.305, -78.610],
  [35.420, -78.440], [35.510, -78.345], [35.640, -78.120], [35.735, -77.965],
  [35.860, -77.860], [35.955, -77.800]
];

export const MAP_TRUCK_STOPS = [
  { id: 'pilot', letter: 'P', name: 'Pilot Travel Center #412', latlng: [35.305, -78.610], info: 'Diésel $3.58/gal · 6 parqueos libres · Duchas ✓' },
  { id: 'loves', letter: 'L', name: "Love's Truck Stop #804", latlng: [35.735, -77.965], info: 'Diésel $3.62/gal · 14 parqueos libres · Duchas ✓' }
];

export const SIMULATION = {
  speedMph: 62,          // Velocidad mostrada al usuario
  milesPerTick: 0.08,    // Avance por tick (acelerado para la demo)
  tickMs: 250,
  startMile: 8           // La unidad arranca unas millas después del inicio de la ruta
};

// Ciudades usadas por los mapas de Flotilla, Embarcador y Torre de Control
export const GEO = {
  miami: [25.7617, -80.1918],
  orlando: [28.5384, -81.3789],
  ocala: [29.1872, -82.1401],
  jacksonville: [30.3322, -81.6557],
  tampa: [27.9506, -82.4572],
  savannah: [32.0809, -81.0912],
  columbia: [34.0007, -81.0348],
  charlotte: [35.2271, -80.8431],
  tallahassee: [30.4383, -84.2807],
  mobile: [30.6954, -88.0399],
  newOrleans: [29.9511, -90.0715],
  houston: [29.7604, -95.3698],
  dallas: [32.7767, -96.797],
  valdosta: [30.8327, -83.2785],
  macon: [32.8407, -83.6324],
  atlanta: [33.749, -84.388]
};

export const UNIT_STATUS = {
  transit: { color: '#3b82f6', label: 'En tránsito' },
  rest: { color: '#f59e0b', label: 'Descanso HOS' },
  available: { color: '#10b981', label: 'Disponible' }
};

// Posición de cada camión (coincide con el roster de Flotilla)
export const FLEET_UNITS = [
  { id: 'TRK-101', driver: 'Alex Vance', status: 'transit', place: 'Ocala, FL (I-95 N)', latlng: GEO.ocala },
  { id: 'TRK-102', driver: 'Carlos Mendoza', status: 'rest', place: 'Jacksonville, FL', latlng: GEO.jacksonville },
  { id: 'TRK-103', driver: 'Elena Rostova', status: 'available', place: 'Orlando, FL', latlng: GEO.orlando }
];

export const HUB = { latlng: GEO.miami, color: '#dc2626', label: 'Hub Principal · Miami, FL' };

// Rutas de los envíos: `progress` es la fracción recorrida (0 a 1).
// La línea siempre es naranja; `color` es el del punto de la unidad.
export const SHIPMENT_ROUTES = [
  { id: 'SH-8821', label: 'Tampa, FL → Charlotte, NC', progress: 0.65, color: '#dc2626',
    points: [GEO.tampa, GEO.ocala, GEO.jacksonville, GEO.savannah, GEO.columbia, GEO.charlotte] },
  { id: 'SH-8822', label: 'Miami, FL → Dallas, TX', progress: 0, color: '#a78bfa',
    points: [GEO.miami, GEO.orlando, GEO.tallahassee, GEO.mobile, GEO.newOrleans, GEO.houston, GEO.dallas] },
  { id: 'HC-9402', label: 'Miami, FL → Atlanta, GA', progress: 0, color: '#94a3b8',
    points: [GEO.miami, GEO.orlando, GEO.ocala, GEO.valdosta, GEO.macon, GEO.atlanta] }
];

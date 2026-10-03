// --- Base de Datos MOCK (Cargas, Flotilla, MCs, Truck Stops) ---
export const MOCK_MC_DATABASE = {
  '451207': { name: 'VALLEY LOGISTICS LLC', status: 'APTO', authority: 'ACTIVA', safetyRating: 'SATISFACTORIO', insurance: '$1,000,000 OK', dot: '2849102' },
  '118845': { name: 'EXPRESS CARRIERS CORP', status: 'REVISAR', authority: 'CONDICIONAL', safetyRating: 'SIN CLASIFICAR', insurance: '$750,000 (Pendiente)', dot: '1940293' },
  '204477': { name: 'SUNSTATE TRANSPORT INC', status: 'NO APTO', authority: 'INACTIVA/REVOCADA', safetyRating: 'INSATISFACTORIO', insurance: 'EXPIRADO', dot: '0834102' }
};

export const STORAGE_KEY = 'hcga_app_unified_state';

export const INITIAL_STATE = {
  currentRole: 'driver', // 'driver', 'fleet', 'shipper', 'ops'
  theme: 'dark',
  activeLoad: {
    id: 'HC-9402',
    origin: 'Miami, FL',
    destination: 'Atlanta, GA',
    miles: 662,
    rate: 2450,
    equipment: 'Reefer (53ft)',
    weight: '41,500 lbs',
    broker: 'C.H. Robinson (MC #451207)',
    status: 'AVAILABLE', // AVAILABLE, INSPECTION, IN_TRANSIT, DELIVERED
    dvirCompleted: false,
    detentionHours: 0,
    detentionClaimed: false,
    signedBol: false
  },
  hosClock: {
    drivingHours: 5.5,
    maxDriving: 11,
    dutyHours: 7.0,
    maxDuty: 14,
    sinceRestHours: 4.2,
    maxRestThreshold: 8.0,
    status: 'ON_DUTY_DRIVING'
  },
  fleetRoster: [
    { id: 'TRK-101', driver: 'Alex Vance', status: 'En Tránsito (Miami → Atlanta)', hosLeft: '5.5 hrs', vin: '1XKD49X028104', location: 'Ocala, FL' },
    { id: 'TRK-102', driver: 'Carlos Mendoza', status: 'Descanso de 10h', hosLeft: '11.0 hrs', vin: '1XKD49X099182', location: 'Jacksonville, FL' },
    { id: 'TRK-103', driver: 'Elena Rostova', status: 'Carga Disponible', hosLeft: '9.2 hrs', vin: '1XKD49X074129', location: 'Orlando, FL' }
  ],
  shipments: [
    { id: 'SH-8821', origin: 'Tampa, FL', destination: 'Charlotte, NC', status: 'En Tránsito', pct: 65, temp: '34°F', driver: 'Alex Vance (#101)' },
    { id: 'SH-8822', origin: 'Miami, FL', destination: 'Dallas, TX', status: 'Reservado', pct: 0, temp: '-10°F', driver: 'Elena Rostova (#103)' },
    { id: 'SH-8820', origin: 'Orlando, FL', destination: 'Savannah, GA', status: 'Entregado', pct: 100, temp: '36°F', driver: 'Carlos Mendoza (#102)' }
  ],
  apiLogs: [
    'GET /v1/fmcsa/authority?mc=451207 → 200 OK (0.34s)',
    'POST /v1/loads/lock → 201 Created (Tarifa USD 2,450 fijada)',
    'GET /v1/hos/telematics/vin/1XKD49X028104 → 200 OK (0.12s)'
  ]
};

// Mercado de cargas (tabla del chofer)
export const LOAD_MARKET = [
  { route: 'Miami, FL → Atlanta, GA', equipment: 'Reefer 53ft · 41.5k lbs', miles: '662 mi', rate: '$2,450', perMile: '$3.70/mi', broker: 'C.H. Robinson (MC #451207)', brokerBadge: { variant: 'success', label: 'Apto ✓' }, action: { variant: 'primary', label: 'Ver Detalle', alert: 'Carga seleccionada. Acepte en el estado superior.' } },
  { route: 'Orlando, FL → Charlotte, NC', equipment: 'Dry Van 53ft · 38.0k lbs', miles: '524 mi', rate: '$1,850', perMile: '$3.53/mi', broker: 'TQL Logistics (MC #118845)', brokerBadge: { variant: 'warning', label: 'Revisar' }, action: { variant: 'secondary', label: 'Revisar MC', alert: 'Broker bajo revisión de cumplimiento.' } },
  { route: 'Tampa, FL → Nashville, TN', equipment: 'Flatbed 48ft · 45.0k lbs', miles: '690 mi', rate: '$2,600', perMile: '$3.76/mi', broker: 'Landstar Inway (MC #451207)', brokerBadge: { variant: 'success', label: 'Apto ✓' }, action: { variant: 'primary', label: 'Ver Detalle', alert: 'Carga con tarifa bloqueada.' } }
];

// Métricas y roster de Flotilla
export const FLEET_METRICS = [
  { label: 'Flota Total Activa', value: '12 Camiones', subtext: '100% Operativos', tone: 'success' },
  { label: 'Choferes en Tránsito', value: '8 En Ruta', subtext: '4 en descanso HOS', tone: 'info' },
  { label: 'Ingresos Semanales', value: '$38,450', subtext: '+14% vs semana previa', tone: 'success' },
  { label: 'Cumplimiento DVIR/DOT', value: '100% Conforme', subtext: '0 Violaciones', tone: 'success' }
];

export const FLEET_ROSTER_ROWS = [
  { id: 'TRK-101', driver: 'Alex Vance', status: { variant: 'info', label: 'En Tránsito' }, hos: '5.5 hrs de manejo', location: 'Ocala, FL (I-95 N)', vin: '1XKD49X028104', action: { variant: 'ghost', label: 'Despachar', alert: 'Asignar nueva carga a TRK-101' } },
  { id: 'TRK-102', driver: 'Carlos Mendoza', status: { variant: 'warning', label: 'Descanso HOS (10h)' }, hos: '11.0 hrs (Reinicia 06:00 AM)', location: 'Jacksonville, FL', vin: '1XKD49X099182', action: { variant: 'ghost', label: 'Programar', alert: 'Programar despacho tras descanso' } },
  { id: 'TRK-103', driver: 'Elena Rostova', status: { variant: 'success', label: 'Disponible en Muelle' }, hos: '9.2 hrs de manejo', location: 'Orlando, FL', vin: '1XKD49X074129', action: { variant: 'primary', label: 'Asignar Carga', alert: 'Asignar Cargas Disponibles' } }
];

// Torre de Control: matriz DOT
export const DOT_COMPLIANCE = [
  { label: 'Licencias de Conducir CDL-A', badge: '100% Vigentes' },
  { label: 'Exámenes Médicos DOT', badge: 'Conformes' },
  { label: 'Inspecciones Anuales de Vehículos', badge: 'Completadas' },
  { label: 'Póliza Seguro Responsabilidad ($1M)', badge: 'Activa FMCSA' }
];

export const DVIR_CHECKS = [
  'Frenos & Líneas de Aire',
  'Luces & Direccionales',
  'Neumáticos & Presión',
  'Espejos & Limpiaparabrisas',
  'Extintor & Triángulos',
  'Enganche de Quinta Rueda'
];

// Metadatos de cada plataforma: ruta, textos de cabecera, banner y <title>.
export const PLATFORMS = {
  driver: {
    path: '/chofer',
    badge: 'CHOFER',
    userRole: 'Operador #4020',
    pageTitle: 'HCGA — Chofer (Owner Operator)',
    pageDescription: 'Tablero del chofer independiente: cargas con tarifa fijada, HOS/ELD, inspección DVIR y GPS de truck stops.',
    title: 'Tablero de Chofer Independiente (Owner Operator)',
    description: 'Cargas transparentes con tarifa fijada, control de HOS/ELD, inspección DVIR y navegador GPS de paradas.',
    icon: 'truck',
    canPostLoad: false
  },
  fleet: {
    path: '/flotilla',
    badge: 'FLOTILLA',
    userRole: 'Fleet Manager',
    pageTitle: 'HCGA — Panel de Flotilla',
    pageDescription: 'Centro de control de flotilla: camiones, despacho a conductores y cumplimiento HOS en tiempo real.',
    title: 'Centro de Control de Flotilla (Fleet Manager)',
    description: 'Gestión unificada de camiones, despacho a conductores y monitoreo de cumplimiento HOS en tiempo real.',
    icon: 'users',
    canPostLoad: true
  },
  shipper: {
    path: '/embarcador',
    badge: 'EMBARCADOR',
    userRole: 'Shipper / Broker',
    pageTitle: 'HCGA — Portal de Embarcador / Broker',
    pageDescription: 'Portal de embarcador: rastreo de envíos, firma digital de BOL, publicación de cargas y verificación MC FMCSA.',
    title: 'Portal de Embarcador (Shipper / Broker)',
    description: 'Rastreo en vivo de envíos, firma digital de BOL, publicación de transporte y verificación MC FMCSA.',
    icon: 'package',
    canPostLoad: true
  },
  ops: {
    path: '/operaciones',
    badge: 'TORRE DE CONTROL',
    userRole: 'Control Tower',
    pageTitle: 'HCGA — Torre de Control & Seguridad',
    pageDescription: 'Torre de control: mapa nacional, auditoría DOT, matriz digital e incidentes.',
    title: 'Torre de Control de Operaciones & Seguridad (Control Tower)',
    description: 'Mapa de comando nacional, auditoría de cumplimiento DOT, matriz digital y gestión de incidentes.',
    icon: 'shield',
    canPostLoad: true
  }
};

// Selector de plataformas (página de inicio), agrupado por tipo de usuario
export const PLATFORM_GROUPS = [
  {
    id: 'group-driver',
    title: 'Transporte',
    description: 'Para quien mueve la carga.',
    items: [
      { role: 'driver', title: 'Chofer (Owner Operator)', description: 'Cargas con tarifa fijada, reloj HOS/ELD, inspección DVIR y GPS de truck stops.' },
      { role: 'fleet', title: 'Panel de Flotilla', description: 'Camiones, despacho a conductores y cumplimiento HOS de toda la flotilla.' }
    ]
  },
  {
    id: 'group-shipper',
    title: 'Clientes',
    description: 'Para quien envía o intermedia la carga.',
    items: [
      { role: 'shipper', title: 'Portal de Embarcador / Broker', description: 'Rastreo de envíos, firma digital de BOL, publicación de cargas y verificación MC FMCSA.' }
    ]
  },
  {
    id: 'group-ops',
    title: 'Interno HCGA',
    description: 'Para el equipo de operaciones y seguridad.',
    items: [
      { role: 'ops', title: 'Torre de Control & Seguridad', description: 'Mapa nacional, auditoría de cumplimiento DOT, matriz digital e incidentes.' }
    ]
  }
];

export const HOME_META = {
  pageTitle: 'HCGA Trading LLC — Plataforma de Tableros Operativos',
  pageDescription: 'Plataforma de Operaciones Unificada HCGA Trading LLC: Tableros para Choferes, Flotillas, Embarcadores y Torre de Control de Operaciones.'
};

// Iconos de línea 24x24 del diseño original (mismos trazos), como componentes React.
// El redondeo de puntas y esquinas lo aplica el estilo base (svg[viewBox="0 0 24 24"]).

function Svg({ children, stroke = 'currentColor', strokeWidth = 2, ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} {...props}>
      {children}
    </svg>
  );
}

export const SunIcon = props => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </Svg>
);

export const UserIcon = props => (
  <Svg {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></Svg>
);

export const TruckIcon = props => (
  <Svg {...props}>
    <rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
  </Svg>
);

export const UsersIcon = props => (
  <Svg {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Svg>
);

// Variante reducida usada en el título del roster de Flotilla
export const UserGroupIcon = props => (
  <Svg {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></Svg>
);

export const PackageIcon = props => (
  <Svg {...props}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
  </Svg>
);

// Variante reducida usada en el título de Envíos Activos
export const BoxIcon = props => (
  <Svg {...props}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></Svg>
);

export const ShieldIcon = props => (
  <Svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></Svg>
);

export const ChevronRightIcon = props => (
  <Svg {...props}><path d="M9 18l6-6-6-6" /></Svg>
);

export const ClockIcon = props => (
  <Svg {...props}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></Svg>
);

export const ClipboardIcon = props => (
  <Svg {...props}>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" />
  </Svg>
);

export const NavigationIcon = props => (
  <Svg {...props}><polygon points="12 2 19 21 12 17 5 21 12 2" /></Svg>
);

export const CrosshairIcon = props => (
  <Svg {...props}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /><circle cx="12" cy="12" r="7" /></Svg>
);

export const TrendingUpIcon = props => (
  <Svg {...props}><path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" /></Svg>
);

export const MapPinIcon = props => (
  <Svg {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></Svg>
);

export const TerminalIcon = props => (
  <Svg {...props}><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></Svg>
);

export const GlobeIcon = props => (
  <Svg {...props}><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></Svg>
);

export const FileIcon = props => (
  <Svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></Svg>
);

export const AlertCircleIcon = props => (
  <Svg {...props}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></Svg>
);

export const ChatIcon = props => (
  <Svg {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M8 9h8M8 13h5" /></Svg>
);

export const CloseIcon = props => (
  <Svg {...props}><path d="M18 6L6 18M6 6l12 12" /></Svg>
);

export const SendIcon = props => (
  <Svg {...props}><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></Svg>
);

export const InfoIcon = props => (
  <Svg {...props}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></Svg>
);

export const SuccessIcon = props => (
  <Svg {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></Svg>
);

export const ErrorIcon = props => (
  <Svg {...props}><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></Svg>
);

// Iconos de plataforma por clave (cabecera del banner, selector y chatbot)
export const PLATFORM_ICONS = {
  truck: TruckIcon,
  users: UsersIcon,
  package: PackageIcon,
  shield: ShieldIcon
};

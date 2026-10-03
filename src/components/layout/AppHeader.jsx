import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { SunIcon, UserIcon } from '../icons/Icons';
import { useTheme } from '../../hooks/useTheme';

// Logo maestro horizontal en blanco (Brand Book: sobre fondo rojo/oscuro, ancho mínimo 180 px)
const LOGO_SRC = `${import.meta.env.BASE_URL}hcga-logo-horizontal-white.png`;

function UserBadge({ name, role }) {
  return (
    <div className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.15)] border border-solid border-[rgba(255,255,255,0.3)] pt-1 pr-3 pb-1 pl-1 phone:pr-1 rounded-full text-white text-caption backdrop-blur-[8px]">
      <div className="w-[26px] h-[26px] rounded-full bg-[rgba(0,0,0,0.3)] flex items-center justify-center relative [&>svg]:w-[14px] [&>svg]:h-[14px]">
        <UserIcon stroke="#ffffff" />
        <span className="absolute bottom-[-1px] right-[-1px] w-[7px] h-[7px] rounded-full bg-status-success [border:1.5px_solid_var(--color-brand-red)]" />
      </div>
      {/* En móvil solo el avatar: el logo necesita sus 180 px */}
      <div className="flex flex-col leading-[1.2] phone:hidden">
        <span className="font-token-bold text-caption">{name}</span>
        <span className="text-caption opacity-[0.85] uppercase">{role}</span>
      </div>
    </div>
  );
}

/**
 * Cabecera fija: logo (enlace al selector en las plataformas), etiqueta de plataforma,
 * botón de tema y usuario. En móvil/táctil reserva el espacio de la cámara arriba.
 */
export function AppHeader({ badge, userRole, homeLink = true }) {
  const { toggleTheme } = useTheme();
  const logo = <img src={LOGO_SRC} alt="HCGA Trading LLC Logo" className="w-[180px] h-auto object-contain" />;

  return (
    <header
      className={
        'sticky top-0 z-header bg-[linear-gradient(135deg,var(--color-brand-red-dark)_0%,var(--color-brand-red)_100%)] ' +
        '[border-block-end:1px_solid_rgba(255,255,255,0.2)] pt-[calc(var(--space-xs)_+_env(safe-area-inset-top,0px))] pb-xs px-0 ' +
        // 2ª sombra: pinta el rojo de la cabecera en el hueco izquierdo de la barra de desplazamiento
        '[box-shadow:var(--shadow-md),-40px_0_0_0_var(--color-brand-red-dark)] backdrop-blur-glass ' +
        'touch:pt-[calc(var(--space-sm)_+_max(env(safe-area-inset-top,0px),40px))]'
      }
    >
      <div className="flex flex-row items-center justify-between gap-xs w-[var(--page-inline-size)] mx-auto">
        <div className="flex items-center gap-xs">
          {homeLink ? <Link to="/" className="inline-flex" aria-label="Cambiar de plataforma">{logo}</Link> : logo}
          <span className="font-body text-caption font-token-bold tracking-[0.05em] uppercase bg-[rgba(255,255,255,0.2)] text-white py-0.5 px-2 rounded-full border border-solid border-[rgba(255,255,255,0.3)] whitespace-nowrap phone:hidden">
            {badge}
          </span>
        </div>
        <div className="flex items-center gap-xs flex-nowrap">
          <Button variant="secondary" size="sm" aria-label="Cambiar Tema Dark/Light" onClick={toggleTheme}>
            <SunIcon width="15" height="15" />
            Tema
          </Button>
          {userRole && <UserBadge name="Alex Vance" role={userRole} />}
        </div>
      </div>
    </header>
  );
}

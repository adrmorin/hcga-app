/**
 * Tailwind mapeado al sistema de diseño original (src/styles/tokens.css).
 * Todos los valores apuntan a las variables CSS de los tokens, así el tema
 * claro/oscuro (data-theme) sigue funcionando igual que en el código original.
 *
 * Preflight está desactivado: el reset original (src/styles/base.css) se conserva
 * tal cual para no alterar tamaños de títulos, botones ni formularios.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  corePlugins: {
    preflight: false
  },
  theme: {
    screens: {
      md: '768px',
      wide: '1200px',
      phone: { max: '480px' },
      'tablet-max': { max: '768px' },
      // Móvil o dispositivo táctil: reserva el espacio de la cámara en la cabecera
      touch: { raw: '(max-width: 767px), (hover: none) and (pointer: coarse)' }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'var(--primitive-white)',
      black: 'var(--primitive-black)',
      canvas: 'var(--color-bg-canvas)',
      primary: 'var(--color-bg-primary)',
      surface: 'var(--color-bg-surface)',
      raised: 'var(--color-bg-surface-raised)',
      elevated: 'var(--color-bg-surface-elevated)',
      translucent: 'var(--color-bg-surface-translucent)',
      subtle: 'var(--color-bg-subtle)',
      card: 'var(--color-bg-card)',
      fg: 'var(--color-text-default)',
      'fg-primary': 'var(--color-text-primary)',
      'fg-secondary': 'var(--color-text-secondary)',
      muted: 'var(--color-text-muted)',
      'fg-subtle': 'var(--color-text-subtle)',
      'on-primary': 'var(--color-text-on-primary)',
      'border-default': 'var(--color-border-default)',
      'border-strong': 'var(--color-border-strong)',
      'border-subtle': 'var(--color-border-subtle)',
      'border-focus': 'var(--color-border-focus)',
      action: 'var(--color-action-primary)',
      'action-hover': 'var(--color-action-primary-hover)',
      'action-pressed': 'var(--color-action-primary-pressed)',
      'action-secondary': 'var(--color-action-secondary)',
      'action-secondary-fg': 'var(--color-action-secondary-fg)',
      'success-bg': 'var(--color-success-bg)',
      'success-fg': 'var(--color-success-fg)',
      'warning-bg': 'var(--color-warning-bg)',
      'warning-fg': 'var(--color-warning-fg)',
      'danger-bg': 'var(--color-danger-bg)',
      'danger-fg': 'var(--color-danger-fg)',
      'danger-solid': 'var(--color-danger-solid)',
      'info-bg': 'var(--color-info-bg)',
      'info-fg': 'var(--color-info-fg)',
      'status-success': 'var(--color-status-success)',
      'status-warning': 'var(--color-status-warning)',
      'status-error': 'var(--color-status-error)',
      'status-info': 'var(--color-status-info)',
      brand: 'var(--color-brand-red)',
      'brand-dark': 'var(--color-brand-red-dark)',
      'brand-bright': 'var(--color-brand-red-bright)',
      'brand-glow': 'var(--color-brand-red-glow)',
      icon: 'var(--icon-color)',
      // Texto/iconos rojos: #EF5350 sobre oscuro, #890000 sobre claro
      accent: 'var(--color-text-accent)',
      'red-700': 'var(--primitive-red-700)'
    },
    spacing: {
      0: 'var(--space-0)',
      0.5: 'var(--space-0-5)',
      1: 'var(--space-1)',
      2: 'var(--space-2)',
      3: 'var(--space-3)',
      4: 'var(--space-4)',
      5: 'var(--space-5)',
      6: 'var(--space-6)',
      8: 'var(--space-8)',
      10: 'var(--space-10)',
      12: 'var(--space-12)',
      16: 'var(--space-16)',
      20: 'var(--space-20)',
      '2xs': 'var(--space-2xs)',
      xs: 'var(--space-xs)',
      sm: 'var(--space-sm)',
      md: 'var(--space-md)',
      lg: 'var(--space-lg)',
      xl: 'var(--space-xl)',
      '2xl': 'var(--space-2xl)'
    },
    borderRadius: {
      none: 'var(--radius-none)',
      xs: 'var(--radius-xs)',
      sm: 'var(--radius-sm)',
      md: 'var(--radius-md)',
      lg: 'var(--radius-lg)',
      xl: 'var(--radius-xl)',
      full: 'var(--radius-full)',
      circle: '50%'
    },
    fontFamily: {
      display: 'var(--font-family-display)',
      body: 'var(--font-family-body)',
      mono: 'var(--font-family-mono)',
      heading: 'var(--font-family-heading)'
    },
    fontSize: {
      caption: 'var(--font-size-caption)',
      'label-md': 'var(--font-size-label-md)',
      'label-lg': 'var(--font-size-label-lg)',
      'body-md': 'var(--font-size-body-md)',
      'body-lg': 'var(--font-size-body-lg)',
      'title-md': 'var(--font-size-title-md)',
      'title-lg': 'var(--font-size-title-lg)',
      'headline-md': 'var(--font-size-headline-md)',
      'headline-lg': 'var(--font-size-headline-lg)',
      display: 'var(--font-size-display)',
      xs: 'var(--font-size-xs)',
      sm: 'var(--font-size-sm)',
      base: 'var(--font-size-base)',
      md: 'var(--font-size-md)',
      lg: 'var(--font-size-lg)',
      xl: 'var(--font-size-xl)',
      '2xl': 'var(--font-size-2xl)'
    },
    fontWeight: {
      regular: 'var(--font-weight-regular)',
      medium: 'var(--font-weight-medium)',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      'token-semibold': 'var(--font-weight-semibold)',
      'token-bold': 'var(--font-weight-bold)'
    },
    boxShadow: {
      none: 'none',
      sm: 'var(--shadow-sm)',
      md: 'var(--shadow-md)',
      lg: 'var(--shadow-lg)',
      brand: 'var(--shadow-brand)'
    },
    extend: {
      transitionDuration: {
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
        slow: 'var(--duration-slow)'
      },
      transitionTimingFunction: {
        standard: 'var(--ease-standard)'
      },
      backdropBlur: {
        glass: '14px'
      },
      zIndex: {
        header: '100',
        chatbot: '900',
        modal: '1000',
        toast: '2000'
      },
      keyframes: {
        'fade-in-view': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'live-map-pulse': {
          '0%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.6)' },
          '70%': { boxShadow: '0 0 0 6px rgba(16, 185, 129, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)' }
        },
        'chatbot-in': {
          from: { opacity: '0', transform: 'translateY(12px) scale(0.96)' },
          to: { opacity: '1', transform: 'none' }
        },
        'modal-slide-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'toast-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'truck-bg-drive': {
          from: { translate: '-340px 0' },
          to: { translate: 'calc(150vmax + 40px) 0' }
        },
        'truck-bg-drive-reverse': {
          from: { translate: 'calc(150vmax + 40px) 0' },
          to: { translate: '-340px 0' }
        },
        'truck-bg-wheel': {
          to: { rotate: '360deg' }
        }
      },
      animation: {
        'fade-in-view': 'fade-in-view var(--transition-normal)',
        'live-map-pulse': 'live-map-pulse 1.8s infinite',
        'chatbot-in': 'chatbot-in 0.2s ease-out',
        'modal-slide-up': 'modal-slide-up var(--transition-normal)',
        'toast-in': 'toast-in var(--transition-normal)',
        'truck-bg-wheel': 'truck-bg-wheel 0.8s linear infinite',
        // Duración y retardo de cada carril se dan en línea (style) como en el original
        'truck-bg-drive': 'truck-bg-drive linear infinite',
        'truck-bg-drive-reverse': 'truck-bg-drive-reverse linear infinite'
      }
    }
  },
  plugins: [
    // light: aplica la clase solo con el tema claro (<html data-theme="light">)
    function ({ addVariant, addUtilities }) {
      addVariant('light', '[data-theme="light"] &');
      // Tratamiento de titular de marca: Saira 800 itálica, ancho 125
      addUtilities({
        '.type-display': {
          'font-family': 'var(--font-family-display)',
          'font-style': 'italic',
          'font-weight': '800',
          'font-variation-settings': "'wdth' 125",
          'letter-spacing': '-0.01em'
        }
      });
    }
  ]
};

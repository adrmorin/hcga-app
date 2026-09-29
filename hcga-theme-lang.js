/**
 * HCGA Trading LLC - Central Theme & Language Controller
 * Provides Light/Dark Theme Switcher & Bilingual (ES/EN) Translation Engine
 */

(function () {
  "use strict";

  // --- Translation Dictionary ---
  const TRANSLATIONS = {
    es: {
      // Global & Navigation
      nav_how_it_works: "Cómo funciona",
      nav_protection: "Protección del chofer",
      nav_security: "Seguridad",
      nav_tech: "Tecnología",
      nav_portal: "Client Portal",
      nav_try_app: "Probar la App",
      nav_try_driver: "Probar App de Choferes",
      nav_try_client: "Probar Client Portal",
      
      // Hero Section
      hero_title_1: "Transporte de carga",
      hero_title_hl: "que no le da la vuelta al chofer.",
      hero_lede: "HCGA Trading reúne, en una sola plataforma, todo lo que hoy un chofer resuelve con cinco aplicaciones distintas — con la tarifa protegida desde que la aceptas y visibilidad completa para quien envía la carga.",
      hero_trust_1: "reloj de HOS con reglas FMCSA",
      hero_trust_2: "de espera libre, luego se paga sola",
      hero_trust_3: "respuesta a cualquier reclamo",
      
      // Path Selector
      path_head_h2: "Un solo flujo. Para choferes, flotillas y shippers.",
      path_head_p: "Selecciona tu rol para ver cómo HCGA transforma tu operación del día a día.",
      role_driver: "Chofer independiente",
      role_fleet: "Compañía / Flotilla",
      role_shipper: "Shipper / Broker",

      // Driver Path
      driver_title: "Chofer independiente (Owner Operator)",
      driver_lede: "Regístrate desde el celular y empieza a ver cargas el mismo día — sin oficina, sin papeleo físico.",
      driver_f1: "Verificación de identidad con la cámara: licencia, domicilio, permiso de trabajo y reconocimiento facial",
      driver_f2: "Tablero de cargas con tarifa bloqueada al aceptar",
      driver_f3: "Inspección DVIR digital antes de cada viaje",
      driver_f4: "Reloj de Horas de Servicio con las reglas de la FMCSA",
      driver_f5: "Navegador con truck stops, básculas y precio de combustible",
      driver_f6: "Asistente de IA y chat directo con tu broker",
      driver_cta: "Probar la App de Choferes",

      // Fleet Path
      fleet_title: "Compañía con flotilla",
      fleet_lede: "Administra varios camiones y choferes desde una sola cuenta, con la misma app.",
      fleet_f1: "Panel de flotilla: roster de camiones y choferes en un solo lugar",
      fleet_f2: "Asignación de cargas a un chofer y camión específicos",
      fleet_f3: "Visibilidad del cumplimiento (DVIR, HOS) de toda la flotilla",
      fleet_f4: "Agrega camiones y choferes según creces",
      fleet_f5: "Mismas protecciones de tarifa y detention para cada unidad",
      fleet_f6: "Un único inicio de sesión para toda la operación",
      fleet_cta: "Crear cuenta de flotilla",

      // Shipper Path
      shipper_title: "Shipper / Broker",
      shipper_lede: "Publica una carga y síguela en vivo, con el mismo estado que ve el chofer en su celular.",
      shipper_f1: "Solicita transporte en minutos, sin llamadas",
      shipper_f2: "Rastreo en vivo: reservado, inspección, en tránsito, entregado",
      shipper_f3: "Verifica transportistas por número MC, autoridad FMCSA y seguro",
      shipper_f4: "Firma digital de Rate Confirmation y BOL",
      shipper_f5: "Chat directo con el chofer asignado",
      shipper_f6: "Facturación y comprobantes en un solo lugar",
      shipper_cta: "Probar el Client Portal",

      // Protection Section
      prot_h2: "Protección real al chofer",
      prot_p: "Tres garantías escritas en cada viaje, respaldadas por el contrato de la plataforma.",
      prot_r1_h: "Tarifa protegida sin descuentos sorpresa",
      prot_r1_p: "El monto acordado al presionar Aceptar Carga es exactamente lo que recibes al entregar. Sin rebajas arbitrarias por 'gastos administrativos' ni comisiones ocultas.",
      prot_r2_h: "Cobro automático de Detention (espera)",
      prot_r2_p: "Transcurridas 2 horas de espera en rampa de carga o descarga, el sistema activa automáticamente la tarifa de detention por hora. No dependes del humor del broker.",
      prot_r3_h: "Resolución justa de reclamos en 48 horas máximo",
      prot_r3_p: "Si surge una disputa por daños, demoras o documentos, HCGA arbitra con evidencias del GPS y fotografías del viaje. Respuesta definitiva en máximo dos días hábiles.",

      // Compliance Section
      comp_h2: "Cumplimiento y seguridad operativa",
      comp_p: "Todo en regla para que manejes con la tranquilidad de estar 100% amparado por las normas de la FMCSA.",
      comp_c1_h: "Reloj de HOS con alerta preventiva",
      comp_c1_p: "Visualiza en tiempo real tus 11 horas de manejo y 14 de turno con avisos antes de incurrir en violaciones de descanso obligatorios.",
      comp_c2_h: "DVIR digital pre y post viaje",
      comp_c2_p: "Inspecciones vehiculares guiadas en 2 minutos desde el celular. Guarda historial fotográfico directo en el servidor para revisiones del DOT.",
      comp_c3_h: "Validación de Autoridad FMCSA y MC",
      comp_c3_p: "Verificación continua de permisos activos, seguro de carga y récord de seguridad para choferes y empresas registradas.",
      comp_c4_h: "Prueba de entrega digital (POD / BOL)",
      comp_c4_p: "Captura firmas del recibidor e imágenes del sello directo en la app al instante de descargar para detonar el pago inmediato.",

      // Tech Grid Section
      tech_h2: "Todo lo demás, en el mismo lugar.",
      tech_p: "El resto de las herramientas que hoy viven repartidas en aplicaciones distintas.",
      tech_g1: "Navegador con truck stops, básculas y precio de combustible",
      tech_g2: "Chat directo con brokers y choferes",
      tech_g3: "Asistente de IA disponible en todo momento",
      tech_g4: "Firma digital de Rate Confirmation y BOL",
      tech_g5: "Panel de flotilla multi-camión",
      tech_g6: "Facturación y comprobantes centralizados",

      // Final CTA & Footer
      final_h2: "Súmate a la plataforma que sí cuida al chofer.",
      final_p: "Prueba ambas apps ahora mismo — no hay nada que instalar.",
      footer_copy: "© 2026 HCGA Trading LLC",

      // App Shell & Tabs (Driver & Portal)
      app_driver_title: "HCGA Chofer",
      app_client_title: "HCGA Client Portal",
      tab_loads: "Cargas",
      tab_trip: "Mi Viaje",
      tab_map: "Mapa GPS",
      tab_chat: "Mensajes",
      tab_profile: "Mi Cuenta",
      tab_shipments: "Envíos",
      tab_post_load: "Nueva Carga",
      tab_fleets: "Flotillas",

      // Common Controls
      btn_accept_load: "Aceptar Carga",
      btn_view_details: "Ver Detalles",
      btn_complete_dvir: "Completar DVIR",
      btn_start_trip: "Iniciar Viaje",
      btn_finish_delivery: "Finalizar Entrega",
      status_available: "Disponible",
      status_in_transit: "En tránsito",
      status_delivered: "Entregado",
      status_conformed: "Conforme",

      // Theme & Lang labels
      theme_dark: "Modo Oscuro",
      theme_light: "Modo Claro",
      lang_es: "Español",
      lang_en: "English"
    },

    en: {
      // Global & Navigation
      nav_how_it_works: "How it works",
      nav_protection: "Driver Protection",
      nav_security: "Security & Compliance",
      nav_tech: "Technology",
      nav_portal: "Client Portal",
      nav_try_app: "Try App",
      nav_try_driver: "Try Driver App",
      nav_try_client: "Try Client Portal",
      
      // Hero Section
      hero_title_1: "Freight transportation",
      hero_title_hl: "that actually respects the driver.",
      hero_lede: "HCGA Trading combines into a single platform everything a driver currently solves with five different apps — with rates protected from acceptance and full real-time visibility for shippers.",
      hero_trust_1: "HOS clock with FMCSA rules",
      hero_trust_2: "free wait time, then auto-pays detention",
      hero_trust_3: "guaranteed claim response",

      // Path Selector
      path_head_h2: "One unified workflow. For drivers, fleets, and shippers.",
      path_head_p: "Select your role to see how HCGA transforms your day-to-day operations.",
      role_driver: "Independent Driver",
      role_fleet: "Fleet Company",
      role_shipper: "Shipper / Broker",

      // Driver Path
      driver_title: "Independent Driver (Owner Operator)",
      driver_lede: "Register right from your phone and start viewing loads the same day — no office visit or physical paperwork needed.",
      driver_f1: "Mobile camera ID verification: CDL, proof of address, work authorization & facial recognition",
      driver_f2: "Load board with guaranteed rate locked upon acceptance",
      driver_f3: "Digital DVIR inspection prior to every trip",
      driver_f4: "Hours of Service (HOS) clock fully compliant with FMCSA rules",
      driver_f5: "Truck-specific GPS navigation with truck stops, weigh scales & diesel prices",
      driver_f6: "24/7 AI Assistant & direct chat with your assigned broker",
      driver_cta: "Try Driver App",

      // Fleet Path
      fleet_title: "Fleet Company",
      fleet_lede: "Manage multiple trucks and drivers from a single company account within the same application.",
      fleet_f1: "Fleet management dashboard: truck roster & driver roster in one view",
      fleet_f2: "Direct load assignment to specific drivers and trucks",
      fleet_f3: "Full visibility of compliance status (DVIR, HOS) across your fleet",
      fleet_f4: "Add new trucks and drivers seamlessly as your business expands",
      fleet_f5: "Same rate protection and automatic detention for every truck",
      fleet_f6: "Single master login for your entire dispatch operation",
      fleet_cta: "Create Fleet Account",

      // Shipper Path
      shipper_title: "Shipper / Broker",
      shipper_lede: "Post a load and track it live with the exact same real-time status visible on the driver's phone.",
      shipper_f1: "Request freight transport in minutes without phone calls",
      shipper_f2: "Live tracking: booked, inspecting, in transit, delivered",
      shipper_f3: "Carrier vetting by MC number, FMCSA authority & active insurance",
      shipper_f4: "Digital signatures for Rate Confirmation and Bill of Lading (BOL)",
      shipper_f5: "Direct line chat with your assigned driver",
      shipper_f6: "Centralized invoicing, PODs, and billing receipts",
      shipper_cta: "Try Client Portal",

      // Protection Section
      prot_h2: "Real Driver Protection",
      prot_p: "Three legally binding guarantees written into every shipment contract on the platform.",
      prot_r1_h: "Protected Rate with Zero Surprise Discounts",
      prot_r1_p: "The rate agreed upon when tapping 'Accept Load' is the exact payout upon delivery. No arbitrary administrative deductions or hidden fees.",
      prot_r2_h: "Automatic Detention Billing",
      prot_r2_p: "After 2 hours of waiting at pickup or delivery ramps, the system automatically triggers hourly detention pay. You never have to negotiate with the broker.",
      prot_r3_h: "Fair Claim Resolution in 48 Hours Max",
      prot_r3_p: "If a dispute arises over damage, delay, or paperwork, HCGA arbitrates using tamper-proof GPS logs and trip photos. Final resolution within 2 business days.",

      // Compliance Section
      comp_h2: "Compliance & Operational Safety",
      comp_p: "Full regulatory compliance so you drive with 100% peace of mind under FMCSA standards.",
      comp_c1_h: "HOS Clock with Preventive Alerts",
      comp_c1_p: "Track your 11-hour driving and 14-hour duty windows in real time with audio warnings before mandatory break violations occur.",
      comp_c2_h: "Digital Pre & Post Trip DVIR",
      comp_c2_p: "Guided 2-minute vehicle inspections on your phone. Photo records are backed up securely for DOT audit readiness.",
      comp_c3_h: "FMCSA Authority & MC Validation",
      comp_c3_p: "Continuous automated checks on active authority, cargo insurance, and safety rating for all registered carriers.",
      comp_c4_h: "Digital Proof of Delivery (POD / BOL)",
      comp_c4_p: "Capture receiver signatures and seal photos directly in the app at unloading to trigger instant payment processing.",

      // Tech Grid Section
      tech_h2: "Everything else in one place.",
      tech_p: "The rest of the tools that currently live scattered across separate mobile apps.",
      tech_g1: "Truck GPS with truck stops, weigh scales & diesel prices",
      tech_g2: "Direct instant chat between brokers & drivers",
      tech_g3: "24/7 AI Logistics Assistant always available",
      tech_g4: "Digital signature for Rate Confirmations & BOLs",
      tech_g5: "Multi-truck fleet management dashboard",
      tech_g6: "Centralized invoicing and digital payment receipts",

      // Final CTA & Footer
      final_h2: "Join the platform that actually protects the driver.",
      final_p: "Try both applications right now — nothing to install.",
      footer_copy: "© 2026 HCGA Trading LLC",

      // App Shell & Tabs (Driver & Portal)
      app_driver_title: "HCGA Driver",
      app_client_title: "HCGA Client Portal",
      tab_loads: "Loads",
      tab_trip: "My Trip",
      tab_map: "GPS Map",
      tab_chat: "Messages",
      tab_profile: "My Account",
      tab_shipments: "Shipments",
      tab_post_load: "New Load",
      tab_fleets: "Fleets",

      // Common Controls
      btn_accept_load: "Accept Load",
      btn_view_details: "View Details",
      btn_complete_dvir: "Complete DVIR",
      btn_start_trip: "Start Trip",
      btn_finish_delivery: "Finish Delivery",
      status_available: "Available",
      status_in_transit: "In transit",
      status_delivered: "Delivered",
      status_conformed: "Compliant",

      // Theme & Lang labels
      theme_dark: "Dark Mode",
      theme_light: "Light Mode",
      lang_es: "Español",
      lang_en: "English"
    }
  };

  // --- State Management ---
  let currentTheme = localStorage.getItem("hcga_theme") || "dark";
  let currentLang = localStorage.getItem("hcga_lang") || "es";

  // --- Helper: Inject Light Mode CSS rules ---
  function injectThemeStyles() {
    if (document.getElementById("hcga-theme-styles")) return;
    const style = document.createElement("style");
    style.id = "hcga-theme-styles";
    style.textContent = `
      /* Light Theme Variables */
      [data-theme="light"] {
        --ink: #F4F6F9 !important;
        --panel: #FFFFFF !important;
        --panel-2: #EAEFF5 !important;
        --line: rgba(0, 0, 0, 0.08) !important;
        --line-strong: rgba(0, 0, 0, 0.16) !important;
        --text: #0F172A !important;
        --text-dim: #475569 !important;
        --text-dimmer: #64748B !important;
        --green-bg: rgba(16, 185, 129, 0.16) !important;
        --amber-bg: rgba(245, 158, 11, 0.16) !important;
        --red-bg: rgba(153, 0, 0, 0.12) !important;
      }

      [data-theme="light"] body {
        background-color: var(--ink) !important;
        color: var(--text) !important;
      }

      [data-theme="light"] .nav {
        background: rgba(255, 255, 255, 0.88) !important;
        border-bottom-color: rgba(0, 0, 0, 0.08) !important;
      }

      [data-theme="light"] .nav-links a {
        color: #334155 !important;
      }
      [data-theme="light"] .nav-links a:hover {
        color: #990000 !important;
        background: rgba(153, 0, 0, 0.08) !important;
      }
      [data-theme="light"] .nav .btn-outline {
        border-color: rgba(0, 0, 0, 0.25) !important;
        color: #0F172A !important;
      }

      [data-theme="light"] .app-shell,
      [data-theme="light"] .modal-sheet {
        background: var(--ink) !important;
        color: var(--text) !important;
      }

      [data-theme="light"] .tabbar {
        background: rgba(255, 255, 255, 0.94) !important;
        border-top-color: rgba(0, 0, 0, 0.1) !important;
      }
      [data-theme="light"] .tab {
        color: #64748B !important;
      }
      [data-theme="light"] .tab.active {
        color: #0F172A !important;
      }

      [data-theme="light"] input,
      [data-theme="light"] select,
      [data-theme="light"] textarea {
        background: #FFFFFF !important;
        color: #0F172A !important;
        border-color: rgba(0, 0, 0, 0.2) !important;
      }

      /* Control Widget Styling */
      .hcga-controls-bar {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: rgba(0, 0, 0, 0.2);
        padding: 4px;
        border-radius: 9999px;
        border: 1px solid rgba(255, 255, 255, 0.15);
      }
      [data-theme="light"] .hcga-controls-bar {
        background: rgba(0, 0, 0, 0.05);
        border-color: rgba(0, 0, 0, 0.12);
      }

      .hcga-btn-toggle {
        background: transparent;
        border: none;
        color: currentColor;
        font-family: 'Inter', sans-serif;
        font-size: 11.5px;
        font-weight: 700;
        padding: 4px 10px;
        border-radius: 9999px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        transition: background .15s ease, color .15s ease, transform .1s ease;
      }
      .hcga-btn-toggle:hover {
        background: rgba(255, 255, 255, 0.18);
      }
      [data-theme="light"] .hcga-btn-toggle:hover {
        background: rgba(0, 0, 0, 0.08);
      }
      .hcga-btn-toggle:active {
        transform: scale(0.96);
      }

      /* Floating Control Widget for App views */
      .hcga-float-controls {
        position: fixed;
        top: 14px;
        right: 14px;
        z-index: 999;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      }
    `;
    document.head.appendChild(style);
  }

  // --- Theme Controller ---
  function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("hcga_theme", theme);

    // Update button icons if rendered
    document.querySelectorAll(".hcga-theme-btn").forEach((btn) => {
      btn.innerHTML = theme === "dark" 
        ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg> <span>Claro</span>`
        : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> <span>Oscuro</span>`;
    });
  }

  // --- Language Controller ---
  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("hcga_lang", lang);

    const dict = TRANSLATIONS[lang] || TRANSLATIONS.es;

    // Translate all elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // Translate dynamic paths if PATHS variable exists on website/index page
    if (window.HCGA_RERENDER) {
      window.HCGA_RERENDER(lang);
    }

    // Update lang button label
    document.querySelectorAll(".hcga-lang-btn").forEach((btn) => {
      btn.innerHTML = lang === "es" ? "🌐 <b>EN</b>" : "🌐 <b>ES</b>";
    });
  }

  // --- Render Control Buttons in Navigation or Float ---
  function mountControls() {
    injectThemeStyles();
    setTheme(currentTheme);
    setLanguage(currentLang);

    // Try finding nav-ctas on landing page
    const navCtas = document.querySelector(".nav-ctas");
    if (navCtas) {
      const bar = document.createElement("div");
      bar.className = "hcga-controls-bar";
      bar.innerHTML = `
        <button class="hcga-btn-toggle hcga-lang-btn" title="Cambiar idioma / Switch language"></button>
        <button class="hcga-btn-toggle hcga-theme-btn" title="Cambiar tema / Switch theme"></button>
      `;
      navCtas.prepend(bar);
    } else {
      // Floating widget for App screens & Demo
      const floatBar = document.createElement("div");
      floatBar.className = "hcga-controls-bar hcga-float-controls";
      floatBar.innerHTML = `
        <button class="hcga-btn-toggle hcga-lang-btn" title="Idioma / Language"></button>
        <button class="hcga-btn-toggle hcga-theme-btn" title="Tema / Theme"></button>
      `;
      document.body.appendChild(floatBar);
    }

    // Add Click Listeners
    document.querySelectorAll(".hcga-theme-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        setTheme(currentTheme === "dark" ? "light" : "dark");
      });
    });

    document.querySelectorAll(".hcga-lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        setLanguage(currentLang === "es" ? "en" : "es");
      });
    });

    // Re-set to update text inside buttons
    setTheme(currentTheme);
    setLanguage(currentLang);
  }

  // Auto-init on DOMContentLoaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountControls);
  } else {
    mountControls();
  }

  // Expose Global API for pages
  window.HCGA_I18N = {
    setTheme,
    setLanguage,
    getTheme: () => currentTheme,
    getLang: () => currentLang,
    t: (key) => (TRANSLATIONS[currentLang] || TRANSLATIONS.es)[key] || key,
  };
})();

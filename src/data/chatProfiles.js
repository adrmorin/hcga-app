import { MOCK_MC_DATABASE } from './mockData';

// --- Copiloto IA: un perfil por plataforma (nombre, saludo, sugerencias y respuestas) ---
// `ctx` = { state, nextStopText } — datos de la app en el momento de responder.

const has = (text, words) => words.some(w => text.includes(w));

const driveLeft = state => (state.hosClock.maxDriving - state.hosClock.drivingHours).toFixed(1);

export const CHATBOT_PROFILES = {
  driver: {
    platform: 'Chofer',
    name: 'Copiloto Chofer',
    icon: 'truck',
    greeting: ({ state }) => `Hola Alex. Soy tu Copiloto de ruta. Te quedan ${driveLeft(state)}h de manejo y la carga ${state.activeLoad.id} está activa. ¿En qué te ayudo?`,
    chips: ['¿Cuántas horas HOS me quedan?', 'Tarifa de la carga activa', 'Próximo truck stop'],
    reply(t, { state, nextStopText }) {
      if (has(t, ['hos', 'horas', 'manejo', 'descanso'])) {
        return `Según el reloj ELD te quedan ${driveLeft(state)} horas de manejo en tu turno de 11h. Recuerda el descanso de 30 minutos antes de 8 horas continuas.`;
      }
      if (has(t, ['carga', 'tarifa', 'detention'])) {
        return `La carga ${state.activeLoad.id} (${state.activeLoad.origin} → ${state.activeLoad.destination}) tiene tarifa fijada de $${state.activeLoad.rate}. Detention: 2h libres, luego $50/hora.`;
      }
      if (has(t, ['truck stop', 'parada', 'diesel', 'diésel', 'ducha', 'parqueo'])) {
        return nextStopText ? `Siguiente parada en tu ruta → ${nextStopText.trim()}` : 'Revisa el mapa de Truck Stops para ver la siguiente parada en tu ruta.';
      }
      if (has(t, ['fmcsa', 'mc', 'broker'])) {
        return `Tu broker ${state.activeLoad.broker} está verificado en FMCSA SAFER.`;
      }
      return 'Puedo ayudarte con tus horas HOS, la carga activa, la tarifa y las paradas de tu ruta.';
    }
  },
  fleet: {
    platform: 'Flotilla',
    name: 'Copiloto Flotilla',
    icon: 'users',
    greeting: () => 'Hola. Soy el Copiloto de Flotilla. Tienes 12 camiones activos: 8 en ruta y 4 en descanso HOS. ¿Qué necesitas revisar?',
    chips: ['¿Qué camiones están en ruta?', 'Alertas de cumplimiento HOS', 'Ingresos de la semana'],
    reply(t) {
      if (has(t, ['ruta', 'tránsito', 'transito', 'ubicación', 'ubicacion', 'camion', 'camión'])) {
        return 'TRK-101 (Alex Vance) va en tránsito por la I-95 N cerca de Ocala, FL. TRK-103 (Elena Rostova) está disponible en muelle en Orlando, FL, y TRK-102 (Carlos Mendoza) en descanso HOS en Jacksonville, FL.';
      }
      if (has(t, ['hos', 'cumplimiento', 'alerta', 'dvir', 'dot', 'violacion', 'violación'])) {
        return 'Cumplimiento DVIR/DOT al 100% y 0 violaciones. TRK-102 está en descanso de 10h y reinicia a las 06:00 AM.';
      }
      if (has(t, ['ingreso', 'semana', 'dinero', 'facturación', 'facturacion'])) {
        return 'Ingresos semanales: $38,450, un 14% más que la semana anterior.';
      }
      if (has(t, ['despach', 'asignar', 'disponible'])) {
        return 'TRK-103 (Elena Rostova) está disponible con 9.2h de manejo: es la mejor opción para asignar una carga nueva.';
      }
      return 'Puedo informarte del estado de los camiones, el cumplimiento HOS/DOT, los ingresos y qué unidad está libre para despachar.';
    }
  },
  shipper: {
    platform: 'Embarcador',
    name: 'Copiloto Embarcador',
    icon: 'package',
    greeting: () => 'Hola. Soy el Copiloto del Portal de Embarcador. Puedo rastrear tus envíos, verificar un MC en FMCSA o ayudarte a firmar el BOL.',
    chips: ['Estado de mis envíos', 'Verificar un MC', '¿Cómo firmo el BOL?'],
    reply(t) {
      if (has(t, ['envío', 'envio', 'rastre', 'estado', 'temperatura', 'reefer'])) {
        return 'SH-8821 (Tampa, FL → Charlotte, NC) va en tránsito al 65% con reefer a 34°F. SH-8822 (Miami, FL → Dallas, TX) está reservado y en inspección, a -10°F.';
      }
      const mc = (t.match(/\d{6}/) || [])[0];
      if (mc && MOCK_MC_DATABASE[mc]) {
        const d = MOCK_MC_DATABASE[mc];
        return `MC #${mc} — ${d.name}: ${d.status}. Autoridad ${d.authority}, seguro ${d.insurance}.`;
      }
      if (has(t, ['mc', 'fmcsa', 'verificar', 'carrier', 'transportista'])) {
        return 'Escríbeme el número MC (por ejemplo 451207, 118845 o 204477) o usa el módulo Carrier Vetting para la auditoría completa.';
      }
      if (has(t, ['bol', 'firma', 'firmar'])) {
        return 'Abre el envío entregado y pulsa "Firmar BOL": dibujas tu firma en el recuadro y queda registrada la recepción conforme.';
      }
      return 'Puedo ayudarte con el estado de tus envíos, la verificación de transportistas (MC) y la firma digital del BOL.';
    }
  },
  ops: {
    platform: 'Torre de Control',
    name: 'Copiloto Torre de Control',
    icon: 'shield',
    greeting: () => 'Hola. Soy el Copiloto de la Torre de Control. Superviso el cumplimiento DOT, los incidentes y el detention de toda la red.',
    chips: ['Estado de auditoría DOT', 'Resumen de detention', 'Seguro de responsabilidad'],
    reply(t) {
      if (has(t, ['dot', 'auditor', 'cdl', 'licencia', 'médico', 'medico', 'inspecci'])) {
        return 'Auditoría al día: licencias CDL-A 100% vigentes, exámenes médicos DOT conformes e inspecciones anuales de vehículos completadas.';
      }
      if (has(t, ['detention', 'espera', 'reclam', 'incidente'])) {
        return 'Detention acumulado este mes: $1,450.00, con 29 horas reembolsadas automáticamente (2h libres, luego $50/hora).';
      }
      if (has(t, ['seguro', 'póliza', 'poliza', 'responsabilidad'])) {
        return 'La póliza de responsabilidad de $1M está activa y registrada en FMCSA.';
      }
      if (has(t, ['mapa', 'red', 'unidad', 'nacional'])) {
        return 'La red nacional está activa. Revisa el Command Center para ver las unidades sobre el mapa.';
      }
      return 'Puedo darte el estado de la auditoría DOT, el detention e incidentes y la póliza de seguro.';
    }
  }
};

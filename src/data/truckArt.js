// --- Fondo animado de camiones (tomado de HCGAPP 1/index.html, sin cambios en el dibujo) ---
// Devuelve el SVG interior de cada camión como texto estático (no contiene datos del usuario).

function wheel(cx, cy = 89, r = 11) {
  return (
    `<g class="animate-truck-bg-wheel motion-reduce:animate-none" style="transform-origin:${cx}px ${cy}px">` +
    `<circle class="tb-tire" cx="${cx}" cy="${cy}" r="${r}"/>` +
    `<circle class="tb-body" cx="${cx}" cy="${cy}" r="${r * 0.5}"/>` +
    `<line x1="${cx - r * 0.5}" y1="${cy}" x2="${cx + r * 0.5}" y2="${cy}" stroke="currentColor" stroke-width="1.2"/>` +
    `<line x1="${cx}" y1="${cy - r * 0.5}" x2="${cx}" y2="${cy + r * 0.5}" stroke="currentColor" stroke-width="1.2"/>` +
    `</g>`
  );
}

function tractor() {
  return (
    '<rect class="tb-body" x="309" y="8" width="4" height="50" rx="1"/>' +
    '<path class="tb-body" d="M268 84 V30 Q268 20 278 20 H330 Q338 20 341 27 L351 50 L384 53 Q393 54 393 63 V80 Q393 84 389 84 Z"/>' +
    '<path class="tb-glass" d="M318 28 H333 L343 48 H318 Z"/>' +
    '<line x1="314" y1="26" x2="314" y2="80"/><line x1="274" y1="34" x2="304" y2="34"/>' +
    '<line x1="351" y1="50" x2="351" y2="66"/><line x1="389" y1="57" x2="389" y2="74"/>' +
    '<rect class="tb-glass" x="382" y="60" width="6" height="4" rx="1"/>' +
    '<rect class="tb-dark" x="376" y="80" width="20" height="5" rx="1.5"/>' +
    '<path d="M344 46 L348 36 H352 V44"/>' +
    '<rect class="tb-body" x="318" y="70" width="28" height="12" rx="6"/>' +
    '<path class="tb-body" d="M352 84 A15 15 0 0 1 380 84"/>' +
    '<rect class="tb-dark" x="268" y="80" width="46" height="5"/>' +
    wheel(284) + wheel(306) + wheel(366)
  );
}

function trailerGear(floor = 78) {
  return (
    `<rect class="tb-dark" x="16" y="${floor}" width="62" height="6"/>` +
    `<path d="M80 ${floor} V96 H84"/>` +
    `<path d="M214 ${floor} V94 M209 96 H219"/>` +
    wheel(32) + wheel(58)
  );
}

function vanTrailer(ribs) {
  let rHtml = '';
  if (ribs) {
    for (let i = 0; i < 10; i++) {
      rHtml += `<line x1="${26 + i * 24}" y1="18" x2="${26 + i * 24}" y2="78"/>`;
    }
  }
  return (
    '<rect class="tb-body" x="2" y="12" width="262" height="66" rx="2"/>' +
    '<line x1="2" y1="18" x2="264" y2="18"/>' + rHtml +
    '<line x1="10" y1="18" x2="10" y2="78"/><line x1="6" y1="26" x2="6" y2="70"/>' +
    '<rect class="tb-glass" x="2" y="70" width="5" height="4"/>' +
    '<line x1="264" y1="72" x2="276" y2="72"/>'
  );
}

export const TRUCKS = {
  dryVan: vanTrailer(true) + trailerGear() + tractor(),
  reefer: vanTrailer(false) +
    '<rect class="tb-body" x="256" y="22" width="12" height="32" rx="2"/><line x1="259" y1="28" x2="265" y2="28"/><line x1="259" y1="33" x2="265" y2="33"/><line x1="259" y1="38" x2="265" y2="38"/>' +
    '<g transform="translate(132 45)"><line x1="-12" y1="0" x2="12" y2="0"/><line x1="-6" y1="-10.4" x2="6" y2="10.4"/><line x1="-6" y1="10.4" x2="6" y2="-10.4"/></g>' +
    trailerGear() + tractor(),
  flatbed:
    '<rect class="tb-dark" x="2" y="70" width="264" height="8"/><rect class="tb-body" x="256" y="38" width="8" height="32"/><line x1="260" y1="38" x2="260" y2="70"/>' +
    '<circle class="tb-body" cx="40" cy="52" r="18"/><circle cx="40" cy="52" r="7"/>' +
    '<rect class="tb-body" x="70" y="42" width="100" height="28"/><line x1="70" y1="51" x2="170" y2="51"/><line x1="70" y1="60" x2="170" y2="60"/>' +
    '<rect class="tb-body" x="180" y="36" width="70" height="34"/><path d="M180 36 L250 70 M250 36 L180 70"/>' +
    '<line x1="100" y1="42" x2="100" y2="78"/><line x1="140" y1="42" x2="140" y2="78"/><line x1="215" y1="36" x2="215" y2="78"/>' +
    trailerGear() + tractor(),
  uBox:
    '<rect class="tb-dark" x="2" y="70" width="264" height="8"/>' +
    [6, 92, 178].map(x =>
      `<g><rect class="tb-body" x="${x}" y="16" width="80" height="54" rx="4"/><line x1="${x}" y1="24" x2="${x + 80}" y2="24"/><rect x="${x + 24}" y="30" width="32" height="34" rx="1"/><line x1="${x + 40}" y1="30" x2="${x + 40}" y2="64"/></g>`).join('') +
    trailerGear() + tractor()
};

export const LANES = [
  { type: 'dryVan', top: 12, angle: 0, dir: 1, duration: 36, delay: -4, scale: 1 },
  { type: 'reefer', top: 38, angle: 0, dir: -1, duration: 42, delay: -10, scale: 1.05 },
  { type: 'flatbed', top: 62, angle: 4, dir: 1, duration: 44, delay: -24, scale: 0.95 },
  { type: 'uBox', top: 86, angle: -4, dir: -1, duration: 48, delay: -18, scale: 1 }
];

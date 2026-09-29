# HCGA Trading LLC — Documentación técnica del proyecto (handoff para desarrollo)

**Propósito de este documento:** entregar a los programadores todo el contexto de lo que se diseñó y prototipó — qué existe, por qué se tomó cada decisión, qué es lógica real y qué es simulación de demo, y qué falta construir para producción.

Todo lo construido son **prototipos funcionales de alta fidelidad** (HTML/CSS/JS autocontenido, sin backend real). Sirven para validar flujo, UX y pitch a inversionistas — no son la base de código de producción, aunque la lógica de negocio que contienen sí es la especificación de lo que el producto real debe hacer.

---

## 1. Los 4 entregables

| Entregable | Link | Para quién |
|---|---|---|
| **App de Choferes** | https://claude.ai/artifact/HmEURg7ytdJ6JqnSkt9nar | Owner Operators y compañías con flotilla |
| **Client Portal** | https://claude.ai/artifact/H1TqedAB99L2xCWzk1Ez58 | Shippers y brokers |
| **Reel de demo (inversionistas)** | https://claude.ai/artifact/LzD1n8UWMWgEoabRKi5utL | Pitch a inversionistas / reclutamiento |
| **Sitio público** | https://claude.ai/artifact/JG1zo71CP2NawbxTHGuLFT | Marketing / landing page |

Cada uno es un único archivo HTML autocontenido (Vanilla JS, sin frameworks, sin build step). Se puede abrir el link directamente, o pedir el código fuente para clonarlo a un repo.

---

## 2. Decisión de arquitectura: una sola app de choferes, no tres

Se evaluó explícitamente si separar Owner Operator, Flotilla y Cliente en apps distintas. Se decidió que sea **una sola app de choferes** con una bifurcación de cuenta al registrarse (como Amazon Relay):

- **Owner Operator** → flujo de registro individual (documentos, camión propio) → tablero de cargas normal.
- **Compañía con flotilla** → flujo de registro de empresa → **Panel de Flotilla** (roster de camiones/choferes, asignación de cargas) en vez del tablero individual.

El **Client Portal** es una app separada porque el usuario (shipper/broker) y su tarea son fundamentalmente distintos (rastrear y pagar, no manejar).

---

## 3. App de Choferes — especificación funcional

### 3.1 Onboarding
- Selección de tipo de cuenta (Owner Operator / Flotilla) antes que cualquier otro dato.
- **Owner Operator:** datos personales → **captura de documentos** (licencia, comprobante de domicilio, permiso de trabajo/pasaporte, verificación facial, póliza de seguro) → datos del negocio (nombre legal, EIN, MC, DOT) → datos del camión (VIN, placa, modelo).
- **Flotilla:** datos de la compañía (MC, DOT, teléfono) → datos del administrador → se crea con 3 camiones de ejemplo en el roster.
- **Nota de implementación:** la "captura de documentos" es un toque en pantalla que simula verificación (spinner + check). **No hay verificación real de identidad, OCR ni reconocimiento facial real.** Para producción se evaluó y se recomienda un proveedor de KYC (ver sección 8).

### 3.2 Tablero de cargas
- Lista de cargas mock con: origen/destino, millas, tarifa, $/milla, equipo, peso, hora de recogida.
- **Transparencia de pago** por carga: tarifa total, días de pago tras BOL firmado, política de detention, si el broker está verificado (MC), calificación de otros choferes. Si el broker no está verificado, el botón de aceptar queda bloqueado.
- Al aceptar: la carga se **bloquea a esa tarifa** (`lockedRate`) y arranca el flujo DVIR → Tránsito → Entregado.

### 3.3 DVIR (inspección pre-viaje)
- Checklist de 6 puntos (frenos, luces, llantas, espejos, extintor, triángulos). Debe estar 100% conforme para iniciar el viaje. Se guarda en el objeto de la carga activa.

### 3.4 Horas de Servicio (HOS/ELD)
- Reloj con las reglas reales de la FMCSA: **11h límite de manejo, 14h ventana en servicio, descanso de 30 min obligatorio tras 8h sin parar.**
- Botón "+2h de manejo (demo ELD)" simula lo que en producción vendría de un dispositivo ELD real vía API.
- Al llegar a 8h sin descanso, se bloquea seguir manejando hasta registrar el descanso de 30 min. Al llegar a 11h/14h, bloqueo total hasta registrar 10h de descanso (reinicia el turno) — replica la regla real, no solo una alerta cosmética.
- **Decisión de diseño importante:** se descartó la detección de somnolencia por cámara como función principal de esta fase. Ver sección 7.1 para el razonamiento completo.

### 3.5 Detention (espera en muelle)
- 2 horas libres, luego USD 50/hora (parámetros editables: `FREE_DETENTION`, `DETENTION_RATE`). Botón de reclamo que lo registra en la sección de reclamos del perfil.

### 3.6 Navegador / GPS (estilo Trucker Path)
- Filtros por categoría: Todos, Truck Stops, Combustible, Básculas, Descanso.
- Cada punto: calificación con reseñas, precio de diésel, disponibilidad de parqueo (con barra visual), amenidades (duchas, wifi, báscula CAT, etc.). Todo es data mock — no hay integración real a ningún proveedor de datos de truck stops.

### 3.7 Mensajes
- Chat simulado con brokers/shippers (respuestas automáticas de una lista fija). No es mensajería real ni tiene backend.

### 3.8 Asistente HCGA (IA real)
- **Esta es la única función que usa IA real de Claude**, no simulada — vía la capacidad `sample` del sistema de artefactos (requiere declarar `capabilities: {sample: {}}` al publicar).
- Recibe contexto real del estado de la app en cada mensaje: nombre del chofer, tipo de cuenta, carga activa y su etapa, y — si hay una carga en tránsito — los datos exactos del reloj HOS (horas de manejo, en servicio, tiempo desde el último descanso).
- Instrucción explícita en el prompt: **puede hablar de cualquier tema**, y si el chofer pregunta por fatiga/descanso, debe usar los datos reales del reloj HOS y aclarar que esta versión no tiene cámara ni sensor de fatiga — nunca debe inventar una detección.
- El aviso de "debes descansar" NO es una función aparte: es un mensaje que el propio código (no la IA) inserta en el chat cuando el reloj HOS cruza el umbral de 8h — luego la IA puede conversar sobre eso con contexto real.
- Implementación: `buildAssistantTurns()` arma el historial user/assistant en cada llamada (sin memoria entre llamadas, se reenvía todo el historial), con streaming vía `onText`.

### 3.9 Perfil
- Estadísticas (viajes, calificación, placa), **Ganancias** (total ganado, pendiente de cobro, historial de cargas pagadas — calculado del historial real de cargas completadas), checklist de verificación de identidad, membresía (pago simulado, sin procesar tarjetas reales), sección de "Protección del chofer" con reclamos abiertos y botón de reporte.

### 3.10 Panel de Flotilla (solo cuentas tipo flotilla)
- Roster de camiones con su chofer asignado y estado. Botones para agregar camión y asignar chofer (simulado). Reemplaza el tablero de cargas individual y el navegador GPS en la barra de pestañas.

---

## 4. Client Portal — especificación funcional

### 4.1 Onboarding
- Registro simple: empresa, contacto, correo, tipo de cuenta (Shipper/Broker). Sin verificación de documentos (a diferencia del chofer).

### 4.2 Envíos
- Dashboard con envíos activos/entregados y total facturado. Cada envío tiene una **línea de tiempo sincronizada con las etapas reales del chofer** (Reservado → Inspección → En tránsito con % → Entregado).
- **Temperatura de reefer** visible cuando el equipo es Reefer.
- Datos del conductor asignado (nombre, camión).

### 4.3 Documentos y firma digital
- Cada envío tiene **Rate Confirmation** y **BOL**: botón de "Subir" (acepta cualquier archivo, no valida contenido) → una vez subido, botón de "Firmar" que abre un **lienzo de firma real** (canvas HTML5, funciona con mouse y con el dedo en táctil) → al confirmar, queda marcado "Firmado por [nombre] · [fecha]".

### 4.4 Solicitar transporte
- Formulario que publica una carga nueva (origen, destino, equipo, peso, tarifa, fecha, notas). Se agrega al listado de Envíos en estado "Reservado".

### 4.5 Verificar (Carrier Vetting)
- Campo de número MC → botón "Verificar cumplimiento MC" → simula consulta a FMCSA (spinner de ~1 segundo) → resultado con: autoridad FMCSA, estado del seguro, calificación de seguridad, veredicto (Apto / Revisar / No apto).
- MC de prueba incluidos en el código: `451207` (apto), `118845` (revisar), `204477` (no apto). Base de datos mock (`MC_DATABASE`) fácil de ampliar o de reemplazar por la API real de la FMCSA.

### 4.6 Mensajes
- Igual que en la app de choferes: chat simulado, sin backend real.

### 4.7 Cuenta
- Facturación (lista de invoices con estado pagada/pendiente), **Registro de integraciones (API)**: cada verificación de MC o solicitud de carga genera una línea tipo `GET /v1/fmcsa/authority?mc=451207 → 200 OK` — da credibilidad técnica en demos, pero son *logs simulados*, no hay llamadas de red reales.

---

## 5. Sistema de diseño (compartido entre los 3 productos)

```css
--ink:      #14171A   /* fondo principal, negro asfalto */
--panel:    #1C2024   /* tarjetas */
--panel-2:  #22262B   /* elementos anidados dentro de tarjetas */
--red:      #9E2A2F   /* marca, degradado del header */
--red-bright: #C6383E /* acciones primarias, acentos */
--amber:    #D98A2B   /* combustible, advertencias, detention */
--green:    #4C8B5D   /* éxito, cumplimiento, verificado */
--text:     #F3F1ED   /* texto principal, blanco cálido */
--text-dim: #9AA0A6   /* texto secundario */
```

- **Tipografía:** Barlow Condensed (700, titulares — sensación de señalización de autopista) + Inter (cuerpo). Ambas de Google Fonts.
- **Iconografía:** SVG dibujados a mano, sin librería de íconos externa.
- Las tres apps y el sitio público comparten esta misma paleta y tipografía a propósito, para que se sientan como un solo producto.

---

## 6. Notas de implementación técnica (importante para desarrollo real)

- **Todo el estado vive en `localStorage`** del navegador (`hcga_driver_state_v1`, `hcga_client_state_v1`), no hay base de datos ni servidor. Cerrar sesión = borrar ese storage.
- **No hay autenticación real** — cualquier dato en los formularios de registro "funciona".
- **No hay pasarela de pago real** — el formulario de membresía y cualquier "pago" es un mock de UI, no toca Stripe/ningún procesador.
- **El Asistente de IA es la única integración real** (API de Claude vía la capacidad `sample`); todo lo demás (chat con brokers, verificación de documentos, vetting de MC, GPS) es simulado con datos fijos o generados en el cliente.
- Arquitectura de cada archivo: un solo `<script>` con un objeto `state`, funciones `render*()` que regresan HTML por template literal, y `bindEvents()` que reata los listeners tras cada render (patrón simple tipo "render inmediato", sin virtual DOM ni framework).

---

## 7. Decisiones estratégicas y su razonamiento (bitácora)

### 7.1 Por qué NO se construyó detección de somnolencia por cámara en esta fase

Se investigó a fondo el mercado de detección de fatiga por cámara (Motive, Samsara, Netradyne, Lytx, Seeing Machines, Smart Eye, y el único proveedor de SDK solo-celular encontrado: **WingDriver**). Conclusiones clave:
- Los líderes del sector (Motive, Samsara, etc.) requieren **hardware dedicado** (cámara de doble vista), no funcionan solo con el celular.
- WingDriver es el único con SDK para apps móviles sin hardware, pero es una startup muy pequeña y sin validación independiente publicada.
- Un estudio académico (JOEM, 2025) en camiones rurales encontró que el sistema de cámaras acertaba la fatiga solo 49% de las veces, con 32% de falsos positivos.
- Riesgo legal real: acuerdos de demanda biométrica de **USD 4.25M (Lytx)** y **USD 3.95M (Samsara)** en 2025 bajo la ley BIPA de Illinois, por no obtener consentimiento adecuado para escaneo facial.

**Decisión:** en esta fase, el aviso de manejo prolongado se calcula del **reloj de Horas de Servicio (ELD)** — datos objetivos y ya obligatorios por ley — en vez de "detectar" fatiga con una cámara. Es más barato, no tiene riesgo biométrico, y es exactamente la misma inversión que ya se necesita para cumplimiento legal de HOS. La detección real por cámara queda como posible Fase 2, evaluando WingDriver u otro proveedor cuando haya presupuesto y se valide con un piloto pagado.

### 7.2 Por qué se prioriza "socio transportista" sobre "vender datos de mapeo" a empresas de camiones autónomos

Se evaluó la idea de instrumentar la flotilla para vender datos de mapeo a Aurora/Kodiak/Waabi. Hallazgos:
- Ninguna de las tres tiene un programa público de compra de datos de mapeo a terceros — construyen su propio mapeo internamente por razones de responsabilidad legal del *safety case*.
- Sí existe un modelo de negocio probado y documentado: convertirse en **transportista socio** de sus camiones autónomos (como hicieron Hirschbach, Werner, Covenant, US Xpress y **Value Truck**, un transportista mediano — no solo los gigantes).
- Ninguna de las tres tiene todavía un corredor comercial activo en Florida (foco geográfico de HCGA); su expansión sigue concentrada en Texas/Suroeste, con planes declarados de expandirse a más estados hacia 2028.

**Decisión:** posicionar a HCGA como candidato a transportista de lanzamiento en Florida cuando esa expansión llegue, en vez de intentar vender datos de mapeo sin un comprador confirmado.

### 7.3 Por qué la plataforma no reemplaza al broker, pero sí compite con los malos

Se analizó si la tecnología puede prescindir de los brokers de carga. Conclusión: no — resuelven fragmentación, riesgo de crédito y cumplimiento que la tecnología por sí sola no elimina (evidencia: el cierre de Convoy en 2023 tras apostar por eliminar al broker). Lo que sí cambia es que el trabajo manual se está digitalizando (Uber Freight, C.H. Robinson, J.B. Hunt 360). **Decisión de producto:** HCGA no busca eliminar al broker, sino construir la plataforma que **protege al chofer de los brokers abusivos** (tarifa bloqueada, detention pagado, calificaciones, reclamos) — ver sección 3.5, 3.9 y 4.5.

### 7.4 Pendiente de decidir: modelo de pago

Prometer protección real al chofer (que le paguen) implica que HCGA garantice el pago — lo cual requiere capital de trabajo propio, un socio de factoraje, o exigir que el embarcador deposite en garantía (escrow) antes de que el chofer acepte la carga. **Esta decisión de negocio sigue pendiente** y determina si HCGA necesita operar con autoridad de broker (registro MC ante la FMCSA) o no.

---

## 8. Pendientes para producción (lo que un backend real necesita resolver)

- **KYC / verificación de identidad real:** integrar un proveedor (Persona, Onfido, Stripe Identity o similar) para reemplazar la simulación de captura de documentos.
- **Firma electrónica con validez legal:** la firma actual es solo un dibujo en canvas guardado en el estado local; para validez legal real se necesita algo como DocuSign API o Adobe Sign.
- **ELD real:** integrar vía API con un proveedor certificado (Motive, Samsara, Geotab) en vez del botón "+2h de manejo (demo)".
- **Verificación de transportistas real:** conectar a la API real de la FMCSA (SAFER) en vez de `MC_DATABASE` mock.
- **Pagos y facturación real:** procesador de pagos (Stripe u otro) + decisión del modelo de pago (sección 7.4).
- **Base de datos y autenticación real** — hoy todo vive en `localStorage` del navegador de cada usuario, sin sincronización entre dispositivos ni servidor central.
- **Mapas y truck stops reales:** reemplazar los datos mock del Navegador con una fuente real (Google Places API u otro proveedor de datos de truck stops/combustible).
- **Mensajería real:** un backend de chat (ej. sobre Firebase, Supabase o un WebSocket propio) en vez de las respuestas automáticas fijas.

---

## 9. Cómo abrir y probar cada entregable

1. Abre cualquiera de los 4 links de la sección 1 directamente en el navegador.
2. En la App de Choferes y el Client Portal, el primer uso pide "crear cuenta" — cualquier dato de prueba funciona.
3. Para reiniciar la demo: Perfil/Cuenta → Cerrar sesión (borra el `localStorage` de esa app).
4. El código fuente completo de cada uno puede pedirse como archivo `.html` para clonarlo a un repositorio real.

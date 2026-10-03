# HCGA Trading — App móvil (React + Vite + Tailwind + Capacitor)

Migración del prototipo HTML/CSS/JS (guardado sin cambios en `../original/`) a un proyecto React
empaquetable como **APK de Android** con Capacitor. Diseño, estilos y funcionalidades son los mismos
que en el original.

## Requisitos

- Node.js 18+ y npm
- Android Studio (con Android SDK) para el emulador y la APK
- JDK: el que trae Android Studio (`Android Studio/jbr`) — el proyecto usa Gradle 9.1, compatible con Java 25

## Comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor de desarrollo (http://localhost:5173). También accesible desde el móvil en la misma red |
| `npm run build` | Compila la web en `dist/` |
| `npm run android:sync` | Compila y copia la web al proyecto Android |
| `npm run android:open` | Abre el proyecto en Android Studio (Run ▶ para emulador o dispositivo) |
| `npm run android:run` | Compila, sincroniza e instala en el emulador/dispositivo conectado |
| `npm run android:apk` | Genera la APK de depuración en `android/app/build/outputs/apk/debug/app-debug.apk` |

Para `android:apk` desde terminal, define antes `JAVA_HOME` con el JDK de Android Studio, por ejemplo en PowerShell:

```powershell
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
npm run android:apk
```

> Expo Go no se usa: Expo Go solo ejecuta apps React Native, y este proyecto es React web (Vite)
> empaquetado con Capacitor, que conserva el diseño original al 100 %. La vista previa móvil se hace
> en el emulador de Android Studio o en el navegador del móvil con `npm run dev`.

## Estructura

```
src/
  main.jsx, App.jsx           Entrada y rutas (HashRouter: /, /chofer, /flotilla, /embarcador, /operaciones)
  styles/
    tokens.css                Tokens de diseño originales (variables CSS, tema claro/oscuro)
    base.css                  Reset original (Preflight de Tailwind desactivado para no alterar estilos)
    vendor.css                Ajustes sobre DOM de Leaflet y del SVG de camiones (fuera del alcance de JSX)
    index.css                 Importa lo anterior + Tailwind
  context/                    Estado global persistido (AppStateContext) y notificaciones (ToastContext)
  hooks/                      Lógica reutilizable: tema, metadatos, mapa Leaflet, simulación de ruta,
                              reloj HOS, firma digital, consulta MC y chatbot
  components/
    ui/                       Button, Badge, Card, MetricBox, DataTable, Modal, Form, Timeline, MapCanvas
    layout/                   Cabecera, banner, maquetación, fondo de camiones, estructura de plataforma
    chatbot/                  Copiloto IA flotante
    icons/                    Iconos SVG del diseño original
  features/                   Tarjetas de cada plataforma (driver, fleet, shipper, ops, maps, loads)
  pages/                      Una pantalla por plataforma + selector
  data/                       Datos simulados, perfiles del chat, geografía y dibujo de camiones
  lib/                        Utilidades puras (geografía, capas de mapa, clases)
tailwind.config.js            Tailwind mapeado a los tokens (colores, espaciado, radios, sombras, animaciones)
capacitor.config.json         Configuración de la APK (appId com.hcgatrading.app)
android/                      Proyecto nativo Android generado por Capacitor
```

## Notas

- Los estilos se escriben con utilidades de Tailwind que apuntan a las variables de los tokens, así el
  cambio de tema (`data-theme`) funciona igual que antes. Solo quedan en CSS los tokens, el reset original
  y los ajustes sobre elementos que genera Leaflet.
- El estado se guarda en `localStorage` con la misma clave del original (`hcga_app_unified_state`).
- Los mapas y las fuentes se cargan de internet (teselas de Esri y Google Fonts), igual que en el original.

import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppStateProvider } from './context/AppStateContext';
import { ToastProvider } from './context/ToastContext';
import { useTheme } from './hooks/useTheme';
import { TruckBackground } from './components/layout/TruckBackground';
import PlatformSelectorPage from './pages/PlatformSelectorPage';
import DriverPage from './pages/DriverPage';
import FleetPage from './pages/FleetPage';
import ShipperPage from './pages/ShipperPage';
import OpsPage from './pages/OpsPage';

function AppShell() {
  useTheme(); // aplica data-theme en <html>
  return (
    <>
      <TruckBackground />
      <Routes>
        <Route path="/" element={<PlatformSelectorPage />} />
        <Route path="/chofer" element={<DriverPage />} />
        <Route path="/flotilla" element={<FleetPage />} />
        <Route path="/embarcador" element={<ShipperPage />} />
        <Route path="/operaciones" element={<OpsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

// HashRouter: las rutas funcionan igual en el navegador y dentro de la APK (archivos locales)
export default function App() {
  return (
    <AppStateProvider>
      <ToastProvider>
        <HashRouter>
          <AppShell />
        </HashRouter>
      </ToastProvider>
    </AppStateProvider>
  );
}

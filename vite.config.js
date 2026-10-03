import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' para que el build funcione dentro de la APK (Capacitor sirve archivos locales)
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { host: true, port: 5173 }
});

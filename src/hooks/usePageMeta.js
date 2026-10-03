import { useEffect } from 'react';

/** Título de la pestaña y meta description de cada pantalla (antes eran páginas HTML separadas). */
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);
}

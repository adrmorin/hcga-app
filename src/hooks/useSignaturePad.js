import { useCallback, useEffect, useRef } from 'react';

/**
 * Lienzo de firma digital (ratón y táctil). Mismo comportamiento que el original:
 * trazo #0f172a de 2.5px y se limpia cada vez que se abre el modal.
 */
export function useSignaturePad(canvasRef, active) {
  const drawing = useRef(false);

  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  }, [canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!active || !canvas) return undefined;

    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    clear();

    const start = e => {
      drawing.current = true;
      const rect = canvas.getBoundingClientRect();
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };
    const draw = e => {
      if (!drawing.current) return;
      const rect = canvas.getBoundingClientRect();
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    };
    const stop = () => { drawing.current = false; };

    const onTouchStart = e => start(e.touches[0]);
    const onTouchMove = e => { draw(e.touches[0]); e.preventDefault(); };

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stop);
    canvas.addEventListener('touchstart', onTouchStart);
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', stop);

    return () => {
      canvas.removeEventListener('mousedown', start);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stop);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', stop);
    };
  }, [active, canvasRef, clear]);

  return { clear };
}

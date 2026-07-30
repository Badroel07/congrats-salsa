import { useEffect, useRef, useCallback } from 'react';

export interface SmoothScrollHandle {
  /** Animasi programmatic ke absolute Y (px). Tersinkron dengan engine. */
  scrollTo: (targetY: number) => void;
}

/**
 * Engine smooth scroll mandiri (tanpa library).
 * - Desktop wheel di-intercept → targetY diinterpolasi via rAF → window.scrollTo(0, y).
 * - Tidak ada virtual transform/wrapper → position: sticky tetap berfungsi.
 * - Touch, keyboard, scrollbar tetap native; target engine disinkronkan dari scroll event
 *   saat engine tidak sedang menganimasi (tidak menarik balik posisi).
 * - prefers-reduced-motion → bypass total (native).
 */
export function useSmoothScroll(enabled: boolean): SmoothScrollHandle {
  // Impl aktual didaftarkan oleh effect; default = native instant jump
  const scrollToImplRef = useRef<(y: number) => void>((y) => window.scrollTo(0, y));

  /** Programmatic scroll — dipakai navigasi slide/dots. Stabil sepanjang masa. */
  const scrollTo = useCallback((targetY: number) => {
    scrollToImplRef.current(targetY);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // ─── State engine (lokal effect, cleanup penuh) ───
    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let rafId: number | null = null;
    let animating = false;
    let lastTime = 0;

    const getMaxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const clampY = (y: number) => Math.min(Math.max(y, 0), getMaxScroll());

    // ─── prefers-reduced-motion → engine bypass ───
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = mql.matches;
    const onMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
    };
    mql.addEventListener('change', onMotionChange);

    function tick(time: number) {
      // Frame-rate-aware lerp: kecepatan konstan di 60Hz maupun 120Hz+
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const speed = 7; // makin besar makin responsif
      const t = 1 - Math.exp(-dt * speed);

      targetY = clampY(targetY);
      currentY += (targetY - currentY) * t;

      const diff = targetY - currentY;
      if (Math.abs(diff) < 0.5) {
        currentY = targetY;
        window.scrollTo(0, currentY);
        animating = false;
        rafId = null;
        return;
      }

      window.scrollTo(0, currentY);
      rafId = requestAnimationFrame(tick);
    }

    function startAnim() {
      animating = true;
      if (rafId === null) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    }

    // Daftarkan impl programmatic scroll (tersinkron dengan engine)
    scrollToImplRef.current = (y: number) => {
      const clamped = clampY(y);
      if (reducedMotion) {
        targetY = clamped;
        currentY = clamped;
        window.scrollTo(0, clamped);
        return;
      }
      targetY = clamped;
      currentY = window.scrollY;
      startAnim();
    };

    const isFormTarget = (el: EventTarget | null): boolean =>
      el instanceof HTMLElement &&
      el.closest('input, textarea, select, option, [contenteditable]') !== null;

    /** Nested container yang masih bisa scroll ke arah delta → biarkan native. */
    const hasScrollableAncestor = (el: EventTarget | null, deltaY: number): boolean => {
      let node = el instanceof HTMLElement ? el : null;
      while (node && node !== document.body && node !== document.documentElement) {
        const style = window.getComputedStyle(node);
        const overflowY = style.overflowY;
        if (
          (overflowY === 'auto' || overflowY === 'scroll') &&
          node.scrollHeight > node.clientHeight + 1
        ) {
          const canDown = node.scrollTop < node.scrollHeight - node.clientHeight - 1;
          const canUp = node.scrollTop > 1;
          if ((deltaY > 0 && canDown) || (deltaY < 0 && canUp)) return true;
        }
        node = node.parentElement;
      }
      return false;
    };

    const normalizeDelta = (e: WheelEvent): number => {
      switch (e.deltaMode) {
        case 1: // line
          return e.deltaY * 16;
        case 2: // page
          return e.deltaY * window.innerHeight;
        default: // pixel
          return e.deltaY;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Bypass: zoom (ctrl), reduced motion, form/contenteditable, nested scrollable
      if (e.ctrlKey || reducedMotion) return;
      if (isFormTarget(e.target)) return;

      const delta = normalizeDelta(e);
      if (delta === 0) return;
      if (hasScrollableAncestor(e.target, delta)) return;

      e.preventDefault();

      // Wheel di tengah animasi → tambahkan delta ke target (lanjut natural, tanpa pull-back).
      // Wheel fresh → sinkronkan dulu dari posisi aktual.
      if (!animating) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
      targetY = clampY(targetY + delta);
      startAnim();
    };

    /** Scroll native (keyboard, Home/End, scrollbar drag, anchor) → sinkronkan engine. */
    const handleNativeScroll = () => {
      if (animating) return;
      targetY = window.scrollY;
      currentY = window.scrollY;
    };

    const handleResize = () => {
      targetY = clampY(targetY);
      if (!animating) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleNativeScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      scrollToImplRef.current = (y) => window.scrollTo(0, y);
      mql.removeEventListener('change', onMotionChange);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleNativeScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [enabled]);

  return { scrollTo };
}

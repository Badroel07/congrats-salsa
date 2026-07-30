import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function RawrClosing() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Track 250dvh → scrollable = 250dvh - 100dvh = 150dvh efektif
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Fase 1 (0→0.5): gambar zoom dari bawah, kepala dulu
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.5, 4.5]);
  const imgY = useTransform(scrollYProgress, [0, 0.5], [45, -8]);

  // Fase 2 (0.5→0.78): overlay hitam fade in
  const overlayOpacity = useTransform(scrollYProgress, [0.5, 0.78], [0, 1]);

  // Fase 3 (0.65→0.85): teks RAWERRRR muncul lalu tetap bertahan sampai akhir
  const textOpacity = useTransform(scrollYProgress, [0.65, 0.85, 1], [0, 1, 1]);
  const textScale = useTransform(scrollYProgress, [0.65, 0.85, 1], [1.3, 1, 1]);
  const textY = useTransform(scrollYProgress, [0.65, 0.85, 1], [24, 0, 0]);

  return (
    <div ref={trackRef} style={{ height: '250dvh' }} className="relative w-full bg-black">
      <div
        id="slide-3"
        className="sticky top-0 w-full h-[100dvh] overflow-hidden bg-black"
        role="region"
        aria-label="Penutup"
      >
        {/* ── Gambar — zoom dari bawah dengan origin-bottom, kepala dulu ── */}
        <motion.div
          style={{ scale, y: imgY, originY: 1 }}
          className="absolute bottom-0 left-0 right-0 flex justify-center z-10 pointer-events-none"
        >
          <img
            src="/images/hero_char4.png"
            alt="Karakter penutup"
            className="w-[70vw] max-w-[520px] h-auto object-contain select-none"
          />
        </motion.div>

        {/* ── Black overlay fade in ── */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black z-20 pointer-events-none"
        />

        {/* ── RAWERRRR ── */}
        <motion.div
          style={{ opacity: textOpacity, scale: textScale, y: textY }}
          className="relative z-30 flex items-center justify-center h-full pointer-events-none"
        >
          <h1
            className="text-[14vw] sm:text-[12vw] md:text-[10vw] font-elegant font-bold text-white tracking-tight leading-none select-none"
            aria-hidden="true"
          >
            RAWERRRR
          </h1>
          <span className="sr-only">Penutup — terima kasih</span>
        </motion.div>
      </div>
    </div>
  );
}

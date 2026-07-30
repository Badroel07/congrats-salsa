import { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../content/site.config';
import { Heart } from '@phosphor-icons/react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface LoveLetterProps {
  step: number;
  onStepChange?: (step: number) => void;
}

export default function LoveLetter({ step, onStepChange }: LoveLetterProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { loveLetterParagraphs } = siteConfig;
  
  // 3 foto Salsa yang baru
  const stripPhotos = [
    { url: '/images/salsa1.jpeg', alt: 'Salsa 1' },
    { url: '/images/salsa2.jpeg', alt: 'Salsa 2' },
    { url: '/images/salsa3.jpeg', alt: 'Salsa 3' },
  ];
  const totalSteps = loveLetterParagraphs.length;
  const safeStep = Math.min(Math.max(step, 0), totalSteps - 1);
  const isLastStep = safeStep === totalSteps - 1;

  // Parallax untuk gambar karakter
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const charY = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const charRotate = useTransform(scrollYProgress, [0, 1], [3, -3]);

  // Reduced motion → crossfade only; otherwise gentle fade+slide
  const stepTransition = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } };

  return (
    <div
      ref={sectionRef}
      className="w-full h-full flex items-center justify-center select-none relative overflow-hidden"
      role="region"
      aria-label="Surat cinta"
    >
      {/* ─── Background Ambience ─── */}
      <div className="absolute top-1/2 right-[10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-[radial-gradient(circle,_rgba(253,184,19,0.10)_0%,_transparent_65%)] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-[60%] left-[5%] w-[40vw] h-[40vw] max-w-[450px] max-h-[450px] rounded-full bg-[radial-gradient(circle,_rgba(255,140,163,0.07)_0%,_transparent_65%)] pointer-events-none -translate-y-1/2" />

      {/* ─── Decorative corner ornaments ─── */}
      <svg className="absolute top-6 left-6 w-10 h-10 text-[#FDB813]/15 pointer-events-none hidden md:block" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M0 0 L16 0 C14 6 8 12 0 16 Z" fill="currentColor" />
        <circle cx="30" cy="10" r="2" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-6 right-6 w-10 h-10 text-[#FF8CA3]/12 pointer-events-none hidden md:block" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M40 40 L24 40 C26 34 32 28 40 24 Z" fill="currentColor" />
        <circle cx="10" cy="30" r="2" fill="currentColor" />
      </svg>

      {/* ─── Main Two-Column Layout ─── */}
      <div className="relative z-10 w-full max-w-6xl h-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 lg:gap-12 px-4 sm:px-6 md:px-10 lg:px-14 py-6 md:py-10">

        {/* ── LEFT: Character Image ── */}
        <motion.div
          style={{ y: charY, rotate: charRotate }}
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex-shrink-0 w-44 h-44 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 flex items-end justify-center"
        >
          <motion.img
            src="/images/hero_char3.png"
            alt="Karakter"
            className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(253,184,19,0.18)] select-none pointer-events-none"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* ── RIGHT: Content Stack (Photostrip + Letter Card) ── */}
        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5 w-full max-w-lg md:max-w-xl lg:max-w-2xl">

          {/* ── Horizontal Photostrip with washi tape ── */}
          <motion.div
            initial={{ opacity: 0, rotate: -4, y: 20 }}
            animate={{ opacity: 1, rotate: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.25 }}
            className="relative w-full max-w-md md:max-w-lg"
          >
            <div className="absolute -top-3 -left-2 w-12 h-5 bg-[#FFCCD5]/70 rotate-[-6deg] z-20 rounded-sm shadow-sm" />
            <div className="absolute -top-3 -right-2 w-10 h-5 bg-[#FFE59E]/70 rotate-[4deg] z-20 rounded-sm shadow-sm" />
            <div className="absolute -bottom-3 -left-2 w-11 h-5 bg-[#C5E0B4]/60 rotate-[3deg] z-20 rounded-sm shadow-sm" />
            <div className="absolute -bottom-3 -right-2 w-10 h-5 bg-[#FFCCD5]/60 rotate-[-4deg] z-20 rounded-sm shadow-sm" />

            <div className="flex gap-1.5 sm:gap-2 bg-white rounded-xl p-2 sm:p-2.5 shadow-lg border border-[#FFE59E]/30">
              {stripPhotos.map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
                  className="flex-1 aspect-[3/4] rounded-md overflow-hidden bg-gray-100 shadow-inner"
                >
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Love Letter Card — Step-based ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
            className="relative w-full"
          >
            <div className="absolute inset-2 bg-[#3E2723]/8 rounded-3xl blur-xl -z-10" />

            <div className="relative bg-white rounded-2xl shadow-xl border border-[#FFE59E]/25 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-[#FDB813] via-[#FF8CA3] to-[#90B77D]" />

              {/* Wax seal */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 z-20">
                <div className="w-full h-full rounded-full bg-[#FF8CA3] shadow-md flex items-center justify-center ring-2 ring-white">
                  <Heart size={14} weight="fill" className="text-white" />
                </div>
              </div>

              {/* Letter content — NO scrollbar, single paragraph per step */}
              <div className="p-5 sm:p-6 md:p-8">
                <p className="text-center font-handwritten text-xs sm:text-sm text-[#FDB813] tracking-widest uppercase mb-4">
                  ✦ surat untuk kamu ✦
                </p>

                {/* Active paragraph with AnimatePresence */}
                <div
                  className="min-h-[8rem] sm:min-h-[9rem] md:min-h-[10rem] flex items-center justify-center"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={`ll-${safeStep}`}
                      initial={stepTransition.initial}
                      animate={stepTransition.animate}
                      exit={stepTransition.exit}
                      transition={{ duration: prefersReducedMotion ? 0.25 : 0.5, ease: 'easeInOut' }}
                      className="font-handwritten text-[14px] sm:text-[15px] md:text-[16px] text-[#3E2723]/85 leading-relaxed text-center"
                      style={{ fontFamily: 'var(--font-handwritten), cursive' }}
                    >
                      {loveLetterParagraphs[safeStep].text}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Signature — only at last step */}
                {isLastStep && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-center justify-between pt-3 mt-3 border-t border-[#FFE59E]/30"
                  >
                    <div className="flex flex-col">
                      <span className="font-signature text-sm md:text-base text-[#3E2723]/70 italic leading-tight">
                        Dengan segenap cinta,
                      </span>
                      <span className="font-signature text-base md:text-lg text-[#3E2723] font-semibold leading-tight">
                        {siteConfig.sender.name} 💕
                      </span>
                    </div>
                    <Heart size={22} weight="fill" className="text-[#FF8CA3] animate-pulse-soft" />
                  </motion.div>
                )}

                {/* Micro decorative line */}
                <div className="w-12 h-[2px] bg-[#FFE59E] rounded-full mx-auto mt-4" aria-hidden="true" />

                {/* Progress dots + hint */}
                <div className="flex flex-col items-center gap-3 mt-3">
                  <div className="flex items-center gap-2" role="group" aria-label="Progres surat">
                    {loveLetterParagraphs.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => onStepChange?.(i)}
                        aria-label={`Paragraf ${i + 1} dari ${totalSteps}`}
                        aria-current={i === safeStep ? 'step' : undefined}
                        className={`rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8CA3] ${
                          i === safeStep
                            ? 'w-6 h-2 bg-[#FF8CA3]'
                            : 'w-2 h-2 bg-[#3E2723]/20 hover:bg-[#FF8CA3]/50'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] sm:text-xs font-sans text-[#3E2723]/45 tracking-wide">
                    {isLastStep ? 'gulir lagi untuk melanjutkan ↓' : 'lanjut baca yaa ↓'}
                  </p>
                </div>
              </div>

              <div className="h-1 bg-gradient-to-r from-[#90B77D] via-[#FF8CA3] to-[#FDB813]" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
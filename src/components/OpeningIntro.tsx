import { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Heart, Sparkle, Star } from '@phosphor-icons/react';
import { siteConfig } from '../content/site.config';
import { useReducedMotion } from '../hooks/useReducedMotion';

import { getInteractiveScrollHint } from './LoveLetter';

interface OpeningIntroProps {
  step: number;
  progress?: number;
  onStepChange?: (step: number) => void;
}

export default function OpeningIntro({ step, progress = 0, onStepChange }: OpeningIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const messages = siteConfig.openingMessages;
  const totalSteps = messages.length;
  const safeStep = Math.min(Math.max(step, 0), totalSteps - 1);

  // ── Framer Motion Parallax (static while pinned — no flicker) ──
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const leftStickerY = useTransform(scrollYProgress, [0, 1], [-20, 40]);
  const rightStickerY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const charFloatY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -12, 0]);

  // Reduced motion → crossfade only; otherwise gentle vertical drift
  const stepTransition = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -16 } };

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 select-none relative overflow-hidden"
      role="region"
      aria-label="Pesan pembuka"
    >
      {/* ── PERNAK-PERNIK BACKGROUD: Sparkles & Stars ── */}
      <motion.div
        animate={{ scale: [0.8, 1.25, 0.8], rotate: [0, 45, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-14 left-24 sm:left-40 md:left-56 text-[#FDB813] z-0 pointer-events-none drop-shadow-sm"
        aria-hidden="true"
      >
        <Sparkle size={30} weight="fill" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.3, 1], rotate: [0, -30, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        className="absolute top-16 right-24 sm:right-40 md:right-56 text-[#FF8CA3] z-0 pointer-events-none drop-shadow-sm"
        aria-hidden="true"
      >
        <Sparkle size={26} weight="fill" />
      </motion.div>

      <motion.div
        animate={{ scale: [0.85, 1.2, 0.85], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 2.9, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        className="absolute bottom-28 right-28 sm:right-44 md:right-60 text-[#FDB813] z-0 pointer-events-none"
        aria-hidden="true"
      >
        <Star size={24} weight="fill" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0], opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-40 left-10 sm:left-20 text-[#FF8CA3]/80 z-0 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <Heart size={22} weight="fill" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute bottom-36 right-12 sm:right-24 text-[#FDB813]/80 z-0 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <Heart size={20} weight="fill" />
      </motion.div>

      {/* ── PERNAK-PERNIK BACKGROUD: Scrapbook Badges ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
        animate={{ opacity: 0.85, scale: 1, rotate: -6 }}
        whileHover={{ scale: 1.05, rotate: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-24 left-8 sm:left-14 md:left-24 z-10 pointer-events-none select-none bg-[#FFE59E]/90 border-2 border-dashed border-[#FDB813]/70 rounded-xl px-3 py-1.5 shadow-sm rotate-[-6deg] hidden sm:flex items-center gap-1.5"
        aria-hidden="true"
      >
        <span className="text-[11px] font-handwritten font-bold text-[#3E2723]/85 tracking-wide uppercase">✨ special for salsa</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
        animate={{ opacity: 0.85, scale: 1, rotate: 8 }}
        whileHover={{ scale: 1.05, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute bottom-28 right-8 sm:right-16 md:right-24 z-10 pointer-events-none select-none bg-[#FFCCD5]/90 border-2 border-dashed border-[#FF8CA3]/70 rounded-xl px-3 py-1.5 shadow-sm rotate-[8deg] hidden sm:flex items-center gap-1.5"
        aria-hidden="true"
      >
        <span className="text-[11px] font-handwritten font-bold text-[#3E2723]/85 tracking-wide uppercase">🎉 proud of you</span>
      </motion.div>

      {/* Decorative sticker backgrounds */}
      <motion.div
        style={{ y: leftStickerY }}
        className="absolute top-10 left-6 sm:left-12 md:left-20 w-16 h-16 opacity-85 z-10 pointer-events-none drop-shadow-md rotate-[-12deg]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-[#FF8CA3]">
          <path d="M50 35 C50 15, 20 15, 20 40 C20 65, 50 85, 50 85 C50 85, 80 65, 80 40 C80 15, 50 15, 50 35 Z" />
        </svg>
      </motion.div>

      {/* ── Background Decorative Nailong Image (Sudut Kiri Bawah - Nempel Tanpa Celah) ── */}
      <motion.div
        className="absolute -bottom-2 -left-4 sm:-bottom-2 sm:left-0 md:-bottom-2 md:left-4 lg:-bottom-2 lg:left-8 z-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <motion.img
          src="/images/nai1.png"
          alt="Nailong Deco"
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-56 sm:w-72 md:w-80 lg:w-[26rem] xl:w-[28rem] h-auto object-contain object-bottom drop-shadow-xl opacity-100 origin-bottom"
        />
      </motion.div>

      {/* ── Background Decorative Nailong Image (Sudut Kanan Atas - Rotasi & Cermin 180 Derajat) ── */}
      <div
        className="absolute -top-2 -right-4 sm:-top-2 sm:right-0 md:-top-2 md:right-4 lg:-top-2 lg:right-8 z-0 pointer-events-none select-none rotate-180 -scale-x-100 origin-center"
        aria-hidden="true"
      >
        <motion.img
          src="/images/nai1.png"
          alt="Nailong Deco Inverted"
          initial={{ opacity: 0, scale: 0.85, y: -30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-56 sm:w-72 md:w-80 lg:w-[26rem] xl:w-[28rem] h-auto object-contain object-bottom drop-shadow-xl opacity-100 origin-bottom"
        />
      </div>

      <motion.div
        style={{ y: rightStickerY }}
        className="absolute bottom-10 right-6 sm:right-12 md:right-20 w-16 h-16 opacity-85 z-10 pointer-events-none drop-shadow-md rotate-[15deg]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-[#FDB813]">
          <path d="M50 0 L63 37 L100 50 L63 63 L50 100 L37 63 L0 50 L37 37 Z" />
        </svg>
      </motion.div>

      {/* ─── Two-Column Layout: Character Image (Left) + Message Card (Right) ─── */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12">
        
        {/* ── Left Column: Character Image (appears at step ≥ 1) ── */}
        <motion.div
          style={{ y: charFloatY }}
          className="flex-shrink-0 w-80 h-80 sm:w-96 sm:h-96 md:w-[27rem] md:h-[27rem] lg:w-[30rem] lg:h-[30rem] flex items-center justify-center"
        >
          <AnimatePresence>
            {safeStep >= 1 && (
              <motion.img
                key="char-image"
                src="/images/hero_char2.png"
                alt="Karakter"
                initial={prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.5, x: -50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.5, x: -50 }}
                transition={prefersReducedMotion
                  ? { duration: 0.3 }
                  : { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-full h-full object-contain drop-shadow-xl select-none pointer-events-none"
                whileHover={{ scale: 1.08, rotate: 3 }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Right Column: Scrapbook Paper Card ── */}
        <div className="relative w-full max-w-xl overflow-visible rotate-[1deg] hover:rotate-0 transition-transform duration-500 ease-out">
          {/* Layer shadow & paper texture card */}
          <div className="absolute inset-0 bg-[#FFF9EB] border border-[#FFE59E] rounded-3xl shadow-romantic -z-10" />

          {/* Cute tape ornament top center */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-8 bg-yellow-100/60 backdrop-blur-sm border-x border-[#FFE59E]/40 rotate-[-1.5deg] z-20 flex items-center justify-center shadow-sm">
            <span className="text-[10px] font-sans font-bold text-[#3E2723]/40 tracking-widest uppercase">with love</span>
          </div>

          {/* Card Content Wrapper */}
          <div className="p-6 px-8 sm:p-10 sm:px-12 md:p-12 md:px-14 flex flex-col justify-center items-center text-center w-full h-full">
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              {/* Heart Icon Deco */}
              <div className="w-10 h-10 rounded-full bg-[#FF8CA3]/10 flex items-center justify-center mb-1 text-[#FF8CA3]" aria-hidden="true">
                <Heart size={22} weight="fill" className="animate-pulse" />
              </div>

              {/* Stepped message — fixed min-height prevents layout shift between steps */}
              <div
                className="min-h-[8rem] sm:min-h-[9rem] md:min-h-[10rem] flex items-center justify-center"
                aria-live="polite"
                aria-atomic="true"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.h2
                    key={`step-${safeStep}`}
                    initial={stepTransition.initial}
                    animate={stepTransition.animate}
                    exit={stepTransition.exit}
                    transition={{ duration: prefersReducedMotion ? 0.25 : 0.45, ease: 'easeInOut' }}
                    className="text-xl sm:text-2xl md:text-3xl font-handwritten text-[#3E2723] font-bold leading-relaxed"
                  >
                    {messages[safeStep]}
                  </motion.h2>
                </AnimatePresence>
              </div>

              {/* Micro decorative line */}
              <div className="w-12 h-[2px] bg-[#FFE59E] rounded-full mt-1" aria-hidden="true" />

              {/* Progress dots + hint */}
              <div className="flex flex-col items-center gap-3 mt-2">
                <div className="flex items-center gap-2" role="group" aria-label="Progres pesan">
                  {messages.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => onStepChange?.(i)}
                      aria-label={`Pesan ${i + 1} dari ${totalSteps}`}
                      aria-current={i === safeStep ? 'step' : undefined}
                      className={`rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8CA3] ${
                        i === safeStep
                          ? 'w-6 h-2 bg-[#FF8CA3]'
                          : 'w-2 h-2 bg-[#3E2723]/20 hover:bg-[#FF8CA3]/50'
                      }`}
                    />
                  ))}
                </div>
                {(() => {
                  const hintInfo = getInteractiveScrollHint(
                    safeStep,
                    totalSteps,
                    progress,
                    'scroll pelan-pelan yaa ↓',
                    'scroll lagi untuk melanjutkan ↓'
                  );
                  return (
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={hintInfo.text}
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        transition={{ duration: 0.18 }}
                        className={`text-[11px] sm:text-xs font-handwritten font-bold tracking-wide select-none ${
                          hintInfo.isFunHint ? 'text-pink-600 font-bold animate-pulse-soft' : 'text-[#3E2723]/60'
                        }`}
                      >
                        {hintInfo.text}
                      </motion.p>
                    </AnimatePresence>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

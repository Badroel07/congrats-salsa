import { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from 'framer-motion';
import { siteConfig } from '../content/site.config';
import { Heart, Sparkle, Star } from '@phosphor-icons/react';
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

  // Variants untuk animasi ketik / tulis tangan cepat (typewriter handwriting reveal)
  const typewriterContainerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.016, // ~16ms per karakter — cepat, halus, & responsif
        delayChildren: 0.04,
      },
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const typewriterCharVariants: Variants = {
    hidden: { opacity: 0, y: 3, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.1, ease: [0, 0, 0.2, 1] },
    },
  };

  const currentParagraphText = loveLetterParagraphs[safeStep].text;
  const paragraphWords = currentParagraphText.split(' ');

  return (
    <div
      ref={sectionRef}
      className="w-full h-full flex items-center justify-center select-none relative overflow-hidden"
      role="region"
      aria-label="Surat cinta"
    >
      {/* ── PERNAK-PERNIK BACKGROUND: Sparkles & Stars ── */}
      <motion.div
        animate={{ scale: [0.8, 1.25, 0.8], rotate: [0, -45, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-16 left-28 sm:left-44 md:left-60 text-[#FF8CA3] z-0 pointer-events-none drop-shadow-sm"
        aria-hidden="true"
      >
        <Sparkle size={28} weight="fill" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.3, 1], rotate: [0, 30, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-20 right-28 sm:right-44 md:right-64 text-[#FDB813] z-0 pointer-events-none drop-shadow-sm"
        aria-hidden="true"
      >
        <Sparkle size={30} weight="fill" />
      </motion.div>

      <motion.div
        animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
        className="absolute bottom-24 left-32 sm:left-48 md:left-64 text-[#FF8CA3] z-0 pointer-events-none"
        aria-hidden="true"
      >
        <Star size={24} weight="fill" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0], opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-36 left-12 sm:left-24 text-[#FDB813]/80 z-0 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <Heart size={22} weight="fill" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 4.3, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
        className="absolute bottom-32 right-12 sm:right-28 text-[#FF8CA3]/80 z-0 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <Heart size={20} weight="fill" />
      </motion.div>

      {/* ── PERNAK-PERNIK BACKGROUND: Scrapbook Badges ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
        animate={{ opacity: 0.85, scale: 1, rotate: -4 }}
        whileHover={{ scale: 1.05, rotate: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-28 left-8 sm:left-14 md:left-24 z-10 pointer-events-none select-none bg-[#FFCCD5]/90 border-2 border-dashed border-[#FF8CA3]/70 rounded-xl px-3 py-1.5 shadow-sm rotate-[-4deg] hidden sm:flex items-center gap-1.5"
        aria-hidden="true"
      >
        <span className="text-[11px] font-handwritten font-bold text-[#3E2723]/85 tracking-wide uppercase">💌 surat spesial</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 8 }}
        animate={{ opacity: 0.85, scale: 1, rotate: 6 }}
        whileHover={{ scale: 1.05, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute bottom-32 right-8 sm:right-16 md:right-24 z-10 pointer-events-none select-none bg-[#FFE59E]/90 border-2 border-dashed border-[#FDB813]/70 rounded-xl px-3 py-1.5 shadow-sm rotate-[6deg] hidden sm:flex items-center gap-1.5"
        aria-hidden="true"
      >
        <span className="text-[11px] font-handwritten font-bold text-[#3E2723]/85 tracking-wide uppercase">💖 happy moments</span>
      </motion.div>
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

      {/* ── Background Decorative Nailong Image (Sudut Kiri Bawah - Nempel Tanpa Celah) ── */}
      <motion.div
        className="absolute -bottom-2 -left-4 sm:-bottom-2 sm:left-0 md:-bottom-2 md:left-4 lg:-bottom-2 lg:left-8 z-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <motion.img
          src="/images/nai3.png"
          alt="Nailong Section 3 Bottom-Left"
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
          src="/images/nai3.png"
          alt="Nailong Section 3 Top-Right Inverted"
          initial={{ opacity: 0, scale: 0.85, y: -30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-56 sm:w-72 md:w-80 lg:w-[26rem] xl:w-[28rem] h-auto object-contain object-bottom drop-shadow-xl opacity-100 origin-bottom"
        />
      </div>

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
        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5 w-full max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">

          {/* ── Horizontal Photostrip with washi tape ── */}
          <motion.div
            initial={{ opacity: 0, rotate: -4, y: 20 }}
            animate={{ opacity: 1, rotate: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.25 }}
            className="relative w-full max-w-lg md:max-w-xl"
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
            className="relative w-[120%] sm:w-[125%] -translate-x-[10%] sm:-translate-x-[12.5%] max-w-2xl md:max-w-3xl lg:max-w-4xl overflow-visible rotate-[-1deg] hover:rotate-0 transition-transform duration-500 ease-out"
          >
            {/* Shadow layer (separated to avoid blending flattening) */}
            <div className="absolute inset-0 bg-[url('/images/bg_teks_hero.png')] bg-[length:100%_100%] bg-no-repeat filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.14)] opacity-40 -z-10 pointer-events-none" />

            {/* Paper texture background layer with Multiply blend mode */}
            <div className="absolute inset-0 bg-[url('/images/bg_teks_hero.png')] bg-[length:100%_100%] bg-no-repeat mix-blend-multiply z-0 pointer-events-none" />

            {/* Letter content wrapper — razor sharp contrast without blur */}
            <div
              className="relative z-10 p-6 px-12 sm:p-10 sm:px-20 md:p-12 md:px-28 lg:p-14 lg:px-36 pt-8 sm:pt-10 md:pt-12 pb-8 sm:pb-10 md:pb-12 flex flex-col justify-center items-center w-full h-full"
            >
              {/* Wax seal */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 z-20">
                <div className="w-full h-full rounded-full bg-[#FF8CA3] shadow-md flex items-center justify-center ring-2 ring-white">
                  <Heart size={14} weight="fill" className="text-white" />
                </div>
              </div>

              {/* Header Title — blended text matching Hero section */}
              <p
                className="text-center font-handwritten text-xs sm:text-sm md:text-base text-[#3E2723]/90 font-bold tracking-widest uppercase mb-3 italic rotate-[4deg] md:rotate-[3.5deg]"
                style={{ mixBlendMode: 'multiply' }}
              >
                ✦ surat untuk kamu ✦
              </p>

              {/* Active paragraph — Typewriter handwriting animation */}
              <div
                className="min-h-[8rem] sm:min-h-[9rem] md:min-h-[10rem] w-full max-w-md md:max-w-lg flex items-center justify-center rotate-[4deg] md:rotate-[4deg] origin-center"
                aria-live="polite"
                aria-atomic="true"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {prefersReducedMotion ? (
                    <motion.p
                      key={`ll-${safeStep}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-handlee text-[16px] sm:text-[18px] md:text-[20px] text-[#3E2723]/95 font-bold leading-relaxed text-center italic"
                      style={{ fontFamily: '"Handlee", cursive', mixBlendMode: 'multiply' }}
                    >
                      {currentParagraphText}
                    </motion.p>
                  ) : (
                    <motion.p
                      key={`ll-${safeStep}`}
                      variants={typewriterContainerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="font-handlee text-[16px] sm:text-[18px] md:text-[20px] text-[#3E2723]/95 font-bold leading-relaxed text-center italic"
                      style={{ fontFamily: '"Handlee", cursive', mixBlendMode: 'multiply' }}
                    >
                      {paragraphWords.map((word, wordIdx) => (
                        <span key={wordIdx} className="inline-block whitespace-nowrap">
                          {Array.from(word).map((char, charIdx) => (
                            <motion.span key={charIdx} variants={typewriterCharVariants} className="inline-block">
                              {char}
                            </motion.span>
                          ))}
                          {wordIdx < paragraphWords.length - 1 && <span className="inline-block">&nbsp;</span>}
                        </span>
                      ))}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Signature — blended text matching Hero section */}
              {isLastStep && (
                <div className="rotate-[4deg] md:rotate-[4.5deg] origin-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-center justify-between pt-3 mt-3 border-t border-[#3E2723]/25"
                    style={{ mixBlendMode: 'multiply' }}
                  >
                    <div className="flex flex-col">
                      <span className="font-signature text-sm md:text-base text-[#3E2723]/85 italic font-medium leading-tight" style={{ mixBlendMode: 'multiply' }}>
                        Dengan segenap cinta,
                      </span>
                      <span className="font-signature text-base md:text-lg text-[#3E2723]/95 font-bold italic leading-tight" style={{ mixBlendMode: 'multiply' }}>
                        {siteConfig.sender.name} 💕
                      </span>
                    </div>
                    <Heart size={22} weight="fill" className="text-[#FF8CA3] animate-pulse-soft" />
                  </motion.div>
                </div>
              )}

              {/* Micro decorative line & progress dots + hint — rotated clockwise to align with paper lines */}
              <div className="rotate-[4deg] md:rotate-[4.5deg] origin-center flex flex-col items-center w-full">
                {/* Micro decorative line */}
                <div className="w-14 h-[2px] bg-[#3E2723]/35 rounded-full mx-auto mt-4" style={{ mixBlendMode: 'multiply' }} aria-hidden="true" />

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
                        className={`rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8CA3] ${i === safeStep
                          ? 'w-6 h-2 bg-[#FF8CA3]'
                          : 'w-2 h-2 bg-[#3E2723]/25 hover:bg-[#FF8CA3]/50'
                          }`}
                      />
                    ))}
                  </div>
                  <p
                    className="text-[11px] sm:text-xs font-sans text-[#3E2723]/70 font-medium italic tracking-wide"
                    style={{ mixBlendMode: 'multiply' }}
                  >
                    {isLastStep ? 'gulir lagi untuk melanjutkan ↓' : 'lanjut baca yaa ↓'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
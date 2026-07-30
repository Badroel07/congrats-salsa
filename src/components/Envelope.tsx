import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../content/site.config';

interface EnvelopeProps {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [isOpened, setIsOpened] = useState(false);
  const palette = siteConfig.ambientParticles.colorPalette;

  // Auto-proceed to website after animation completes
  useEffect(() => {
    if (!isOpened) return;
    const timer = setTimeout(() => onOpen(), 1200);
    return () => clearTimeout(timer);
  }, [isOpened, onOpen]);

  const { envelope, recipient, sender: sdr } = siteConfig;
  const toLabel = envelope.toLabel.replace('{name}', recipient.name);
  const fromLabel = envelope.fromLabel.replace('{name}', sdr.name);

  const handleOpen = () => {
    if (isOpened) return;
    setIsOpened(true);
  };

  const envelopeHearts = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 10 + i * 11 + Math.random() * 5,
    size: 15 + Math.random() * 15,
    duration: 10 + Math.random() * 6,
    delay: Math.random() * 3,
    color: palette[i % palette.length],
    isNailongHead: i % 2 === 0,
  }));

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden gradient-romantic">
      {/* Ambient Hearts & Nailong Heads */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        {envelopeHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{
              x: `${heart.x}vw`,
              y: '105vh',
              scale: 0.5,
              opacity: 0,
            }}
            animate={{
              y: '-10vh',
              scale: [0.5, 1.2, 0.9],
              opacity: [0, 0.5, 0.5, 0],
              rotate: [0, 30, -30, 0],
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              color: heart.color,
              width: heart.size,
              height: heart.size,
            }}
          >
            {heart.isNailongHead ? (
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Tanduk naga kecil */}
                <path d="M35 15 C33 5, 27 5, 25 10 C23 15, 30 20, 34 22 Z" fill="#FDB813" stroke="#3E2723" strokeWidth="2" />
                <path d="M65 15 C67 5, 73 5, 75 10 C77 15, 70 20, 66 22 Z" fill="#FDB813" stroke="#3E2723" strokeWidth="2" />
                {/* Kepala oval */}
                <ellipse cx="50" cy="55" rx="35" ry="30" fill="#FDB813" stroke="#3E2723" strokeWidth="3" />
                {/* Pipi pink */}
                <circle cx="25" cy="60" r="7.5" fill="#FF8CA3" />
                <circle cx="75" cy="60" r="7.5" fill="#FF8CA3" />
                {/* Mata bulat */}
                <circle cx="38" cy="50" r="4.5" fill="#3E2723" />
                <circle cx="62" cy="50" r="4.5" fill="#3E2723" />
                {/* Mulut */}
                <path d="M47 58 Q50 61 53 58" fill="none" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                <path d="M50 35 C50 15, 20 15, 20 40 C20 65, 50 85, 50 85 C50 85, 80 65, 80 40 C80 15, 50 15, 50 35 Z" />
              </svg>
            )}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full">
        {/* Top Hint Text */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg md:text-xl font-elegant text-romantic-text/80 mb-8 tracking-wide text-center"
        >
          {envelope.hintText}
        </motion.p>

        {/* Envelope Container Box */}
        <motion.button
          onClick={handleOpen}
          disabled={isOpened}
          className="relative w-72 h-48 bg-white/10 border border-white/20 rounded-2xl shadow-romantic cursor-pointer focus:outline-none focus:ring-2 focus:ring-romantic-primary/50 overflow-visible flex items-center justify-center transition-transform"
          aria-label="Buka amplop surat cinta dari pengirim"
          style={{ minWidth: '44px', minHeight: '44px' }}
          whileHover={!isOpened ? { scale: 1.03 } : {}}
          whileTap={!isOpened ? { scale: 0.98 } : {}}
        >
          {/* Envelope Back Body */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFE59E] to-[#FDB813] rounded-2xl overflow-hidden shadow-inner border border-[#FDB813]/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-white/30 to-transparent" />
          </div>

          {/* Letter Sheet */}
          <motion.div
            className="absolute w-[92%] h-[88%] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center border border-[#FFFDF9] z-10"
            initial={{ y: 0, scale: 0.95 }}
            animate={isOpened ? { y: -90, scale: 1.02 } : { y: 0, scale: 0.95 }}
            transition={{
              y: { delay: 0.3, duration: 0.4, ease: 'easeOut' },
              scale: { delay: 0.3, duration: 0.4, ease: 'easeOut' },
            }}
          >
            <p className="font-handwritten text-3xl text-romantic-primary font-semibold select-none text-center">
                {toLabel}
            </p>
            <p className="font-sans text-[10px] uppercase tracking-widest text-romantic-text/50 mt-1 select-none font-bold">
                {fromLabel}
            </p>
            <p className="font-handwritten text-base text-romantic-text/90 mt-3 select-none text-center italic max-w-[200px] leading-tight">
              {envelope.previewText}
            </p>
          </motion.div>

          {/* Left/Right Overlays */}
          <div
            className="absolute inset-0 bg-transparent pointer-events-none z-20 rounded-2xl overflow-hidden"
            style={{
              clipPath: 'polygon(0% 100%, 50% 50%, 100% 100%)',
              background: 'linear-gradient(135deg, #FFE59E 0%, #FDB813 10%, #FF8CA3 100%)',
              borderTop: '1px solid rgba(253, 184, 19, 0.3)',
              boxShadow: 'inset 0 1px 3px rgba(253, 184, 19, 0.1)'
            }}
          />
          <div
            className="absolute inset-0 bg-transparent pointer-events-none z-20 rounded-2xl overflow-hidden"
            style={{
              clipPath: 'polygon(0% 0%, 35% 50%, 0% 100%)',
              background: 'linear-gradient(to right, #FFE59E, #FDB813)',
              borderRight: '1px solid rgba(253, 184, 19, 0.1)',
            }}
          />
          <div
            className="absolute inset-0 bg-transparent pointer-events-none z-20 rounded-2xl overflow-hidden"
            style={{
              clipPath: 'polygon(100% 0%, 65% 50%, 100% 100%)',
              background: 'linear-gradient(to left, #FFE59E, #FDB813)',
              borderLeft: '1px solid rgba(253, 184, 19, 0.1)',
            }}
          />

          {/* Top Flap */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#FFE59E] to-[#FDB813] pointer-events-none z-30 border-b border-romantic-primary/30"
            style={{
              clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)',
              transformOrigin: 'top center',
              filter: 'drop-shadow(0 2px 2px rgba(253, 184, 19, 0.15))'
            }}
            animate={isOpened ? { rotateX: 180, zIndex: 5, y: -2 } : { rotateX: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          />

          {/* Nailong Seal Lock */}
          <motion.div
            className="absolute z-40 bg-white border border-[#FDB813] p-1.5 rounded-full shadow-md text-romantic-primary flex items-center justify-center"
            animate={isOpened ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              bottom: '40%',
              left: 'calc(50% - 20px)',
              width: '40px',
              height: '40px',
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full animate-pulse-soft">
              {/* Tanduk naga kecil */}
              <path d="M35 15 C33 5, 27 5, 25 10 C23 15, 30 20, 34 22 Z" fill="#FDB813" stroke="#3E2723" strokeWidth="2" />
              <path d="M65 15 C67 5, 73 5, 75 10 C77 15, 70 20, 66 22 Z" fill="#FDB813" stroke="#3E2723" strokeWidth="2" />
              {/* Kepala oval */}
              <ellipse cx="50" cy="55" rx="35" ry="30" fill="#FDB813" stroke="#3E2723" strokeWidth="3" />
              {/* Pipi pink */}
              <circle cx="25" cy="60" r="7" fill="#FF8CA3" />
              <circle cx="75" cy="60" r="7" fill="#FF8CA3" />
              {/* Mata bulat kecil */}
              <circle cx="38" cy="50" r="4.5" fill="#3E2723" />
              <circle cx="62" cy="50" r="4.5" fill="#3E2723" />
              {/* Mulut */}
              <path d="M47 58 Q50 61 53 58" fill="none" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </motion.div>
        </motion.button>

        {/* Status text */}
        <div className="mt-28 min-h-[50px] flex items-center justify-center w-full">
          {!isOpened ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="text-sm text-romantic-text/60 font-sans tracking-wide uppercase text-center"
            >
              {envelope.ctaText}
            </motion.p>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="text-sm text-romantic-primary font-handwritten text-lg tracking-wide text-center"
            >
              {envelope.openingText}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}

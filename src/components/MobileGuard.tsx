import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Desktop, Sparkle, Heart } from '@phosphor-icons/react';

export default function MobileGuard() {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile guard is active
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile]);

  return (
    <AnimatePresence>
      {isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-6 bg-[#FFFDF9] text-[#3E2723] select-none overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] rounded-full bg-[radial-gradient(circle,_rgba(253,184,19,0.18)_0%,_transparent_70%)] pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,_rgba(255,140,163,0.15)_0%,_transparent_70%)] pointer-events-none" />

          {/* Torn Paper Card Container */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative w-full max-w-sm sm:max-w-md p-8 sm:p-10 text-center flex flex-col items-center justify-center rounded-3xl bg-white/90 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-[#FFE59E]/60 z-10"
          >
            {/* Top Badge Icon */}
            <div className="relative mb-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#FFEFC7] to-[#FFCCD5] flex items-center justify-center shadow-inner">
                <Desktop size={40} weight="duotone" className="text-[#3E2723]" />
              </div>
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#FF8CA3] flex items-center justify-center shadow-md text-white"
              >
                <Heart size={16} weight="fill" />
              </motion.div>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-elegant font-bold text-[#3E2723] mb-3 leading-snug">
              Buka di Laptop / PC Yaa 💻✨
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#3E2723]/85 leading-relaxed font-sans mb-6 font-medium">
              Website ucapan ini dirancang khusus dengan animasi interaktif & tata letak layar lebar. Mohon buka link ini melalui <span className="font-bold text-[#3E2723]">Laptop atau Komputer</span> kamu yaa supaya tampilannya maksimal & tidak terpotong! 🩷
            </p>

            {/* Resolution Note Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF8E7] border border-[#FDB813]/30 text-xs sm:text-sm font-bold text-[#3E2723]/90">
              <Sparkle size={14} weight="fill" className="text-[#FDB813]" />
              <span>Rekomendasi Layar: &ge; 1024px</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

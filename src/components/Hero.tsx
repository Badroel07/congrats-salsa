import { motion, useScroll, useTransform } from 'framer-motion';
import { staggerContainer, slideInLeft, slideInRight } from '../animations/variants';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the viewport (or document)
  const { scrollY } = useScroll();
  
  // Transform scroll position into a positive translateY (moving downward slowly)
  // When scrolled by 1 window height (around 800-1000px), shift Hero down by 250px
  const y = useTransform(scrollY, [0, 800], [0, 250]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col items-center justify-center select-none bg-[url('/images/2d2ab1155b783a9474e82ce2b14e182c.jpg')] bg-cover bg-center overflow-hidden">
      {/* Decorative background radial glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent z-0" />

      <motion.div
        style={{ y }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="z-10 w-full max-w-7xl h-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 px-6 md:px-12 relative"
      >
        {/* Kolom Kiri: Gambar Nailong 3D */}
        <motion.div
          variants={slideInLeft}
          className="flex-1 flex items-end justify-center w-full max-w-[320px] sm:max-w-[360px] md:max-w-[460px] h-[45vh] sm:h-[48vh] md:h-full absolute bottom-0 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:relative md:bottom-auto overflow-visible z-20"
        >
          <motion.img
            src="/images/hero_char.png"
            alt="Nailong Love"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.35, opacity: 1 }}
            whileHover={{ scale: 1.4, rotate: 2 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.2
            }}
            className="w-full h-auto max-h-[45vh] sm:max-h-[48vh] md:max-h-[85vh] lg:max-h-[92vh] object-contain object-bottom drop-shadow-2xl relative select-none pointer-events-none origin-bottom"
          />
        </motion.div>

        {/* Kolom Kanan: Teks Ucapan dengan Background Kertas Robek Bergaris */}
        <motion.div
          variants={slideInRight}
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left w-full max-w-xl md:max-w-2xl z-10 pb-52 sm:pb-60 md:pb-0 overflow-visible"
        >
          {/* Real Torn Paper Background Card */}
          <div className="relative w-[130%] -translate-x-[15%] min-h-[220px] overflow-visible rotate-[-1.5deg] md:rotate-[-2deg] hover:rotate-0 transition-transform duration-500 ease-out">
            
            {/* Shadow layer (separated to avoid blending flattening) */}
            <div className="absolute inset-0 bg-[url('/images/bg_teks_hero.png')] bg-[length:100%_100%] bg-no-repeat filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.12)] opacity-40 -z-10 pointer-events-none" />

            {/* Paper texture background layer with Multiply blend mode */}
            <div className="absolute inset-0 bg-[url('/images/bg_teks_hero.png')] bg-[length:100%_100%] bg-no-repeat mix-blend-multiply z-0 pointer-events-none" />

            {/* Text container overlayed on top, softened slightly with a microscopic blur to simulate ink absorbing into paper fibers */}
            <div 
              className="relative z-10 p-10 pl-14 pr-10 sm:p-12 sm:pl-24 sm:pr-16 sm:pt-20 sm:pb-20 md:p-16 md:pl-28 md:pr-20 md:pt-24 md:pb-24 lg:pl-32 lg:pr-24 flex flex-col justify-center w-full h-full"
              style={{ filter: 'blur(0.22px) contrast(1.15) brightness(0.98)' }}
            >
              <div className="relative w-full px-2 select-text">
                {/* Headline utama */}
                <h1 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-elegant font-bold text-[#3E2723]/95 leading-tight mb-4"
                  style={{ mixBlendMode: 'multiply' }}
                >
                  Selamat, Salsaaa!! 🩷
                </h1>

                {/* Decorative Divider */}
                <div 
                  className="w-14 h-[1.5px] bg-[#3E2723]/30 mb-5"
                  style={{ mixBlendMode: 'multiply' }}
                />

                {/* Subheadline kecil */}
                <p 
                  className="text-sm sm:text-base text-[#3E2723]/85 leading-relaxed italic font-sans font-medium mb-2"
                  style={{ mixBlendMode: 'multiply' }}
                >
                  Telah diterima kerjaaaa, lewat surat ini aku ingin merayakan momen berharga ini bersamamu. Semoga suka yaaa 🩷
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

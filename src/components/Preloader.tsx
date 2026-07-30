import { motion } from 'framer-motion';

interface PreloaderProps {
  progress: number;
}

export default function Preloader({ progress }: PreloaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF4E6] via-[#FFF0F5] to-[#FFF8EC] select-none p-6"
    >
      <div className="flex flex-col items-center max-w-sm w-full text-center gap-6">
        {/* Pulsing Nailong Head / Heart SVG */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-20 h-20 text-[#FF8CA3]"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
            <path d="M50 35 C50 15, 20 15, 20 40 C20 65, 50 85, 50 85 C50 85, 80 65, 80 40 C80 15, 50 15, 50 35 Z" />
          </svg>
        </motion.div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="font-handwritten text-2xl text-[#3E2723] font-bold">
            Mempersiapkan kejutan... 💖
          </h2>
          <p className="text-xs font-sans text-[#3E2723]/60 font-medium tracking-wide">
            Mengunduh memori manis untuk Salsa
          </p>
        </div>

        {/* Progress Container */}
        <div className="w-full mt-4 space-y-2">
          {/* Progress Bar Background */}
          <div className="w-full h-2.5 bg-[#FFE59E]/40 rounded-full overflow-hidden border border-[#FFE59E]/20">
            {/* Progress Bar Fill */}
            <motion.div
              className="h-full bg-gradient-to-r from-[#FF8CA3] to-[#FDB813]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          {/* Percentage */}
          <span className="text-xs font-sans font-bold text-[#3E2723]/70">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}

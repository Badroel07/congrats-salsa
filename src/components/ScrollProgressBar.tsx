import { motion } from 'framer-motion';

interface ScrollProgressBarProps {
  progress: number;
}

export default function ScrollProgressBar({ progress }: ScrollProgressBarProps) {
  return (
    <div
      className="fixed top-0 left-0 w-full z-50 pointer-events-none"
      style={{ height: '5px' }}
      role="progressbar"
      aria-label="Progres Halaman"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-romantic-primary via-romantic-secondary to-romantic-accent"
        initial={{ width: 0 }}
        animate={{ width: `${progress * 100}%` }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
        style={{ transformOrigin: '0%' }}
      />
    </div>
  );
}

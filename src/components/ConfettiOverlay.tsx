import { useEffect, useState } from 'react';
import { generateConfetti } from '../utils/confetti';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiOverlayProps {
  isActive: boolean;
}

export default function ConfettiOverlay({ isActive }: ConfettiOverlayProps) {
  const [particles, setParticles] = useState<ReturnType<typeof generateConfetti>>([]);

  useEffect(() => {
    if (isActive) {
      const generated = generateConfetti(50);
      setParticles(generated);
      const timer = setTimeout(() => {
        setParticles([]);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setParticles([]);
    }
  }, [isActive]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              x: `${p.x}vw`,
              y: '-10vh',
              rotate: p.rotation,
              scale: p.scale,
              opacity: 1,
            }}
            animate={{
              y: '110vh',
              rotate: p.rotation + 720,
              opacity: [1, 1, 0.8, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: p.delay,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              width: '12px',
              height: '12px',
              backgroundColor: p.color,
              borderRadius: p.id % 2 === 0 ? '50%' : '2px',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

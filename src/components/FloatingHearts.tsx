import { motion } from 'framer-motion';
import { siteConfig } from '../content/site.config';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface DragonBubble {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  isNailongHead: boolean;
}

export default function FloatingHearts() {
  const isReduced = useReducedMotion();
  const palette = siteConfig.ambientParticles.colorPalette;

  // Render ambient nailong heads and heart-like shapes
  const bubbleCount = 12;
  const bubbles: DragonBubble[] = Array.from({ length: bubbleCount }, (_, i) => ({
    id: i,
    x: 5 + (i * 90) / bubbleCount + Math.random() * 5, // distributed across screen width
    size: 20 + Math.random() * 25, // 20px to 45px
    duration: 12 + Math.random() * 8, // 12s to 20s
    delay: Math.random() * 5,
    color: palette[i % palette.length],
    isNailongHead: i % 3 === 0, // 1 out of 3 will be a cute Nailong face, others will be love bubbles
  }));

  if (isReduced) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          initial={{
            x: `${bubble.x}vw`,
            y: '105vh',
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            y: '-10vh',
            scale: [0.5, 1, 0.8],
            opacity: [0, 0.5, 0.5, 0],
            rotate: [0, 30, -30, 0],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            color: bubble.color,
            width: bubble.size,
            height: bubble.size,
          }}
        >
          {bubble.isNailongHead ? (
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
              {/* Bubble hati lembut */}
              <path d="M50 35 C50 15, 20 15, 20 40 C20 65, 50 85, 50 85 C50 85, 80 65, 80 40 C80 15, 50 15, 50 35 Z" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}

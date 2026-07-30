import { motion } from 'framer-motion';

interface MusicToggleProps {
  isPlaying: boolean;
  isLoaded: boolean;
  onToggle: () => void;
  labelPlay: string;
  labelStop: string;
}

export default function MusicToggle({ isPlaying, isLoaded, onToggle, labelPlay, labelStop }: MusicToggleProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        className="glass relative w-14 h-14 rounded-full flex items-center justify-center border border-white/40 shadow-romantic text-romantic-primary transition-all focus:outline-none focus:ring-2 focus:ring-romantic-primary focus:ring-offset-2 focus:ring-offset-romantic-background"
        aria-label={isPlaying ? labelStop : labelPlay}
        style={{ minWidth: '44px', minHeight: '44px' }}
      >
        {!isLoaded && (
          <span className="absolute inset-0 rounded-full border-2 border-romantic-primary-light/30 border-t-romantic-primary animate-spin" />
        )}
        
        {isPlaying ? (
          // Equalizer Animation
          <div className="flex items-end justify-center space-x-0.5 w-6 h-5">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-romantic-primary rounded-full"
                animate={{
                  height: ['20%', '100%', '20%'],
                }}
                transition={{
                  duration: 0.5 + i * 0.15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        ) : (
          // Play Icon / Music Note
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 animate-pulse"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M19.952 1.951a.75.75 0 0 1 .496.708v15.34a4.5 4.5 0 1 1-3-4.243V7.218L9.048 9.218v8.783a4.5 4.5 0 1 1-3-4.242V4.782a.75.75 0 0 1 .904-.738l12 2.5a.75.75 0 0 1 .1-.1zM17.452 5.5v2.218l-9 1.875v-2.25l9-1.843zM6 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm11.452-1.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" clipRule="evenodd" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}

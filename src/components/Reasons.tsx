import { motion } from 'framer-motion';
import { siteConfig } from '../content/site.config';
import { fadeInUp, staggerContainer } from '../animations/variants';
import { Heart, Star, Sparkle } from '@phosphor-icons/react';

export default function Reasons() {
  const { proudReasons, sectionTitles } = siteConfig;

  // Render icons from @phosphor-icons/react
  const renderIcon = (type: 'heart' | 'star' | 'sparkle') => {
    switch (type) {
      case 'heart':
        return <Heart size={20} weight="fill" className="text-romantic-primary" />;
      case 'star':
        return <Star size={20} weight="fill" className="text-romantic-secondary" />;
      case 'sparkle':
        return <Sparkle size={20} weight="fill" className="text-romantic-accent" />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 md:p-4 select-none max-w-4xl mx-auto max-h-[85vh]">
      <div className="text-center mb-6 shrink-0">
        <h2 className="text-2xl md:text-3xl font-elegant text-romantic-text mb-2">
          {sectionTitles.proudReasons}
        </h2>
        <div className="w-16 h-[2px] bg-romantic-primary/30 mx-auto rounded-full" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 overflow-y-auto w-full pr-1 scrollbar-thin max-h-[60vh] py-1"
      >
        {proudReasons.map((reason, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -1 }}
            className="card-romantic p-4 flex gap-3 items-center transition-all hover:bg-white/80"
          >
            <div className="p-1.5 rounded-lg bg-white/80 border border-white/50 shadow-sm shrink-0 flex items-center justify-center">
              {renderIcon(reason.icon)}
            </div>
            <p className="text-romantic-text text-sm leading-relaxed text-left">
              {reason.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

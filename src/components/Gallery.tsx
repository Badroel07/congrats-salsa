import { motion } from 'framer-motion';
import { siteConfig } from '../content/site.config';
import { fadeInUp, staggerContainer } from '../animations/variants';

export default function Gallery() {
  const { galleryPhotos, sectionTitles } = siteConfig;

  // Bento grid classes adjusted specifically to fit neatly inside slideshow viewport
  const getBentoClasses = (index: number) => {
    switch (index) {
      case 0:
        return 'col-span-1 row-span-2 h-[220px] md:h-[320px]';
      case 1:
        return 'col-span-1 md:col-span-2 h-[100px] md:h-[150px]';
      case 2:
        return 'col-span-1 h-[100px] md:h-[150px]';
      case 3:
        return 'col-span-1 h-[100px] md:h-[150px]';
      case 4:
        return 'col-span-1 row-span-2 h-[220px] md:h-[320px]';
      case 5:
        return 'col-span-1 md:col-span-2 h-[100px] md:h-[150px]';
      default:
        return 'col-span-1 h-[120px]';
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 md:p-4 select-none max-w-4xl mx-auto max-h-[85vh]">
      <div className="text-center mb-4 shrink-0">
        <h2 className="text-2xl md:text-3xl font-elegant text-romantic-text mb-1">
          {sectionTitles.gallery}
        </h2>
        <p className="text-[10px] md:text-xs text-romantic-text/75 max-w-md mx-auto">
          {sectionTitles.gallerySubtitle}
        </p>
        <div className="w-16 h-[2px] bg-romantic-primary/30 mx-auto rounded-full mt-2" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 auto-rows-max overflow-y-auto w-full pr-1 scrollbar-thin max-h-[60vh] py-1"
      >
        {galleryPhotos.map((photo, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            className={`relative overflow-hidden rounded-xl shadow-romantic group border border-white/35 bg-white/40 ${getBentoClasses(
              index
            )}`}
          >
            {/* Visual overlay gradient mesh for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-romantic-text/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

            <img
              src={photo.url}
              alt={photo.alt || 'Foto kenangan'}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Bottom Tag overlay on hover */}
            <div className="absolute bottom-2 left-2 right-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none">
              <p className="text-white text-[9px] font-semibold tracking-wider font-sans bg-black/35 backdrop-blur-sm px-2.5 py-1 rounded-full w-fit">
                {photo.alt}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

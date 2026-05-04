import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronLeft, ChevronRight, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1544025162-811114cdb18d?q=80&w=1200&auto=format&fit=crop', category: 'food' },
  { id: 2, src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop', category: 'interior' },
  { id: 3, src: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=1200&auto=format&fit=crop', category: 'food' },
  { id: 4, src: 'https://images.unsplash.com/photo-1525648199074-bee30ba3d54f?q=80&w=1200&auto=format&fit=crop', category: 'ambiance' },
  { id: 5, src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop', category: 'food' },
  { id: 6, src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop', category: 'interior' },
];

export default function Gallery() {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1);

  const filters = [
    { id: 'all', label: t('gallery.filter.all') },
    { id: 'food', label: t('gallery.filter.food') },
    { id: 'ambiance', label: t('gallery.filter.ambiance') },
    { id: 'interior', label: t('gallery.filter.interior') },
  ];

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  const nextImage = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  const prevImage = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  }, [filteredImages.length]);

  useEffect(() => {
    if (!isHovered && filteredImages.length > 1) {
      const timer = setInterval(nextImage, 4000);
      return () => clearInterval(timer);
    }
  }, [isHovered, nextImage, filteredImages.length]);

  const isRtl = lang === 'ar';

  const slideVariants = {
    enter: (direction: number) => {
      const xOffset = direction > 0 ? 1000 : -1000;
      return {
        x: isRtl ? -xOffset : xOffset,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      const xOffset = direction < 0 ? 1000 : -1000;
      return {
        zIndex: 0,
        x: isRtl ? -xOffset : xOffset,
        opacity: 0
      };
    }
  };

  return (
    <section id="gallery" className="py-24 bg-[#FDFCF9] dark:bg-[#242721] overflow-hidden border-t border-accent/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-accent text-xs uppercase tracking-[0.3em] font-sans font-bold mb-4 italic">{t('gallery.title')}</h2>
          <h3 className="font-serif text-5xl md:text-7xl mb-8 leading-[1.1] text-[#1A1C18] dark:text-[#E5E1D8]">
            {t('gallery.subtitle').split(' ').map((word, i, arr) => 
               i === Math.floor(arr.length / 2) ? <span key={i} className="italic font-light text-accent"> {word} </span> : <span key={i}>{word} </span>
            )}
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => {
                  setFilter(f.id);
                  setCurrentIndex(0);
                  setDirection(1);
                }}
                className={`px-6 py-2 rounded-full font-sans text-xs uppercase tracking-widest transition-all ${
                  filter === f.id 
                    ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                    : 'bg-[#E5E1D8] dark:bg-[#3A4535] text-[#1A1C18] dark:text-[#E5E1D8] hover:bg-[#D4C9B0] dark:hover:bg-accent/40'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div 
          className="relative w-full max-w-5xl mx-auto aspect-[4/3] md:aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl bg-[#D4C9B0] dark:bg-[#3A4535]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {filteredImages.length > 0 && filteredImages[currentIndex] && (
            <div className={`absolute top-6 sm:top-8 end-6 sm:end-8 z-20 flex flex-col space-y-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(filteredImages[currentIndex].src)}`, '_blank');
                }}
                className="w-10 h-10 bg-white/80 dark:bg-black/60 rounded-full flex items-center justify-center text-accent dark:text-white hover:bg-white dark:hover:bg-black transition-colors shadow-lg backdrop-blur-md"
                aria-label="Share on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(filteredImages[currentIndex].src)}&text=Check%20out%20this%20amazing%20dish!`, '_blank');
                }}
                className="w-10 h-10 bg-white/80 dark:bg-black/60 rounded-full flex items-center justify-center text-accent dark:text-white hover:bg-white dark:hover:bg-black transition-colors shadow-lg backdrop-blur-md"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(filteredImages[currentIndex].src);
                  alert("Link copied to clipboard!");
                }}
                className="w-10 h-10 bg-white/80 dark:bg-black/60 rounded-full flex items-center justify-center text-accent dark:text-white hover:bg-white dark:hover:bg-black transition-colors shadow-lg backdrop-blur-md"
                aria-label="Copy image link"
              >
                <LinkIcon className="w-4 h-4" />
              </button>
            </div>
          )}

          <AnimatePresence initial={false} custom={direction}>
            {filteredImages.length > 0 && filteredImages[currentIndex] && (
              <motion.div
                key={filteredImages[currentIndex].id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0"
              >
                <img
                  src={filteredImages[currentIndex].src}
                  alt={filteredImages[currentIndex].category}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 sm:bottom-8 start-6 sm:start-8">
                  <span className="text-white bg-accent/90 px-4 py-2 rounded-full font-sans text-xs uppercase tracking-[0.2em] shadow-lg backdrop-blur-sm">
                    {t(`gallery.filter.${filteredImages[currentIndex].category}`)}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {filteredImages.length > 1 && (
            <>
              {/* Navigation Arrows */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute top-1/2 start-4 sm:start-6 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 dark:bg-black/60 rounded-full flex items-center justify-center text-accent dark:text-white hover:bg-white dark:hover:bg-black transition-colors z-10 shadow-lg backdrop-blur-md"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 rtl:rotate-180" />
              </button>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute top-1/2 end-4 sm:end-6 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 dark:bg-black/60 rounded-full flex items-center justify-center text-accent dark:text-white hover:bg-white dark:hover:bg-black transition-colors z-10 shadow-lg backdrop-blur-md"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 rtl:rotate-180" />
              </button>
              
              {/* Dots */}
              <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 rtl:space-x-reverse z-10">
                {filteredImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex 
                        ? 'bg-white w-6' 
                        : 'bg-white/50 w-2 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

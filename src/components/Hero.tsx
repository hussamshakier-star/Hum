import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';

export default function Hero() {
  const { t, lang } = useLanguage();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 1000], ["0%", "15%"]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Content */}
        <div className="relative z-10">
           <motion.div
             variants={containerVariants}
             initial="hidden"
             animate="visible"
           >
             <motion.h2 variants={itemVariants} className="text-accent text-xs uppercase tracking-[0.3em] font-sans font-bold mb-4 italic">
               {t('hero.badge')}
             </motion.h2>
             <motion.h1 variants={itemVariants} className="text-7xl lg:text-8xl font-serif leading-[1.1] tracking-tight text-[#1A1C18] dark:text-[#E5E1D8] mb-8">
               {t('hero.title1')} <br/>
               <span className="italic font-light text-accent">
                 {t('hero.title2')}
               </span><br/>
               {t('hero.title3')}
             </motion.h1>
             <motion.p variants={itemVariants} className="text-[#6B6B5F] dark:text-[#D4C9B0] font-sans text-sm leading-relaxed max-w-sm mb-10">
               {t('hero.desc')}
             </motion.p>
             <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 items-start">
               <a href="#menu" className="w-fit px-8 py-4 bg-accent text-white rounded-full font-sans text-xs uppercase tracking-widest hover:bg-[#3A4535] transition-colors shadow-lg shadow-accent/20 flex space-x-2 rtl:space-x-reverse items-center">
                 <span>{t('hero.btn')}</span>
               </a>
             </motion.div>
           </motion.div>
        </div>

        {/* Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Decorative background shape */}
          <div className="absolute inset-0 bg-[#D4C9B0] dark:bg-[#3A4535] rounded-[240px] shadow-2xl rotate-3 -z-10" />
          
          <div className="w-full aspect-[3/4] rounded-[240px] overflow-hidden relative shadow-xl bg-[#D4C9B0] dark:bg-[#3A4535]">
            <motion.div style={{ y: imageY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
              <AnimatePresence initial={false} mode="wait">
                <motion.img 
                  key={currentImageIndex}
                  src={heroImages[currentImageIndex]} 
                  alt="Culinary excellence" 
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 0.9, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-multiply transition-transform duration-700"
                />
              </AnimatePresence>
            </motion.div>
            {/* Texture overlay */}
            <div className="absolute inset-0 bg-accent/10 mix-blend-overlay pointer-events-none"></div>
          </div>
          
          {/* Floating Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute -bottom-4 -start-8 w-32 h-32 bg-[#FDFCF9] dark:bg-[#242721] rounded-full flex flex-col items-center justify-center shadow-xl border border-accent/10 hidden md:flex"
          >
             <div className="text-2xl font-bold font-serif text-accent">{lang === 'ar' ? '٠١' : '01'}</div>
             <div className="text-[8px] uppercase tracking-tighter font-sans text-[#1A1C18] dark:text-[#E5E1D8]">{t('hero.sig')}</div>
          </motion.div>
        </motion.div>

      </div>

      {/* Marquee Ticker */}
      <div className="absolute bottom-0 w-full overflow-hidden border-t border-b border-accent/10 bg-[#FDFCF9] dark:bg-[#242721] py-3">
         <div className={`flex w-max animate-[marquee_20s_linear_infinite] ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center space-x-8 rtl:space-x-reverse px-4 text-accent dark:text-[#D4C9B0]">
                 <span className="font-serif italic text-xl tracking-widest">
                   {t('hero.marquee1')}
                 </span>
                 <span className="w-1 h-1 rounded-full bg-accent/30"></span>
                 <span className="font-serif italic text-xl tracking-widest">
                   {t('hero.marquee2')}
                 </span>
                 <span className="w-1 h-1 rounded-full bg-accent/30"></span>
              </div>
            ))}
         </div>
      </div>
    </section>
  );
}

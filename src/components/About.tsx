import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export default function About() {
  const { t, lang } = useLanguage();

  return (
    <section id="about" className="py-24 bg-[#FDFCF9] dark:bg-[#242721] overflow-hidden border-t border-accent/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
         
         {/* Visuals */}
         <div className="relative">
            <div className="aspect-[3/4] w-full max-w-md mx-auto relative z-10 p-3 bg-[#FAF9F6] dark:bg-[#1A1C18] shadow-2xl rounded-se-[120px] rounded-es-[120px]">
               <img 
                 src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1400&auto=format&fit=crop" 
                 alt="Making burgers" 
                 referrerPolicy="no-referrer"
                 className="w-full h-full object-cover rounded-se-[110px] rounded-es-[110px]"
               />
            </div>
            
            {/* Background offset image */}
            <motion.div 
               initial={{ opacity: 0, x: lang === 'ar' ? 30 : -30, y: 30 }}
               whileInView={{ opacity: 1, x: 0, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="absolute -bottom-12 -start-12 w-64 aspect-square z-0 hidden md:block p-2 bg-[#FAF9F6] dark:bg-[#1A1C18] shadow-xl rounded-full"
            >
               <img 
                 src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop"
                 alt="Restaurant interior"
                 referrerPolicy="no-referrer"
                 className="w-full h-full object-cover rounded-full mix-blend-multiply dark:mix-blend-normal opacity-90"
               />
            </motion.div>
         </div>

         {/* Content */}
         <div className="lg:ps-8">
            <h2 className="text-accent text-xs uppercase tracking-[0.3em] font-sans font-bold mb-4 italic">{t('about.heritage')}</h2>
            <h3 className="font-serif text-5xl md:text-7xl mb-8 leading-[1.1] text-[#1A1C18] dark:text-[#E5E1D8]">
               {t('about.title1')} <br/> <span className="italic font-light text-[#6B6B5F] dark:text-[#D4C9B0]">{lang === 'ar' ? '١٩٩٤' : '1994'}</span>
            </h3>
            
            <div className="space-y-6 text-[#6B6B5F] dark:text-[#D4C9B0] text-sm leading-relaxed font-sans">
               <p>{t('about.p1')}</p>
               <p>{t('about.p2')}</p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-8 pt-8 border-t border-accent/10">
               <div>
                  <p className="font-serif text-5xl mb-2 text-[#1A1C18] dark:text-[#E5E1D8]">{lang === 'ar' ? '+١ مليون' : '1M+'}</p>
                  <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#6B6B5F] dark:text-[#D4C9B0]">{t('about.stat1')}</p>
               </div>
               <div>
                  <p className="font-serif text-5xl mb-2 text-[#1A1C18] dark:text-[#E5E1D8]">{lang === 'ar' ? '٣' : '3'}</p>
                  <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#6B6B5F] dark:text-[#D4C9B0]">{t('about.stat2')}</p>
               </div>
            </div>
         </div>

      </div>
    </section>
  );
}

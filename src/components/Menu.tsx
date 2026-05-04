import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Menu() {
  const { t } = useLanguage();

  const menuItems = [
    {
      id: 1,
      name: t('menu.items.1.name'),
      desc: t('menu.items.1.desc'),
      price: '$12',
      image: 'https://images.unsplash.com/photo-1594212691516-069e8f41a1ab?q=80&w=1400&auto=format&fit=crop',
      tag: t('menu.popular')
    },
    {
      id: 2,
      name: t('menu.items.2.name'),
      desc: t('menu.items.2.desc'),
      price: '$16',
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1400&auto=format&fit=crop'
    },
    {
      id: 3,
      name: t('menu.items.3.name'),
      desc: t('menu.items.3.desc'),
      price: '$14',
      image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=1400&auto=format&fit=crop',
      tag: t('menu.spicy')
    },
    {
      id: 4,
      name: t('menu.items.4.name'),
      desc: t('menu.items.4.desc'),
      price: '$15',
      image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=1400&auto=format&fit=crop'
    }
  ];

  return (
    <section id="menu" className="py-24 bg-[#FAF9F6] dark:bg-[#1A1C18]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-16">
           <div>
              <h2 className="text-accent text-xs font-bold tracking-[0.3em] font-sans uppercase mb-4 italic">{t('menu.prov')}</h2>
              <h3 className="font-serif text-5xl md:text-7xl text-[#1A1C18] dark:text-[#E5E1D8]">{t('menu.title1')}<br/><span className="italic font-light text-accent">{t('menu.title2')}</span></h3>
           </div>
           <a href="#menu" onClick={(e) => e.preventDefault()} className="hidden md:inline-block border-b border-accent/20 pb-1 text-xs font-bold uppercase tracking-widest text-[#6B6B5F] dark:text-[#D4C9B0] hover:text-accent dark:hover:text-accent transition-colors">
             {t('menu.viewAll')}
           </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
           {menuItems.map((item, index) => (
             <motion.div 
               key={item.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
               className="group flex flex-col md:flex-row gap-6 items-start"
             >
                 <div className="relative w-full md:w-48 aspect-square flex-shrink-0 overflow-hidden bg-[#D4C9B0] dark:bg-[#3A4535] rounded-ss-[100px] rounded-ee-[100px] shadow-lg">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 mix-blend-multiply dark:mix-blend-normal"
                  />
                  {item.tag && (
                    <span className="absolute top-4 start-4 bg-white/90 dark:bg-black/50 text-accent dark:text-white text-[9px] font-sans font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className="flex flex-col flex-grow py-4 border-b border-accent/10">
                   <div className="flex justify-between items-end mb-3">
                     <h4 className="font-serif text-2xl text-[#1A1C18] dark:text-[#E5E1D8]">{item.name}</h4>
                     <span className="font-sans text-sm text-accent">${item.price.replace('$', '')}</span>
                   </div>
                   <p className="text-[#6B6B5F] dark:text-[#D4C9B0] text-sm leading-relaxed mb-6 font-sans">
                     {item.desc}
                   </p>
                   <button className="mt-auto group/btn flex items-center space-x-3 rtl:space-x-reverse text-xs font-sans font-bold uppercase tracking-widest w-fit text-[#6B6B5F] dark:text-[#D4C9B0] hover:text-accent dark:hover:text-accent transition-colors">
                     <span className="w-8 h-8 rounded-full border border-accent/20 flex items-center justify-center group-hover/btn:bg-accent group-hover/btn:border-accent group-hover/btn:text-white transition-all">
                       <Plus size={14} className="stroke-[1.5]" />
                     </span>
                     <span>{t('menu.add')}</span>
                   </button>
                </div>
             </motion.div>
           ))}
        </div>
        
        <div className="mt-16 text-center md:hidden">
            <a href="#menu" onClick={(e) => e.preventDefault()} className="inline-block px-8 py-4 bg-accent text-white rounded-full font-sans text-xs uppercase tracking-widest hover:bg-[#3A4535] transition-colors shadow-lg shadow-accent/20">
             {t('menu.viewAll')}
           </a>
        </div>
      </div>
    </section>
  );
}

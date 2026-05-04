import { Instagram, Twitter, Facebook } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="bg-[#1A1C18] text-[#E5E1D8] py-20 border-t border-accent/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
           <a href="#home" className="text-4xl font-serif tracking-tighter text-accent mb-6 inline-block">
             {t('nav.logo')}
           </a>
           <p className="text-[#E5E1D8]/60 max-w-sm mb-8 font-sans text-sm leading-relaxed">
             {t('footer.desc')}
           </p>
           <div className="flex space-x-6 rtl:space-x-reverse">
             <a href="#" onClick={(e) => e.preventDefault()} className="text-[#E5E1D8]/60 hover:text-white transition-colors">
               <Instagram size={20} className="stroke-[1.5]" />
             </a>
             <a href="#" onClick={(e) => e.preventDefault()} className="text-[#E5E1D8]/60 hover:text-white transition-colors">
               <Twitter size={20} className="stroke-[1.5]" />
             </a>
             <a href="#" onClick={(e) => e.preventDefault()} className="text-[#E5E1D8]/60 hover:text-white transition-colors">
               <Facebook size={20} className="stroke-[1.5]" />
             </a>
           </div>
        </div>

        {/* Locations */}
        <div>
           <h4 className="font-sans text-[10px] uppercase font-bold tracking-[0.2em] mb-6 text-accent">{t('footer.loc')}</h4>
           <ul className="space-y-4 text-sm text-[#E5E1D8]/60 font-sans">
             <li>
                <p className="font-serif italic text-[#E5E1D8] mb-1">{t('footer.loc1.name')}</p>
                <p className="text-xs">{t('footer.loc1.addr1')}<br/>{t('footer.loc1.addr2')}</p>
             </li>
             <li>
                <p className="font-serif italic text-[#E5E1D8] mb-1">{t('footer.loc2.name')}</p>
                <p className="text-xs">{t('footer.loc2.addr1')}<br/>{t('footer.loc2.addr2')}</p>
             </li>
           </ul>
        </div>

        {/* Hours */}
        <div>
           <h4 className="font-sans text-[10px] uppercase font-bold tracking-[0.2em] mb-6 text-accent">{t('footer.hours')}</h4>
           <ul className="space-y-4 text-sm text-[#E5E1D8]/60 font-sans text-xs">
             <li className="flex justify-between border-b border-white/5 pb-2">
               <span>{t('footer.days1')}</span>
               <span className="text-[#E5E1D8]">{t('footer.hours1')}</span>
             </li>
             <li className="flex justify-between border-b border-white/5 pb-2">
               <span>{t('footer.days2')}</span>
               <span className="text-[#E5E1D8]">{t('footer.hours2')}</span>
             </li>
             <li className="flex justify-between border-b border-white/5 pb-2">
               <span>{t('footer.days3')}</span>
               <span className="text-[#E5E1D8]">{t('footer.hours3')}</span>
             </li>
           </ul>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center bg-[#1A1C18]">
         <p className="text-center text-[#E5E1D8]/60 font-sans text-[10px] uppercase tracking-widest mb-4 md:mb-0">
           {t('footer.copy')}
         </p>
         <div className="flex space-x-6 rtl:space-x-reverse font-sans text-[10px] uppercase tracking-widest text-[#E5E1D8]/60">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">{t('footer.privacy')}</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">{t('footer.terms')}</a>
         </div>
      </div>
    </footer>
  );
}

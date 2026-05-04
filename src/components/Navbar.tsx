import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Sun, ShoppingBag, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    // Check initial color theme
    if (document.documentElement.classList.contains('dark') || 
        window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.menu'), href: '#menu' },
    { name: t('nav.gallery'), href: '#gallery' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#FAF9F6]/90 dark:bg-[#1A1C18]/90 backdrop-blur-md py-4 border-b border-accent/10' : 'bg-transparent py-8 border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="text-3xl font-black font-serif tracking-tighter text-accent dark:text-[#E5E1D8] z-50 relative">
          {t('nav.logo')}
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
          <ul className="flex space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
               <li key={link.name}>
                 <a href={link.href} className="text-sm font-medium font-sans uppercase tracking-widest text-accent dark:text-[#E5E1D8] hover:opacity-60 transition-opacity">
                   {link.name}
                 </a>
               </li>
            ))}
          </ul>
          
          <div className="flex items-center space-x-6 rtl:space-x-reverse border-s border-accent/20 ps-6">
            <button onClick={toggleLang} className="text-accent dark:text-[#E5E1D8] hover:opacity-60 transition-opacity flex items-center space-x-1 rtl:space-x-reverse">
              <Globe size={18} className="stroke-[1.5]" />
              <span className="text-xs font-bold uppercase">{lang === 'en' ? 'AR' : 'EN'}</span>
            </button>
            <div onClick={toggleDark} className="w-12 h-6 bg-[#E5E1D8] dark:bg-[#3A4535] rounded-full relative p-1 flex items-center cursor-pointer shadow-inner transition-colors">
              <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${isDark ? (lang === 'ar' ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'}`}></div>
              {isDark ? <Moon className="w-3 h-3 absolute start-2 text-white" /> : <Sun className="w-3 h-3 absolute end-2 text-accent" />}
            </div>
            <button className="text-accent dark:text-[#E5E1D8] hover:opacity-60 transition-opacity relative">
              <ShoppingBag size={20} className="stroke-[1.5]" />
              <span className="absolute -top-1 -end-2 bg-accent text-white text-[9px] font-sans w-4 h-4 rounded-full flex items-center justify-center">2</span>
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-6 rtl:space-x-reverse md:hidden z-50">
            <button onClick={toggleLang} className="text-accent dark:text-[#E5E1D8] hover:opacity-60 transition-opacity flex items-center space-x-1 rtl:space-x-reverse">
              <Globe size={18} className="stroke-[1.5]" />
              <span className="text-xs font-bold uppercase">{lang === 'en' ? 'AR' : 'EN'}</span>
            </button>
            <div onClick={toggleDark} className="w-12 h-6 bg-[#E5E1D8] dark:bg-[#3A4535] rounded-full relative p-1 flex items-center cursor-pointer shadow-inner transition-colors">
              <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${isDark ? (lang === 'ar' ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'}`}></div>
              {isDark ? <Moon className="w-3 h-3 absolute start-2 text-white" /> : <Sun className="w-3 h-3 absolute end-2 text-accent" />}
            </div>
           <button onClick={() => setIsOpen(!isOpen)} className="text-accent dark:text-[#E5E1D8]">
             {isOpen ? <X size={28} className="stroke-[1]" /> : <Menu size={28} className="stroke-[1]" />}
           </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full start-0 w-full bg-[#FAF9F6] dark:bg-[#1A1C18] border-b border-accent/10 shadow-xl md:hidden"
          >
            <ul className="flex flex-col py-6 px-6 space-y-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-serif text-accent dark:text-[#E5E1D8] hover:opacity-60 transition-opacity block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

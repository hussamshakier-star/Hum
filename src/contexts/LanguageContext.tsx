import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    'nav.menu': 'Menu',
    'nav.gallery': 'Gallery',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.home': 'Home',
    'nav.logo': "HUMHUM",
    
    // Hero
    'hero.badge': 'Est. 1994 — Michelin Rated',
    'hero.title1': 'The Art of',
    'hero.title2': 'Seasonal',
    'hero.title3': 'Simplicity.',
    'hero.desc': "A portfolio of culinary excellence by Chef Marc-Antoine. Exploring the relationship between earth's bounty and modern gastronomic techniques.",
    'hero.btn': 'Explore the Menu',
    'hero.sig': 'Signature',
    'hero.marquee1': 'Farm to Table',
    'hero.marquee2': 'Seasonal Menus',
    
    // Menu
    'menu.prov': 'Provenance',
    'menu.title1': 'Culinary',
    'menu.title2': 'Journey',
    'menu.viewAll': 'View Full Menu',
    'menu.items.1.name': 'The Classic Smash',
    'menu.items.1.desc': 'Double beef patty, American cheese, house pickles, signature vibe sauce, potato bun.',
    'menu.items.2.name': 'Truffle Mushroom',
    'menu.items.2.desc': 'Wagyu blend, roasted wild mushrooms, truffle aioli, gruyere, arugula.',
    'menu.items.3.name': 'Spicy Inferno',
    'menu.items.3.desc': 'Crispy fried chicken, ghost pepper jack, jalapeño slaw, hot honey drizzle.',
    'menu.items.4.name': 'Beyond Vibe',
    'menu.items.4.desc': 'Plant-based patty, vegan cheddar, caramelized onions, vegan vibe sauce.',
    'menu.add': 'Add to cart',
    'menu.popular': 'Popular',
    'menu.spicy': 'Spicy',
    
    // About
    'about.heritage': 'Our Heritage',
    'about.title1': 'Crafting since',
    'about.p1': 'It started in a small alleyway garage with a flat-top grill, premium beef, and an obsession with the perfect crust. No gimmicks, just damn good burgers.',
    'about.p2': "At HumHum, we believe the classic double cheeseburger is a perfect culinary specimen. We don't mess with perfection—we just execute it flawlessly using locally sourced ingredients, baked-daily potato buns, and our proprietary smash technique.",
    'about.stat1': 'Burgers Smashed',
    'about.stat2': 'Locations',

    // Gallery
    'gallery.title': 'Visual Palette',
    'gallery.subtitle': 'A Feast for the Eyes',
    'gallery.filter.all': 'All',
    'gallery.filter.food': 'Food',
    'gallery.filter.ambiance': 'Ambiance',
    'gallery.filter.interior': 'Interior',
    
    // Footer
    'footer.desc': 'The undisputed kings of the smash burger. Real ingredients, ruthless heat, zero compromises.',
    'footer.loc': 'Locations',
    'footer.loc1.name': 'Downtown Vibe',
    'footer.loc1.addr1': '123 Burger Lane',
    'footer.loc1.addr2': 'New York, NY 10001',
    'footer.loc2.name': 'Westside Grill',
    'footer.loc2.addr1': '456 Sizzle Street',
    'footer.loc2.addr2': 'Los Angeles, CA 90014',
    'footer.hours': 'Hours',
    'footer.days1': 'Mon-Thu',
    'footer.hours1': '11AM - 10PM',
    'footer.days2': 'Fri-Sat',
    'footer.hours2': '11AM - 2AM',
    'footer.days3': 'Sun',
    'footer.hours3': '12PM - 10PM',
    'footer.copy': '© 2024 HumHum. All Rights Reserved.',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
  },
  ar: {
    // Navbar
    'nav.menu': 'القائمة',
    'nav.gallery': 'المعرض',
    'nav.about': 'قصتنا',
    'nav.contact': 'تواصل معنا',
    'nav.home': 'الرئيسية',
    'nav.logo': 'همهم',
    
    // Hero
    'hero.badge': 'تأسس ١٩٩٤ — تقييم ميشلان',
    'hero.title1': 'فن',
    'hero.title2': 'الموسمية',
    'hero.title3': 'البساطة.',
    'hero.desc': 'محفظة من التميز في الطهي للشيف مارك أنطوان. استكشاف العلاقة بين خيرات الأرض وتقنيات فن الطهو الحديثة.',
    'hero.btn': 'استكشف القائمة',
    'hero.sig': 'مميز',
    'hero.marquee1': 'من المزرعة إلى المائدة',
    'hero.marquee2': 'قوائم موسمية',
    
    // Menu
    'menu.prov': 'المصدر',
    'menu.title1': 'رحلة',
    'menu.title2': 'الطهي',
    'menu.viewAll': 'عرض القائمة الكاملة',
    'menu.items.1.name': 'كلاسيك سماش',
    'menu.items.1.desc': 'شريحة لحم بقري مزدوجة، جبنة أمريكية، مخلل منزلي، صوص فايب المميز، خبز البطاطس.',
    'menu.items.2.name': 'فطر الكمأة',
    'menu.items.2.desc': 'خليط واغيو، فطر بري مشوي، مايونيز الكمأة، جبنة غرويير، جرجير.',
    'menu.items.3.name': 'الجحيم الحار',
    'menu.items.3.desc': 'دجاج مقلي مقرمش، جبن جاك الفلفل الشبح، كولسلو الهالبينو، رذاذ العسل الحار.',
    'menu.items.4.name': 'بيوند فايب',
    'menu.items.4.desc': 'شريحة نباتية، شيدر نباتي، بصل مكرمل، صوص فايب النباتي.',
    'menu.add': 'أضف للسلة',
    'menu.popular': 'شائع',
    'menu.spicy': 'حار',

    // About
    'about.heritage': 'تراثنا',
    'about.title1': 'نصنع بحب منذ',
    'about.p1': 'بدأ الأمر في مرآب صغير في زقاق مع شواية مسطحة، ولحم بقري فاخر، وهوس بالقشرة المثالية. لا حيل، فقط برجرات لذيذة جداً.',
    'about.p2': 'في همهم، نعتقد أن تشيز برجر الكلاسيكي المزدوج هو عينة طهي مثالية. نحن لا نعبث بالكمال، بل ننفذه بشكل لا تشوبه شائبة باستخدام مكونات محلية المصدر، وخبز البطاطس المخبوز يومياً، وتقنية السماش الخاصة بنا.',
    'about.stat1': 'برجر تم تحضيره',
    'about.stat2': 'فروع',

    // Gallery
    'gallery.title': 'لوحة بصرية',
    'gallery.subtitle': 'وليمة للعيون',
    'gallery.filter.all': 'الكل',
    'gallery.filter.food': 'الطعام',
    'gallery.filter.ambiance': 'الأجواء',
    'gallery.filter.interior': 'الداخلية',

    // Footer
    'footer.desc': 'ملوك السماش برجر بلا منازع. مكونات حقيقية، حرارة شديدة، بلا تنازلات.',
    'footer.loc': 'الفروع',
    'footer.loc1.name': 'وسط المدينة',
    'footer.loc1.addr1': '١٢٣ شارع البرجر',
    'footer.loc1.addr2': 'نيويورك، NY 10001',
    'footer.loc2.name': 'ويست سايد جريل',
    'footer.loc2.addr1': '٤٥٦ شارع سيزل',
    'footer.loc2.addr2': 'لوس أنجلوس، CA 90014',
    'footer.hours': 'أوقات العمل',
    'footer.days1': 'الإثنين - الخميس',
    'footer.hours1': '١١ صباحاً - ١٠ مساءً',
    'footer.days2': 'الجمعة - السبت',
    'footer.hours2': '١١ صباحاً - ٢ صباحاً',
    'footer.days3': 'الأحد',
    'footer.hours3': '١٢ مساءً - ١٠ مساءً',
    'footer.copy': '© ٢٠٢٤ همهم. جميع الحقوق محفوظة.',
    'footer.privacy': 'الخصوصية',
    'footer.terms': 'الشروط',
  }
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  toggleLang: () => {},
  t: () => '',
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key: string) => {
    return translations[lang][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

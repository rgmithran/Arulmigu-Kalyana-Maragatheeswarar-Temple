import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileBottomBar from './MobileBottomBar';
import { useLanguage } from '../context/LanguageContext';

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const { language } = useLanguage();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  // Update dynamic page title for SEO & accessibility
  useEffect(() => {
    const pageTitles = {
      '/': language === 'ta'
        ? 'அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில், முன்னூர் – மோளபாளையம்'
        : 'Arulmigu Kalyana Maragatheeswarar Temple, Munnur – Molapalayam',
      '/history': language === 'ta'
        ? 'திருக்கோயில் வரலாறு | அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில்'
        : 'Temple History | Kalyana Maragatheeswarar Temple',
      '/deities': language === 'ta'
        ? 'தெய்வங்கள் | அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில்'
        : 'Deities | Kalyana Maragatheeswarar Temple',
      '/pooja': language === 'ta'
        ? 'வழிபாடுகள் & நேரங்கள் | அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில்'
        : 'Poojas & Darshan Timings | Kalyana Maragatheeswarar Temple',
      '/festivals': language === 'ta'
        ? 'திருவிழாக்கள் & உற்சவங்கள் | அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில்'
        : 'Festivals & Utsavams | Kalyana Maragatheeswarar Temple',
      '/gallery': language === 'ta'
        ? 'புகைப்படங்கள் | அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில்'
        : 'Photo Gallery | Kalyana Maragatheeswarar Temple',
      '/contact': language === 'ta'
        ? 'தொடர்புக்கு & இருப்பிடம் | அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில்'
        : 'Contact & Location | Kalyana Maragatheeswarar Temple',
      '/admin': language === 'ta'
        ? 'நிர்வாகப் பலகை | அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில்'
        : 'Admin Management Portal | Kalyana Maragatheeswarar Temple',
    };

    document.title = pageTitles[pathname] || pageTitles['/'];
  }, [pathname, language]);

  return (
    <div className="flex min-h-screen flex-col bg-cream text-maroon-dark selection:bg-gold selection:text-maroon-dark">
      <Navbar />

      {/* Main content — padded for fixed navbar and mobile bottom navigation */}
      <main className="flex-1 pt-[calc(4rem+4px)] lg:pt-[calc(5rem+4px)] pb-16 lg:pb-0">
        {children}
      </main>

      <Footer />
      <MobileBottomBar />
    </div>
  );
}

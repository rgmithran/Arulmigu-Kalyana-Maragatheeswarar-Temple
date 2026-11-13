import { NavLink } from 'react-router-dom';
import { Home, Flame, Calendar, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TEMPLE_MAPS_URL = 'https://maps.app.goo.gl/V97j6p94g5dF56iE6';
const TEMPLE_PHONE = 'tel:+919585554005';

export default function MobileBottomBar() {
  const { language } = useLanguage();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-maroon-dark/95 backdrop-blur-md border-t border-gold/30 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-15 px-2 max-w-md mx-auto">
        {/* Home */}
        <NavLink
          to="/"
          end
          className={({ isActive }) => `
            flex flex-col items-center justify-center flex-1 py-1 px-1 transition-colors
            ${isActive ? 'text-gold' : 'text-cream/70 hover:text-gold-light'}
          `}
        >
          <Home size={18} />
          <span className="text-[10px] font-tamil-sans mt-1 font-medium">
            {language === 'ta' ? 'முகப்பு' : 'Home'}
          </span>
        </NavLink>

        {/* Poojas & Booking */}
        <NavLink
          to="/pooja"
          className={({ isActive }) => `
            flex flex-col items-center justify-center flex-1 py-1 px-1 transition-colors
            ${isActive ? 'text-gold font-semibold' : 'text-cream/70 hover:text-gold-light'}
          `}
        >
          <Flame size={18} />
          <span className="text-[10px] font-tamil-sans mt-1 font-medium">
            {language === 'ta' ? 'பூஜை' : 'Pooja'}
          </span>
        </NavLink>

        {/* Center Action: Festivals */}
        <NavLink
          to="/festivals"
          className={({ isActive }) => `
            flex flex-col items-center justify-center flex-1 py-1 px-1 transition-colors
            ${isActive ? 'text-gold font-semibold' : 'text-cream/70 hover:text-gold-light'}
          `}
        >
          <Calendar size={18} />
          <span className="text-[10px] font-tamil-sans mt-1 font-medium">
            {language === 'ta' ? 'திருவிழா' : 'Festivals'}
          </span>
        </NavLink>

        {/* Call Now */}
        <a
          href={TEMPLE_PHONE}
          className="flex flex-col items-center justify-center flex-1 py-1 px-1 text-cream/70 hover:text-gold transition-colors"
          aria-label="Call Temple"
        >
          <Phone size={18} className="text-gold" />
          <span className="text-[10px] font-tamil-sans mt-1 font-medium text-gold-light">
            {language === 'ta' ? 'அழைக்க' : 'Call'}
          </span>
        </a>

        {/* Map / Directions */}
        <a
          href={TEMPLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center flex-1 py-1 px-1 text-cream/70 hover:text-gold transition-colors"
          aria-label="Temple Directions"
        >
          <MapPin size={18} className="text-gold" />
          <span className="text-[10px] font-tamil-sans mt-1 font-medium text-gold-light">
            {language === 'ta' ? 'வரைபடம்' : 'Maps'}
          </span>
        </a>
      </div>
    </div>
  );
}

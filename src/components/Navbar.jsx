import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const navRoutes = [
  { path: '/', key: 'nav.home' },
  { path: '/history', key: 'nav.history' },
  { path: '/deities', key: 'nav.deities' },
  { path: '/pooja', key: 'nav.pooja' },
  { path: '/festivals', key: 'nav.festivals' },
  { path: '/gallery', key: 'nav.gallery' },
  { path: '/contact', key: 'nav.contact' },
];

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for background opacity
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Decorative temple border at the very top */}
      <div className="temple-border-pattern" />

      <nav
        className={`
          transition-all duration-300
          ${scrolled
            ? 'bg-maroon-dark/97 backdrop-blur-md shadow-lg shadow-maroon-dark/30'
            : 'bg-maroon-dark/90 backdrop-blur-sm'
          }
        `}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* ── Temple Name / Brand ── */}
            <Link
              to="/"
              onClick={closeMobile}
              className="group flex min-w-0 flex-1 items-center gap-3 shrink-0 xl:max-w-[22rem] xl:flex-none"
            >
              {/* Om symbol */}
              <span className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold text-lg font-bold om-pulse select-none">
                ௐ
              </span>

              <div className="flex min-w-0 flex-col leading-tight">
                <span className="truncate font-tamil-serif text-gold text-sm sm:text-base lg:text-lg font-semibold tracking-wide group-hover:text-gold-light transition-colors duration-300">
                  {t('templeName')}
                </span>
                <span className="truncate text-gold/60 text-[10px] sm:text-xs font-tamil-sans">
                  {t('templeLocation')}
                </span>
              </div>
            </Link>

            {/* ── Desktop Navigation ── */}
            <div className="hidden xl:flex items-center gap-0.5">
              {navRoutes.map(({ path, key }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={path === '/'}
                  className={({ isActive }) => `
                    relative px-2 py-2 text-xs font-tamil-sans rounded-md
                    transition-colors duration-200
                    ${isActive
                      ? 'text-gold font-semibold'
                      : 'text-cream/80 hover:text-gold-light'
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      {t(key)}
                      {/* Gold underline for active link */}
                      <span
                        className={`
                          absolute bottom-0 left-1/2 -translate-x-1/2
                          h-[2px] rounded-full bg-gold
                          transition-all duration-300 ease-out
                          ${isActive ? 'w-4/5 opacity-100' : 'w-0 opacity-0'}
                        `}
                      />
                    </>
                  )}
                </NavLink>
              ))}

              {/* Admin Portal link */}
              <NavLink
                to="/admin"
                className={({ isActive }) => `
                  ml-1 px-2 py-1.5 rounded-full border border-gold/30 text-[11px] font-tamil-sans transition-all
                  ${isActive
                    ? 'bg-gold text-maroon-dark font-bold'
                    : 'text-gold/80 hover:bg-gold/15 hover:text-gold'
                  }
                `}
                title={language === 'ta' ? 'நிர்வாகப் பலகை' : 'Admin Portal'}
              >
                ⚙️ {language === 'ta' ? 'நிர்வாகம்' : 'Admin'}
              </NavLink>

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="
                  ml-1 flex shrink-0 items-center gap-1.5 rounded-full
                  border border-gold/40 bg-gold/10
                  px-2.5 py-1.5 text-xs font-semibold text-gold
                  hover:bg-gold/20 hover:border-gold/60
                  transition-all duration-200 cursor-pointer
                "
                aria-label={language === 'ta' ? 'Switch language to English' : 'மொழியை தமிழுக்கு மாற்று'}
                title={language === 'ta' ? 'Switch language to English' : 'மொழியை தமிழுக்கு மாற்று'}
              >
                <Languages size={14} />
                {language === 'ta' ? 'English' : 'தமிழ்'}
              </button>
            </div>

            {/* ── Mobile Controls ── */}
            <div className="flex shrink-0 items-center gap-2 xl:hidden">
              {/* Language Toggle (mobile) */}
              <button
                onClick={toggleLanguage}
                className="
                  flex items-center gap-1 rounded-full whitespace-nowrap
                  border border-gold/40 bg-gold/10
                  px-2.5 py-1 text-xs font-semibold text-gold
                  hover:bg-gold/20 transition-all duration-200 cursor-pointer
                "
                aria-label={language === 'ta' ? 'Switch language to English' : 'மொழியை தமிழுக்கு மாற்று'}
                title={language === 'ta' ? 'Switch language to English' : 'மொழியை தமிழுக்கு மாற்று'}
              >
                <Languages size={12} />
                {language === 'ta' ? 'English' : 'தமிழ்'}
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="
                  p-2 rounded-lg text-gold
                  hover:bg-gold/10 transition-colors duration-200 cursor-pointer
                "
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Overlay ── */}
      <div
        className={`
          fixed inset-0 top-[calc(4rem+4px)] bg-black/50 z-40
          transition-opacity duration-300 xl:hidden
          lg:top-[calc(5rem+4px)]
          ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* ── Mobile Slide-In Menu ── */}
      <div
        className={`
          fixed top-[calc(4rem+4px)] lg:top-[calc(5rem+4px)] right-0 bottom-0 w-80 max-w-[85vw] z-50
          bg-maroon-dark/98 backdrop-blur-lg
          border-l border-gold/20 flex flex-col justify-between
          transition-transform duration-300 ease-in-out xl:hidden overflow-y-auto
          ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <nav className="flex flex-col px-4 py-6 gap-1" role="navigation">
          {navRoutes.map(({ path, key }, index) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              onClick={closeMobile}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg
                font-tamil-sans text-base
                transition-all duration-200
                ${isActive
                  ? 'bg-gold/15 text-gold font-semibold border-l-2 border-gold'
                  : 'text-cream/70 hover:bg-gold/10 hover:text-gold-light border-l-2 border-transparent'
                }
              `}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {t(key)}
            </NavLink>
          ))}

          {/* Admin Management link */}
          <NavLink
            to="/admin"
            onClick={closeMobile}
            className={({ isActive }) => `
              flex items-center justify-between px-4 py-2.5 rounded-lg mt-3
              font-tamil-sans text-xs uppercase tracking-wider
              transition-all duration-200
              ${isActive
                ? 'bg-gold/20 text-gold font-bold border border-gold/40'
                : 'text-gold/80 hover:bg-gold/10 border border-gold/25'
              }
            `}
          >
            <span>⚙️ {language === 'ta' ? 'நிர்வாகப் பலகை' : 'Admin Portal'}</span>
            <span className="text-[10px] bg-gold/20 px-1.5 py-0.5 rounded text-gold">DB Live</span>
          </NavLink>

          {/* Quick Actions in Mobile Drawer */}
          <div className="mt-4 pt-4 border-t border-gold/20 flex flex-col gap-2">
            <a
              href="tel:+919585554005"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gold/15 text-gold border border-gold/40 rounded-lg text-sm font-semibold hover:bg-gold/25"
            >
              📞 {language === 'ta' ? 'தொடர்புக்கு: 9585554005' : 'Call: +91 9585554005'}
            </a>
          </div>

          {/* Decorative divider in mobile menu */}
          <div className="mt-4 pt-4 border-t border-gold/20">
            <p className="px-4 text-gold/50 text-xs font-tamil-serif text-center">
              {t('omNamaSivaya')}
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}

import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const quickLinks = [
  { path: '/', key: 'nav.home' },
  { path: '/history', key: 'nav.history' },
  { path: '/deities', key: 'nav.deities' },
  { path: '/pooja', key: 'nav.pooja' },
  { path: '/festivals', key: 'nav.festivals' },
  { path: '/gallery', key: 'nav.gallery' },
  { path: '/contact', key: 'nav.contact' },
  { path: '/admin', customName: '⚙️ நிர்வாகப் பலகை (Admin)' },
];

function FacebookIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon fill="#4A0A12" points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

const socialLinks = [
  { icon: FacebookIcon, href: '#', label: 'Facebook' },
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: YoutubeIcon, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-maroon-dark text-cream/80">
      {/* Temple Border at Top */}
      <div className="temple-border-top" />

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* ── Column 1: Temple Info ── */}
          <div className="space-y-5">
            {/* Om Symbol + Temple Name */}
            <div className="flex items-start gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold text-xl font-bold om-pulse select-none mt-0.5">
                ௐ
              </span>
              <div>
                <p className="font-tamil-serif text-gold-light text-base font-semibold leading-tight mb-1">
                  {t('footerLocation')}
                </p>
                <h3 className="font-tamil-serif text-gold text-lg font-bold leading-snug">
                  {t('footerText')}
                </h3>
              </div>
            </div>

            {/* Sacred text */}
            <p className="font-tamil-serif text-gold-light/90 text-2xl tracking-wider gold-shimmer font-bold">
              {t('omNamaSivaya')}!
            </p>

            <p className="font-tamil-sans text-xs sm:text-sm text-cream/70 leading-relaxed">
              கொங்கு நாட்டின் தொன்மையும் ஆன்மிகப் பெருமையும் கொண்ட முன்னூர் – மோளபாளையம் அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில்.
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex h-9 w-9 items-center justify-center rounded-full
                    border border-gold/30 bg-gold/5
                    text-gold/70 hover:text-gold hover:bg-gold/15 hover:border-gold/50
                    transition-all duration-200
                  "
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Column 2: Quick Links ── */}
          <div>
            <h4 className="font-tamil-serif text-gold text-base font-semibold mb-5 flex items-center gap-2">
              <span className="h-px w-6 bg-gold/50" />
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ path, key, customName }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="
                      group flex items-center gap-2
                      text-cream/70 hover:text-gold-light
                      text-sm font-tamil-sans
                      transition-colors duration-200
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors duration-200" />
                    {customName || t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Contact Details ── */}
          <div>
            <h4 className="font-tamil-serif text-gold text-base font-semibold mb-5 flex items-center gap-2">
              <span className="h-px w-6 bg-gold/50" />
              {t('contactInfo')}
            </h4>
            <ul className="space-y-4">
              {/* Address */}
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={16} className="text-gold/70 mt-0.5 shrink-0" />
                <div>
                  <p className="text-cream/80 font-tamil-serif leading-relaxed">
                    {t('footerLocation')},
                    <br />
                    {t('footerText')},
                    <br />
                    கரூர்  மாவட்டம், தமிழ்நாடு, இந்தியா.
                  </p>
                  <a
                    href="https://maps.app.goo.gl/s6A3veHAhXCvN3n7A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center gap-1.5 mt-2
                      text-gold hover:text-gold-light text-xs font-semibold
                      transition-colors duration-200 bg-gold/10 px-3 py-1 rounded-full border border-gold/30
                    "
                  >
                    <ExternalLink size={12} />
                    {t('getDirections')}
                  </a>
                </div>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-gold/70 shrink-0" />
                <a
                  href="tel:+919585554005"
                  className="text-cream/80 hover:text-gold font-tamil-sans transition-colors font-medium"
                >
                  +91 9585554005
                </a>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-gold/70 shrink-0" />
                <span className="text-cream/70 font-tamil-sans">
                  info@example.com <span className="text-xs text-gold/50">({t('editableNotice')})</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-gold/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-cream/50 text-xs font-tamil-sans text-center sm:text-left">
              {t('copyright')}
            </p>
            <p className="text-gold/40 text-xs font-tamil-serif select-none">
              ஓம் நமசிவாய! சிவாய நம ஓம்!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

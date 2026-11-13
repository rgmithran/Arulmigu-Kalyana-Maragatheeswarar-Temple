import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  Flame,
  Star,
  Clock,
  Camera,
  Landmark,
  Crown,
  Sparkles,
  Sun,
  Gem,
  Shield,
  Heart,
  Bell,
  Megaphone,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ImagePlaceholder from '../components/ImagePlaceholder';
import SectionTitle from '../components/SectionTitle';
import { announcementApi } from '../services/api';

/* ═══════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════ */
function HeroSection({ t }) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-maroon-dark">
      {/* Background gradient simulating ancient temple atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark via-maroon to-maroon-dark" />

      {/* Subtle overlay patterns */}
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle,#D4A843_1px,transparent_1px)] bg-[length:24px_24px]" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.18)_0%,transparent_70%)]" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 max-w-5xl mx-auto py-16 lg:py-24">
        {/* Om Symbol */}
        <div className="om-pulse mb-3">
          <span className="text-gold-light text-4xl md:text-5xl font-tamil-serif font-bold">
            {t('omNamaSivaya')}
          </span>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent to-gold" />
          <Sparkles size={16} className="text-gold" />
          <div className="h-px w-8 bg-gold/60" />
          <Sparkles size={16} className="text-gold" />
          <div className="h-px w-12 sm:w-24 bg-gradient-to-l from-transparent to-gold" />
        </div>

        {/* Temple Name */}
        <h1 className="font-tamil-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3">
          <span className="gold-shimmer">
            {t('templeName')}
          </span>
        </h1>

        {/* Location */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <MapPin size={18} className="text-gold" />
          <p className="font-tamil-serif text-lg md:text-xl text-gold-light tracking-wide font-medium">
            {t('templeLocation')}
          </p>
        </div>

        {/* Traditional Tagline */}
        <div className="inline-block bg-maroon-dark/90 border border-gold/40 rounded-full px-5 py-2 mb-6 backdrop-blur-sm shadow-md">
          <p className="font-tamil-serif text-sm sm:text-base md:text-lg text-cream font-semibold">
            "கொங்கு நாட்டின் தொன்மையும் ஆன்மிகப் பெருமையும் கொண்ட திருத்தலம்"
          </p>
        </div>

        {/* Subtitle */}
        <p className="font-tamil-sans text-sm md:text-base text-cream/80 max-w-2xl mx-auto leading-relaxed mb-6">
          {t('heroSubtitle')}
        </p>

        {/* ─── PROMINENT CONFIRMED DAILY DARSHAN TIMINGS RIBBON ─── */}
        <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-gold/20 via-gold/30 to-gold/20 border-2 border-gold rounded-2xl px-6 py-3.5 mb-8 shadow-xl backdrop-blur-md">
          <Clock size={20} className="text-gold shrink-0" />
          <div className="text-left sm:text-center">
            <span className="text-xs uppercase tracking-wider text-gold-light font-bold block font-tamil-sans">
              {t('templeTimings')}
            </span>
            <span className="font-tamil-serif text-base sm:text-lg text-cream font-bold">
              {t('darshanTimeText')}
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/history"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-maroon-dark font-tamil-sans font-bold rounded-lg shadow-lg shadow-gold/20 hover:bg-gold-light hover:shadow-xl hover:shadow-gold/30 transition-all duration-300"
          >
            <Landmark size={18} />
            {t('exploreHistory')}
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/festivals"
            className="group inline-flex items-center gap-2 px-8 py-3.5 border-2 border-gold/80 text-gold-light font-tamil-sans font-bold rounded-lg hover:bg-gold/15 hover:border-gold transition-all duration-300"
          >
            <Flame size={18} />
            {t('chariotFestival.title')}
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="temple-border-top" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   LIVE NOTICES & ANNOUNCEMENTS (MONGODB POWERED)
   ═══════════════════════════════════════════════════ */
function LiveAnnouncementsSection({ language }) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotices() {
      try {
        const res = await announcementApi.getActive();
        if (res.success && Array.isArray(res.data)) {
          setAnnouncements(res.data);
        }
      } catch (err) {
        console.error('Error loading live announcements:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchNotices();
  }, []);

  if (loading || announcements.length === 0) return null;

  return (
    <section className="bg-cream-dark/80 border-b-2 border-gold/30 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Megaphone size={20} className="text-maroon animate-pulse" />
          <h2 className="font-tamil-serif text-lg sm:text-xl font-bold text-maroon-dark">
            {language === 'ta' ? 'திருக்கோயில் சமீபத்திய அறிவிப்புகள்' : 'Temple Live Announcements'}
          </h2>
          <span className="ml-auto text-[11px] font-tamil-sans bg-gold/20 text-maroon-dark px-2.5 py-0.5 rounded-full font-bold">
            Live MongoDB
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {announcements.map((item) => (
            <div
              key={item._id}
              className={`rounded-xl p-4 sm:p-5 shadow-sm border transition-all duration-300 hover:shadow-md flex flex-col justify-between ${
                item.priority === 'urgent'
                  ? 'bg-sacred-red/5 border-sacred-red/40'
                  : 'bg-white border-gold/30'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      item.priority === 'urgent'
                        ? 'bg-sacred-red text-white'
                        : 'bg-gold/20 text-maroon-dark'
                    }`}
                  >
                    {language === 'ta' ? item.badgeTa : item.badgeEn}
                  </span>
                  {item.eventDate && (
                    <span className="text-[11px] text-maroon/70 font-tamil-sans">
                      {item.eventDate}
                    </span>
                  )}
                </div>

                <h3 className="font-tamil-serif text-sm sm:text-base font-bold text-maroon-dark mb-1.5 leading-snug">
                  {language === 'ta' ? item.titleTa : item.titleEn}
                </h3>

                <p className="font-tamil-sans text-xs text-maroon/80 line-clamp-3 leading-relaxed">
                  {language === 'ta' ? item.contentTa : item.contentEn}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-gold/15 flex items-center justify-between text-xs">
                <Link
                  to="/pooja"
                  className="font-bold text-maroon hover:text-gold-dark inline-flex items-center gap-1 font-tamil-sans"
                >
                  {language === 'ta' ? 'பூஜை பதிவு' : 'Book Pooja'} &rarr;
                </Link>
                <Link
                  to="/contact"
                  className="text-maroon/60 hover:text-maroon font-tamil-sans text-[11px]"
                >
                  {language === 'ta' ? 'தொடர்புக்கு' : 'Contact'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SPECIAL VISUAL IMPORTANCE: MASI MAGAM THEROTTAM BANNER
   ═══════════════════════════════════════════════════ */
function MasiMagamSpecialSection({ t }) {
  return (
    <section className="relative py-14 sm:py-20 bg-gradient-to-r from-maroon-dark via-maroon to-maroon-dark text-cream border-y-2 border-gold/40 shadow-2xl overflow-hidden">
      {/* Background sacred patterns */}
      <div className="absolute inset-0 opacity-[0.08] bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(212,168,67,0.3)_20px,rgba(212,168,67,0.3)_22px)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border-2 border-gold/60 p-8 sm:p-12 shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Chariot Icon / Graphic Representation */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-maroon-dark shadow-2xl border-4 border-cream/30 mb-5 om-pulse">
                <Crown size={52} />
              </div>

              <span className="inline-block px-4 py-1.5 rounded-full bg-gold text-maroon-dark font-bold text-xs uppercase tracking-widest font-tamil-sans mb-2 shadow-md">
                {t('chariotFestival.badge')}
              </span>

              <h2 className="font-tamil-serif text-3xl sm:text-4xl font-bold text-gold-light gold-shimmer">
                {t('chariotFestival.title')}
              </h2>
              <p className="font-tamil-sans text-sm text-cream/80 mt-1">
                {t('chariotFestival.subtitle')}
              </p>

              {/* Editable Festival Date Box */}
              <div className="mt-6 w-full bg-maroon-dark/80 rounded-xl p-4 border border-gold/40">
                <span className="text-xs text-gold-light block font-tamil-sans font-semibold mb-1">
                  📅 திருவிழா நாள் / Festival Date
                </span>
                <span className="font-tamil-serif text-base sm:text-lg font-bold text-cream">
                  {t('chariotFestival.dateStatus')}
                </span>
                <span className="text-[11px] text-cream/60 block mt-1">
                  *நிர்வாகத்தால் அறிவிக்கப்படும் அதிகாரப்பூர்வ நாள்
                </span>
              </div>
            </div>

            {/* Description & Announcements */}
            <div className="lg:col-span-7 space-y-5">
              <p className="font-tamil-serif text-base sm:text-lg text-cream/95 leading-relaxed font-medium">
                {t('chariotFestival.desc')}
              </p>

              {/* Announcements Box */}
              <div className="bg-black/25 rounded-xl p-5 border border-gold/30 space-y-3">
                <h4 className="font-tamil-serif text-base font-bold text-gold flex items-center gap-2">
                  <Bell size={18} className="text-gold" />
                  {t('chariotFestival.announcementsTitle')}
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-cream/90 font-tamil-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">✓</span>
                    <span>{t('chariotFestival.announcement1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">✓</span>
                    <span>{t('chariotFestival.announcement2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">✓</span>
                    <span>{t('chariotFestival.announcement3')}</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <Link
                  to="/festivals"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-maroon-dark font-tamil-sans font-bold text-base rounded-lg hover:bg-gold-light transition-all shadow-lg hover:shadow-xl"
                >
                  <Flame size={18} />
                  {t('chariotFestival.viewFestivalDetails')}
                  <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   TEMPLE INTRODUCTION SECTION
   ═══════════════════════════════════════════════════ */
function IntroSection({ t }) {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>{t('introTitle')}</SectionTitle>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mt-8">
          {/* Real Temple Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-gold/15 to-maroon/10 rounded-2xl -z-10" />
            <div className="rounded-xl overflow-hidden shadow-xl border-2 border-gold/40">
              <img
                src="src/assets/moolavar.jpg"
                alt="அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில் தோற்றம்"
                className="w-full h-[320px] sm:h-[400px] object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            {/* Decorative corner */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-gold rounded-tl-lg" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-gold rounded-br-lg" />
          </div>

          {/* Text */}
          <div className="space-y-6">
            <p className="font-tamil-serif text-lg md:text-xl text-maroon-dark/95 leading-relaxed font-semibold">
              {t('introText')}
            </p>
            <p className="font-tamil-sans text-base text-maroon/80 leading-relaxed">
              கொங்கு நாட்டின் இடைப்பிச்ச நாட்டுடன் தொடர்புடைய நான்கு தொன்மையான கிராமங்களில் ஒன்றான முன்னூரில்
              அமைந்துள்ள இத்திருக்கோயில், சோழ மன்னர்களின் சிவபக்திக்கும் கட்டிடக்கலைக்கும் ஒப்பற்ற சான்றாகத் திகழ்கிறது.              
            </p>
            <div className="pt-2">
              <Link
                to="/history"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-maroon text-gold font-tamil-sans font-semibold rounded-lg hover:bg-maroon-dark transition-colors shadow-md"
              >
                {t('readMore')} — {t('nav.history')}
                <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN DEITY SECTION
   ═══════════════════════════════════════════════════ */
function MainDeitySection({ t }) {
  return (
    <section className="py-20 md:py-28 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>{t('mainDeity')}</SectionTitle>

        <div className="max-w-4xl mx-auto mt-8">
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gold/30">
            <div className="temple-border-top" />

            <div className="grid md:grid-cols-2">
              {/* Deity Image Side */}
              <div className="relative bg-gradient-to-br from-maroon-dark via-maroon to-maroon-dark p-8 flex items-center justify-center">
                <div className="w-full max-w-xs">
                  <div className="temple-arch overflow-hidden border-2 border-gold/40 shadow-xl">
                    <ImagePlaceholder
                      label="அருள்மிகு கல்யாண மரகதீஸ்வரர்"
                      aspectRatio="aspect-[3/4]"
                      className="!bg-gradient-to-b from-maroon/90 to-maroon-dark"
                      icon={Crown}
                      iconSize={64}
                    />
                  </div>
                </div>
              </div>

              {/* Deity Info */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <Star size={16} className="text-gold fill-gold" />
                  <span className="text-xs uppercase tracking-[0.2em] text-gold-dark font-bold font-tamil-sans">
                    மூலவர் சிவன்
                  </span>
                </div>

                <h3 className="font-tamil-serif text-2xl md:text-3xl font-bold text-maroon-dark mb-4 leading-snug">
                  அருள்மிகு கல்யாண மரகதீஸ்வரர்
                </h3>

                <p className="font-tamil-serif text-maroon/90 leading-relaxed mb-4">
                  இறைவனுக்கு அருள்மிகு கல்யாண மரகதீஸ்வரர் என்று திருநாமம் வழங்கப்பட்டுள்ளது.
                  இங்குள்ள மலையின் கற்கள் மரகதக் கல்லைப் போன்ற தோற்றத்துடன் காணப்படுவதாகவும்,
                  அவற்றில் இரும்புத் துகள்கள் ஒட்டிக்கொள்ளும் தன்மை இருப்பதாகவும் கூறப்படுகிறது.
                </p>
                <p className="font-tamil-sans text-maroon/75 text-sm leading-relaxed mb-6">
                  கல்யாணசுந்தரர் திருக்கோலத்தில் அருள் வழங்குவதால், திருமண வரம் வேண்டி வரும்
                  பக்தர்களின் மனக்குறையைத் தீர்த்து இல்லற வாழ்வில் மங்கலம் அருள்கிறார்.
                </p>

                <Link
                  to="/deities"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-maroon text-gold font-tamil-sans font-semibold rounded-lg hover:bg-maroon-dark transition-colors w-fit shadow-md"
                >
                  {t('readMore')} — {t('nav.deities')}
                  <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   OTHER DEITIES GRID
   ═══════════════════════════════════════════════════ */
const deitiesList = [
  {
    name: 'அருள்மிகு மரகதவல்லி அம்மன்',
    role: 'அம்பாள் (தாயார்)',
    desc: 'இத்திருக்கோயிலின் தாயாக, குடும்ப நலமும் மங்கலமும் அருள்பாலிக்கும் மரகதவல்லி அம்பிகை.',
  },
  {
    name: 'மரகத விநாயகர்',
    role: 'விக்ன விநாயகர்',
    desc: 'காரியத் தடைகளை அகற்றி நல்வாழ்வு அருளும் முழுமுதற் கடவுளான மரகத விநாயகர்.',
  },
  {
    name: 'உத்தண்ட வேலாயுதசுவாமி',
    role: 'முருகப்பெருமான்',
    desc: 'பழனி முருகனின் அம்சமாகக் கருதப்பட்டு வேண்டிய வரங்களை அருளும் உத்தண்ட வேலாயுதசுவாமி.',
  },
  {
    name: 'நந்தி பெருமான்',
    role: 'ஈசனின் வாகனம்',
    desc: 'தனித்துவமான சிற்ப வனப்புடன், ஈசனை நோக்கி அமர்ந்து அருள்பாலிக்கும் நந்திகேஸ்வரர்.',
  },
  {
    name: 'அறப்பளீஸ்வரர்',
    role: 'சிவ வடிவ மூர்த்தம்',
    desc: 'அறம் காத்து நீதி வழங்கும் திருவுருவாக தனி சன்னதியில் எழுந்தருளியுள்ள ஈஸ்வரர்.',
  },
  {
    name: 'கால பைரவர் & நவகிரகங்கள்',
    role: 'காவல் & கிரக தேவதைகள்',
    desc: 'காலத்தை வென்ற பைரவ மூர்த்தியும், தோஷ நிவர்த்தி அருளும் ஒன்பது கிரகங்களும்.',
  },
];

function OtherDeitiesSection({ t }) {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>{t('otherDeities')}</SectionTitle>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-8">
          {deitiesList.map((deity) => (
            <article
              key={deity.name}
              className="deity-card bg-white rounded-xl overflow-hidden shadow-md border border-gold/20 flex flex-col"
            >
              <ImagePlaceholder
                label={deity.name}
                aspectRatio="aspect-[4/3]"
                icon={Crown}
                iconSize={36}
                className="rounded-none"
              />
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-gold-dark mb-1 block font-tamil-sans">
                  {deity.role}
                </span>
                <h3 className="font-tamil-serif text-lg font-bold text-maroon-dark mb-2">
                  {deity.name}
                </h3>
                <p className="font-tamil-sans text-sm text-maroon/75 leading-relaxed flex-1">
                  {deity.desc}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/deities"
            className="group inline-flex items-center gap-2 px-8 py-3.5 border-2 border-maroon text-maroon font-tamil-sans font-bold rounded-lg hover:bg-maroon hover:text-gold transition-all duration-300 shadow-sm"
          >
            {t('viewAll')} (14 சன்னதிகள்)
            <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HISTORY HIGHLIGHTS SECTION
   ═══════════════════════════════════════════════════ */
const historyHighlights = [
  {
    icon: Landmark,
    title: 'இடைப்பிச்ச நாடு & நான்கு மூதூர்கள்',
    desc: 'வெங்கால நாட்டுடன் தொடர்புடைய இடைப்பிச்ச நாட்டின் தொன்மை கிராமங்களான ஆரியூர், நெடுங்கூர், பரமத்தி, முன்னூர்.',
  },
  {
    icon: Crown,
    title: 'பரமத்தி கோட்டை & குறுநில மன்னர்கள்',
    desc: 'கொங்கு நாட்டின் 51 கோட்டைகளில் ஒன்றான பரமத்தி கோட்டை மற்றும் முன்னூர் மலை அரண்.',
  },
  {
    icon: Star,
    title: 'சோழர்களின் சிவபணி (கி.பி. 894)',
    desc: 'கங்கர்களுக்குப் பின் சோழர்கள் கி.பி. 894-ல் நிறுவிய சிவாலய மரபின் சான்றாக விளங்கும் கற்றளி.',
  },
  {
    icon: Sparkles,
    title: 'பாவாடை இராயப்ப கவுண்டரின் திருப்பணி (1731)',
    desc: 'கி.பி. 1731-ல் இக்கோயிலின் மீது மிகுந்த ஈடுபாடு கொண்டு தனது உழைப்பாலும் பொருளாலும் திருப்பணிகள் செய்த பெருந்தகை.',
  },
];

function HistoryHighlightsSection({ t }) {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-temple-green to-temple-green-light relative overflow-hidden text-cream">
      <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_30px,rgba(255,248,231,0.15)_30px,rgba(255,248,231,0.15)_32px)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle light>{t('historyHighlights')}</SectionTitle>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {historyHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group bg-white/10 backdrop-blur-sm border border-gold/25 rounded-xl p-6 hover:bg-white/15 hover:border-gold/60 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/30 transition-colors">
                  <Icon size={24} className="text-gold" />
                </div>
                <h3 className="font-tamil-serif text-lg font-bold text-gold-light mb-2">
                  {item.title}
                </h3>
                <p className="font-tamil-sans text-sm text-cream/80 leading-relaxed">
                  {item.desc}
                </p>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/history"
            className="group inline-flex items-center gap-2 px-8 py-3.5 border-2 border-gold text-gold-light font-tamil-sans font-bold rounded-lg hover:bg-gold hover:text-maroon-dark transition-all duration-300 shadow-lg"
          >
            {t('exploreHistory')} (முழு வரலாறு 8 பிரிவுகள்)
            <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SPECIAL STORIES SECTION (EXACT 4 STORIES)
   ═══════════════════════════════════════════════════ */
function SpecialStoriesSection({ t }) {
  const stories = [
    {
      num: '1',
      title: t('stories.story1Title'),
      desc: t('stories.story1Desc'),
      icon: Gem,
    },
    {
      num: '2',
      title: t('stories.story2Title'),
      desc: t('stories.story2Desc'),
      icon: Sparkles,
    },
    {
      num: '3',
      title: t('stories.story3Title'),
      desc: t('stories.story3Desc'),
      icon: Shield,
    },
    {
      num: '4',
      title: t('stories.story4Title'),
      desc: t('stories.story4Desc'),
      icon: Heart,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={t('specialStories')}
          subtitle="திருக்கோயில் வரலாற்றுடன் இணைந்த ஆன்மிக ஐதீகங்களும் செவிவழிக் கதைகளும்"
        />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mt-8">
          {stories.map((story) => {
            const Icon = story.icon;
            return (
              <article
                key={story.title}
                className="group relative bg-white rounded-xl border-2 border-gold/30 hover:border-gold transition-all duration-300 p-6 md:p-8 shadow-md hover:shadow-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-10 h-10 rounded-full bg-maroon text-gold flex items-center justify-center font-bold text-lg shrink-0 shadow-md">
                    {story.num}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-tamil-serif text-lg md:text-xl font-bold text-maroon-dark">
                      {story.title}
                    </h3>
                  </div>
                  <Icon size={22} className="text-gold shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="font-tamil-serif text-maroon/85 text-base leading-relaxed">
                  {story.desc}
                </p>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/history"
            className="group inline-flex items-center gap-2 text-maroon font-tamil-sans font-bold hover:text-gold-dark transition-colors"
          >
            {t('exploreHistory')} பகுதியில் மேலும் படிக்க
            <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   GALLERY PREVIEW SECTION
   ═══════════════════════════════════════════════════ */
const galleryLabels = [
  'ராஜகோபுரம் & முகப்பு',
  'மாசி மகம் தேரோட்டம்',
  'கருவறை மரகதீஸ்வரர்',
  'அன்னை மரகதவல்லி அம்மன்',
  'நந்தி பெருமான் சன்னதி',
  'சோழர் காலத் தூண் சிற்பங்கள்',
];

function GalleryPreviewSection({ t }) {
  return (
    <section className="py-20 md:py-28 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>{t('galleryPreview')}</SectionTitle>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 mt-8">
          {galleryLabels.map((label, idx) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gold/20"
            >
              {idx === 0 ? (
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="src/assets/IMG_20261110_182908.jpg"
                    alt={label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/80 via-transparent to-transparent flex items-end p-4 text-cream font-tamil-serif font-bold text-sm">
                    {label}
                  </div>
                </div>
              ) : (
                <ImagePlaceholder
                  label={label}
                  aspectRatio={idx === 1 || idx === 3 ? 'aspect-square' : 'aspect-[4/3]'}
                  icon={Camera}
                  iconSize={32}
                  className="rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-maroon text-gold font-tamil-sans font-bold rounded-lg hover:bg-maroon-dark transition-all duration-300 shadow-md"
          >
            <Camera size={18} />
            {t('viewGallery')}
            <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CONTACT & LOCATION SECTION (STRICT: NO EVENING TIMINGS)
   ═══════════════════════════════════════════════════ */
function ContactLocationSection({ t }) {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>{t('contactLocation')}</SectionTitle>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mt-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* PROMINENT CONFIRMED TIMINGS CARD - NO EVENING */}
            <div className="bg-gradient-to-br from-maroon-dark to-maroon text-cream rounded-xl p-6 shadow-xl border-2 border-gold/40">
              <h3 className="font-tamil-serif text-xl font-bold text-gold-light mb-3 flex items-center gap-2">
                <Clock size={22} className="text-gold" />
                {t('templeTimings')}
              </h3>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-gold/30 text-center">
                <Sun size={28} className="text-gold mx-auto mb-2" />
                <span className="font-tamil-sans text-xs text-gold-light font-bold uppercase tracking-wider block">
                  தினசரி தரிசன நேரம்
                </span>
                <span className="font-tamil-serif text-2xl font-bold text-cream mt-1 block">
                  {t('darshanTimeText')}
                </span>
                <span className="text-xs text-gold-light/80 block mt-2 font-tamil-sans">
                  * மாலை நேர தரிசனம் கிடையாது
                </span>
              </div>
            </div>

            {/* Contact details */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gold/25 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-maroon/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={20} className="text-maroon" />
                </div>
                <div>
                  <h4 className="font-tamil-sans font-bold text-maroon-dark mb-1">
                    {t('address')}
                  </h4>
                  <p className="font-tamil-serif text-sm text-maroon/85 leading-relaxed">
                    அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில்,
                    <br />
                    முன்னூர் – மோளபாளையம்,
                    <br />
                     கரூர்  மாவட்டம், தமிழ்நாடு, இந்தியா.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-maroon/10 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-maroon" />
                </div>
                <div>
                  <h4 className="font-tamil-sans font-bold text-maroon-dark mb-0.5">
                    {t('phone')} (அலுவலகம்)
                  </h4>
                  <p className="font-tamil-sans text-sm text-maroon/80">
                    +91 9585554005 <span className="text-xs text-maroon/60">({t('editableNotice')})</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-maroon/10 flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-maroon" />
                </div>
                <div>
                  <h4 className="font-tamil-sans font-bold text-maroon-dark mb-0.5">
                    {t('email')}
                  </h4>
                  <p className="font-tamil-sans text-sm text-maroon/80">
                    info@example.com <span className="text-xs text-maroon/60">({t('editableNotice')})</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Directions Box */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="relative rounded-xl overflow-hidden shadow-md border-2 border-gold/30 flex-1 min-h-[300px]">
              <ImagePlaceholder
                label="முன்னூர் – மோளபாளையம் திருக்கோயில் இருப்பிடம்"
                aspectRatio="aspect-auto"
                icon={MapPin}
                iconSize={56}
                className="h-full w-full min-h-[300px]"
              />
            </div>
            <a
              href="https://maps.app.goo.gl/s6A3veHAhXCvN3n7A"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-4 bg-maroon text-gold font-tamil-sans font-bold rounded-lg hover:bg-maroon-dark transition-all w-full justify-center shadow-lg hover:shadow-xl"
            >
              <MapPin size={20} />
              {t('getDirections')}
              <ExternalLink size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HOME PAGE COMPONENT
   ═══════════════════════════════════════════════════ */
export default function HomePage() {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-0">
      <HeroSection t={t} />
      <LiveAnnouncementsSection language={language} t={t} />
      <MasiMagamSpecialSection t={t} />
      <IntroSection t={t} />
      <MainDeitySection t={t} />
      <OtherDeitiesSection t={t} />
      <HistoryHighlightsSection t={t} />
      <SpecialStoriesSection t={t} />
      <GalleryPreviewSection t={t} />
      <ContactLocationSection t={t} />
    </div>
  );
}

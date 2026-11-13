import { useState } from 'react';
import {
  Flame,
  Star,
  Sun,
  Moon,
  Shield,
  Crown,
  Sparkles,
  Circle,
  Orbit,
  Swords,
  BookOpen,
  Gem,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import moolavarImage from '../assets/moolavar.jpg';
import ammanImage from '../assets/amman.jpg';
import maragathavinayagarImage from '../assets/maragathavinayakar.jpg';
import uthandavelayudhaswamiImage from '../assets/uthandavelayuthaswamy.jpg';
import NandiImage from '../assets/nandi.jpg';
import durgaiammanImage from '../assets/durgaiamman.jpg';
import kalabhairavarImage from '../assets/kalabairavar.jpg';
import arapaleeswararImage from '../assets/arapeshwarar.jpg';
import navagrahamImage from '../assets/navagraham.jpg';
import ImagePlaceholder from '../components/ImagePlaceholder';
import SectionTitle from '../components/SectionTitle';

/* ───────────────────────── deity data ───────────────────────── */

const allDeitiesList = [
  {
    id: 1,
    category: 'moolavar',
    nameTa: 'அருள்மிகு கல்யாண மரகதீஸ்வரர்',
    nameEn: 'Arulmigu Kalyana Maragatheeswarar',
    image: moolavarImage,
    titleTa: 'மூலவர் பெருமான் (சுயம்பு மூர்த்தி)',
    titleEn: 'Presiding Deity (Swayambhu Lingam)',
    descriptionTa:
      'கல்யாண மரகதீஸ்வரர் இத்திருக்கோயிலின் மூலவர் ஆவார். கல்யாணசுந்தரர் வடிவில் சிவபெருமான் எழுந்தருளி மரகதம் போன்ற பேரொளியுடன் திகழ்கிறார் என்பது ஐதீகம். திருமணப் பேறு, குடும்ப ஒற்றுமை, இல்லற அமைதி ஆகியவற்றை வேண்டி வழிபடும் பக்தர்களுக்கு உடனடி அருள் வழங்கும் கண்கண்ட தெய்வமாகப் போற்றப்படுகிறார்.',
    descriptionEn:
      'Lord Kalyana Maragatheeswarar is the presiding deity of this ancient temple. Manifested in the divine wedding posture (Kalyanasundarar) with emerald-like radiance, Lord Shiva blesses devotees with happy marriage, family harmony, and all-round spiritual prosperity.',
    icon: Gem,
    featured: true,
  },
  {
    id: 2,
    category: 'amman',
    nameTa: 'அருள்மிகு மரகதவல்லி அம்மன்',
    nameEn: 'Arulmigu Maragathavalli Amman',
    image: ammanImage,
    titleTa: 'தாயார் / அம்பிகை சன்னதி',
    titleEn: 'Divine Consort / Goddess Shrine',
    descriptionTa:
      'மரகதவல்லி அம்மன் இத்திருக்கோயிலின் கருணைமுக அம்பிகை ஆவாள். மரகதம் போன்ற பசுமை பொழியும் கருணைத் தாயாக விளங்கும் அன்னை, மங்கல நலம், சந்தான பாக்கியம் (புத்திரப் பேறு), மற்றும் சகல ஐஸ்வர்யங்களையும் வாரி வழங்கும் தாயாக பக்தர்களால் வழிபடப்படுகிறாள்.',
    descriptionEn:
      'Goddess Maragathavalli Amman graces as the loving Divine Mother of this holy shrine. Radiating serenity and maternal affection, She bestows auspiciousness, progeny blessings, health, and abundant prosperity to all worshipping devotees.',
      icon: Crown,
    featured: true,
  },
  {
    id: 3,
    category: 'parivaram',
    nameTa: 'மரகத விநாயகர்',
    nameEn: 'Maragatha Vinayagar',
    image: maragathavinayagarImage,
    titleTa: 'முழுமுதற் கடவுள்',
    titleEn: 'Lord of Beginnings',
    descriptionTa:
      'காரியத் தடைகளைத் தகர்த்து நன்மைகளைப் பெருக்கும் மரகத விநாயகர் கோயிலின் பிரகாரத்தில் தனி சன்னதியில் அருள்பாலிக்கிறார். எந்த ஒரு வழிபாடும் விநாயகர் பூஜையுடன் தொடங்குவது மரபு.',
    descriptionEn:
      'Bestower of wisdom and remover of obstacles, Lord Maragatha Vinayagar presides in a dedicated shrine. Temple rituals and devotees’ prayers commence with His sacred blessings.',
    icon: Sparkles,
  },
  {
    id: 4,
    category: 'parivaram',
    nameTa: 'உத்தண்ட வேலாயுதசுவாமி',
    nameEn: 'Utthanda Velayudhaswami',
    image: uthandavelayudhaswamiImage,
    titleTa: 'முருகப் பெருமான்',
    titleEn: 'Lord Murugan',
    descriptionTa:
      'வீரமும் ஞானமும் ஒருங்கே அமைந்த கதிர்வேல் ஏந்தி, உத்தண்ட வேலாயுதசுவாமியாக முருகப் பெருமான் அருள்புரிகிறார். தைப்பூசம், சஷ்டி மற்றும் பங்குனி உத்திர நாட்களில் விசேஷ வழிபாடு நடைபெறுகிறது.',
    descriptionEn:
      'Adorned with the sacred spear (Vel), Lord Muruga graces here as Utthanda Velayudhaswami, blessing devotees with courage, intellect, and victory over inner impediments.',
    icon: Swords,
  },
  {
    id: 5,
    category: 'parivaram',
    nameTa: 'நந்தி பெருமான்',
    nameEn: 'Nandi Devar',
    image: NandiImage,
    titleTa: 'ஈசனின் முதன்மைத் தொண்டர்',
    titleEn: 'Divine Mount of Lord Shiva',
    descriptionTa:
      'இத்திருக்கோயிலின் நந்தி சிலை தனித்துவமான கலைப்படைப்பு. நந்திதேவர் சிவபெருமானை நோக்கி சாந்தமாக அமர்ந்திருக்கும் கோணமும் அதன் உருவ அமைப்பும் பக்தர்களை வியப்பில் ஆழ்த்துகின்றன. பிரதோஷ நாளில் விசேஷ அபிஷேகம் நடைபெறும்.',
    descriptionEn:
      'The sacred Nandi statue here possesses an extraordinary artistic and spiritual charm. Facing Lord Shiva in tranquil devotion, Nandi receives elaborate fortnightly Pradosham abhishekam.',
    icon: Shield,
  },
  {
    id: 6,
    category: 'parivaram',
    nameTa: 'அறப்பளீஸ்வரர்',
    nameEn: 'Arapaleeswarar',
    image: arapaleeswararImage,
    titleTa: 'சிவ வடிவ மூர்த்தம்',
    titleEn: 'Manifestation of Shiva',
    descriptionTa:
      'அறநெறியைக் காத்து நீதி வழங்கும் திருவுருவாக அறப்பளீஸ்வரர் தனி சன்னதியில் எழுந்தருளியுள்ளார். கொங்கு நாட்டின் தொன்மையான சிவ வழிபாட்டு மரபின் சான்றாக இச்சன்னதி விளங்குகிறது.',
    descriptionEn:
      'Upholder of Dharma and cosmic righteousness, Lord Arapaleeswarar graces in a distinct sanctum, exemplifying the ancient Shaivite roots of the Kongu region.',
    icon: Flame,
  },
  {
    id: 7,
    category: 'parivaram',
    nameTa: 'தட்சிணாமூர்த்தி',
    nameEn: 'Dakshinamurthy',
    titleTa: 'தென்முகக் கடவுள் (ஞான குரு)',
    titleEn: 'South-Facing Cosmic Teacher',
    descriptionTa:
      'கோயிலின் தெற்குப் பிரகாரக் கோஷ்டத்தில் வீற்றிருந்து மோன முத்திரையுடன் மெய்யறிவு நல்கும் தட்சிணாமூர்த்தி பகவான். கல்வி, கலைகளில் சிறந்து விளங்க வியாழக்கிழமைகளில் விசேஷ அர்ச்சனைகள் செய்யப்படுகின்றன.',
    descriptionEn:
      'Seated under the banyan tree facing South in deep silent meditation, Lord Dakshinamurthy confers supreme wisdom, clarity of thought, and educational success.',
    icon: BookOpen,
  },
  {
    id: 8,
    category: 'parivaram',
    nameTa: 'துர்க்கை அம்மன்',
    nameEn: 'Durga Amman',
    image: durgaiammanImage,
    titleTa: 'வீர சக்தி / தீமை அழிக்கும் அன்னை',
    titleEn: 'Goddess of Supreme Power',
    descriptionTa:
      'தீய சக்திகளை அழித்து பக்தர்களைக் காக்கும் துர்க்கா தேவி வடக்குக் கோஷ்டத்தில் அருள்பாலிக்கிறாள். செவ்வாய் மற்றும் வெள்ளிக்கிழமைகளில் ராகு கால பூஜை பக்தர்கள் திரளாக வழிபடும் சிறப்பு நிகழ்வு.',
    descriptionEn:
      'Gracing the northern sanctum wall, Mother Durga shields sincere devotees from negative influences and adversities. Rahu Kala poojas on Tuesdays and Fridays draw devout crowds.',
    icon: Shield,
  },
  {
    id: 9,
    category: 'navagraha',
    nameTa: 'சனீஸ்வரர்',
    nameEn: 'Shaneeswarar',
    titleTa: 'நீதி மற்றும் கர்ம காரகன்',
    titleEn: 'Lord Saturn',
    descriptionTa:
      'நவகிரகங்களில் முதன்மையாக நீதி வழுவாமல் கர்ம பலன்களை வழங்கும் சனீஸ்வர பகவான் தனி சன்னதியில் அருள்பாலிக்கிறார். சனிப்பெயர்ச்சி மற்றும் சனிக்கிழமைகளில் எள்தீபம் ஏற்றி வழிபடுதல் விசேஷம்.',
    descriptionEn:
      'Presiding with divine equity over karma, Shaneeswarar blesses sincere devotees during Sade Sati and Saturn transits. Sesame lamp offerings on Saturdays are customary.',
    icon: Star,
  },
  {
    id: 10,
    category: 'navagraha',
    nameTa: 'சந்திரன்',
    nameEn: 'Chandran (Moon God)',
    titleTa: 'மனோகாரகன்',
    titleEn: 'Deity of Mind & Serenity',
    descriptionTa:
      'மன அமைதி, தெளிவான சிந்தனை மற்றும் மனோபலம் அருளும் சந்திர பகவான் கோயிலின் திருச்சுற்றில் வழிபடப்படுகிறார். திங்கட்கிழமைகளில் சந்திர வழிபாடு நற்பலன்களைத் தரும்.',
    descriptionEn:
      'Ruling the mind, emotions, and tranquility, Lord Chandran is worshipped for psychological peace, intuition, and mental clarity.',
    icon: Moon,
  },
  {
    id: 11,
    category: 'navagraha',
    nameTa: 'சூரியன்',
    nameEn: 'Sooryan (Sun God)',
    titleTa: 'ஆரோக்கிய காரகன்',
    titleEn: 'Solar Deity of Health & Radiance',
    descriptionTa:
      'உலகிற்கே ஒளி வழங்கி ஆரோக்கியமும் புகழும் அருளும் சூரிய பகவான். பிரம்ம முகூர்த்தத்திலும் ஞாயிற்றுக்கிழமைகளிலும் சூரிய வழிபாடு செய்வது அளப்பரிய ஆற்றலை நல்கும்.',
    descriptionEn:
      'The source of life, health, and vitality, Lord Sooryan dispels physical ailments and confers self-confidence, leadership, and vitality.',
    icon: Sun,
  },
  {
    id: 12,
    category: 'parivaram',
    nameTa: 'சண்டிகேஸ்வரர்',
    nameEn: 'Chandikeswarar',
    titleTa: 'சிவ கணங்களின் முதன்மைப் பொறுப்பாளர்',
    titleEn: 'Chief of Shiva Ganas',
    descriptionTa:
      'சிவபூஜையின் முழுப் பலனையும் பக்தர்களுக்கு உறுதி செய்யும் சண்டிகேஸ்வரர் சன்னதி கருவறையின் வடக்கில் அமைந்துள்ளது. அமைதியாகக் கைகொட்டி வணங்கி இவரது ஆசியைப் பெறுவது மரபு.',
    descriptionEn:
      'Situated north of the sanctum, Chandikeswarar records devotee attendance and ensures the complete merit of the Shiva worship is attained.',
    icon: Flame,
  },
  {
    id: 13,
    category: 'navagraha',
    nameTa: 'நவகிரகங்கள்',
    nameEn: 'Navagrahas',
    image: navagrahamImage,
    titleTa: 'ஒன்பது கோள்களின் திருச்சபை',
    titleEn: 'Nine Celestial Planetary Deities',
    descriptionTa:
      'சூரியன், சந்திரன், செவ்வாய், புதன், குரு, சுக்கிரன், சனி, ராகு, கேது ஆகிய ஒன்பது கிரகங்களும் தனி மண்டபத்தில் சாஸ்திர முறைப்படி பிரதிஷ்டை செய்யப்பட்டுள்ளன. கிரக தோஷ நிவர்த்திக்குரிய வழிபாடு.',
    descriptionEn:
      'The nine celestial planets are established according to Agama Shastras in a dedicated enclosure. Pradakshinam (circumambulation) here alleviates astrological planetary afflictions.',
    icon: Orbit,
  },
  {
    id: 14,
    category: 'parivaram',
    nameTa: 'கால பைரவர்',
    nameEn: 'Kala Bhairavar',
    image: kalabhairavarImage,
    titleTa: 'காலத்தின் கடவுள் & ஆலயக் காவல் தெய்வம்',
    titleEn: 'Lord of Time & Temple Protector',
    descriptionTa:
      'சிவபெருமானின் உக்கிர வடிவமும் காலத்தின் அதிபதியுமான கால பைரவர் திருக்கோயிலின் காவல் தெய்வமாக விளங்குகிறார். தேய்பிறை அஷ்டமி நாளில் நடைபெறும் விசேஷ வடைமாலை மற்றும் மிளகு தீப வழிபாடு புகழ்பெற்றது.',
    descriptionEn:
      'The fierce protector aspect of Lord Shiva and guardian of time, Lord Kala Bhairava guards the temple precincts. Special worship on Theipirai Ashtami days bestows fearlessness and protection.',
    icon: Circle,
  },
];

/* ───────────────────── featured deity card ──────────────────── */

function FeaturedDeityCard({ deity, language, reversed = false }) {
  const Icon = deity.icon;
  const name = language === 'ta' ? deity.nameTa : deity.nameEn;
  const title = language === 'ta' ? deity.titleTa : deity.titleEn;
  const desc = language === 'ta' ? deity.descriptionTa : deity.descriptionEn;

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-white border-2 border-gold/30 shadow-xl transition-all duration-300 hover:border-gold hover:shadow-2xl mb-12">
      {/* Gold top border */}
      <div className="temple-border-top" aria-hidden="true" />

      <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
        {/* Image side */}
        <div className="lg:w-1/2 relative bg-gradient-to-br from-maroon-dark via-maroon to-maroon-dark p-8 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <div className="temple-arch overflow-hidden border-2 border-gold/40 shadow-xl">
              {deity.image ? (
                <img
                  src={deity.image}
                  alt={name}
                  className="w-full aspect-[4/3] min-h-[280px] lg:min-h-[360px] object-cover"
                  loading="lazy"
                />
              ) : (
                <ImagePlaceholder
                  icon={Icon}
                  label={name}
                  aspectRatio="aspect-[4/3]"
                  iconSize={64}
                  className="min-h-[280px] lg:min-h-[360px] !bg-gradient-to-b from-maroon/90 to-maroon-dark"
                />
              )}
            </div>
          </div>
          {/* Subtle glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,168,67,0.12)_0%,transparent_60%)] pointer-events-none" />
        </div>

        {/* Text side */}
        <div className="lg:w-1/2 flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <div className="flex items-center gap-2 mb-3">
            <Star size={16} className="text-gold fill-gold" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold-dark font-bold font-tamil-sans">
              {title}
            </span>
          </div>

          <h3 className="font-tamil-serif text-2xl sm:text-3xl lg:text-4xl text-maroon-dark font-bold leading-snug mb-4">
            {name}
          </h3>

          <p className="font-tamil-serif text-maroon/90 text-base sm:text-lg leading-relaxed">
            {desc}
          </p>

          <div className="kolam-divider mt-6" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}

/* ────────────────────── standard deity card ─────────────────── */

function DeityCard({ deity, language }) {
  const Icon = deity.icon;
  const name = language === 'ta' ? deity.nameTa : deity.nameEn;
  const title = language === 'ta' ? deity.titleTa : deity.titleEn;
  const desc = language === 'ta' ? deity.descriptionTa : deity.descriptionEn;

  return (
    <article className="deity-card group relative flex flex-col overflow-hidden rounded-xl bg-white border border-gold/20 shadow-md hover:border-gold hover:shadow-xl transition-all duration-300">
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-gold/20 via-gold to-gold/20" aria-hidden="true" />

      {/* Deity image placeholder */}
      <div className="relative">
        {deity.image ? (
          <img
            src={deity.image}
            alt={name}
            className="w-full aspect-[4/3] object-cover border-b border-gold/15"
            loading="lazy"
          />
        ) : (
          <ImagePlaceholder
            icon={Icon}
            label={name}
            aspectRatio="aspect-[4/3]"
            iconSize={42}
            className="border-b border-gold/15"
          />
        )}
        <div className="absolute top-3 right-3 bg-maroon-dark/80 text-gold text-xs px-2.5 py-1 rounded-full font-bold border border-gold/30 backdrop-blur-sm">
          #{deity.id}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <span className="text-xs font-semibold text-gold-dark uppercase tracking-wider mb-1 font-tamil-sans">
          {title}
        </span>

        <h3 className="font-tamil-serif text-xl text-maroon-dark font-bold leading-snug mb-2 group-hover:text-maroon transition-colors">
          {name}
        </h3>

        <p className="font-tamil-sans text-sm text-maroon/80 leading-relaxed flex-1">
          {desc}
        </p>
      </div>

      {/* Hover bottom shimmer */}
      <div className="h-0.5 bg-gradient-to-r from-gold/0 via-gold/80 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </article>
  );
}

/* ────────────────────────── page ────────────────────────────── */

export default function DeitiesPage() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');

  const filteredDeities = allDeitiesList.filter((d) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pradhana') return d.id === 1 || d.id === 2;
    if (activeTab === 'parivaram') return d.category === 'parivaram';
    if (activeTab === 'navagraha') return d.category === 'navagraha';
    return true;
  });

  const moolavar = allDeitiesList[0];
  const amman = allDeitiesList[1];
  const maragathavinayagar = allDeitiesList[2];

  return (
    <div className="min-h-screen bg-cream">
      {/* ─── Hero Banner ─── */}
      <header className="relative bg-maroon-dark overflow-hidden py-16 sm:py-24 text-center">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle,#D4A843_1px,transparent_1px)] bg-[length:24px_24px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <span className="block text-gold-light text-3xl font-tamil-serif mb-3 om-pulse select-none">
            ௐ
          </span>

          <h1 className="font-tamil-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cream gold-shimmer leading-tight mb-4">
            {t('nav.deities')}
          </h1>

          <p className="font-tamil-serif text-cream/85 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            முன்னூர் அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயிலில் அருள்பாலிக்கும் 14 திருவுருவ மூர்த்திகள்
          </p>

          <div className="kolam-divider mt-6" aria-hidden="true" />
        </div>

        <div className="temple-border-top mt-8" aria-hidden="true" />
      </header>

      {/* ─── Presiding Deities (Featured) ─── */}
      <section className="py-14 sm:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={t('mainDeity')}
          subtitle="கருவறையில் மூலவராக விளங்கும் கல்யாண மரகதீஸ்வரரும் அம்பிகையும்"
        />

        {/* Real Temple Photo Banner */}
        <div className="mb-12 rounded-2xl overflow-hidden shadow-xl border-2 border-gold/40 relative">
          <img
            src="/temple-main.jpg"
            alt="அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில் தோற்றம்"
            className="w-full h-[280px] sm:h-[380px] object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-maroon-dark via-maroon-dark/70 to-transparent p-4 sm:p-5 text-cream flex items-center justify-between">
            <span className="font-tamil-serif text-base sm:text-lg font-bold text-gold-light">
              முன்னூர் – மோளபாளையம் அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில்
            </span>
            <span className="hidden sm:inline-block px-3 py-1 bg-gold text-maroon-dark text-xs font-bold rounded-full font-tamil-sans">
              14 சன்னதிகள்
            </span>
          </div>
        </div>

        <FeaturedDeityCard deity={moolavar} language={language} />
        <FeaturedDeityCard deity={amman} language={language} reversed />
        <FeaturedDeityCard deity={maragathavinayagar} language={language} />
      </section>

      {/* ─── Filter Tabs & All 14 Deities Grid ─── */}
      <section className="py-14 sm:py-18 bg-cream-dark/60 border-t border-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="திருக்கோயில் பரிவார தெய்வங்கள்"
            subtitle="கோயிலில் முறைப்படி பிரதிஷ்டை செய்யப்பட்டு அருள்பாலிக்கும் அனைத்து தெய்வங்கள்"
          />

          {/* Filter buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {[
              { id: 'all', labelTa: 'அனைத்து தெய்வங்கள் (14)', labelEn: 'All Deities (14)' },
              { id: 'pradhana', labelTa: 'முதன்மை மூர்த்திகள் (2)', labelEn: 'Presiding Deities (2)' },
              { id: 'parivaram', labelTa: 'பரிவார மூர்த்திகள் (8)', labelEn: 'Parivara Deities (8)' },
              { id: 'navagraha', labelTa: 'நவகிரகங்கள் & கோள்கள் (4)', labelEn: 'Navagraha & Planets (4)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full font-tamil-sans text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-maroon text-gold shadow-md border-2 border-gold'
                    : 'bg-white text-maroon-dark hover:bg-gold/10 border border-gold/30'
                }`}
              >
                {language === 'ta' ? tab.labelTa : tab.labelEn}
              </button>
            ))}
          </div>

          {/* Grid of Deities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredDeities.map((deity, idx) => (
              <DeityCard
                key={deity.id}
                deity={deity}
                language={language}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom border */}
      <div className="temple-border-pattern" aria-hidden="true" />
    </div>
  );
}

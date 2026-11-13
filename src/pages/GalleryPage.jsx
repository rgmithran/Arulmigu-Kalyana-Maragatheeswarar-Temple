import { useState, useEffect, useCallback } from 'react';
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Landmark,
  Crown,
  Flame,
  Sun,
  Moon,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import architectureImage from '../assets/1000139158.jpg';
import ImagePlaceholder from '../components/ImagePlaceholder';

const galleryItems = [
  {
    id: 1,
    category: 'architecture',
    titleTa: 'திருக்கோயில் ராஜகோபுரம் & எழில் தோற்றம்',
    titleEn: 'Temple Rajagopuram & Sacred Elevation',
    descTa: 'சோழர் காலப் பாணியிலான கம்பீரமான திருக்கோயில் நுழைவு கோபுரம் மற்றும் இயற்கை எழில் சூழ்ந்த திருத்தலக் காட்சி.',
    descEn: 'Majestic Chola-style entrance gopuram and the scenic elevation of the ancient shrine.',
    aspect: 'aspect-[4/3]',
    image: architectureImage,
    icon: Landmark,
  },
  {
    id: 2,
    category: 'chariot',
    titleTa: 'மாசி மகம் சுவாமி திருத்தேர் உற்சவம்',
    titleEn: 'Masi Magam Holy Chariot Procession',
    descTa: 'பக்தர்கள் பக்திப் பரவசத்துடன் தேரின் வடம் பிடித்து நான்கு மாட வீதிகளிலும் இழுத்து வரும் தேரோட்டக் காட்சி.',
    descEn: 'Devotees drawing the sacred chariot ropes through the historic four streets during Masi Magam.',
    aspect: 'aspect-[4/3]',
    icon: Flame,
  },
  {
    id: 3,
    category: 'moolavar',
    titleTa: 'அருள்மிகு கல்யாண மரகதீஸ்வரர் கருவறை',
    titleEn: 'Sanctum of Kalyana Maragatheeswarar',
    descTa: 'மரகதப் பச்சை வண்ணப் பொலிவுடன் திகழும் சுயம்பு சிவலிங்கத் திருமேனியின் கருவறை தோற்றம்.',
    descEn: 'The sacred sanctum sanctorum housing the self-manifested Swayambhu emerald Shivalingam.',
    aspect: 'aspect-[3/4]',
    icon: Crown,
  },
  {
    id: 4,
    category: 'amman',
    titleTa: 'அருள்மிகு மரகதவல்லி அம்மன் சன்னதி',
    titleEn: 'Shrine of Goddess Maragathavalli',
    descTa: 'மங்கலப் பொலிவுடன் அருள்பாலிக்கும் அன்னை மரகதவல்லி தாயாரின் திருவுருவ அலங்காரம்.',
    descEn: 'Graceful shrine of Mother Maragathavalli decorated with traditional silk and blossoms.',
    aspect: 'aspect-[3/4]',
    icon: Crown,
  },
  {
    id: 5,
    category: 'chariot',
    titleTa: 'சுவாமி அம்பாள் திருக்கல்யாண உற்சவம்',
    titleEn: 'Celestial Wedding Rituals (Thirukalyanam)',
    descTa: 'தேரோட்டத்திற்கு முன்னோடியாக நிகழும் ஈசன் மற்றும் அம்பிகையின் மங்களத் திருமண வைபவம்.',
    descEn: 'The divine celestial wedding rituals solemnized amidst traditional nadaswaram and vedic chanting.',
    aspect: 'aspect-square',
    icon: Flame,
  },
  {
    id: 6,
    category: 'architecture',
    titleTa: 'சோழர் காலத் தூண் சிற்பங்கள் & அர்த்தமண்டபம்',
    titleEn: 'Chola Stone Pillars & Ardha Mandapam',
    descTa: 'நுணுக்கமான புடைப்புச் சிற்பங்கள் மற்றும் கொங்குப் பண்பாட்டு வடிவிலான கற்பாறைத் தூண்கள்.',
    descEn: 'Intricately hand-carved granite pillars exhibiting ancient Dravidian architectural motifs.',
    aspect: 'aspect-[4/3]',
    icon: Landmark,
  },
  {
    id: 7,
    category: 'celebrations',
    titleTa: 'மகா சிவராத்திரி நான்கு கால பூஜை',
    titleEn: 'Maha Shivaratri Four Kaalam Pujas',
    descTa: 'சிவராத்திரி இரவில் தீப ஒளியிலும் மந்திர முழக்கத்திலும் மிளிரும் கருவறை மகா தீபாராதனை.',
    descEn: 'Sacred Maha Deeparadhana illuminated by oil lamps during the blessed vigil of Shivaratri.',
    aspect: 'aspect-[3/4]',
    icon: Moon,
  },
  {
    id: 8,
    category: 'architecture',
    titleTa: 'நந்தி பெருமான் தனி சன்னதி மண்டபம்',
    titleEn: 'Sacred Nandi Mandapam',
    descTa: 'கருவறை நோக்கி அமர்ந்திருக்கும் பழமையான தனித்துவ நந்தி தேவரின் திருவுருவ அமைப்பு.',
    descEn: 'The serene stone sculpture of Lord Nandi seated facing the sanctum with devotion.',
    aspect: 'aspect-[4/3]',
    icon: Landmark,
  },
  {
    id: 9,
    category: 'amman',
    titleTa: 'அம்மன் விசேஷ சந்தனக் காப்பு அலங்காரம்',
    titleEn: 'Special Sandal Paste Alankaram for Amman',
    descTa: 'நவராத்திரி மற்றும் திருவிழா நாட்களில் அன்னைக்குச் சாற்றப்படும் சந்தனக் காப்பு.',
    descEn: 'Special floral decorations and sandal ornamentation during the sacred festive days.',
    aspect: 'aspect-[3/4]',
    icon: Crown,
  },
  {
    id: 10,
    category: 'celebrations',
    titleTa: 'பிரதோஷ நந்தி மகா அபிஷேகம்',
    titleEn: 'Pradosham Nandi Abhishekam',
    descTa: 'திரயோதசி மாலை வேளையில் பால், சந்தனம், பஞ்சாமிர்தத்தால் நந்திக்கு நடைபெறும் அபிஷேகம்.',
    descEn: 'Consecrated twilight abhishekam to Lord Nandi with holy milk, sandal, and flowers.',
    aspect: 'aspect-square',
    icon: Sun,
  },
  {
    id: 11,
    category: 'moolavar',
    titleTa: 'மரகதீஸ்வரர் வில்வ தள அர்ச்சனை',
    titleEn: 'Vilva Leaf Archana to Maragatheeswarar',
    descTa: 'மூலவர் சிவலிங்கத்திற்கு 1008 புனித வில்வ தளங்களால் செய்யப்படும் அர்ச்சனைத் தோற்றம்.',
    descEn: 'Holy ritual worship offering 1008 sacred trifoliate Bilva leaves to the presiding deity.',
    aspect: 'aspect-square',
    icon: Crown,
  },
  {
    id: 12,
    category: 'chariot',
    titleTa: 'தேரோட்ட அன்னதான வைபவம்',
    titleEn: 'Masi Magam Grand Annadhanam',
    descTa: 'தேரோட்டத் திருநாளில் பல்லாயிரக்கணக்கான பக்தர்களுக்கு வழங்கப்படும் சுவையான அன்னதானக் காட்சி.',
    descEn: 'Community sacred food offering (Annadhanam) served to all visiting pilgrims during the chariot festival.',
    aspect: 'aspect-[4/3]',
    icon: Flame,
  },
];

export default function GalleryPage() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const openLightbox = (index) => {
    setActiveModalIndex(index);
  };

  const closeLightbox = () => {
    setActiveModalIndex(null);
  };

  const showNext = useCallback(() => {
    if (activeModalIndex !== null) {
      setActiveModalIndex((prev) => (prev + 1) % filteredItems.length);
    }
  }, [activeModalIndex, filteredItems.length]);

  const showPrev = useCallback(() => {
    if (activeModalIndex !== null) {
      setActiveModalIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    }
  }, [activeModalIndex, filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeModalIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalIndex, showNext, showPrev]);

  useEffect(() => {
    document.body.style.overflow = activeModalIndex !== null ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModalIndex]);

  const categories = [
    { id: 'all', labelTa: 'அனைத்தும்', labelEn: 'All (12)' },
    { id: 'chariot', labelTa: 'மாசி மகம் தேரோட்டம்', labelEn: 'Masi Magam Therottam' },
    { id: 'architecture', labelTa: 'கோயிற் கட்டிடக்கலை', labelEn: 'Architecture' },
    { id: 'moolavar', labelTa: 'மூலவர் கல்யாண மரகதீஸ்வரர்', labelEn: 'Main Deity' },
    { id: 'amman', labelTa: 'மரகதவல்லி அம்மன்', labelEn: 'Amman' },
    { id: 'celebrations', labelTa: 'சிறப்பு வழிபாடுகள்', labelEn: 'Special Poojas' },
  ];

  const currentItem = activeModalIndex !== null ? filteredItems[activeModalIndex] : null;

  return (
    <div className="min-h-screen bg-cream">
      {/* ─── Hero Header ─── */}
      <header className="relative bg-maroon-dark overflow-hidden py-16 sm:py-24 text-center">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle,#D4A843_1px,transparent_1px)] bg-[length:24px_24px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <span className="block text-gold-light text-3xl font-tamil-serif mb-3 om-pulse select-none">
            ௐ
          </span>

          <h1 className="font-tamil-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cream gold-shimmer leading-tight mb-4">
            {t('galleryPage.title')}
          </h1>

          <p className="font-tamil-serif text-cream/85 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('galleryPage.subtitle')}
          </p>

          <div className="kolam-divider mt-6" aria-hidden="true" />
        </div>

        <div className="temple-border-top mt-8" aria-hidden="true" />
      </header>

      {/* ─── Filter Tabs ─── */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setActiveModalIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full font-tamil-sans text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-maroon text-gold shadow-md border-2 border-gold'
                  : 'bg-white text-maroon-dark hover:bg-gold/10 border border-gold/30'
              }`}
            >
              {language === 'ta' ? cat.labelTa : cat.labelEn}
            </button>
          ))}
        </div>
      </section>

      {/* ─── Masonry Gallery Grid ─── */}
      <section className="py-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, idx) => {
            const Icon = item.icon;
            const title = language === 'ta' ? item.titleTa : item.titleEn;
            const desc = language === 'ta' ? item.descTa : item.descEn;

            return (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="group relative break-inside-avoid overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl border-2 border-gold/20 hover:border-gold transition-all duration-300 cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  {item.image ? (
                    <div className="overflow-hidden aspect-[4/3]">
                      <img
                        src={item.image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <ImagePlaceholder
                      label={title}
                      aspectRatio={item.aspect}
                      icon={Icon}
                      iconSize={48}
                      className="w-full group-hover:scale-105 transition-transform duration-500"
                    />
                  )}

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/90 via-maroon-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-cream">
                    <span className="text-xs uppercase tracking-wider text-gold font-bold font-tamil-sans mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-tamil-serif text-lg font-bold text-cream mb-1">
                      {title}
                    </h3>
                    <p className="font-tamil-sans text-xs text-cream/80 line-clamp-2">
                      {desc}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-gold font-semibold">
                      <Maximize2 size={14} />
                      முழுத்திரையில் பார்க்க / View Fullscreen
                    </div>
                  </div>
                </div>

                {/* Always visible label on mobile/tablet */}
                <div className="p-4 sm:p-5 group-hover:bg-cream/40 transition-colors">
                  <h3 className="font-tamil-serif text-base font-bold text-maroon-dark line-clamp-1">
                    {title}
                  </h3>
                  <p className="font-tamil-sans text-xs text-maroon/70 line-clamp-1 mt-1">
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Devotee submission notice box */}
        <div className="mt-16 bg-white rounded-xl p-6 sm:p-8 border-2 border-gold/30 text-center max-w-3xl mx-auto shadow-md">
          <Camera className="mx-auto text-gold mb-2" size={32} />
          <h3 className="font-tamil-serif text-xl font-bold text-maroon-dark mb-2">
            புகைப்படப் பகிர்வு & திருவிழா நினைவுகள்
          </h3>
          <p className="font-tamil-sans text-sm text-maroon/80 leading-relaxed max-w-xl mx-auto">
            {t('galleryPage.imageNotice')}
          </p>
        </div>
      </section>

      {/* ─── Fullscreen Lightbox Modal ─── */}
      {currentItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={closeLightbox}
        >
          {/* Top Bar */}
          <div
            className="absolute top-4 left-4 right-4 flex items-center justify-between text-cream z-20 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-maroon-dark/80 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border border-gold/40 text-gold font-tamil-sans">
              {activeModalIndex + 1} / {filteredItems.length}
            </div>

            <button
              onClick={closeLightbox}
              className="p-2.5 rounded-full bg-maroon-dark/80 hover:bg-gold hover:text-maroon-dark text-gold border border-gold/40 transition-all cursor-pointer"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-maroon-dark/80 hover:bg-gold hover:text-maroon-dark text-gold border border-gold/40 transition-all cursor-pointer z-20"
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-maroon-dark/80 hover:bg-gold hover:text-maroon-dark text-gold border border-gold/40 transition-all cursor-pointer z-20"
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>

          {/* Modal Content */}
          <div
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center text-center p-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-h-[60vh] flex items-center justify-center overflow-hidden rounded-xl border-2 border-gold/50 shadow-2xl bg-cream">
              {currentItem.image ? (
                <img
                  src={currentItem.image}
                  alt={language === 'ta' ? currentItem.titleTa : currentItem.titleEn}
                  className="max-h-[60vh] w-auto object-contain rounded-lg"
                />
              ) : (
                <ImagePlaceholder
                  label={language === 'ta' ? currentItem.titleTa : currentItem.titleEn}
                  aspectRatio="aspect-auto"
                  icon={currentItem.icon}
                  iconSize={80}
                  className="w-full h-[50vh] sm:h-[60vh] rounded-none"
                />
              )}
            </div>

            {/* Captions */}
            <div className="mt-4 bg-maroon-dark/90 border border-gold/30 rounded-xl p-4 sm:p-6 text-cream max-w-2xl w-full">
              <h3 className="font-tamil-serif text-xl sm:text-2xl font-bold text-gold-light mb-1">
                {language === 'ta' ? currentItem.titleTa : currentItem.titleEn}
              </h3>
              <p className="font-tamil-sans text-xs sm:text-sm text-cream/80 leading-relaxed">
                {language === 'ta' ? currentItem.descTa : currentItem.descEn}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom border */}
      <div className="temple-border-pattern" aria-hidden="true" />
    </div>
  );
}

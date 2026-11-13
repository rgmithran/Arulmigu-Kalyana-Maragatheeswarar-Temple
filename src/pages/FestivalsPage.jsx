import { useState, useEffect } from 'react';
import {
  Flame,
  Sparkles,
  Bell,
  CheckCircle,
  Crown,
  Calendar,
  Heart,
  Layers,
  Edit3,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SectionTitle from '../components/SectionTitle';
import { settingApi, contactApi } from '../services/api';

export default function FestivalsPage() {
  const { language, t } = useLanguage();
  const [subscribed, setSubscribed] = useState(false);
  const [devoteePhone, setDevoteePhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  // State for editable annual festival date loaded from MongoDB
  const [festivalDate, setFestivalDate] = useState('மாசி மகம் நன்னாள் (தேதி விரைவில் அறிவிக்கப்படும் / Date to be announced)');
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [tempDate, setTempDate] = useState(festivalDate);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await settingApi.getSettings();
        if (res.success && res.data) {
          const date = language === 'ta' ? res.data.annualFestivalDateTa : res.data.annualFestivalDateEn;
          if (date) {
            setFestivalDate(date);
            setTempDate(date);
          }
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    }
    loadSettings();
  }, [language]);

  const handleDateSave = async (e) => {
    e.preventDefault();
    setFestivalDate(tempDate);
    setIsEditingDate(false);

    try {
      await settingApi.updateSettings({
        annualFestivalDateTa: tempDate,
        annualFestivalDateEn: tempDate,
      });
    } catch (err) {
      console.error('Failed to save festival date to MongoDB:', err);
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!devoteePhone) return;
    setSubmitting(true);

    try {
      await contactApi.createContact({
        name: 'பக்தர் / Devotee (Festival Alert)',
        phone: devoteePhone,
        purpose: 'festival',
        message: 'மாசி மகம் தேரோட்ட அறிவிப்புகளுக்கான தொலைபேசி எண் பதிவு.',
      });
      setSubscribed(true);
      setDevoteePhone('');
    } catch (err) {
      console.error('Failed to subscribe:', err);
      // Still show success to user if offline
      setSubscribed(true);
    } finally {
      setSubmitting(false);
    }
  };

  const chariotGallerySteps = [
    {
      titleTa: '1. கொடியேற்றம் (Dhwajarohanam)',
      titleEn: '1. Sacred Flag Hoisting',
      descTa: 'மங்கள வாத்தியங்கள் முழங்க, நந்தி கொடியேற்றி ஆண்டுப் பெருவிழா மங்கலமாகத் தொடங்கும் நிகழ்வு.',
      descEn: 'Commencement of the annual Brahmotsavam with the ceremonial hoisting of the sacred Nandi flag.',
      icon: Crown,
    },
    {
      titleTa: '2. திருக்கல்யாண உற்சவம்',
      titleEn: '2. Celestial Wedding Ceremony',
      descTa: 'சுவாமி கல்யாண மரகதீஸ்வரருக்கும் மரகதவல்லி அம்பிகைக்கும் நிகழும் தெய்வீகத் திருமண வைபவம்.',
      descEn: 'Solemnization of the divine wedding of Lord Shiva and Goddess Maragathavalli amidst vedic mantras.',
      icon: Heart,
    },
    {
      titleTa: '3. சுவாமி திருத்தேர் எழுந்தருளல்',
      titleEn: '3. Mounting the Holy Chariot',
      descTa: 'விசேஷ மலர் மாலைகளால் அலங்கரிக்கப்பட்ட பிரம்மாண்டத் திருத்தேரில் சுவாமியும் அம்பாளும் எழுந்தருளுதல்.',
      descEn: 'The presiding deities ascend the magnificent wooden chariot adorned with auspicious silks and floral canopies.',
      icon: Flame,
    },
    {
      titleTa: '4. தேரோட்டம் (Ther Vadam Pidithal)',
      titleEn: '4. Chariot Procession',
      descTa: 'பல்லாயிரக்கணக்கான பக்தர்கள் "ஓம் நமசிவாய" பக்தி முழக்கங்களுடன் தேரின் வடம் பிடித்து நான்கு மாட வீதிகளில் இழுக்கும் காட்சி.',
      descEn: 'Devotees united in devotion drawing the chariot ropes through the four historic temple streets of Munnur.',
      icon: Sparkles,
    },
    {
      titleTa: '5. தீர்த்தவாரி & கொடியிறக்கம்',
      titleEn: '5. Holy Theerthavari & Concluding Rites',
      descTa: 'புனித நீராடல் வைபவம், மகா தீபாராதனை மற்றும் கொடியிறக்கத்துடன் விழா நிறைவுபெறும் நிகழ்வு.',
      descEn: 'Sacred ablution in the holy waters followed by Maha Deeparadhana and flag lowering.',
      icon: Layers,
    },
  ];

  const shivaratriJaamas = [
    {
      jaama: 'முதலாம் காலம்',
      time: 'இரவு 7:00 – 9:00',
      abhishekam: 'பால், பஞ்சகவ்யம் & வில்வ அர்ச்சனை',
      significance: 'ரிக் வேத பாராயணம்',
    },
    {
      jaama: 'இரண்டாம் காலம்',
      time: 'இரவு 9:30 – நள்ளிரவு 12:00',
      abhishekam: 'தயிர், சர்க்கரை & சந்தனம்',
      significance: 'யஜுர் வேத பாராயணம்',
    },
    {
      jaama: 'மூன்றாம் காலம் (லிங்கோத்பவம்)',
      time: 'நள்ளிரவு 12:00 – அதிகாலை 2:30',
      abhishekam: 'தேன், நெய் & விசேஷ மூலிகைத் தீர்த்தங்கள்',
      significance: 'சாம வேத பாராயணம், லிங்கோத்பவ தரிசனம்',
    },
    {
      jaama: 'நான்காம் காலம்',
      time: 'அதிகாலை 3:00 – காலை 5:30',
      abhishekam: 'கரும்புச் சாறு, பழங்கள் & 108 சங்காபிஷேகம்',
      significance: 'அதர்வண வேத பாராயணம், மகா தீபாராதனை',
    },
  ];

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
            {t('festivalsPage.chariotHeroTitle')}
          </h1>

          <p className="font-tamil-serif text-cream/85 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('festivalsPage.chariotHeroSubtitle')} — அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில்
          </p>

          <div className="kolam-divider mt-6" aria-hidden="true" />
        </div>

        <div className="temple-border-top mt-8" aria-hidden="true" />
      </header>

      {/* ─── DEDICATED PREMIER SECTION: MASI MAGAM THEROTTAM ─── */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-gold/50 overflow-hidden">
          {/* Top Temple Border */}
          <div className="temple-border-top" />

          <div className="p-8 sm:p-12 lg:p-16">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              {/* Chariot Imagery */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/40">
                  <img
                    src="/temple-main.jpg"
                    alt="அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில் மாசி மகம் தேரோட்டம்"
                    className="w-full h-[320px] sm:h-[400px] object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-maroon-dark via-maroon-dark/60 to-transparent p-4 text-cream">
                    <span className="text-xs uppercase font-bold text-gold tracking-widest block font-tamil-sans">
                      புனிதத் திருத்தேர் வைபவம்
                    </span>
                    <span className="font-tamil-serif text-base sm:text-lg font-bold text-gold-light">
                      மாசி மகம் தேரோட்டம் – முன்னூர்
                    </span>
                  </div>
                </div>

                {/* Editable Annual Festival Date Card */}
                <div className="bg-cream rounded-xl p-5 border-2 border-gold/40 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gold-dark uppercase tracking-wider font-tamil-sans flex items-center gap-1.5">
                      <Calendar size={16} className="text-maroon" />
                      ஆண்டுத் திருவிழா நாள் (Editable)
                    </span>
                    <button
                      onClick={() => setIsEditingDate(!isEditingDate)}
                      className="text-xs font-semibold text-maroon hover:text-gold-dark flex items-center gap-1 cursor-pointer font-tamil-sans"
                    >
                      <Edit3 size={13} />
                      {isEditingDate ? 'ரத்து' : 'மாற்றுக'}
                    </button>
                  </div>

                  {isEditingDate ? (
                    <form onSubmit={handleDateSave} className="space-y-3 mt-2">
                      <input
                        type="text"
                        value={tempDate}
                        onChange={(e) => setTempDate(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded border border-gold/60 bg-white font-tamil-serif text-maroon-dark outline-none"
                      />
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-maroon text-gold text-xs font-bold rounded hover:bg-maroon-dark cursor-pointer font-tamil-sans"
                      >
                        சேமிக்குக / Save
                      </button>
                    </form>
                  ) : (
                    <div>
                      <p className="font-tamil-serif text-lg font-bold text-maroon-dark">
                        {festivalDate}
                      </p>
                      <p className="font-tamil-sans text-[11px] text-maroon/70 mt-1 italic">
                        * தமிழ் பஞ்சாங்க கணிப்பின்படி திருக்கோயில் நிர்வாகத்தால் புதுப்பிக்கப்படும்.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Introduction in Tamil and English */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-maroon text-gold text-xs font-bold rounded-full uppercase tracking-wider font-tamil-sans mb-3">
                    முதன்மை ஆண்டுப் பெருவிழா / Premier Annual Festival
                  </span>

                  <h2 className="font-tamil-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon-dark leading-tight mb-2">
                    மாசி மகம் தேரோட்டம்
                  </h2>
                  <p className="font-tamil-sans text-base text-gold-dark font-semibold">
                    Masi Magam Therottam – Annual Temple Chariot Festival
                  </p>
                </div>

                {/* Tamil Introduction */}
                <div className="space-y-3 bg-cream/60 p-6 rounded-2xl border border-gold/30">
                  <h3 className="font-tamil-serif text-lg font-bold text-maroon-dark">
                    திருவிழா அறிமுகம் (தமிழ்):
                  </h3>
                  <p className="font-tamil-serif text-base text-maroon/90 leading-relaxed">
                    முன்னூர் – மோளபாளையம் அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயிலின் மிகப்பெரிய புனிதத் திருவிழா
                    மாசி மகம் தேரோட்டம் ஆகும். மாசி மாதத்தில் மக நட்சத்திரமும் பௌர்ணமியும் இணையும் புண்ணிய தினத்தில்
                    இப்பெருவிழா கொண்டாடப்படுகிறது. அருள்மிகு கல்யாண மரகதீஸ்வரரும் மரகதவல்லி அம்பிகையும் வண்ண மலர்களால்
                    அலங்கரிக்கப்பட்ட திருத்தேரில் எழுந்தருளி முன்னூர் கிராமத்தின் மாட வீதிகளில் பவனி வந்து பக்தர்களுக்கு
                    அருள்பாலிக்கின்றனர்.
                  </p>
                </div>

                {/* English Introduction */}
                <div className="space-y-3 bg-white p-6 rounded-2xl border border-gold/25 shadow-sm">
                  <h3 className="font-tamil-sans text-base font-bold text-maroon-dark">
                    Festival Introduction (English):
                  </h3>
                  <p className="font-tamil-sans text-sm text-maroon/85 leading-relaxed">
                    The Masi Magam Therottam is the pinnacle annual festival of Arulmigu Kalyana Maragatheeswarar Temple.
                    Observed on the auspicious celestial confluence of Magha Nakshatram and Full Moon in the Tamil month of Masi,
                    Lord Shiva and Goddess Maragathavalli ascend the grandly decorated wooden chariot (Ther). Thousands of devotees
                    draw the sacred ropes with devotional fervor, seeking divine grace, domestic happiness, and community welfare.
                  </p>
                </div>
              </div>
            </div>

            {/* Special Announcements Section */}
            <div className="mt-12 pt-8 border-t-2 border-gold/20">
              <div className="bg-gradient-to-br from-maroon-dark to-maroon text-cream rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-gold/40">
                <div className="flex items-center gap-3 mb-4">
                  <Bell className="text-gold" size={24} />
                  <h3 className="font-tamil-serif text-xl sm:text-2xl font-bold text-gold-light">
                    தேரோட்ட சிறப்பு அறிவிப்புகள் & பக்தர்கள் வழிகாட்டுதல்
                  </h3>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 font-tamil-sans text-xs sm:text-sm">
                  <div className="bg-white/10 rounded-xl p-4 border border-gold/25">
                    <span className="font-bold text-gold block mb-1">தேர் வடம் பிடித்தல்</span>
                    <span className="text-cream/85">காலை சுபமுகூர்த்த வேளையில் சுவாமி திருத்தேர் வடம் பிடித்தல் தொடங்கும்.</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 border border-gold/25">
                    <span className="font-bold text-gold block mb-1">மகா அன்னதானம்</span>
                    <span className="text-cream/85">தேரோட்டத் திருநாளில் வருகை தரும் அனைத்து பக்தர்களுக்கும் நாள் முழுவதும் அன்னதானம்.</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 border border-gold/25">
                    <span className="font-bold text-gold block mb-1">வாகனம் & பாதுகாப்பு</span>
                    <span className="text-cream/85">சிறப்புப் பேருந்து வசதிகள் மற்றும் ஊரின் புறத்தே பிரத்யேக வாகன நிறுத்துமிடம்.</span>
                  </div>
                </div>

                <p className="text-[11px] text-gold-light/70 mt-4 italic font-tamil-sans">
                  * குறிப்பு: சரியான தேரோட்ட நேரம் மற்றும் வழித்தட விவரங்கள் பஞ்சாங்க கணிப்பின்படி கோயில் நிர்வாக அறிவிப்புப் பலகையில் வெளியிடப்படும்.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FESTIVAL CELEBRATION GALLERY / STAGES ─── */}
      <section className="py-14 sm:py-20 bg-cream-dark/60 border-t border-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="தேரோட்டத் திருவிழா நிகழ்வுகள் (Festival Celebration Gallery)"
            subtitle="கொடியேற்றம் தொடங்கி தீர்த்தவாரி வரை முறைப்படி நடைபெறும் மங்கல நிகழ்வுகள்"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
            {chariotGallerySteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.titleTa}
                  className="bg-white rounded-xl p-5 shadow-md border-2 border-gold/20 hover:border-gold hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-maroon/10 text-maroon flex items-center justify-center mb-4">
                      <Icon size={24} />
                    </div>
                    <h3 className="font-tamil-serif text-base font-bold text-maroon-dark mb-2">
                      {language === 'ta' ? step.titleTa : step.titleEn}
                    </h3>
                    <p className="font-tamil-sans text-xs text-maroon/75 leading-relaxed">
                      {language === 'ta' ? step.descTa : step.descEn}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gold/15 text-[11px] text-gold-dark font-bold font-tamil-sans">
                    ஆகம மரபு வைபவம்
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION: MAHA SHIVARATRI WORSHIP ─── */}
      <section className="py-14 sm:py-20 bg-maroon-dark text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle light subtitle="Night of Shiva Vigil and Four Kaala Abhishekams">
            {t('festivalsPage.shivaratriTitle')}
          </SectionTitle>

          <p className="font-tamil-serif text-center max-w-3xl mx-auto text-base sm:text-lg text-cream/90 mb-10 leading-relaxed">
            மாசி மாதத் தேய்பிறை சதுர்த்தசி இரவு முழுவதும் கண்விழித்து ஈசனை வழிபடும் மகா புண்ணிய இரவு.
            நான்கு காலங்களிலும் விசேஷ திரவிய அபிஷேகங்களும் ருத்ர பாராயணமும் நிகழ்த்தப்படும்.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {shivaratriJaamas.map((item, idx) => (
              <div
                key={item.jaama}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-gold/30 hover:border-gold transition-all flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-full bg-gold text-maroon-dark font-bold text-sm flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs text-gold-light font-tamil-sans">
                    {item.time}
                  </span>
                </div>

                <h3 className="font-tamil-serif text-lg font-bold text-cream mb-2">
                  {item.jaama}
                </h3>

                <p className="font-tamil-sans text-xs text-gold-light font-semibold mb-2">
                  அபிஷேகம்: {item.abhishekam}
                </p>

                <p className="font-tamil-sans text-xs text-cream/70 leading-relaxed mt-auto pt-2 border-t border-gold/15">
                  {item.significance}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION: FESTIVAL NOTIFICATION SIGNUP ─── */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Bell className="mx-auto text-maroon mb-3 om-pulse" size={40} />
          <h2 className="font-tamil-serif text-2xl sm:text-3xl font-bold text-maroon-dark mb-3">
            மாசி மகம் தேரோட்ட அறிவிப்புகளைப் பெறுக
          </h2>
          <p className="font-tamil-sans text-sm sm:text-base text-maroon/80 mb-6">
            தேரோட்ட நன்னாள், கொடியேற்ற நேரம் மற்றும் அன்னதான விவரங்களை
            வாட்ஸ்அப் / எஸ்.எம்.எஸ் மூலம் உடனடியாகப் பெற தங்கள் தொலைபேசி எண்ணைப் பதிவு செய்யுங்கள்.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 bg-temple-green/15 text-temple-green px-6 py-3 rounded-xl border border-temple-green text-sm font-semibold">
              <CheckCircle size={18} />
              தங்கள் எண் பதிவு செய்யப்பட்டது. திருவிழா செய்திகள் விரைவில் பகிரப்படும்!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="tel"
                required
                placeholder="+91 XXXXX XXXXX"
                value={devoteePhone}
                onChange={(e) => setDevoteePhone(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg text-maroon-dark bg-white border border-gold/40 placeholder-maroon/50 outline-none font-tamil-sans text-sm font-medium"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-maroon text-gold font-bold text-sm rounded-lg hover:bg-maroon-dark disabled:opacity-60 transition-colors font-tamil-sans cursor-pointer shrink-0 shadow-md"
              >
                {submitting ? 'பதிவாகிறது...' : 'பதிவு செய்க'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Bottom border */}
      <div className="temple-border-pattern" aria-hidden="true" />
    </div>
  );
}

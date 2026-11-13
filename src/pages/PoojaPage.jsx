import { useState } from 'react';
import {
  Clock,
  Calendar,
  Flame,
  Sun,
  CheckCircle,
  ShieldCheck,
  Send,
  Search,
  Loader2,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SectionTitle from '../components/SectionTitle';
import { poojaApi } from '../services/api';

export default function PoojaPage() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('book'); // 'book' or 'lookup'
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [copied, setCopied] = useState(false);

  // Status lookup state
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupError, setLookupError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    poojaType: 'rudrabhishekam',
    date: '',
    rasi: '',
    nakshatra: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await poojaApi.createBooking({
        devoteeName: formData.name,
        phone: formData.phone,
        email: formData.email,
        poojaType: formData.poojaType,
        date: formData.date,
        rasi: formData.rasi,
        nakshatra: formData.nakshatra,
        message: formData.message,
      });

      if (response.success) {
        setBookingDetails(response.data);
        setFormSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          poojaType: 'rudrabhishekam',
          date: '',
          rasi: '',
          nakshatra: '',
          message: '',
        });
      } else {
        setErrorMsg(response.message || 'Error submitting booking.');
      }
    } catch (err) {
      console.error('Failed to submit booking:', err);
      setErrorMsg(err.message || 'Failed to connect to database. Please check local server.');
    } finally {
      setLoading(false);
    }
  };

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!lookupQuery.trim()) return;

    setLookupLoading(true);
    setLookupError('');
    setLookupResult(null);

    try {
      const res = await poojaApi.lookupBooking(lookupQuery.trim());
      if (res.success && res.data) {
        setLookupResult(res.data);
      } else {
        setLookupError('குறிப்பிட்ட பதிவு விவரங்கள் காணப்படவில்லை.');
      }
    } catch (err) {
      console.warn('Booking lookup failed:', err);
      setLookupError('பதிவு விவரங்கள் கிடைக்கவில்லை. சரியான தொலைபேசி எண் அல்லது பதிவு எண்ணை உள்ளிடவும்.');
    } finally {
      setLookupLoading(false);
    }
  };

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dailyPoojas = [
    {
      time: '9:00 AM',
      nameTa: 'நடை திறப்பு & திருப்பள்ளியெழுச்சி',
      nameEn: 'Sanctum Opening & Awakening Ritual',
      descTa: 'காலை 9:00 மணிக்கு மங்கள வாத்தியங்கள் முழங்க திருக்கோயில் நடை திறக்கப்பட்டு திருப்பள்ளியெழுச்சி வழிபாடுகள் தொடங்கும்.',
      descEn: 'The sanctum doors open at 9:00 AM with sacred bell chimes and morning invocation prayers.',
      icon: Sun,
    },
    {
      time: '9:30 AM',
      nameTa: 'காலசந்தி பூஜை & மகா அபிஷேகம்',
      nameEn: 'Kalasandhi Pooja & Holy Abhishekam',
      descTa: 'கருவறை சுயம்பு கல்யாண மரகதீஸ்வரருக்கும் அம்பாளுக்கும் விசேஷ திருமஞ்சனம், மலர் அலங்காரம் மற்றும் தூப தீபாராதனை.',
      descEn: 'Sacred ablution of the Swayambhu Shivalingam and Goddess Amman with fresh flowers, sandal, and deeparadhana.',
      icon: Sun,
    },
    {
      time: '11:00 AM',
      nameTa: 'பக்தர்கள் அர்ச்சனை & சங்கல்ப வழிபாடு',
      nameEn: 'Devotee Archana & Sankalpam',
      descTa: 'பக்தர்களின் திருமணப் பேறு, குடும்ப நலன் மற்றும் வேண்டுதல்களுக்கான சிறப்பு அர்ச்சனை மற்றும் வில்வ தள பூஜைகள்.',
      descEn: 'Personalized archana, sankalpam, and sacred Vilva leaf offerings for matrimonial and family blessings.',
      icon: Sun,
    },
    {
      time: '12:30 PM',
      nameTa: 'உச்சிக்கால பூஜை & மகா நைவேத்தியம்',
      nameEn: 'Uchikkala Pooja & Maha Naivedyam',
      descTa: 'நண்பகல் விசேஷ அன்ன நிவேதனம், பஞ்சமுக ஆரத்தி மற்றும் மகா தீபாராதனை.',
      descEn: 'Midday grand consecrated food offering followed by five-wick flame Maha Deeparadhana.',
      icon: Sun,
    },
    {
      time: '1:00 PM',
      nameTa: 'உச்சிக்கால நடை சாத்துதல்',
      nameEn: 'Sanctum Concluding & Closing',
      descTa: 'மதிய தரிசனம் நிறைவுபெற்று மதியம் 1:00 மணிக்குத் திருக்கோயில் நடை சாத்தப்படும். (மாலை நேர நடை கிடையாது).',
      descEn: 'The daily darshan concludes at 1:00 PM as the sanctum closes. (Please note: There is no evening darshan).',
      icon: Sun,
    },
  ];

  const specialAbhishekams = [
    {
      nameTa: 'ருத்ராபிஷேகம் & வில்வ அர்ச்சனை',
      nameEn: 'Rudrabhishekam & Vilva Archana',
      descTa: 'ஸ்ரீ ருத்ரம் பாராயணத்துடன் புனித கங்கா தீர்த்தம், பால், இளநீர், சந்தனம் கொண்டு நடைபெறும் உன்னத சிவபூஜை.',
      descEn: 'Grand holy ablution accompanied by Sri Rudram chanting with sacred waters, milk, tender coconut, and sandal.',
    },
    {
      nameTa: 'சங்காபிஷேகம் (108 வலம்புரி சங்கு)',
      nameEn: '108 Shankhabhishekam',
      descTa: '108 வலம்புரி சங்குகளில் புனிதம் நிறைந்த புனித தீர்த்தங்கள் நிரப்பப்பட்டு யாகசாலையில் வைத்து செய்யப்படும் விசேஷ பூஜை.',
      descEn: 'Ablution with 108 energized conches filled with consecrated herb-infused waters.',
    },
    {
      nameTa: 'கல்யாண உற்சவ சிறப்பு வழிபாடு',
      nameEn: 'Kalyana Utsavam (Divine Marriage)',
      descTa: 'திருமண வரம் வேண்டியும், தம்பதிகள் ஒற்றுமை வேண்டியும் அருள்மிகு கல்யாண மரகதீஸ்வரருக்கு செய்யப்படும் சிறப்பு சங்கல்ப பூஜை.',
      descEn: 'Special celebratory puja praying for matrimonial harmony, marital happiness, and blessed matchmaking.',
    },
    {
      nameTa: 'மரகத விநாயகர் சதுர்த்தி அபிஷேகம்',
      nameEn: 'Vinayagar Chaturthi Abhishekam',
      descTa: 'தடைகளை நீக்கி வெற்றிகளை அருளும் மரகத விநாயகருக்கு தேன், பால், கரும்புச் சாறு மற்றும் கொழுக்கட்டை நிவேதன பூஜை.',
      descEn: 'Obstacle-clearing worship for Lord Vinayagar with holy honey, milk, and sweet modakam offerings.',
    },
  ];

  const monthlyPoojas = [
    {
      nameTa: 'பிரதோஷ வழிபாடு (மாதம் இருமுறை)',
      nameEn: 'Pradosham (Twice Monthly)',
      timing: 'திரயோதசி நன்னாள்',
      descTa: 'திரயோதசி திதியில் நந்திதேவருக்கும் சிவபெருமானுக்கும் நடைபெறும் விசேஷ அபிஷேக வழிபாடு.',
      descEn: 'Fortnightly Trayodashi ritual dedicated to Lord Shiva and Lord Nandi.',
    },
    {
      nameTa: 'பௌர்ணமி விசேஷ பூஜை',
      nameEn: 'Pournami Special Pooja',
      timing: 'முழு நிலவு நாள்',
      descTa: 'அன்னை மரகதவல்லி அம்பாளுக்கு விசேஷ குங்கும அர்ச்சனை மற்றும் லலிதா சஹஸ்ரநாம பாராயணம்.',
      descEn: 'Kumkum archana and Lalitha Sahasranamam recitation honoring Goddess Maragathavalli.',
    },
    {
      nameTa: 'சங்கடஹர சதுர்த்தி',
      nameEn: 'Sankatahara Chaturthi',
      timing: 'தேய்பிறை சதுர்த்தி',
      descTa: 'மரகத விநாயகருக்கு அருகம்புல் மாலை மற்றும் சிறப்பு அபிஷேக அலங்காரங்கள்.',
      descEn: 'Garland of sacred durva grass and modak offerings to remover of obstacles Lord Ganesha.',
    },
    {
      nameTa: 'தேய்பிறை அஷ்டமி பைரவர் பூஜை',
      nameEn: 'Theipirai Ashtami Bhairava Pooja',
      timing: 'அஷ்டமி நன்னாள்',
      descTa: 'கால பைரவருக்கு வடைமாலை சாற்றி, செவ்வரளி மற்றும் மிளகு தீபம் ஏற்றி மனபயம் போக்கும் பூஜை.',
      descEn: 'Bhairava worship with vada garlands and black pepper lamps to dispel fear and misfortunes.',
    },
  ];

  const guidelines = [
    {
      titleTa: 'ஆடை மரபு',
      titleEn: 'Dress Code',
      descTa: 'ஆண்கள் வேட்டி, சட்டை அல்லது குர்தா அணியலாம்; பெண்கள் புடவை அல்லது சல்வார் அணிய அறிவுறுத்தப்படுகிறார்கள்.',
      descEn: 'Traditional Indian attire: Dhotis or kurtas for men; sarees or chudidars for women.',
    },
    {
      titleTa: 'காலணி பாதுகாப்பு',
      titleEn: 'Footwear Etiquette',
      descTa: 'கோயில் முகப்பில் உள்ள பாதுகாப்பான இடத்தில் காலணிகளை விட்டு வரவும்.',
      descEn: 'Please leave footwear at the designated counter outside the temple entrance.',
    },
    {
      titleTa: 'கருவறை அமைதி',
      titleEn: 'Sanctum Sanctity',
      descTa: 'கருவறை மற்றும் பிரகாரங்களில் மொபைல் போன்களை அமைதி நிலையில் வைக்கவும். நிசப்தமான சூழலைக் காக்கவும்.',
      descEn: 'Silence mobile phones and preserve a quiet meditative atmosphere inside the temple.',
    },
    {
      titleTa: 'பூஜைப் பொருட்கள்',
      titleEn: 'Pooja Offerings',
      descTa: 'நெய் தீபம், வில்வ இலைகள், பூக்கள், நைவேத்தியப் பொருட்கள் தூய்மையுடன் கொண்டு வரலாம்.',
      descEn: 'Devotees are welcome to bring fresh flowers, vilva leaves, pure ghee, and coconuts.',
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
            {t('poojaPage.title')}
          </h1>

          <p className="font-tamil-serif text-cream/85 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('poojaPage.subtitle')}
          </p>

          <div className="kolam-divider mt-6" aria-hidden="true" />
        </div>

        <div className="temple-border-top mt-8" aria-hidden="true" />
      </header>

      {/* ─── CONFIRMED DARSHAN TIMINGS (STRICT: 9 AM TO 1 PM ONLY) ─── */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-maroon-dark via-maroon to-maroon-dark rounded-2xl p-8 sm:p-12 shadow-2xl border-2 border-gold/50 text-cream relative overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-gold/20 text-gold-light px-5 py-2 rounded-full text-xs sm:text-sm font-semibold border border-gold/40">
              <Clock size={18} />
              {t('poojaPage.darshanTimings')}
            </div>

            <h2 className="font-tamil-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gold-light">
              தினசரி தரிசன நேரம் (Daily Darshan Timings)
            </h2>

            <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border-2 border-gold/40 my-6 shadow-xl">
              <Sun className="text-gold mx-auto mb-3" size={40} />
              <span className="font-tamil-sans text-xs text-gold-light font-bold uppercase tracking-widest block">
                நடை திறக்கும் நேரம் / Opening Hours
              </span>
              <p className="font-tamil-serif text-2xl sm:text-3xl md:text-4xl font-bold text-cream mt-2">
                {t('poojaPage.confirmedTiming')}
              </p>
              <span className="font-tamil-sans text-xs text-gold-light/90 block mt-3 font-semibold">
                (9:00 AM to 1:00 PM)
              </span>
            </div>

            <p className="font-tamil-sans text-sm text-gold-light/90 italic">
              {t('poojaPage.timingNote')}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Daily Morning Pooja Schedule ─── */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t('poojaPage.dailyScheduleTitle')}
            subtitle="காலை 9:00 மணி முதல் மதியம் 1:00 மணி வரை சாஸ்திர முறைப்படி நிகழ்த்தப்படும் வழிபாடுகள்"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-8">
            {dailyPoojas.map((pooja) => {
              const Icon = pooja.icon;
              return (
                <div
                  key={pooja.time}
                  className="bg-white rounded-xl p-6 shadow-md border-2 border-gold/20 hover:border-gold hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gold/15">
                    <span className="flex items-center gap-2 text-xs font-bold bg-maroon text-gold px-3 py-1 rounded-full font-tamil-sans">
                      <Clock size={12} />
                      {pooja.time}
                    </span>
                    <Icon size={18} className="text-gold" />
                  </div>

                  <h3 className="font-tamil-serif text-xl font-bold text-maroon-dark mb-2">
                    {language === 'ta' ? pooja.nameTa : pooja.nameEn}
                  </h3>

                  <p className="font-tamil-sans text-sm text-maroon/80 leading-relaxed flex-1">
                    {language === 'ta' ? pooja.descTa : pooja.descEn}
                  </p>

                  <div className="mt-4 pt-3 border-t border-gold/10 flex items-center justify-between text-xs text-gold-dark font-medium font-tamil-sans">
                    <span>* காலை தரிசனப் பூஜை</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Special Abhishekams & Monthly Festivals ─── */}
      <section className="py-14 sm:py-20 bg-cream-dark/60 border-t border-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Special Abhishekams */}
            <div>
              <h2 className="font-tamil-serif text-2xl sm:text-3xl font-bold text-maroon-dark mb-6 flex items-center gap-3">
                <Flame className="text-gold" size={28} />
                {t('poojaPage.abhishekamTitle')}
              </h2>

              <div className="space-y-4">
                {specialAbhishekams.map((item) => (
                  <div
                    key={item.nameTa}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gold/25 hover:border-gold transition-colors"
                  >
                    <h3 className="font-tamil-serif text-lg font-bold text-maroon-dark mb-1">
                      {language === 'ta' ? item.nameTa : item.nameEn}
                    </h3>
                    <p className="font-tamil-sans text-sm text-maroon/80 leading-relaxed">
                      {language === 'ta' ? item.descTa : item.descEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Occasions */}
            <div>
              <h2 className="font-tamil-serif text-2xl sm:text-3xl font-bold text-maroon-dark mb-6 flex items-center gap-3">
                <Calendar className="text-gold" size={28} />
                {t('poojaPage.monthlySpecialTitle')}
              </h2>

              <div className="space-y-4">
                {monthlyPoojas.map((item) => (
                  <div
                    key={item.nameTa}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gold/25 hover:border-gold transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-tamil-serif text-lg font-bold text-maroon-dark">
                        {language === 'ta' ? item.nameTa : item.nameEn}
                      </h3>
                      <span className="text-xs bg-gold/20 text-maroon-dark px-2.5 py-0.5 rounded font-semibold font-tamil-sans">
                        {item.timing}
                      </span>
                    </div>
                    <p className="font-tamil-sans text-sm text-maroon/80 leading-relaxed">
                      {language === 'ta' ? item.descTa : item.descEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pooja Booking & Devotee Registration Form ─── */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gold/30 p-6 sm:p-10">
            {/* Header & Tabs */}
            <div className="text-center mb-8">
              <span className="text-gold text-2xl block mb-1">✦</span>
              <h2 className="font-tamil-serif text-2xl sm:text-3xl font-bold text-maroon-dark">
                {t('poojaPage.poojaBookingTitle')}
              </h2>
              <p className="font-tamil-sans text-sm sm:text-base text-maroon/75 mt-2">
                {t('poojaPage.poojaBookingSubtitle')}
              </p>

              {/* Tab Selector */}
              <div className="inline-flex p-1 bg-cream-dark rounded-xl border border-gold/30 mt-6 shadow-inner">
                <button
                  type="button"
                  onClick={() => setActiveTab('book')}
                  className={`px-5 py-2 rounded-lg font-tamil-sans text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === 'book'
                      ? 'bg-maroon text-gold shadow-md'
                      : 'text-maroon/80 hover:text-maroon'
                  }`}
                >
                  🪔 புதிய பூஜை பதிவு
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('lookup')}
                  className={`px-5 py-2 rounded-lg font-tamil-sans text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === 'lookup'
                      ? 'bg-maroon text-gold shadow-md'
                      : 'text-maroon/80 hover:text-maroon'
                  }`}
                >
                  🔍 பதிவு நிலை அறிய (Status)
                </button>
              </div>
            </div>

            {/* TAB 1: Booking Form */}
            {activeTab === 'book' && (
              <>
                {formSubmitted && bookingDetails ? (
                  <div className="bg-temple-green/10 border-2 border-temple-green rounded-xl p-6 sm:p-8 text-center text-temple-green">
                    <CheckCircle className="mx-auto mb-3 text-temple-green" size={48} />
                    <h3 className="font-tamil-serif text-2xl font-bold text-maroon-dark mb-1">
                      பூஜை பதிவு வெற்றிகரமாக உள்ளிடப்பட்டது!
                    </h3>
                    <p className="text-xs text-maroon/70 font-tamil-sans mb-4">
                      உள்ளூர் தரவுத்தளத்தில் (Local MongoDB) பாதுகாப்பாகப் பதியப்பட்டுள்ளது.
                    </p>

                    {/* Booking Certificate Card */}
                    <div className="bg-white border-2 border-gold/40 rounded-xl p-5 my-4 text-left max-w-lg mx-auto shadow-md">
                      <div className="flex items-center justify-between border-b border-gold/20 pb-3 mb-3">
                        <span className="text-xs uppercase font-bold text-gold-dark font-tamil-sans">
                          பூஜை முன்பதிவு ரசீது
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                          {bookingDetails.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm font-tamil-sans">
                        <div>
                          <span className="text-xs text-maroon/60 block">பதிவு எண்:</span>
                          <span className="font-mono font-bold text-maroon-dark text-xs sm:text-sm">
                            {bookingDetails.bookingId}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-maroon/60 block">பக்தர் பெயர்:</span>
                          <span className="font-semibold text-maroon-dark">
                            {bookingDetails.devoteeName}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-maroon/60 block">பூஜை வகை:</span>
                          <span className="font-semibold text-maroon-dark">
                            {bookingDetails.poojaNameTa || bookingDetails.poojaType}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-maroon/60 block">தேதி:</span>
                          <span className="font-semibold text-maroon-dark">
                            {bookingDetails.date || 'விரைவில் உறுதி செய்யப்படும்'}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gold/20 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => handleCopyId(bookingDetails.bookingId)}
                          className="inline-flex items-center gap-1.5 text-xs text-maroon hover:text-gold-dark font-bold cursor-pointer"
                        >
                          {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                          {copied ? 'நகலெடுக்கப்பட்டது!' : 'பதிவு எண்ணை நகலெடு'}
                        </button>
                        <span className="text-[11px] text-maroon/60">
                          தொடர்புக்கு: +91 9585554005
                        </span>
                      </div>
                    </div>

                    <p className="font-tamil-sans text-xs sm:text-sm text-maroon/80 max-w-lg mx-auto mt-2">
                      தங்களின் பூஜை விவரங்கள் கோயில் குருக்கள் / அலுவலக பார்வைக்கு அனுப்பப்பட்டுள்ளது.
                      விரைவில் அர்ச்சகர் தங்களைத் தொடர்பு கொள்வார்கள்.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                      <button
                        onClick={() => {
                          setFormSubmitted(false);
                          setBookingDetails(null);
                        }}
                        className="px-6 py-2.5 bg-maroon text-gold rounded-lg font-semibold text-sm hover:bg-maroon-dark transition-colors cursor-pointer"
                      >
                        மற்றொரு பூஜை பதிவு செய்ய
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab('lookup');
                          setLookupQuery(bookingDetails.bookingId);
                        }}
                        className="px-6 py-2.5 bg-cream border border-gold/60 text-maroon-dark rounded-lg font-semibold text-sm hover:bg-gold/20 transition-colors cursor-pointer"
                      >
                        நிலையைச் சரிபார்க்க
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {errorMsg && (
                      <div className="p-4 rounded-lg bg-sacred-red/10 border border-sacred-red/30 text-sacred-red flex items-center gap-3 text-sm font-tamil-sans">
                        <AlertCircle size={18} className="shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-maroon-dark mb-2 font-tamil-sans">
                          பக்தர் பெயர் / Devotee Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="தங்கள் பெயர்"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-gold/40 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none bg-cream/40 text-base"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-maroon-dark mb-2 font-tamil-sans">
                          தொலைபேசி எண் / Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          inputMode="tel"
                          placeholder="+91 XXXXX XXXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-gold/40 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none bg-cream/40 text-base"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-maroon-dark mb-2 font-tamil-sans">
                          பூஜை வகை / Pooja Type *
                        </label>
                        <select
                          value={formData.poojaType}
                          onChange={(e) => setFormData({ ...formData, poojaType: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-gold/40 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none bg-cream/40 text-base"
                        >
                          <option value="rudrabhishekam">ருத்ராபிஷேகம் & அர்ச்சனை</option>
                          <option value="kalyanautsavam">திருக்கல்யாண உற்சவ சிறப்பு பூஜை</option>
                          <option value="pradosham">பிரதோஷ நந்தி வழிபாடு</option>
                          <option value="shankhabhishekam">108 சங்காபிஷேகம்</option>
                          <option value="vinayagar">மரகத விநாயகர் சிறப்பு பூஜை</option>
                          <option value="other">பிற வழிபாடுகள் / பொது தகவல்</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-maroon-dark mb-2 font-tamil-sans">
                          விரும்பும் தேதி / Preferred Date
                        </label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-gold/40 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none bg-cream/40 text-base"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-maroon-dark mb-2 font-tamil-sans">
                          ராசி / Rasi (விருப்பப்பட்டால்)
                        </label>
                        <input
                          type="text"
                          placeholder="எ.கா. மேஷம், ரிஷபம்..."
                          value={formData.rasi}
                          onChange={(e) => setFormData({ ...formData, rasi: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-gold/40 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none bg-cream/40 text-base"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-maroon-dark mb-2 font-tamil-sans">
                          நட்சத்திரம் / Nakshatra (விருப்பப்பட்டால்)
                        </label>
                        <input
                          type="text"
                          placeholder="எ.கா. அஸ்வினி, ரோகிணி..."
                          value={formData.nakshatra}
                          onChange={(e) => setFormData({ ...formData, nakshatra: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-gold/40 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none bg-cream/40 text-base"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-maroon-dark mb-2 font-tamil-sans">
                        கூடுதல் குறிப்புகள் / Message or Special Prayer Request
                      </label>
                      <textarea
                        rows={3}
                        placeholder="கோயில் நிர்வாகத்திற்கு தங்களின் விண்ணப்பம்..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gold/40 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none bg-cream/40 text-base"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-maroon text-gold font-tamil-sans font-bold text-base rounded-lg hover:bg-maroon-dark disabled:opacity-60 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          பதிவு செய்யப்படுகிறது...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          பதிவு செய்க / Submit Pooja Request
                        </>
                      )}
                    </button>
                  </form>
                )}
              </>
            )}

            {/* TAB 2: Booking Status Lookup */}
            {activeTab === 'lookup' && (
              <div className="space-y-6">
                <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      required
                      placeholder="பதிவு எண் (KM-PB-...) அல்லது தொலைபேசி எண்..."
                      value={lookupQuery}
                      onChange={(e) => setLookupQuery(e.target.value)}
                      className="w-full pl-4 pr-10 py-3.5 rounded-lg border border-gold/40 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none bg-cream/40 text-base font-tamil-sans"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={lookupLoading}
                    className="px-6 py-3.5 bg-maroon text-gold font-tamil-sans font-bold text-sm rounded-lg hover:bg-maroon-dark disabled:opacity-60 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-md"
                  >
                    {lookupLoading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                    தேடுக / Search
                  </button>
                </form>

                {lookupError && (
                  <div className="p-4 rounded-lg bg-sacred-red/10 border border-sacred-red/30 text-sacred-red flex items-center gap-3 text-sm font-tamil-sans">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{lookupError}</span>
                  </div>
                )}

                {lookupResult && (
                  <div className="bg-cream rounded-2xl border-2 border-gold/40 p-6 shadow-md font-tamil-sans animate-fade-in-up">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gold/20 pb-4 mb-4 gap-2">
                      <div>
                        <span className="text-xs text-maroon/60 block">பதிவு எண்:</span>
                        <span className="font-mono font-bold text-maroon-dark text-base">
                          {lookupResult.bookingId}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-maroon/70">நிலை (Status):</span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            lookupResult.status === 'Confirmed'
                              ? 'bg-green-100 text-green-800 border border-green-300'
                              : lookupResult.status === 'Completed'
                              ? 'bg-blue-100 text-blue-800 border border-blue-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {lookupResult.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-xs text-maroon/60 block">பக்தர் பெயர்:</span>
                        <span className="font-semibold text-maroon-dark">{lookupResult.devoteeName}</span>
                      </div>
                      <div>
                        <span className="text-xs text-maroon/60 block">தொலைபேசி எண்:</span>
                        <span className="font-semibold text-maroon-dark">{lookupResult.phone}</span>
                      </div>
                      <div>
                        <span className="text-xs text-maroon/60 block">பூஜை வகை:</span>
                        <span className="font-semibold text-maroon-dark">
                          {lookupResult.poojaNameTa || lookupResult.poojaType}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-maroon/60 block">குறிப்பிட்ட தேதி:</span>
                        <span className="font-semibold text-maroon-dark">{lookupResult.date || 'நிர்வாகத்திடம் பேசவும்'}</span>
                      </div>
                    </div>

                    {lookupResult.adminNotes && (
                      <div className="mt-4 p-3 bg-white rounded-lg border border-gold/30 text-xs">
                        <span className="font-bold text-maroon block mb-1">கோயில் நிர்வாகக் குறிப்பு:</span>
                        <p className="text-maroon/80">{lookupResult.adminNotes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Guidelines for Devotees ─── */}
      <section className="py-14 sm:py-20 bg-cream-dark/60 border-t border-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t('poojaPage.guidelinesTitle')}
            subtitle="கோயிலின் புனிதத்தையும் மரபையும் காக்க பக்தர்கள் கடைப்பிடிக்க வேண்டிய நெறிமுறைகள்"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {guidelines.map((g) => (
              <div
                key={g.titleTa}
                className="bg-white rounded-xl p-6 shadow-sm border border-gold/25"
              >
                <div className="w-10 h-10 rounded-lg bg-maroon/10 flex items-center justify-center text-maroon mb-4">
                  <ShieldCheck size={22} />
                </div>
                <h3 className="font-tamil-serif text-lg font-bold text-maroon-dark mb-2">
                  {language === 'ta' ? g.titleTa : g.titleEn}
                </h3>
                <p className="font-tamil-sans text-sm text-maroon/80 leading-relaxed">
                  {language === 'ta' ? g.descTa : g.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom border */}
      <div className="temple-border-pattern" aria-hidden="true" />
    </div>
  );
}

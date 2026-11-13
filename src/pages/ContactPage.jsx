
import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Send,
  CheckCircle,
  Car,
  Bus,
  Train,
  Plane,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SectionTitle from '../components/SectionTitle';
import { contactApi } from '../services/api';

const TEMPLE_MAPS_URL = 'https://maps.app.goo.gl/V97j6p94g5dF56iE6';
const TEMPLE_PHONE = '+919585554005';

export default function ContactPage() {
  const { language, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [referenceId, setReferenceId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: 'general',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await contactApi.createContact(formData);
      if (response.success) {
        setReferenceId(response.data?.inquiryId || '');
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          purpose: 'general',
          message: '',
        });
      } else {
        setErrorMsg(response.message || 'Error sending message. Please try again.');
      }
    } catch (err) {
      console.error('Failed to submit contact:', err);
      setErrorMsg(err.message || 'Network error connecting to database. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const travelModes = [
    {
      icon: Car,
      titleTa: 'சாலை வழியாக (By Road)',
      titleEn: 'By Roadways',
      descTa:
        'ஈரோடு, கோபிசெட்டிபாளையம், பெருந்துறை மற்றும் திருச்செங்கோடு ஆகிய நகரங்களிலிருந்து சிறந்த தார்ச்சாலை இணைப்பு வசதிகள் உள்ளன. கோபிசெட்டிபாளையத்திலிருந்து சுமார் 15 கி.மீ; ஈரோட்டிலிருந்து 35 கி.மீ.',
      descEn:
        'Well connected by state highways. Approximately 15 km from Gobichettipalayam, 35 km from Erode, and 25 km from Perundurai.',
    },
    {
      icon: Bus,
      titleTa: 'பேருந்து வசதி (By Bus)',
      titleEn: 'By Public Bus',
      descTa:
        'கோபிசெட்டிபாளையம் மற்றும் ஈரோடு மத்திய பேருந்து நிலையங்களிலிருந்து முன்னூர் மற்றும் மோளபாளையம் வழியே செல்லும் நகரப் பேருந்துகள் மற்றும் அரசுப் பேருந்துகள் சீரான இடைவெளியில் இயக்கப்படுகின்றன.',
      descEn:
        'Regular state transport and town buses operate from Erode Central Bus Stand and Gobichettipalayam Bus Stand via Munnur / Molapalayam.',
    },
    {
      icon: Train,
      titleTa: 'ரயில் நிலையம் (By Train)',
      titleEn: 'By Railway Station',
      descTa:
        'ஈரோடு சந்திப்பு ரயில் நிலையம் (Erode Junction - ED) இத்தலத்திற்கு அருகிலுள்ள முதன்மை ரயில் நிலையமாகும் (சுமார் 35 கி.மீ). அங்கிருந்து பேருந்து அல்லது வாடகை வாகனம் மூலம் கோயிலை எளிதில் அடையலாம்.',
      descEn:
        'Erode Junction (ED) is the nearest major railway junction (~35 km) connecting all southern and national railway routes.',
    },
    {
      icon: Plane,
      titleTa: 'விமான நிலையம் (By Air)',
      titleEn: 'By Nearest Airport',
      descTa:
        'கோயம்புத்தூர் பன்னாட்டு விமான நிலையம் (Coimbatore International Airport - CJB) சுமார் 85 கி.மீ தொலைவில் அமைந்துள்ளது.',
      descEn:
        'Coimbatore International Airport (CJB) is the nearest airport, located approximately 85 km away.',
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Header */}
      <header className="relative bg-maroon-dark overflow-hidden py-16 sm:py-24 text-center">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle,#D4A843_1px,transparent_1px)] bg-[length:24px_24px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <span className="block text-gold-light text-3xl font-tamil-serif mb-3 om-pulse select-none">
            ௐ
          </span>

          <h1 className="font-tamil-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cream gold-shimmer leading-tight mb-4">
            {t('contactPage.title')}
          </h1>

          <p className="font-tamil-serif text-cream/85 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('contactPage.subtitle')}
          </p>

          <div className="kolam-divider mt-6" aria-hidden="true" />
        </div>

        <div className="temple-border-top mt-8" aria-hidden="true" />
      </header>

      {/* Contact Information Cards */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">

          {/* Address Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border-2 border-gold/30 flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-maroon/10 flex items-center justify-center text-maroon mb-5">
              <MapPin size={26} />
            </div>

            <h3 className="font-tamil-serif text-xl font-bold text-maroon-dark mb-2">
              {t('contactPage.templeAddressTitle')}
            </h3>

            <p className="font-tamil-serif text-sm sm:text-base text-maroon/85 leading-relaxed flex-1">
              அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில்,
              <br />
              முன்னூர் – மோளபாளையம்,
              <br />
              XWFC+VC5, Molapalayam,
              <br />
              Munnur, Tamil Nadu 639111.
            </p>

            <a
              href={TEMPLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-maroon hover:text-gold-dark transition-colors font-tamil-sans"
            >
              <ExternalLink size={16} />
              {t('contactPage.openMapsBtn')}
            </a>
          </div>

          {/* Timings Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border-2 border-gold/30 flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-maroon/10 flex items-center justify-center text-maroon mb-5">
              <Clock size={26} />
            </div>

            <h3 className="font-tamil-serif text-xl font-bold text-maroon-dark mb-2">
              {t('contactPage.timingsTitle')}
            </h3>

            <div className="space-y-3 font-tamil-sans text-sm text-maroon/85 flex-1">
              <div className="bg-cream rounded-xl p-4 border-2 border-gold/40 text-center">
                <span className="font-bold text-xs uppercase tracking-wider text-gold-dark block">
                  {t('contactPage.timingsTitle')}
                </span>

                <span className="font-tamil-serif text-xl font-bold text-maroon-dark mt-1 block">
                  {t('contactPage.confirmedTiming')}
                </span>
              </div>

              <p className="text-xs text-maroon/80 italic font-tamil-sans text-center">
                {t('contactPage.noEveningTimingNote')}
              </p>
            </div>

            <p className="mt-4 text-xs text-maroon/60 italic font-tamil-sans">
              * விசேஷ திருவிழா நாட்களில் நடை திறப்பு நேரங்கள் மாறுபடலாம்
            </p>
          </div>

          {/* Phone & Email Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border-2 border-gold/30 flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-maroon/10 flex items-center justify-center text-maroon mb-5">
              <Phone size={26} />
            </div>

            <h3 className="font-tamil-serif text-xl font-bold text-maroon-dark mb-2">
              தொடர்பு வழிமுறைகள்
            </h3>

            <div className="space-y-4 font-tamil-sans text-sm flex-1">
              <div>
                <span className="text-xs font-semibold text-gold-dark uppercase block">
                  {t('contactPage.phoneTitle')}
                </span>

                <a
                  href={`tel:${TEMPLE_PHONE}`}
                  className="font-semibold text-maroon-dark text-base mt-0.5 inline-block hover:text-gold-dark"
                >
                  +91 9585554005
                </a>
              </div>

              <div>
                <span className="text-xs font-semibold text-gold-dark uppercase flex items-center gap-1.5">
                  <Mail size={14} className="text-maroon" />
                  {t('contactPage.emailTitle')}
                </span>

                <p className="font-semibold text-maroon-dark text-base mt-0.5">
                  info@example.com
                </p>

                <span className="text-[11px] text-maroon/60">
                  ({t('editableNotice')})
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs text-maroon/70 bg-cream/70 p-2.5 rounded-lg border border-gold/15">
              கோயில் அலுவலக நேர விவரங்களை நிர்வாகத்திடம் உறுதிப்படுத்தவும்.
            </p>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gold/30">

          <div className="p-6 sm:p-8 bg-gradient-to-r from-maroon-dark to-maroon text-cream flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="font-tamil-serif text-xl sm:text-2xl font-bold text-gold-light">
                {t('contactPage.directionsTitle')}
              </h2>

              <p className="font-tamil-sans text-xs sm:text-sm text-cream/80 mt-1">
                முன்னூர் – மோளபாளையம் அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில்
              </p>
            </div>

            <a
              href={TEMPLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-maroon-dark font-bold text-sm rounded-lg hover:bg-gold-light transition-all shadow-md shrink-0 font-tamil-sans"
            >
              <MapPin size={16} />
              {t('contactPage.openMapsBtn')}
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Embedded Google Map */}
          <div className="relative w-full h-[400px] sm:h-[480px] bg-cream-dark">
            <iframe
              title="Arulmigu Kalyana Maragatheeswarar Temple Location"
              src="https://maps.google.com/maps?q=XWFC%2BVC5%2C%20Molapalayam%2C%20Munnur%2C%20Tamil%20Nadu%20639111&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />

            <div className="absolute bottom-4 right-4 z-10">
              <a
                href={TEMPLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-maroon text-gold font-bold text-xs sm:text-sm rounded-lg shadow-xl hover:bg-maroon-dark transition-all border border-gold/40"
              >
                <MapPin size={16} />
                திருக்கோயில் வழித்தடம் (Google Maps)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Feedback Form */}
      <section className="py-14 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gold/30 p-8 sm:p-10">

          <div className="text-center mb-8">
            <span className="text-gold text-2xl block mb-1">✦</span>

            <h2 className="font-tamil-serif text-2xl sm:text-3xl font-bold text-maroon-dark">
              {t('contactPage.formTitle')}
            </h2>

            <p className="font-tamil-sans text-sm sm:text-base text-maroon/75 mt-2">
              {t('contactPage.formSubtitle')}
            </p>
          </div>

          {submitted ? (
            <div className="bg-temple-green/10 border-2 border-temple-green rounded-xl p-8 text-center text-temple-green">
              <CheckCircle className="mx-auto mb-3 text-temple-green" size={48} />

              <h3 className="font-tamil-serif text-2xl font-bold text-maroon-dark mb-2">
                தங்கள் செய்தி வெற்றிகரமாக பெறப்பட்டது!
              </h3>

              {referenceId && (
                <div className="inline-block bg-white border border-gold/40 rounded-lg px-4 py-2 my-3 shadow-sm">
                  <span className="text-xs text-maroon/70 font-tamil-sans block">பதிவு குறிப்பு எண் / Reference ID:</span>
                  <span className="font-mono font-bold text-maroon-dark text-base tracking-wider">{referenceId}</span>
                </div>
              )}

              <p className="font-tamil-sans text-sm text-maroon/80 max-w-lg mx-auto">
                தங்களின் செய்தி உள்ளூர் தரவுத்தளத்தில் (Local MongoDB) பாதுகாப்பாகப் பதிவு செய்யப்பட்டுள்ளது.
                விரைவில் கோயில் நிர்வாகம் தங்களைத் தொடர்பு கொள்ளும்.
              </p>

              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 bg-maroon text-gold rounded-lg font-semibold text-sm hover:bg-maroon-dark transition-colors cursor-pointer"
              >
                மற்றொரு செய்தி அனுப்ப
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-4 rounded-lg bg-sacred-red/10 border border-sacred-red/30 text-sacred-red flex items-center gap-3 text-sm">
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-maroon-dark mb-2 font-tamil-sans">
                    {t('contactPage.fullName')} *
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="தங்கள் பெயர்"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gold/40 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none bg-cream/40 text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-maroon-dark mb-2 font-tamil-sans">
                    {t('contactPage.phoneNumber')} *
                  </label>

                  <input
                    type="tel"
                    required
                    inputMode="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gold/40 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none bg-cream/40 text-base"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-maroon-dark mb-2 font-tamil-sans">
                    {t('contactPage.emailAddress')}
                  </label>

                  <input
                    type="email"
                    inputMode="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gold/40 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none bg-cream/40 text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-maroon-dark mb-2 font-tamil-sans">
                    {t('contactPage.purpose')} *
                  </label>

                  <select
                    value={formData.purpose}
                    onChange={(e) =>
                      setFormData({ ...formData, purpose: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gold/40 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none bg-cream/40 text-base"
                  >
                    <option value="general">
                      {t('contactPage.purposeOptions.general')}
                    </option>
                    <option value="pooja">
                      {t('contactPage.purposeOptions.pooja')}
                    </option>
                    <option value="donation">
                      {t('contactPage.purposeOptions.donation')}
                    </option>
                    <option value="feedback">
                      {t('contactPage.purposeOptions.feedback')}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-maroon-dark mb-2 font-tamil-sans">
                  {t('contactPage.message')} *
                </label>

                <textarea
                  rows={4}
                  required
                  placeholder="தங்கள் செய்தி அல்லது பிரார்த்தனை விவரம்..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
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
                    {t('contactPage.sendBtn')}
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* How to Reach Section */}
      <section className="py-14 sm:py-20 bg-cream-dark/60 border-t border-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionTitle
            title={t('contactPage.howToReachTitle')}
            subtitle="பல்வேறு போக்குவரத்து மார்க்கங்கள் மூலம் கோயிலை வந்தடைவதற்கான வழிகாட்டுதல்"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {travelModes.map((mode) => {
              const Icon = mode.icon;

              return (
                <div
                  key={mode.titleTa}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gold/25 hover:border-gold hover:shadow-md transition-all flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-maroon/10 flex items-center justify-center text-maroon mb-4">
                    <Icon size={24} />
                  </div>

                  <h3 className="font-tamil-serif text-lg font-bold text-maroon-dark mb-2">
                    {language === 'ta' ? mode.titleTa : mode.titleEn}
                  </h3>

                  <p className="font-tamil-sans text-xs sm:text-sm text-maroon/80 leading-relaxed flex-1">
                    {language === 'ta' ? mode.descTa : mode.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Border */}
      <div className="temple-border-pattern" aria-hidden="true" />
    </div>
  );
}

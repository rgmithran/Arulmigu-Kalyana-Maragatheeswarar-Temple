import { Link } from 'react-router-dom';
import {
  Castle,
  Landmark,
  Gem,
  ScrollText,
  Users,
  MapPin,
  Crown,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SectionTitle from '../components/SectionTitle';
import ImagePlaceholder from '../components/ImagePlaceholder';

/* ─── Timeline Number Badge ─── */
function TimelineDot({ index = 0 }) {
  return (
    <div className="hidden lg:flex flex-col items-center absolute -left-16 top-0 h-full">
      <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center text-maroon-dark text-base font-bold shadow-lg shadow-gold/30 z-10 font-tamil-serif border-2 border-maroon">
        {index + 1}
      </div>
      <div className="flex-1 w-[2px] bg-gradient-to-b from-gold via-gold/40 to-transparent mt-2" />
    </div>
  );
}

/* ─── Story Card for Section 5 ─── */
function StoryCard({ number, title, text }) {
  return (
    <article className="group relative bg-cream rounded-xl border-2 border-gold/30 hover:border-gold transition-all duration-300 p-6 md:p-8 shadow-md hover:shadow-xl flex flex-col justify-between">
      {/* Corner Ornaments */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold rounded-br-lg" />

      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-maroon text-gold font-tamil-serif font-bold text-lg shadow-md shrink-0">
            {number}
          </span>
          <h4 className="font-tamil-serif text-lg md:text-xl font-bold text-maroon-dark leading-snug">
            {title}
          </h4>
        </div>

        <p className="font-tamil-serif text-maroon/85 leading-relaxed text-base">
          {text}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-gold/20 flex items-center gap-2 text-xs font-semibold text-gold-dark font-tamil-sans">
        <Sparkles size={14} className="text-gold" />
        <span>தலபுராணம் & நம்பிக்கை</span>
      </div>
    </article>
  );
}

/* ─── Deity Chip for Section 7 ─── */
function DeityChip({ name, index }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-3 bg-white rounded-lg border border-gold/25 hover:border-gold hover:shadow-md transition-all">
      <span className="w-6 h-6 rounded-full bg-maroon/10 text-maroon text-xs font-bold flex items-center justify-center shrink-0">
        {index + 1}
      </span>
      <span className="font-tamil-serif text-sm md:text-base text-maroon-dark font-semibold">
        {name}
      </span>
    </div>
  );
}

/* ================================================================
   MAIN HISTORY PAGE COMPONENT
   ================================================================ */
export default function HistoryPage() {
  const { language, t } = useLanguage();

  const deities = [
    'அருள்மிகு கல்யாண மரகதீஸ்வரர்',
    'அருள்மிகு மரகதவல்லி அம்மன்',
    'மரகத விநாயகர்',
    'உத்தண்ட வேலாயுதசுவாமி',
    'நந்தி',
    'அறப்பளீஸ்வரர்',
    'தட்சிணாமூர்த்தி',
    'துர்க்கை',
    'சனீஸ்வரர்',
    'சந்திரன்',
    'சூரியன்',
    'சண்டிகேஸ்வரர்',
    'நவகிரகங்கள்',
    'கால பைரவர்',
  ];

  const fourTowns = [
    { nameTa: 'ஆரியூர்', nameEn: 'Ariyur', clanTa: 'வெண்டுவ குலம்', clanEn: 'Venduva Kulam' },
    { nameTa: 'நெடுங்கூர்', nameEn: 'Nedungur'},
    { nameTa: 'பரமத்தி', nameEn: 'Paramathi', clanTa: 'பொருளந்தை குலம்', clanEn: 'Porulandhai Kulam' },
    { nameTa: 'முன்னூர்', nameEn: 'Munnur', clanTa: 'ஆந்தை குலம்', clanEn: 'Aanthai Kulam' },
  ];

  const timelineItems = [
    {
      year: 'கி.பி. 1731',
      yearEn: '1731 AD',
      textTa: 'குறுநில மன்னர் பாவாடை இராயப்ப கவுண்டர் தனது உழைப்பாலும் பொருளாலும் கோயிலின் பெரும்பான்மைத் திருப்பணிகளைத் தொடங்கி நிறைவேற்றினார்.',
      textEn: 'Chieftain Pavadai Rayappa Gounder dedicated his personal labor and wealth to undertake extensive temple renovation works.',
    },
    {
      year: 'கி.பி. 1802',
      yearEn: '1802 AD',
      textTa: t('historySections.timeline1'),
      textEn: 'The temple came under the administrative oversight of the British administration.',
    },
    {
      year: 'கி.பி. 1846',
      yearEn: '1846 AD',
      textTa: t('historySections.timeline2'),
      textEn: 'Hereditary trusteeship was formally conferred upon the descendants of Pavadai Rayappa Gounder.',
    },
    {
      year: 'கி.பி. 1947+',
      yearEn: 'Post-1947',
      textTa: t('historySections.timeline3'),
      textEn: 'Following Indian Independence, the temple transitioned under the management of the HR&CE Department with government-appointed trustees.',
    },
  ];

  const stories = [
    {
      title: t('stories.story1Title'),
      text: t('stories.story1Desc'),
    },
    {
      title: t('stories.story2Title'),
      text: t('stories.story2Desc'),
    },
    {
      title: t('stories.story3Title'),
      text: t('stories.story3Desc'),
    },
    {
      title: t('stories.story4Title'),
      text: t('stories.story4Desc'),
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* ═══════════════════════ HERO BANNER ═══════════════════════ */}
      <header className="relative bg-maroon-dark overflow-hidden py-18 sm:py-28 text-center">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle,#D4A843_1px,transparent_1px)] bg-[length:24px_24px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <div className="om-pulse text-gold-light text-4xl mb-4 select-none" aria-hidden="true">
            ௐ
          </div>

          <h1 className="font-tamil-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gold-light gold-shimmer leading-tight mb-4">
            {t('nav.history')}
          </h1>

          <p className="font-tamil-serif text-base sm:text-lg md:text-xl text-cream/90 max-w-3xl mx-auto leading-relaxed font-medium">
            முன்னூர் – மோளபாளையத்தில் இயற்கை எழில் சூழ்ந்த மாலைக்கோவில் அமைந்துள்ள அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில், கொங்கு நாட்டின் தொன்மையும் ஆன்மிகப் பெருமையும் கொண்ட பழமையான திருத்தலமாகும்.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3 text-gold/60 select-none">
            <span className="h-px w-20 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-xs tracking-[8px]">⟡ ◆ ⟡ ◆ ⟡</span>
            <span className="h-px w-20 bg-gradient-to-l from-transparent to-gold" />
          </div>
        </div>

        <div className="temple-border-top mt-10" />
      </header>

      {/* ═══════════════════════ SECTION 1 ═══════════════════════ */}
      <section className="relative bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="relative lg:pl-20">
            <TimelineDot index={0} />

            <SectionTitle subtitle="Kongu Nadu & the Four Ancient Towns (Moothur)">
              {t('historySections.sec1Title')}
            </SectionTitle>

            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-2">
                <ImagePlaceholder
                  label="கொங்கு நாடு 24 நாடுகள் வரைபடம்"
                  aspectRatio="aspect-[4/3]"
                  icon={MapPin}
                  className="rounded-xl shadow-lg border-2 border-gold/30"
                />
              </div>

              <div className="lg:col-span-3 space-y-5">
                <p className="font-tamil-serif text-base md:text-lg text-maroon-dark/95 leading-loose">
                  {t('historySections.sec1P1')}
                </p>

                {/* Four ancient towns highlight cards */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {fourTowns.map((town) => (
                    <div
                      key={town.nameTa}
                      className="bg-white rounded-lg border-2 border-gold/25 p-4 text-center hover:border-gold hover:shadow-md transition-all"
                    >
                      <Crown size={18} className="text-gold mx-auto mb-1.5" />
                      <p className="font-tamil-serif text-base font-bold text-maroon-dark">
                        {language === 'ta' ? town.nameTa : town.nameEn}
                      </p>
                      <p className="font-tamil-sans text-xs text-gold-dark mt-1 font-semibold">
                        {language === 'ta' ? town.clanTa : town.clanEn}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="font-tamil-serif text-base md:text-lg text-maroon-dark/95 leading-loose">
                  {t('historySections.sec1P2')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="kolam-divider mt-16" />
      </section>

      {/* ═══════════════════════ SECTION 2 ═══════════════════════ */}
      <section className="relative bg-temple-green py-16 md:py-24 text-cream">
        <div className="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(0deg,transparent,transparent_40px,rgba(255,248,231,0.2)_40px,rgba(255,248,231,0.2)_42px)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8">
          <div className="relative lg:pl-20">
            <TimelineDot index={1} />

            <SectionTitle light subtitle="Historic Forts and the Glory of Munnur">
              {t('historySections.sec2Title')}
            </SectionTitle>

            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-3 space-y-5">
                <p className="font-tamil-serif text-base md:text-lg text-cream/95 leading-loose">
                  {t('historySections.sec2P1')}
                </p>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-gold/30">
                  <h4 className="font-tamil-serif text-base font-bold text-gold-light mb-1">
                    பரமத்தி கோட்டைமேடு & முன்னூர் மலை அரண்
                  </h4>
                  <p className="font-tamil-sans text-sm text-cream/80 leading-relaxed">
                    பரமத்தி கடைவீதியின் தெற்கிலிருந்து ஆதிரெட்டிபாளையம் வரை பரந்த கோட்டைமேடு மற்றும் முன்னூர் மலைப்பகுதி ஆகியவை குறுநில மன்னர்களின் முக்கியப் பாதுகாப்பு அரண்களாகத் திகழ்ந்தன.
                  </p>
                </div>

                <p className="font-tamil-serif text-base md:text-lg text-cream/95 leading-loose">
                  {t('historySections.sec2P2')}
                </p>
              </div>

              <div className="lg:col-span-2">
                <ImagePlaceholder
                  label="பரமத்தி கோட்டைமேடு & முன்னூர் மலை"
                  aspectRatio="aspect-[4/3]"
                  icon={Castle}
                  className="rounded-xl shadow-lg border-2 border-gold/40"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-center gap-3 text-gold/40 select-none">
          <span className="h-px w-20 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-sm tracking-[8px]">⟡ ◆ ⟡ ◆ ⟡</span>
          <span className="h-px w-20 bg-gradient-to-l from-transparent to-gold/40" />
        </div>
      </section>

      {/* ═══════════════════════ SECTION 3 ═══════════════════════ */}
      <section className="relative bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="relative lg:pl-20">
            <TimelineDot index={2} />

            <SectionTitle subtitle="Origin and Chola Antiquity of the Shrine">
              {t('historySections.sec3Title')}
            </SectionTitle>

            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-2">
                <ImagePlaceholder
                  label="சோழர் காலக் கோயிற் கட்டிடக்கலை"
                  aspectRatio="aspect-[3/4]"
                  icon={Landmark}
                  className="rounded-xl shadow-lg border-2 border-gold/30"
                />
              </div>

              <div className="lg:col-span-3 space-y-5">
                <p className="font-tamil-serif text-base md:text-lg text-maroon-dark/95 leading-loose">
                  {t('historySections.sec3P1')}
                </p>

                {/* Chola Shiva Temples Reference */}
                <div className="bg-white rounded-xl border border-gold/25 p-5 space-y-3 shadow-sm">
                  <h4 className="font-tamil-serif font-bold text-maroon-dark text-base">
                    சோழர்களின் சிவபக்திக்குச் சான்றான திருநாமங்கள்:
                  </h4>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {['சோழீஸ்வரர்', 'பட்டீஸ்வரர்', 'பிரகதீஸ்வரர்', 'மகுடேஸ்வரர்', 'பசுபதீஸ்வரர்', 'கல்யாண மரகதீஸ்வரர்'].map((name) => (
                      <span key={name} className="px-3 py-1 bg-cream rounded-full text-xs font-bold text-maroon border border-gold/30 font-tamil-serif">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="font-tamil-serif text-base md:text-lg text-maroon-dark/95 leading-loose">
                  {t('historySections.sec3P2')}
                </p>

                <p className="font-tamil-serif text-base md:text-lg text-maroon-dark/95 leading-loose">
                  {t('historySections.sec3P3')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="kolam-divider mt-16" />
      </section>

      {/* ═══════════════════════ SECTION 4 ═══════════════════════ */}
      <section className="relative bg-maroon py-16 md:py-24 text-cream">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_50%_50%,rgba(212,168,67,0.3)_1px,transparent_1px)] bg-[length:24px_24px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8">
          <div className="relative lg:pl-20">
            <TimelineDot index={3} />

            <SectionTitle light subtitle="Significance of the Sacred Name Maragatheeswarar">
              {t('historySections.sec4Title')}
            </SectionTitle>

            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-3 space-y-5">
                <p className="font-tamil-serif text-base md:text-lg text-cream/95 leading-loose">
                  {t('historySections.sec4P1')}
                </p>

                <div className="bg-maroon-dark/60 backdrop-blur-sm rounded-xl border border-gold/30 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Gem size={28} className="text-gold-light" />
                    <h4 className="font-tamil-serif text-xl font-bold text-gold-light">
                      மரகதக் கல்லின் தோற்றமும் காந்தப் பண்பும்
                    </h4>
                  </div>
                  <p className="font-tamil-serif text-base text-cream/85 leading-relaxed">
                    இங்குள்ள மலையின் பாறைகள் மரகதக் கல்லைப் போன்ற நிறத்துடனும் எழிலுடனும் காட்சியளிக்கின்றன. மேலும் இவற்றில் இரும்புத் துகள்கள் ஒட்டிக்கொள்ளும் அபூர்வமான இயற்கை காந்தத் தன்மை காணப்படுகிறது.
                  </p>
                </div>

                <p className="font-tamil-serif text-base md:text-lg text-cream/95 leading-loose">
                  {t('historySections.sec4P2')}
                </p>
              </div>

              <div className="lg:col-span-2">
                <ImagePlaceholder
                  label="மரகத நிறப் பாறைகள் & சிவலிங்கம்"
                  aspectRatio="aspect-[3/4]"
                  icon={Gem}
                  className="rounded-xl shadow-lg border-2 border-gold/40"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-center gap-3 text-gold/40 select-none">
          <span className="h-px w-20 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-sm tracking-[8px]">⟡ ◆ ⟡ ◆ ⟡</span>
          <span className="h-px w-20 bg-gradient-to-l from-transparent to-gold/40" />
        </div>
      </section>

      {/* ═══════════════════════ SECTION 5 ═══════════════════════ */}
      <section className="relative bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="relative lg:pl-20">
            <TimelineDot index={4} />

            <SectionTitle subtitle="Four Special Sacred Legends of the Shrine">
              {t('historySections.sec5Title')}
            </SectionTitle>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mt-8">
              {stories.map((story, i) => (
                <StoryCard
                  key={story.title}
                  number={i + 1}
                  title={story.title}
                  text={story.text}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="kolam-divider mt-16" />
      </section>

      {/* ═══════════════════════ SECTION 6 ═══════════════════════ */}
      <section className="relative bg-temple-green py-16 md:py-24 text-cream">
        <div className="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(135deg,transparent,transparent_20px,rgba(255,248,231,0.15)_20px,rgba(255,248,231,0.15)_22px)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8">
          <div className="relative lg:pl-20">
            <TimelineDot index={5} />

            <SectionTitle light subtitle="Noble Renovations of Pavadai Rayappa Gounder">
              {t('historySections.sec6Title')}
            </SectionTitle>

            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-2">
                <ImagePlaceholder
                  label="பாவாடை இராயப்ப கவுண்டர் மரபு வழித்தோன்றல்கள்"
                  aspectRatio="aspect-[4/5]"
                  icon={Users}
                  className="rounded-xl shadow-lg border-2 border-gold/40"
                />
              </div>

              <div className="lg:col-span-3 space-y-5">
                <p className="font-tamil-serif text-base md:text-lg text-cream/95 leading-loose">
                  {t('historySections.sec6P1')}
                </p>

                <p className="font-tamil-serif text-base md:text-lg text-cream/95 leading-loose">
                  {t('historySections.sec6P2')}
                </p>

                {/* Timeline boxes */}
                <div className="space-y-3 pt-2">
                  {timelineItems.map((item) => (
                    <div
                      key={item.year}
                      className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-gold/25 flex items-start gap-4"
                    >
                      <span className="px-3 py-1 bg-gold text-maroon-dark font-bold text-xs rounded font-tamil-sans shrink-0">
                        {language === 'ta' ? item.year : item.yearEn}
                      </span>
                      <p className="font-tamil-serif text-sm md:text-base text-cream/90 leading-relaxed">
                        {language === 'ta' ? item.textTa : item.textEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-center gap-3 text-gold/40 select-none">
          <span className="h-px w-20 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-sm tracking-[8px]">⟡ ◆ ⟡ ◆ ⟡</span>
          <span className="h-px w-20 bg-gradient-to-l from-transparent to-gold/40" />
        </div>
      </section>

      {/* ═══════════════════════ SECTION 7 ═══════════════════════ */}
      <section className="relative bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="relative lg:pl-20">
            <TimelineDot index={6} />

            <SectionTitle subtitle="14 Sacred Deities Gracing the Temple">
              {t('historySections.sec7Title')}
            </SectionTitle>

            {/* User Supplied Temple Image Highlight */}
            <div className="mb-10 rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/40 relative">
              <img
                src="/temple-main.jpg"
                alt="கரூர் ஸ்ரீ வைராக்கிய நாயகி உடனுறை ஸ்ரீ வீரபாண்டி ஸ்வரர் ஆலயம் எழில் மிகுந்த காட்சி"
                className="w-full h-[340px] sm:h-[440px] object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="p-4 sm:p-5 bg-gradient-to-r from-maroon-dark via-maroon to-maroon-dark text-cream border-t-2 border-gold/40">
                <p className="font-tamil-serif text-sm sm:text-base text-gold-light font-semibold text-center">
                  திருக்கோயில் எழில்மிகு திருக்காட்சி | அருள்மிகு கல்யாண மரகதீஸ்வரர் ஆலயம்
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {deities.map((deity, i) => (
                <DeityChip key={deity} name={deity} index={i} />
              ))}
            </div>

            {/* Link to Deities Page */}
            <div className="mt-10 text-center">
              <Link
                to="/deities"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-maroon text-gold font-tamil-sans font-bold text-base rounded-lg hover:bg-maroon-dark transition-colors shadow-lg hover:shadow-xl"
              >
                <Sparkles size={18} />
                {t('viewAll')} — {t('nav.deities')} (14 சன்னதிகள்)
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        <div className="kolam-divider mt-16" />
      </section>

      {/* ═══════════════════════ SECTION 8 ═══════════════════════ */}
      <section className="relative bg-maroon-dark py-16 md:py-24 text-cream">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_30%_20%,rgba(212,168,67,0.4)_0%,transparent_50%)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8">
          <div className="relative lg:pl-20">
            <TimelineDot index={7} />

            <SectionTitle light subtitle="Literary & Ongoing Epigraphical Studies">
              {t('historySections.sec8Title')}
            </SectionTitle>

            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-3 space-y-5">
                <p className="font-tamil-serif text-base md:text-lg text-cream/95 leading-loose">
                  {t('historySections.sec8P1')}
                </p>

                <p className="font-tamil-serif text-base md:text-lg text-cream/95 leading-loose">
                  {t('historySections.sec8P2')}
                </p>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-gold/25 space-y-3">
                  <h4 className="font-tamil-serif font-bold text-gold-light text-base">
                    தொல்லியல் & வரலாற்று நூல் வெளியீட்டு முயற்சி:
                  </h4>
                  <p className="font-tamil-sans text-sm text-cream/80 leading-relaxed">
                    சமீபகால கல்வெட்டுகள், செப்பேடுகள் மற்றும் வரலாற்று ஆய்வாளர்களின் களப்பணி மூலம் விரிவான திருத்தல வரலாற்று நூல் ஆவணமாகத் தொகுக்கப்பட்டு வருகிறது.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2">
                <ImagePlaceholder
                  label="பண்டைய கல்வெட்டுகள் & வேளாள புராணக் குறிப்புகள்"
                  aspectRatio="aspect-[4/3]"
                  icon={ScrollText}
                  className="rounded-xl shadow-lg border-2 border-gold/40"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-center gap-3 text-gold/40 select-none">
          <span className="h-px w-20 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-sm tracking-[8px]">⟡ ◆ ⟡ ◆ ⟡</span>
          <span className="h-px w-20 bg-gradient-to-l from-transparent to-gold/40" />
        </div>
      </section>

      {/* ═══════════════════════ CONCLUSION ═══════════════════════ */}
      <section className="relative bg-cream py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative rounded-2xl border-2 border-gold bg-gradient-to-br from-cream to-cream-dark p-8 md:p-12 shadow-2xl">
            {/* Corner Ornaments */}
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-gold rounded-full shadow-lg shadow-gold/30 border-2 border-maroon" />
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-gold rounded-full shadow-lg shadow-gold/30 border-2 border-maroon" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-gold rounded-full shadow-lg shadow-gold/30 border-2 border-maroon" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-gold rounded-full shadow-lg shadow-gold/30 border-2 border-maroon" />

            <div className="text-center mb-6">
              <span className="text-gold text-3xl select-none">✦</span>
              <h3 className="font-tamil-serif text-lg font-bold text-gold-dark mt-1">
                முடிவுரை
              </h3>
            </div>

            <blockquote className="font-tamil-serif text-base md:text-lg lg:text-xl text-maroon-dark leading-loose text-center font-medium">
              {t('historySections.conclusion')}
            </blockquote>

            <div className="my-8 flex items-center justify-center gap-3 text-gold/60 select-none">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
              <span className="text-xs tracking-[6px]">⟡ ◆ ⟡</span>
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
            </div>

            <p className="font-tamil-serif text-2xl md:text-3xl text-maroon text-center font-bold gold-shimmer">
              {t('omNamaSivayaFull')}
            </p>

            <div className="text-center mt-6">
              <span className="om-pulse text-gold/60 text-4xl select-none">ௐ</span>
            </div>
          </div>
        </div>
      </section>

      <div className="temple-border-top" />
    </div>
  );
}

import { createContext, useContext, useState, useCallback } from 'react';

const translations = {
  ta: {
    nav: {
      home: 'முகப்பு',
      history: 'திருக்கோயில் வரலாறு',
      deities: 'தெய்வங்கள்',
      pooja: 'வழிபாடுகள்',
      festivals: 'திருவிழாக்கள்',
      gallery: 'புகைப்படங்கள்',
      contact: 'தொடர்புக்கு',
    },
    templeName: 'அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில்',
    templeLocation: 'முன்னூர் – மோளபாளையம்',
    districtState: ' கரூர்  மாவட்டம், தமிழ்நாடு',
    omNamaSivaya: 'ஓம் நமசிவாய',
    sivayaNamaOm: 'சிவாய நம ஓம்',
    omNamaSivayaFull: 'ஓம் நமசிவாய! சிவாய நம ஓம்!',
    welcome: 'கொங்கு நாட்டின் தொன்மையும் ஆன்மிகப் பெருமையும் கொண்ட திருத்தலம்',
    heroSubtitle: 'இயற்கை எழில் சூழ்ந்த மாலைக்கோவில் சோழர் காலத் தொன்மையுடன் அருள்பாலிக்கும் புண்ணிய பூமி',
    exploreHistory: 'திருக்கோயில் வரலாறு',
    viewGallery: 'புகைப்படத் தொகுப்பு',
    introTitle: 'திருக்கோயிலைப் பற்றி',
    introText: 'முன்னூர் – மோளபாளையத்தில் இயற்கை எழில் சூழ்ந்த மலையடிவாரத்தில் அமைந்துள்ள அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில், கொங்கு நாட்டின் தொன்மையும் ஆன்மிகப் பெருமையும் கொண்ட பழமையான திருத்தலமாகும்.',
    mainDeity: 'முதன்மைத் தெய்வம்',
    otherDeities: 'திருக்கோயில் தெய்வங்கள்',
    historyHighlights: 'வரலாற்றுச் சிறப்புகள்',
    specialStories: 'கோயில் தொடர்பான நான்கு சிறப்புக் கதைகள்',
    festivalHighlights: 'திருவிழாச் சிறப்புகள்',
    galleryPreview: 'புகைப்படக் காட்சிகள்',
    contactLocation: 'தொடர்பும் இருப்பிடமும்',
    readMore: 'முழு விவரம்',
    viewAll: 'அனைத்தும் காண',
    templeTimings: 'தினசரி தரிசன நேரம்',
    darshanTimeText: 'காலை 9:00 மணி முதல் மதியம் 1:00 மணி வரை',
    dailyPooja: 'தினசரி வழிபாடுகள்',
    specialPooja: 'சிறப்பு அபிஷேகங்கள்',
    address: 'முகவரி',
    phone: 'தொலைபேசி',
    email: 'மின்னஞ்சல்',
    getDirections: 'வழித்தடம் அறிய (Google Maps)',
    footerText: 'அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில்',
    footerLocation: 'முன்னூர் – மோளபாளையம்',
    copyright: '© 2026 முன்னூர் – மோளபாளையம் அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    quickLinks: 'விரைவு இணைப்புகள்',
    contactInfo: 'தொடர்பு விவரங்கள்',
    morning: 'காலை',
    editableNotice: 'கோயில் நிர்வாகத்தின் பயன்பாட்டுக்கான தற்காலிக விவரம்',
    
    // Confirmed Special Chariot Festival
    chariotFestival: {
      title: 'மாசி மகம் தேரோட்டம்',
      subtitle: 'ஆண்டுப் பெருவிழா & சுவாமி திருத்தேர் வைபவம்',
      badge: 'முதன்மைத் திருவிழா',
      desc: 'முன்னூர் அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயிலின் அதிமுக்கிய ஆண்டுப் பெருவிழாவான மாசி மகம் தேரோட்டம். வண்ண மலர்களாலும் கொடிகளாலும் அலங்கரிக்கப்பட்ட திருத்தேரில் ஈசன் எழுந்தருளி அருள் வழங்கும் மங்கலத் திருவிழா.',
      dateStatus: 'தேதி விரைவில் அறிவிக்கப்படும் (பஞ்சாங்க கணிப்புப்படி)',
      viewFestivalDetails: 'தேரோட்ட விவரங்களைக் காண',
      announcementsTitle: 'தேரோட்ட சிறப்பு அறிவிப்புகள்',
      announcement1: 'சுவாமி திருத்தேர் வடம் பிடித்தல் மற்றும் மகா தீபாராதனை.',
      announcement2: 'பக்தர்களுக்கு நாள் முழுவதும் அன்னதானம் & தீர்த்தப் பிரசாதம்.',
      announcement3: 'வாகன நிறுத்துமிடம் மற்றும் பக்தர்கள் வரிசை ஒழுங்குமுறை வசதிகள்.',
    },

    stories: {
      story1Title: 'முதல் கதை – மரகதக் கொடி',
      story1Desc: 'மலையிலுள்ள மரகதீஸ்வரர் சிலையின் அடிப்பகுதியில் இருந்து ஒரு கொடி அல்லது புதையல் இருப்பதாக ஆங்கிலேயர் காலத்தில் அறியப்பட்டதாகக் கூறப்படுகிறது. அதனைத் தேடிச் சென்ற ஒருவர் இறைவனின் அருளை மறந்ததால் கண்பார்வையை இழந்து, பின்னர் மன்னிப்புக் கோரியதும் பார்வை திரும்பக் கிடைத்ததாகத் தலபுராணக் கதை கூறுகிறது.',
      story2Title: 'இரண்டாவது கதை – அறப்பளீஸ்வரர் தெய்வம்',
      story2Desc: 'மலையின் சுற்றுப்பிரகாரத்தில் வடக்கு நோக்கி அமைந்துள்ள அறப்பளீஸ்வரர் தெய்வம் காவிரியை நோக்கி அமர்ந்திருப்பதாக நம்பப்படுகிறது. காவிரி இம்மலையின் அடிவாரத்தை அடைந்த பின்னரே தான் நீராடுவதாக ஐதீகம் கூறுகிறது.',
      story3Title: 'மூன்றாவது கதை – தேவர்களின் வழிபாடு',
      story3Desc: 'இம்மலைப் பகுதியில் சந்நியாசி மலை, இடும்பன் மலை, கோயில் அமைந்துள்ள மலை என மூன்று மலைப்பகுதிகள் உள்ளன. சந்நியாசி மலையில் இரவு 12 மணியளவில் சங்கு, சேகண்டி, மணியோசைகள் கேட்பதாகவும், தேவர்கள் இறைவனை வழிபட வருவதால் அந்த ஒலிகள் ஏற்படுவதாகவும் பக்தர்கள் நம்புகின்றனர்.',
      story4Title: 'நான்காவது கதை – உத்தண்ட வேலாயுதசுவாமி',
      story4Desc: 'இங்குள்ள உத்தண்ட வேலாயுதசுவாமி பழனி முருகப்பெருமானின் அம்சமாகக் கருதப்படுகிறார். அவரை வேண்டி வழிபடுவோருக்கு வேண்டிய வரங்களை அருள்வதாகப் பக்தர்கள் நம்புகின்றனர்.',
    },

    historySections: {
      sec1Title: '1. கொங்கு நாட்டின் வரலாறும் நான்கு மூதூர்களும்',
      sec1P1: 'பழங்காலத்தில் கொங்கு நாடு 24 நாடுகளாகப் பிரிக்கப்பட்டு ஆட்சி செய்யப்பட்டு வந்தது. அவற்றில் வெங்கால நாட்டுடன் தொடர்புடைய இடைப்பிச்ச நாடும் ஒன்று. இப்பகுதியின் தொன்மையான நான்கு கிராமங்களாக ஆரியூர், நெடுங்கூர், பரமத்தி, முன்னூர் ஆகியவை விளங்கின.',
      sec1P2: 'இந்த நான்கு கிராமங்களும் நான்கு காணியாளர்களின் ஆட்சியில் இருந்தன. பரமத்தியில் பொருளந்தை குலத்தினரும், ஆரியூரில் வெண்டுவ குலத்தினரும், முன்னூரில் ஆந்தை குலத்தினரும் காணியாளர்களாக இருந்ததாகக் காணிப் பாடல்கள் மூலம் அறியப்படுகிறது.',
      
      sec2Title: '2. கோட்டைகளும் முன்னூரின் சிறப்பும்',
      sec2P1: 'கொங்கு நாடு 14ஆம் நூற்றாண்டு வரை குறுநில மன்னர்களின் ஆட்சியில் சிறப்புற்றிருந்தது. அக்காலத்தில் கொங்கு நாட்டில் 51 கோட்டைகள் இருந்ததாகக் கூறப்படுகிறது. அவற்றில் ஒன்று பரமத்தியில் அமைந்திருந்தது. அதன் கோட்டைமேடு பரமத்தி கடைவீதியின் தெற்குப் பகுதியில் இருந்து ஆதிரெட்டிபாளையம் வரை பரந்துள்ளது.',
      sec2P2: 'தங்களது பாதுகாப்பிற்காகக் குறுநில மன்னர்கள் மலைப்பகுதிகளையும் தேர்ந்தெடுத்தனர். அவ்வகையில் பரமத்தி குறுநில மன்னர்கள் முன்னூர் மலையையும் பயன்படுத்தியிருக்கலாம் எனக் கருதப்படுகிறது. மோளபாளையம் என்ற ஊர் கி.பி. 1700 காலப்பகுதியில் உருவானதாகக் கல்வெட்டுகளின் அடிப்படையில் ஊகிக்கப்படுகிறது.',
      
      sec3Title: '3. திருக்கோயிலின் தோற்றமும் பழமையும்',
      sec3P1: 'கொங்கு நாட்டை முதலில் கங்கர் ஆட்சி செய்ததாகவும், பின்னர் சோழர்கள் கி.பி. 894ஆம் ஆண்டு வென்று தங்கள் பேரரசை நிறுவியதாகவும் இவ்வரலாற்றுக் குறிப்பில் தெரிவிக்கப்பட்டுள்ளது.',
      sec3P2: 'சோழர்கள் சிவபக்தியில் சிறந்து விளங்கியவர்கள். அவர்கள் ஆட்சி செய்த பகுதிகளில் பல சிவாலயங்களை அமைத்தனர். சோழீஸ்வரர், பட்டீஸ்வரர், பிரகதீஸ்வரர், மகுடேஸ்வரர், பசுபதீஸ்வரர் போன்ற பெயர்கள் இதற்குச் சான்றுகளாகக் குறிப்பிடப்படுகின்றன.',
      sec3P3: 'கோயிலின் கட்டிடக்கற்கள், அவற்றின் அமைப்பு மற்றும் தொன்மை ஆகியவற்றின் அடிப்படையில் இக்கோயில் சோழர் காலத்தைச் சேர்ந்ததாக இருக்கலாம் எனக் கருதப்படுகிறது. கி.பி. 894ஆம் ஆண்டை இதன் தோற்றக்காலமாகக் குறிப்பிடும் கருத்தும் உள்ளது. எனினும் இதனை உறுதிப்படுத்த மேலும் கல்வெட்டு மற்றும் தொல்லியல் ஆய்வுகள் தேவைப்படுகின்றன.',
      
      sec4Title: '4. மரகதீஸ்வரர் திருநாமத்தின் சிறப்பு',
      sec4P1: 'இங்குள்ள இறைவனுக்கு அருள்மிகு கல்யாண மரகதீஸ்வரர் என்று திருநாமம் வழங்கப்பட்டுள்ளது. இங்குள்ள மலையின் கற்கள் மரகதக் கல்லைப் போன்ற தோற்றத்துடன் காணப்படுவதாகவும், அவற்றில் இரும்புத் துகள்கள் ஒட்டிக்கொள்ளும் தன்மை இருப்பதாகவும் கூறப்படுகிறது.',
      sec4P2: 'இக்கற்களின் தன்மை குறித்து கனிமவளத் துறையினரிடம் பலமுறை ஆய்வு கோரப்பட்டதாகவும் குறிப்பிடப்பட்டுள்ளது.',
      
      sec5Title: '5. கோயில் தொடர்பான நான்கு சிறப்புக் கதைகள்',
      
      sec6Title: '6. பாவாடை இராயப்ப கவுண்டரின் திருப்பணிகள்',
      sec6P1: 'கி.பி. 1731ஆம் ஆண்டு இப்பகுதியைச் சேர்ந்த குறுநில மன்னராகக் குறிப்பிடப்படும் பாவாடை இராயப்ப கவுண்டர் இக்கோயிலின் மீது மிகுந்த ஈடுபாடு கொண்டு தனது உழைப்பாலும் பொருளாலும் பல திருப்பணிகளைச் செய்துள்ளார்.',
      sec6P2: 'அவருக்குப் பின்னர் அவரது பரம்பரை வாரிசுகளும் தொடர்ந்து கோயில் திருப்பணிகளை மேற்கொண்டு வந்துள்ளனர்.',
      timeline1: 'கி.பி. 1802: கோயில் ஆங்கிலேயர் ஆட்சியின் நிர்வாகக் கட்டுப்பாட்டிற்குள் வந்தது.',
      timeline2: 'கி.பி. 1846: பாவாடை இராயப்ப கவுண்டரின் பரம்பரை வாரிசுகளுக்கு அறங்காவலர் பொறுப்பு வழங்கப்பட்டது.',
      timeline3: 'கி.பி. 1947க்குப் பிறகு: இந்தியா சுதந்திரம் பெற்றதைத் தொடர்ந்து கோயில் இந்து சமய அறநிலையத்துறையின் நிர்வாகத்தின் கீழ் கொண்டுவரப்பட்டு அரசால் அறங்காவலர்கள் நியமிக்கப்பட்டனர்.',
      
      sec7Title: '7. திருக்கோயிலில் அருள்பாலிக்கும் தெய்வங்கள்',
      
      sec8Title: '8. இலக்கிய மற்றும் வரலாற்றுச் சிறப்பு',
      sec8P1: 'இத்திருக்கோயில் வேளாள புராணத்தில் பாடல் பெற்றதாகவும், சில புலவர்களும் இத்திருத்தலத்தின் சிறப்புகளைப் பாடியுள்ளதாகவும் கூறப்படுகிறது.',
      sec8P2: 'சமீபகாலமாகக் கிடைத்துள்ள கல்வெட்டுகள் மற்றும் வரலாற்றுச் சான்றுகளைக் கொண்டு கல்வெட்டுத்துறை, தொல்லியல் துறை மற்றும் வரலாற்றுத் துறையைச் சேர்ந்தவர்களுடன் இணைந்து மேலதிக ஆய்வுகள் மேற்கொள்ளப்பட்டு வருகின்றன. இவ்வாய்வுகளின் முடிவில் விரிவான திருத்தல வரலாற்று நூல் வெளியிடும் முயற்சியும் நடைபெற்று வருகிறது.',
      
      conclusion: 'கொங்கு நாட்டின் தொன்மையான வரலாறு, குறுநில மன்னர்களின் ஆட்சி, சோழர் காலக் கட்டிடக்கலை, பாவாடை இராயப்ப கவுண்டரின் திருப்பணிகள், பல்வேறு ஐதீகங்கள் மற்றும் அருள்மிகு கல்யாண மரகதீஸ்வரரின் தெய்வீகப் பெருமை ஆகிய அனைத்தையும் தன்னகத்தே கொண்ட புனிதத் திருத்தலமாக முன்னூர் – மோளபாளையம் அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில் விளங்குகிறது.',
    },

    poojaPage: {
      title: 'வழிபாடுகளும் நேரங்களும்',
      subtitle: 'தினசரி தரிசன நேரம் மற்றும் விசேஷ அபிஷேக விவரங்கள்',
      darshanTimings: 'தினசரி தரிசன நேரம்',
      confirmedTiming: 'காலை 9:00 மணி முதல் மதியம் 1:00 மணி வரை',
      timingNote: '* திருக்கோயில் தினசரி காலை 9:00 மணி முதல் மதியம் 1:00 மணி வரை மட்டுமே திறந்திருக்கும். மாலை நேர தரிசனம் கிடையாது.',
      dailyScheduleTitle: 'தினசரி பூஜை அட்டவணை',
      dailyScheduleNotice: '* குறிப்பு: நடை திறப்பு காலை 9:00 மணி முதல் மதியம் 1:00 மணி வரை. பூஜைகள் ஆகம விதிப்படி நிகழ்த்தப்படுகின்றன.',
      monthlySpecialTitle: 'விசேஷ மற்றும் மாதாந்திர பூஜைகள்',
      abhishekamTitle: 'சிறப்பு அபிஷேகங்கள் மற்றும் அர்ச்சனைகள்',
      guidelinesTitle: 'பக்தர்களுக்கான கோயில் நெறிமுறைகள்',
      poojaBookingTitle: 'வழிபாடு / பூஜை தகவல் பதிவு',
      poojaBookingSubtitle: 'அர்ச்சனை, அபிஷேகம் அல்லது திருக்கல்யாண உற்சவம் பற்றிய தகவல்களுக்கு தொடர்பு கொள்ளவும்',
    },

    festivalsPage: {
      title: 'திருவிழாக்கள் & உற்சவங்கள்',
      subtitle: 'முன்னூர் திருக்கோயிலில் ஆண்டாண்டு தோறும் விமரிசையாக நடைபெறும் புனிதத் திருவிழாக்கள்',
      chariotHeroTitle: 'மாசி மகம் தேரோட்டம்',
      chariotHeroSubtitle: 'ஆண்டுப் பெருவிழா – Masi Magam Chariot Festival',
      annualTitle: 'மாசி மகம் பெருவிழா & தேரோட்டம்',
      annualNotice: '* திருவிழா நாட்கள் மற்றும் நேரங்கள் தமிழ் பஞ்சாங்க கணிப்பின்படி நிர்ணயிக்கப்படுகின்றன. அதிகாரப்பூர்வ தேதிகள் நிர்வாகத்தால் அறிவிக்கப்படும்.',
      shivaratriTitle: 'மகா சிவராத்திரி வழிபாடு',
      pradoshamTitle: 'பிரதோஷ நந்தி வழிபாடு',
      specialShivaTitle: 'சிவபெருமானுக்குரிய சிறப்புப் பண்டிகைகள்',
      otherCelebrationsTitle: 'பிற தெய்வங்களின் திருவிழாக்கள்',
      calendarNoteTitle: 'பக்தர்கள் கவனத்திற்கு',
      calendarNoteText: 'திருவிழாக்கள் மற்றும் உற்சவங்கள் பற்றிய துல்லியமான தேதிகள் மற்றும் விசேஷ வழிபாட்டு முறைகள் கோயில் அறிவிப்புப் பலகையிலும் இத்தளத்திலும் புதுப்பிக்கப்படும். தேதிகள் தன்னிச்சையாக மாற்றப்பட மாட்டாது.',
    },

    galleryPage: {
      title: 'புகைப்படத் தொகுப்பு',
      subtitle: 'முன்னூர் கல்யாண மரகதீஸ்வரர் திருக்கோயிலின் வரலாற்றுச் சிறப்பும் மாசி மகம் தேரோட்ட காட்சிகளும்',
      all: 'அனைத்தும்',
      chariot: 'மாசி மகம் தேரோட்டம்',
      architecture: 'கோயிற் கட்டிடக்கலை',
      moolavar: 'மூலவர் கல்யாண மரகதீஸ்வரர்',
      amman: 'மரகதவல்லி அம்மன்',
      festivals: 'திருவிழாக்கள்',
      celebrations: 'சிறப்பு வழிபாடுகள்',
      close: 'மூடுக',
      next: 'அடுத்த படம்',
      prev: 'முந்தைய படம்',
      imageNotice: 'தங்களிடம் திருக்கோயிலின் பழமையான அல்லது தேரோட்ட புகைப்படங்கள் இருப்பின், கோயில் நிர்வாகத்திற்கு அனுப்பி வைக்கலாம்.',
    },

    contactPage: {
      title: 'தொடர்புக்கு & இருப்பிடம்',
      subtitle: 'அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயிலை வந்தடைய வழிகாட்டி',
      templeAddressTitle: 'கோயில் முகவரி',
      phoneTitle: 'தொடர்பு தொலைபேசி',
      emailTitle: 'மின்னஞ்சல் முகவரி',
      timingsTitle: 'தினசரி தரிசன நேரம்',
      confirmedTiming: 'காலை 9:00 மணி முதல் மதியம் 1:00 மணி வரை',
      noEveningTimingNote: 'குறிப்பு: மாலை நேர தரிசனம் கிடையாது. காலை 9:00 முதல் மதியம் 1:00 மணி வரை மட்டுமே கோயில் திறந்திருக்கும்.',
      directionsTitle: 'Google Maps வழித்தடம்',
      openMapsBtn: 'Google Maps-ல் பார்க்க',
      formTitle: 'தகவல் / தொடர்புப் படிவம்',
      formSubtitle: 'தங்கள் வழிபாட்டு வினாக்கள், பிரார்த்தனைகள் அல்லது நன்கொடை குறித்த விவரங்களுக்கு செய்தி அனுப்பவும்',
      fullName: 'தங்கள் பெயர்',
      emailAddress: 'மின்னஞ்சல் முகவரி',
      phoneNumber: 'தொலைபேசி எண்',
      purpose: 'நோக்கம்',
      purposeOptions: {
        general: 'பொதுவான தகவல்',
        pooja: 'பூஜை / அர்ச்சனை முன்பதிவு',
        donation: 'திருப்பணி / நன்கொடை',
        feedback: 'கருத்து / ஆலோசனை',
      },
      message: 'தங்கள் செய்தி',
      sendBtn: 'செய்தி அனுப்புக',
      howToReachTitle: 'திருக்கோயிலை அடைவது எப்படி?',
      byRoad: 'சாலை வழியாக',
      byBus: 'பேருந்து வசதி',
      byTrain: 'ரயில் நிலையம்',
      byAir: 'விமான நிலையம்',
    },
  },

  en: {
    nav: {
      home: 'Home',
      history: 'Temple History',
      deities: 'Deities',
      pooja: 'Poojas & Timings',
      festivals: 'Festivals',
      gallery: 'Gallery',
      contact: 'Contact',
    },
    templeName: 'Arulmigu Kalyana Maragatheeswarar Temple',
    templeLocation: 'Munnur – Molapalayam',
    districtState: 'Karur District, Tamil Nadu',
    omNamaSivaya: 'Om Namashivaya',
    sivayaNamaOm: 'Shivaya Nama Om',
    omNamaSivayaFull: 'Om Namashivaya! Shivaya Nama Om!',
    welcome: 'A sacred shrine of ancient heritage and spiritual glory of Kongu Nadu',
    heroSubtitle: 'Nestled at the picturesque foothills with ancient Chola-era heritage, gracing devotees with divine blessings',
    exploreHistory: 'Explore Temple History',
    viewGallery: 'View Photo Gallery',
    introTitle: 'About the Temple',
    introText: 'Located at the scenic foothills in Munnur – Molapalayam, Arulmigu Kalyana Maragatheeswarar Temple is an ancient holy shrine celebrating the rich antiquity and spiritual glory of Kongu Nadu.',
    mainDeity: 'Presiding Deity',
    otherDeities: 'Sacred Deities',
    historyHighlights: 'Historical Highlights',
    specialStories: 'Four Special Temple Legends',
    festivalHighlights: 'Festival Highlights',
    galleryPreview: 'Photo Gallery Preview',
    contactLocation: 'Contact & Location',
    readMore: 'Read More',
    viewAll: 'View All',
    templeTimings: 'Daily Darshan Timings',
    darshanTimeText: '9:00 AM to 1:00 PM',
    dailyPooja: 'Daily Poojas',
    specialPooja: 'Special Abhishekam',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    getDirections: 'Get Directions (Google Maps)',
    footerText: 'Arulmigu Kalyana Maragatheeswarar Temple',
    footerLocation: 'Munnur – Molapalayam',
    copyright: '© 2026 Arulmigu Kalyana Maragatheeswarar Temple, Munnur – Molapalayam. All rights reserved.',
    quickLinks: 'Quick Links',
    contactInfo: 'Contact Information',
    morning: 'Morning',
    editableNotice: 'Placeholder for temple administrative updates',

    // Confirmed Special Chariot Festival
    chariotFestival: {
      title: 'Masi Magam Therottam',
      subtitle: 'Annual Temple Chariot Festival',
      badge: 'Premier Annual Festival',
      desc: 'The grand annual spectacle of Arulmigu Kalyana Maragatheeswarar Temple celebrated on the auspicious day of Masi Magam. Lord Shiva mounts the magnificently decorated holy chariot (Ther) to bestow blessings as the procession circumambulates the ancient streets.',
      dateStatus: 'Date to be announced soon (As per Panchangam)',
      viewFestivalDetails: 'View Chariot Festival Details',
      announcementsTitle: 'Chariot Festival Special Announcements',
      announcement1: 'Devotees drawing the sacred chariot ropes (Ther Vadam Pidithal) and Maha Deeparadhana.',
      announcement2: 'Annadhanam (free sacred feast) and Theertha Prasadam for all devotees throughout the day.',
      announcement3: 'Designated vehicle parking, crowd management, and queue guidance facilities.',
    },

    stories: {
      story1Title: 'First Legend – The Emerald Vine (Maragatha Kodi)',
      story1Desc: 'According to temple lore, during the British period it was believed that an emerald vine or hidden treasure lay at the base of the Maragatheeswarar idol. A seeker who set out without seeking divine grace lost his eyesight, which was miraculously restored only after he offered heartfelt remorse and prayers.',
      story2Title: 'Second Legend – Arapalli Deity and Cauvery River',
      story2Desc: 'Facing north on the outer circumambulatory corridor of the hill, the Arapalli deity is believed to gaze towards River Cauvery. Tradition holds that the deity takes a sacred bath only after Cauvery’s auspicious breezes reach the foothills.',
      story3Title: 'Third Legend – Celestial Worship by Devas',
      story3Desc: 'The hill precinct comprises three peaks: Sanniyasi Hill, Idumban Hill, and the Temple Hill. Devotees believe that around midnight, the resonance of conches, gongs, and temple bells echoes from Sanniyasi Hill, signifying the arrival of celestial Devas worshipping the Lord.',
      story4Title: 'Fourth Legend – Utthanda Velayudhaswami',
      story4Desc: 'Lord Utthanda Velayudhaswami enshrined here is revered as an incarnation of Palani Murugan. Devotees hold deep faith that praying to Him bestows their cherished boons.',
    },

    historySections: {
      sec1Title: '1. History of Kongu Nadu & the Four Ancient Towns',
      sec1P1: 'In ancient times, Kongu Nadu was administered across 24 regional divisions (Nadus). Among them, Idaipicha Nadu associated with Vengala Nadu was prominent. Ariyur, Nedungur, Paramathi, and Munnur were celebrated as the four ancient towns (Moothurs) of this region.',
      sec1P2: 'These four towns were governed by four ancestral Kaniyalars: Porulandhai Kulam in Paramathi, Venduva Kulam in Ariyur, and Aanthai Kulam in Munnur, as documented in historic Kani songs.',
      
      sec2Title: '2. Forts and the Glory of Munnur',
      sec2P1: 'Until the 14th century, Kongu Nadu flourished under local chieftains. Records indicate that 51 forts protected the land, including one in Paramathi whose fort mound (Kottaimedu) extends from south of Paramathi market to Aadhirettipalayam.',
      sec2P2: 'For safety, chieftains fortified hill terrain; thus Paramathi rulers utilized Munnur hill as a stronghold. Epigraphical studies infer that Molapalayam village originated around 1700 AD.',
      
      sec3Title: '3. Origin and Antiquity of the Temple',
      sec3P1: 'Historical notes state that the Gangas initially ruled Kongu Nadu before the Cholas conquered in 894 AD to establish their imperial rule.',
      sec3P2: 'The Cholas were devoted Shaivites who erected numerous magnificent Shiva temples, celebrated by names such as Choleeswarar, Patteeswarar, Brihadisvarar, Magudeeswarar, and Pasupatheeswarar.',
      sec3P3: 'The temple stone masonry, architectural style, and antiquity point to Chola origins, with 894 AD regarded by tradition as its founding period, subject to continued archaeological and epigraphical verification.',
      
      sec4Title: '4. Significance of the Sacred Name Maragatheeswarar',
      sec4P1: 'The presiding deity is named Arulmigu Kalyana Maragatheeswarar. The natural stones of this hill resemble emerald gems (Maragatham) and attract iron particles due to their natural mineral properties.',
      sec4P2: 'Geological and mineralogy departments have been approached on multiple occasions to study the unique nature of these stone formations.',
      
      sec5Title: '5. Four Special Stories of the Temple',
      
      sec6Title: '6. Renovations by Pavadai Rayappa Gounder',
      sec6P1: 'In 1731 AD, local chieftain Pavadai Rayappa Gounder undertook extensive renovation of this temple through his personal devotion, physical effort, and material resources.',
      sec6P2: 'Following him, his hereditary descendants continued to maintain and serve the temple across generations.',
      timeline1: '1802 AD: The temple came under the administrative oversight of the British administration.',
      timeline2: '1846 AD: Hereditary trusteeship was formally conferred upon the descendants of Pavadai Rayappa Gounder.',
      timeline3: 'Post-1947: Following Indian Independence, the temple transitioned under the management of the HR&CE Department with government-appointed trustees.',
      
      sec7Title: '7. Deities Gracing the Temple',
      
      sec8Title: '8. Literary and Historical Significance',
      sec8P1: 'This sacred temple is praised in the Vellala Puranam and celebrated in hymns by classical Tamil poets.',
      sec8P2: 'Recent discoveries of stone inscriptions and historical artifacts are currently being analyzed in collaboration with epigraphists, archaeologists, and historians to publish a comprehensive temple chronicle.',
      
      conclusion: 'Arulmigu Kalyana Maragatheeswarar Temple of Munnur – Molapalayam stands as a sacred pilgrimage shrine embodying the ancient history of Kongu Nadu, chieftain governance, Chola architecture, noble renovations of Pavadai Rayappa Gounder, living legends, and the divine glory of Lord Shiva.',
    },

    poojaPage: {
      title: 'Poojas & Darshan Timings',
      subtitle: 'Confirmed daily darshan hours and sacred abhishekam services',
      darshanTimings: 'Daily Darshan Timings',
      confirmedTiming: '9:00 AM to 1:00 PM',
      timingNote: '* The temple remains open daily strictly from 9:00 AM to 1:00 PM. There is no evening darshan.',
      dailyScheduleTitle: 'Daily Morning Pooja Schedule',
      dailyScheduleNotice: '* Note: The temple is open from 9:00 AM to 1:00 PM. Poojas are conducted in adherence to Agama Shastras.',
      monthlySpecialTitle: 'Monthly & Auspicious Occasions',
      abhishekamTitle: 'Special Abhishekam & Archana Services',
      guidelinesTitle: 'Devotee Guidelines & Etiquette',
      poojaBookingTitle: 'Pooja Inquiry & Registration',
      poojaBookingSubtitle: 'Submit your prayer request or inquire about Archana, Abhishekam and Kalyana Utsavam',
    },

    festivalsPage: {
      title: 'Festivals & Celebrations',
      subtitle: 'Sacred annual festivals observed at Munnur Temple',
      chariotHeroTitle: 'Masi Magam Therottam',
      chariotHeroSubtitle: 'Annual Temple Chariot Festival',
      annualTitle: 'Masi Magam Mahotsavam & Chariot Festival',
      annualNotice: '* Festival schedules are aligned with the traditional Tamil Panchangam. Official dates are published by the temple administration.',
      shivaratriTitle: 'Maha Shivaratri Observance',
      pradoshamTitle: 'Pradosham Twilight Worship',
      specialShivaTitle: 'Special Shiva Utsavams',
      otherCelebrationsTitle: 'Celebrations for Other Deities',
      calendarNoteTitle: 'Note for Devotees',
      calendarNoteText: 'Confirmed schedules for upcoming festivals and Annadhanam are updated here and on temple notice boards. Festival dates are not arbitrarily created.',
    },

    galleryPage: {
      title: 'Photo Gallery',
      subtitle: 'Architectural grandeur and Masi Magam Therottam celebrations of Munnur Temple',
      all: 'All',
      chariot: 'Masi Magam Therottam',
      architecture: 'Temple Architecture',
      moolavar: 'Moolavar Maragatheeswarar',
      amman: 'Maragathavalli Amman',
      festivals: 'Festivals',
      celebrations: 'Special Poojas',
      close: 'Close',
      next: 'Next',
      prev: 'Previous',
      imageNotice: 'Devotees possessing historic or celebration photographs of the temple are welcome to share them with temple management.',
    },

    contactPage: {
      title: 'Contact & Location',
      subtitle: 'Location details, directions and contact information for pilgrimage planning',
      templeAddressTitle: 'Temple Address',
      phoneTitle: 'Temple Phone',
      emailTitle: 'Temple Email',
      timingsTitle: 'Daily Darshan Timings',
      confirmedTiming: '9:00 AM to 1:00 PM',
      noEveningTimingNote: 'Please note: There is no evening darshan. The temple is open only from 9:00 AM to 1:00 PM daily.',
      directionsTitle: 'Google Maps Directions',
      openMapsBtn: 'Open in Google Maps',
      formTitle: 'Inquiry & Feedback Form',
      formSubtitle: 'Send your queries regarding pooja bookings, seva opportunities, or temple visits',
      fullName: 'Your Full Name',
      emailAddress: 'Email Address',
      phoneNumber: 'Contact Phone Number',
      purpose: 'Subject / Purpose',
      purposeOptions: {
        general: 'General Inquiry',
        pooja: 'Pooja / Archana Booking',
        donation: 'Renovation / Seva Donation',
        feedback: 'Feedback / Suggestion',
      },
      message: 'Your Message',
      sendBtn: 'Submit Inquiry',
      howToReachTitle: 'How to Reach the Temple',
      byRoad: 'By Road',
      byBus: 'By Bus Services',
      byTrain: 'By Railway Station',
      byAir: 'By Nearest Airport',
    },
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('ta');

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'ta' ? 'en' : 'ta'));
  }, []);

  const t = useCallback(
    (key) => {
      const keys = key.split('.');
      let value = translations[language];
      for (const k of keys) {
        value = value?.[k];
      }
      return value || key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

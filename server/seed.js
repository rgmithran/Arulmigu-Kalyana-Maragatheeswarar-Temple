import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';
import Announcement from './models/Announcement.js';
import TempleSetting from './models/TempleSetting.js';
import PoojaBooking from './models/PoojaBooking.js';
import ContactMessage from './models/ContactMessage.js';

const seedData = async () => {
  try {
    await connectDB();

    console.log('[Seed] Checking initial temple records in MongoDB...');

    // 1. Settings
    const settingCount = await TempleSetting.countDocuments();
    if (settingCount === 0) {
      await TempleSetting.create({
        key: 'main_settings',
        annualFestivalDateTa: 'மாசி மகம் நன்னாள் (தேதி விரைவில் அறிவிக்கப்படும்)',
        annualFestivalDateEn: 'Masi Magam Auspicious Day (Date to be announced soon)',
        darshanTimingsTa: 'காலை 9:00 மணி முதல் மதியம் 1:00 மணி வரை (மாலை நடை கிடையாது)',
        darshanTimingsEn: 'Morning 9:00 AM to 1:00 PM (No evening darshan)',
        contactPhone: '+919585554005',
        contactEmail: 'kalyanamaragatheeswarar@gmail.com',
        templeAddressTa: 'அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில், முன்னூர் – மோளபாளையம், கரூர் மாவட்டம், தமிழ்நாடு 639111.',
        templeAddressEn: 'Arulmigu Kalyana Maragatheeswarar Temple, Munnur – Molapalayam, Karur District, Tamil Nadu 639111.',
        googleMapsUrl: 'https://maps.app.goo.gl/V97j6p94g5dF56iE6',
      });
      console.log('[Seed] Default temple settings created.');
    }

    // 2. Announcements
    const announcementCount = await Announcement.countDocuments();
    if (announcementCount === 0) {
      await Announcement.insertMany([
        {
          titleTa: 'மாசி மகம் பிரம்மோற்சவ பெருவிழா மற்றும் திருத்தேரோட்டம்',
          titleEn: 'Masi Magam Brahmotsavam and Holy Chariot Festival',
          contentTa: 'அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயிலின் வருடாந்திர மாசி மகம் தேர்த்திருவிழா வெகு விமரிசையாக நடைபெற உள்ளது. பக்தர்கள் அனைவரும் கலந்துகொண்டு இறைவனின் திருவருளைப் பெற வேண்டுகிறோம்.',
          contentEn: 'The annual Masi Magam Chariot festival of Arulmigu Kalyana Maragatheeswarar Temple will be celebrated in grand grandeur. All devotees are cordially invited.',
          badgeTa: 'முக்கிய திருவிழா',
          badgeEn: 'Grand Festival',
          category: 'festival',
          priority: 'urgent',
          eventDate: 'மாசி மகம் நன்னாள்',
          active: true,
        },
        {
          titleTa: 'மாதாந்திர பிரதோஷ கால சிறப்பு நந்தி அபிஷேகம்',
          titleEn: 'Monthly Pradosham Special Nandi Holy Abhishekam',
          contentTa: 'வளர்பிறை மற்றும் தேய்பிறை பிரதோஷ நன்னாட்களில் நந்தி எம்பெருமானுக்கும் மூலவருக்கும் சிறப்பு அபிஷேக ஆராதனைகள் நடைபெறும்.',
          contentEn: 'Special sacred abhishekam and archana are conducted for Lord Nandi and the Moolavar Lingam on Pradosham days.',
          badgeTa: 'சிறப்பு வழிபாடு',
          badgeEn: 'Special Pooja',
          category: 'pooja',
          priority: 'high',
          eventDate: 'ஒவ்வொரு பிரதோஷம்',
          active: true,
        },
        {
          titleTa: 'திருக்கோயில் தினசரி தரிசன நேர அறிவிப்பு',
          titleEn: 'Temple Daily Darshan Schedule Notice',
          contentTa: 'திருக்கோயில் தினசரி காலை 9:00 மணி முதல் மதியம் 1:00 மணி வரை மட்டுமே திறந்திருக்கும். மாலை நேரத்தில் நடை திறப்பு கிடையாது என்பதைப் பக்தர்கள் கவனத்தில் கொள்ளவும்.',
          contentEn: 'Please note the temple remains open daily exclusively from 9:00 AM to 1:00 PM. There is no evening darshan.',
          badgeTa: 'நேர அறிவிப்பு',
          badgeEn: 'Timings Notice',
          category: 'general',
          priority: 'normal',
          eventDate: 'தினசரி வழிபாடு',
          active: true,
        },
      ]);
      console.log('[Seed] Default announcements created.');
    }

    // 3. Sample pooja booking if none exists
    const bookingCount = await PoojaBooking.countDocuments();
    if (bookingCount === 0) {
      await PoojaBooking.create({
        devoteeName: 'கார்த்திகேயன் சுப்பிரமணியன் (Karthikeyan)',
        phone: '+919876543210',
        email: 'karthik@example.com',
        poojaType: 'rudrabhishekam',
        poojaNameTa: 'ருத்ராபிஷேகம் & வில்வ அர்ச்சனை',
        poojaNameEn: 'Rudrabhishekam & Vilva Archana',
        date: '2026-11-20',
        rasi: 'சிம்மம்',
        nakshatra: 'மகம்',
        message: 'திருமணத் தடை நீங்கி நல்ல இல்லறம் அமைய சிறப்பு சங்கல்பம் வேண்டுகிறேன்.',
        status: 'Confirmed',
        adminNotes: 'அர்ச்சகர் திரு. சிவாச்சாரியாருக்கு தகவல் தெரிவிக்கப்பட்டது.',
      });
      console.log('[Seed] Sample pooja booking created.');
    }

    // 4. Sample contact message if none exists
    const contactCount = await ContactMessage.countDocuments();
    if (contactCount === 0) {
      await ContactMessage.create({
        name: 'முருகேசன் (Murugesan)',
        phone: '+919443210987',
        email: 'murugan@example.com',
        purpose: 'pooja',
        message: 'ஞாயிற்றுக்கிழமைகளில் சிறப்பு அர்ச்சனை செய்ய விரும்புகிறேன். முன்பதிவு தேவையா?',
        status: 'Resolved',
        adminResponse: 'காலை 9 மணி முதல் 1 மணிக்குள் நேரில் வரலாம். தொலைபேசியிலும் தொடர்பு கொள்ளலாம்.',
      });
      console.log('[Seed] Sample contact message created.');
    }

    console.log('[Seed] Database initialization complete.');
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

import mongoose from 'mongoose';

const templeSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: 'main_settings',
    },
    annualFestivalDateTa: {
      type: String,
      default: 'மாசி மகம் நன்னாள் (தேதி விரைவில் அறிவிக்கப்படும்)',
    },
    annualFestivalDateEn: {
      type: String,
      default: 'Masi Magam Auspicious Day (Date to be announced soon)',
    },
    darshanTimingsTa: {
      type: String,
      default: 'காலை 9:00 மணி முதல் மதியம் 1:00 மணி வரை (மாலை நடை கிடையாது)',
    },
    darshanTimingsEn: {
      type: String,
      default: 'Morning 9:00 AM to 1:00 PM (No evening darshan)',
    },
    contactPhone: {
      type: String,
      default: '+919585554005',
    },
    contactEmail: {
      type: String,
      default: 'kalyanamaragatheeswarar@gmail.com',
    },
    templeAddressTa: {
      type: String,
      default: 'அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில், முன்னூர் – மோளபாளையம், கரூர் மாவட்டம், தமிழ்நாடு 639111.',
    },
    templeAddressEn: {
      type: String,
      default: 'Arulmigu Kalyana Maragatheeswarar Temple, Munnur – Molapalayam, Karur District, Tamil Nadu 639111.',
    },
    googleMapsUrl: {
      type: String,
      default: 'https://maps.app.goo.gl/V97j6p94g5dF56iE6',
    },
    emergencyNotice: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const TempleSetting = mongoose.model('TempleSetting', templeSettingSchema);
export default TempleSetting;

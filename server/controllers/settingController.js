import TempleSetting from '../models/TempleSetting.js';

// Get temple settings (darshan timings, annual festival date, etc.)
export const getSettings = async (req, res) => {
  try {
    let settings = await TempleSetting.findOne({ key: 'main_settings' });

    if (!settings) {
      settings = await TempleSetting.create({
        key: 'main_settings',
        annualFestivalDateTa: 'மாசி மகம் நன்னாள் (தேதி விரைவில் அறிவிக்கப்படும்)',
        annualFestivalDateEn: 'Masi Magam Auspicious Day (Date to be announced soon)',
        darshanTimingsTa: 'காலை 9:00 மணி முதல் மதியம் 1:00 மணி வரை (மாலை நடை கிடையாது)',
        darshanTimingsEn: 'Morning 9:00 AM to 1:00 PM (No evening darshan)',
        contactPhone: '+919585554005',
        contactEmail: 'kalyanamaragatheeswarar@gmail.com',
      });
    }

    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch settings.',
      error: error.message,
    });
  }
};

// Update temple settings
export const updateSettings = async (req, res) => {
  try {
    const updated = await TempleSetting.findOneAndUpdate(
      { key: 'main_settings' },
      { $set: req.body },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: 'Settings updated successfully.',
      data: updated,
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update settings.',
      error: error.message,
    });
  }
};

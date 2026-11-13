import Announcement from '../models/Announcement.js';

// Get active announcements for public frontend
export const getActiveAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({ active: true }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: announcements,
    });
  } catch (error) {
    console.error('Error fetching active announcements:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch announcements.',
      error: error.message,
    });
  }
};

// Get all announcements (for admin portal)
export const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: announcements,
    });
  } catch (error) {
    console.error('Error fetching all announcements:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch announcements.',
      error: error.message,
    });
  }
};

// Create new announcement
export const createAnnouncement = async (req, res) => {
  try {
    const {
      titleTa,
      titleEn,
      contentTa,
      contentEn,
      badgeTa,
      badgeEn,
      category,
      priority,
      eventDate,
      active,
    } = req.body;

    if (!titleTa || !contentTa) {
      return res.status(400).json({
        success: false,
        message: 'Tamil title and content are required.',
      });
    }

    const announcement = new Announcement({
      titleTa,
      titleEn: titleEn || titleTa,
      contentTa,
      contentEn: contentEn || contentTa,
      badgeTa: badgeTa || 'அறிவிப்பு',
      badgeEn: badgeEn || 'Announcement',
      category: category || 'general',
      priority: priority || 'normal',
      eventDate: eventDate || '',
      active: active !== undefined ? active : true,
    });

    const saved = await announcement.save();

    res.status(201).json({
      success: true,
      message: 'Announcement created successfully.',
      data: saved,
    });
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create announcement.',
      error: error.message,
    });
  }
};

// Update announcement
export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Announcement.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found.',
      });
    }

    res.json({
      success: true,
      message: 'Announcement updated successfully.',
      data: updated,
    });
  } catch (error) {
    console.error('Error updating announcement:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update announcement.',
      error: error.message,
    });
  }
};

// Delete announcement
export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Announcement.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found.',
      });
    }

    res.json({
      success: true,
      message: 'Announcement deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete announcement.',
      error: error.message,
    });
  }
};

import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema(
  {
    titleTa: {
      type: String,
      required: [true, 'Tamil title is required'],
      trim: true,
    },
    titleEn: {
      type: String,
      required: [true, 'English title is required'],
      trim: true,
    },
    contentTa: {
      type: String,
      required: [true, 'Tamil content is required'],
      trim: true,
    },
    contentEn: {
      type: String,
      required: [true, 'English content is required'],
      trim: true,
    },
    badgeTa: {
      type: String,
      default: 'அறிவிப்பு',
    },
    badgeEn: {
      type: String,
      default: 'Announcement',
    },
    category: {
      type: String,
      enum: ['festival', 'pooja', 'general', 'alert'],
      default: 'general',
    },
    priority: {
      type: String,
      enum: ['normal', 'high', 'urgent'],
      default: 'normal',
    },
    eventDate: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: true,
    },
    link: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Announcement = mongoose.model('Announcement', announcementSchema);
export default Announcement;

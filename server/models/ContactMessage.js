import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    inquiryId: {
      type: String,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Devotee name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    purpose: {
      type: String,
      required: [true, 'Purpose is required'],
      enum: ['general', 'pooja', 'donation', 'feedback', 'festival', 'other'],
      default: 'general',
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'In Review', 'Resolved'],
      default: 'New',
    },
    adminResponse: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

contactMessageSchema.pre('save', function () {
  if (!this.inquiryId) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    this.inquiryId = `KM-INQ-${dateStr}-${randomSuffix}`;
  }
});

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
export default ContactMessage;

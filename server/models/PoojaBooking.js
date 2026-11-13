import mongoose from 'mongoose';

const poojaBookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      index: true,
    },
    devoteeName: {
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
    poojaType: {
      type: String,
      required: [true, 'Pooja type is required'],
      trim: true,
    },
    poojaNameTa: {
      type: String,
      default: '',
    },
    poojaNameEn: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    rasi: {
      type: String,
      trim: true,
      default: '',
    },
    nakshatra: {
      type: String,
      trim: true,
      default: '',
    },
    message: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    adminNotes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate unique bookingId if not present
poojaBookingSchema.pre('save', function () {
  if (!this.bookingId) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    this.bookingId = `KM-PB-${dateStr}-${randomSuffix}`;
  }
});

const PoojaBooking = mongoose.model('PoojaBooking', poojaBookingSchema);
export default PoojaBooking;

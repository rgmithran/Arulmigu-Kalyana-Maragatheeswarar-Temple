import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    donationId: {
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
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [1, 'Amount must be greater than 0'],
    },
    cause: {
      type: String,
      default: 'annadhanam', // annadhanam, renovation, pooja_trust, general
    },
    paymentStatus: {
      type: String,
      enum: ['Pledged', 'Received'],
      default: 'Pledged',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

donationSchema.pre('save', function () {
  if (!this.donationId) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    this.donationId = `KM-DON-${dateStr}-${randomSuffix}`;
  }
});

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;

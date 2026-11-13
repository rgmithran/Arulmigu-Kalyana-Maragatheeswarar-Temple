import Donation from '../models/Donation.js';

export const createDonation = async (req, res) => {
  try {
    const { devoteeName, phone, email, amount, cause, notes } = req.body;

    if (!devoteeName || !phone || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Devotee name, phone, and amount are required.',
      });
    }

    const donation = new Donation({
      devoteeName,
      phone,
      email: email || '',
      amount: Number(amount),
      cause: cause || 'annadhanam',
      notes: notes || '',
    });

    const saved = await donation.save();

    res.status(201).json({
      success: true,
      message: 'Donation pledge recorded successfully. Temple trust thanks you!',
      data: saved,
    });
  } catch (error) {
    console.error('Error creating donation pledge:', error);
    res.status(500).json({
      success: false,
      message: 'Server error processing donation.',
      error: error.message,
    });
  }
};

export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: donations,
    });
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch donations.',
      error: error.message,
    });
  }
};

export const updateDonationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    const donation = await Donation.findByIdAndUpdate(
      id,
      { paymentStatus },
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation record not found.',
      });
    }

    res.json({
      success: true,
      message: 'Donation status updated.',
      data: donation,
    });
  } catch (error) {
    console.error('Error updating donation status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update donation.',
      error: error.message,
    });
  }
};

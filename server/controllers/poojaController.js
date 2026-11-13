import PoojaBooking from '../models/PoojaBooking.js';

const POOJA_NAME_MAP = {
  rudrabhishekam: {
    ta: 'ருத்ராபிஷேகம் & வில்வ அர்ச்சனை',
    en: 'Rudrabhishekam & Vilva Archana',
  },
  kalyanautsavam: {
    ta: 'திருக்கல்யாண உற்சவ சிறப்பு பூஜை',
    en: 'Kalyana Utsavam (Divine Wedding)',
  },
  pradosham: {
    ta: 'பிரதோஷ நந்தி வழிபாடு',
    en: 'Pradosham Special Pooja',
  },
  shankhabhishekam: {
    ta: '108 சங்காபிஷேகம்',
    en: '108 Shankhabhishekam',
  },
  vinayagar: {
    ta: 'மரகத விநாயகர் சதுர்த்தி அபிஷேகம்',
    en: 'Maragatha Vinayagar Special Pooja',
  },
  other: {
    ta: 'பிற சிறப்பு வழிபாடுகள்',
    en: 'Other Special Poojas',
  },
};

// Create a new pooja booking
export const createBooking = async (req, res) => {
  try {
    const { devoteeName, phone, email, poojaType, date, rasi, nakshatra, message } = req.body;

    if (!devoteeName || !phone || !poojaType) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone number, and pooja type are required.',
      });
    }

    const poojaInfo = POOJA_NAME_MAP[poojaType] || {
      ta: poojaType,
      en: poojaType,
    };

    const booking = new PoojaBooking({
      devoteeName,
      phone,
      email: email || '',
      poojaType,
      poojaNameTa: poojaInfo.ta,
      poojaNameEn: poojaInfo.en,
      date: date || '',
      rasi: rasi || '',
      nakshatra: nakshatra || '',
      message: message || '',
    });

    const saved = await booking.save();

    res.status(201).json({
      success: true,
      message: 'Pooja booking request submitted successfully.',
      data: saved,
    });
  } catch (error) {
    console.error('Error creating pooja booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting pooja booking.',
      error: error.message,
    });
  }
};

// Get all bookings (with search & filtering)
export const getBookings = async (req, res) => {
  try {
    const { status, search, limit = 50, page = 1 } = req.query;
    const filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { devoteeName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { bookingId: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [bookings, total] = await Promise.all([
      PoojaBooking.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      PoojaBooking.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: bookings,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching pooja bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching pooja bookings.',
      error: error.message,
    });
  }
};

// Lookup booking by reference ID or phone
export const lookupBooking = async (req, res) => {
  try {
    const { query } = req.params;
    const booking = await PoojaBooking.findOne({
      $or: [{ bookingId: query }, { phone: query }],
    }).sort({ createdAt: -1 });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'No booking found with this reference number or phone.',
      });
    }

    res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Error looking up booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving booking details.',
      error: error.message,
    });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const booking = await PoojaBooking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found.',
      });
    }

    if (status) booking.status = status;
    if (adminNotes !== undefined) booking.adminNotes = adminNotes;

    const updated = await booking.save();

    res.json({
      success: true,
      message: 'Booking status updated successfully.',
      data: updated,
    });
  } catch (error) {
    console.error('Error updating pooja booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating booking.',
      error: error.message,
    });
  }
};

// Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await PoojaBooking.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found.',
      });
    }

    res.json({
      success: true,
      message: 'Booking deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting pooja booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting booking.',
      error: error.message,
    });
  }
};

import ContactMessage from '../models/ContactMessage.js';

// Submit new contact / inquiry message
export const createContact = async (req, res) => {
  try {
    const { name, phone, email, purpose, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone number, and message are required.',
      });
    }

    const contact = new ContactMessage({
      name,
      phone,
      email: email || '',
      purpose: purpose || 'general',
      message,
    });

    const saved = await contact.save();

    res.status(201).json({
      success: true,
      message: 'Devotee message received successfully.',
      data: saved,
    });
  } catch (error) {
    console.error('Error submitting contact message:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while sending message.',
      error: error.message,
    });
  }
};

// Get all contact messages
export const getContacts = async (req, res) => {
  try {
    const { status, purpose, search, limit = 50, page = 1 } = req.query;
    const filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }
    if (purpose && purpose !== 'all') {
      filter.purpose = purpose;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { inquiryId: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [messages, total] = await Promise.all([
      ContactMessage.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      ContactMessage.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: messages,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts.',
      error: error.message,
    });
  }
};

// Update contact status
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminResponse } = req.body;

    const contact = await ContactMessage.findById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.',
      });
    }

    if (status) contact.status = status;
    if (adminResponse !== undefined) contact.adminResponse = adminResponse;

    const updated = await contact.save();

    res.json({
      success: true,
      message: 'Status updated successfully.',
      data: updated,
    });
  } catch (error) {
    console.error('Error updating contact status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating contact status.',
      error: error.message,
    });
  }
};

// Delete contact message
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ContactMessage.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.',
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting contact message.',
      error: error.message,
    });
  }
};

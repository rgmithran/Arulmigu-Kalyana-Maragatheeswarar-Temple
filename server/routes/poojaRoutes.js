import express from 'express';
import {
  createBooking,
  getBookings,
  lookupBooking,
  updateBookingStatus,
  deleteBooking,
} from '../controllers/poojaController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/', getBookings);
router.get('/lookup/:query', lookupBooking);
router.patch('/:id/status', updateBookingStatus);
router.delete('/:id', deleteBooking);

export default router;

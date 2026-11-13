import express from 'express';
import {
  createDonation,
  getDonations,
  updateDonationStatus,
} from '../controllers/donationController.js';

const router = express.Router();

router.post('/', createDonation);
router.get('/', getDonations);
router.patch('/:id/status', updateDonationStatus);

export default router;

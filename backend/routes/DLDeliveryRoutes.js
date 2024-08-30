import express from 'express';
import { submitDLDeliveryForm } from '../controllers/DLDeliveryController.js';

const router = express.Router();

// Route to submit the delivery form
router.post('/', submitDLDeliveryForm);

export default router;

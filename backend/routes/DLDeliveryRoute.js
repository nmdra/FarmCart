import express from 'express';
import { getAllDeliveries ,getDeliveryById} from '../controllers/DLDeliveryController.js';

const router = express.Router();

// Route to get all deliveries
router.get('/deliveries', getAllDeliveries);



// Route to get a single delivery by ID
router.get('/d/:id', getDeliveryById);

export default router;

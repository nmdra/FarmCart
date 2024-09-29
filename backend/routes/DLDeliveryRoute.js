import express from 'express';
import { getAllDeliveries ,getDeliveryById,getTotalDeliveries,getOngoingDeliveries} from '../controllers/DLDeliveryController.js';

const router = express.Router();

// Route to get all deliveries
router.get('/deliveries', getAllDeliveries);



// Route to get a single delivery by ID
router.get('/d/:id', getDeliveryById);



// Route to get the total deliveries count
router.get('/total/count', getTotalDeliveries);

// Route to get the ongoing deliveries count
router.get('/ongoing/count', getOngoingDeliveries);

export default router;

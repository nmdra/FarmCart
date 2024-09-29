import express from 'express';
import { getAllDeliveries ,getDeliveryById,getTotalDeliveries,getOngoingDeliveries,getOngoingDeliveriesByDriver,updateDeliveryStatus} from '../controllers/DLDeliveryController.js';

const router = express.Router();

// Route to get all deliveries
router.get('/deliveries', getAllDeliveries);



// Route to get a single delivery by ID
router.get('/d/:id', getDeliveryById);



// Route to get the total deliveries count
router.get('/total/count', getTotalDeliveries);

// Route to get the ongoing deliveries count
router.get('/ongoing/count', getOngoingDeliveries);


// Route to get ongoing deliveries assigned to a driver
router.get('/ongoing/:driverID', getOngoingDeliveriesByDriver);

// Route to update delivery status
router.put('/:deliveryId/status', updateDeliveryStatus);


export default router;

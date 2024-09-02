import express from 'express';
import {
    addDriver,
    getDriverById,
    updateDriverById,
    deleteDriverById,
} from '../controllers/DLDriverController.js';

const router = express.Router();

router.post('/addDriver/:id', addDriver);
// Route to get a driver by ID
router.get('/get/:id', getDriverById);

// Route to update a driver by ID
router.put('/update/:id', updateDriverById);

// Route to delete a driver by ID
router.delete('/delete/:id', deleteDriverById);

export default router;
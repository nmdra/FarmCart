import express from 'express';
import {
    addDriver,
    getDriverById,
    updateDriverById,
    deleteDriverById,
    loginDriver,
    getDriverProfile,
    updateAvailability,
    logoutDriver,        // Add logout driver function
} from '../controllers/DLDriverController.js';

import { protectDriver } from '../middlewares/DLauthMiddleware.js';

const router = express.Router();

// Route for driver login
router.post('/login', loginDriver);

router.post('/addDriver/:id', addDriver);
// Route to get a driver by ID
router.get('/get/:id', getDriverById);

// Route to update a driver by ID
router.put('/update/:id', updateDriverById);

// Route to delete a driver by ID
router.delete('/delete/:id', deleteDriverById);

router.get('/profile', protectDriver, getDriverProfile);

// Route to logout the driver
router.post('/logout', logoutDriver);  // Add logout route

// Route to toggle the driver's availability
router.put('/availability', protectDriver, updateAvailability);  // Add toggle availability route


export default router;
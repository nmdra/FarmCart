import express from 'express'
import {
    addDriver,
    getDriverById,
    updateDriverById,
    deleteDriverById,
    loginDriver,
    getDriverProfile,
    updateDriverAvailability,
    logoutDriver,
    updateDriverProfile,
    updateDriverPassword,
    deleteDriverAccount,
    getAllDrivers,
    verifyPassword,
    getDriversCount,
    getAvailableDriversCount,
    checkNicPassword,

    // Add logout driver function
} from '../controllers/DLDriverController.js'

import { protectDriver } from '../middlewares/DLauthMiddleware.js'

const router = express.Router()

// Route for driver login
router.post('/login', loginDriver)

router.post('/addDriver/:id', addDriver)

// Route to get a driver by ID
router.get('/get/:id', getDriverById)

// Route to update a driver by ID
router.put('/update/:id', updateDriverById)

// Route to delete a driver by ID
router.delete('/delete/:id', deleteDriverById)

router
    .route('/profile')
    .get(protectDriver, getDriverProfile) // GET profile
    .put(protectDriver, updateDriverProfile) // PUT (update) profile

// Route to logout the driver
router.post('/logout', logoutDriver) // Add logout route

// Route to toggle the driver's availability

router.put('/:id/availability', protectDriver, updateDriverAvailability)

router.put('/profile/password', protectDriver, updateDriverPassword)

router.delete('/delete', protectDriver, deleteDriverAccount)

router.delete('/verifyPass', protectDriver, verifyPassword)

router.get('/drivers', getAllDrivers)

// Route to get the total number of drivers
router.get('/count', getDriversCount)

// Route to get the number of available drivers
router.get('/available/count', getAvailableDriversCount)

router.get('/nic-password-check', protectDriver, checkNicPassword)

export default router

import express from 'express'
import {
    registerFarmer,
    authFarmer,
    getFarmerProfile,
    updateFarmerProfile,
    logoutFarmer,
    deleteFarmerAccount,
    getFarmerById,
    getAllFarmers,
    getFarmersCount,
} from '../controllers/farmerController.js'
import { protect } from '../middlewares/farmerauthMiddleware.js'

const router = express.Router()

// Register a new farmer
router.post('/register', registerFarmer)

router.get('/', getAllFarmers)
router.get('/count', getFarmersCount)

// Authenticate farmer and get token
router.post('/login', authFarmer)

// Logout farmer (clear token)
router.post('/logout', logoutFarmer)

// Get or update farmer's profile
router
    .route('/profile')
    .get(protect, getFarmerProfile) // Fetch farmer's profile
    .put(protect, updateFarmerProfile) // Update farmer's profile

// Delete farmer's account
router.delete('/profile', protect, deleteFarmerAccount)

// Get farmer by ID (for admin or public access)
router.get('/:id', protect, getFarmerById)

export default router

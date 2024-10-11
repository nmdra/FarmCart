import express from 'express'
import {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    validateUserPassword,
    getUserCount,
} from '../../controllers/Admin/AcustomerController.js'

const router = express.Router()

router.get('/count', getUserCount)

// Get all users
router.get('/', getAllUsers)

// Get single user by ID
router.get('/:id', getUserById)

// Update user by ID
router.put('/:id', updateUserById)

// Delete user by ID
router.delete('/:id', deleteUserById)

// Validate password for a user (email + password)
router.post('/validate-password', validateUserPassword)

export default router

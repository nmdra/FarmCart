import express from 'express'
import {
    createCCM,
    getAllCCMs,
    getCCMById,
    updateCCM,
    deleteCCM,
} from '../../controllers/Help/ccmController.js'

const router = express.Router()

// Create a new Customer Care Manager
router.post('/', createCCM)

// Get all Customer Care Managers
router.get('/', getAllCCMs)

// Get a specific Customer Care Manager by ID
router.get('/:id', getCCMById)

// Update a Customer Care Manager
router.put('/:id', updateCCM)

// Delete a Customer Care Manager
router.delete('/:id', deleteCCM)

export default router

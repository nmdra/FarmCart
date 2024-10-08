import express from 'express'
import {
    getAllStaff,
    getStaffById,
    addStaffMember,
    updateStaffMember,
    deleteStaffMember,
    getRoleOptions,
    getStaffCount,
} from '../../controllers/Admin/AstaffController.js'

const router = express.Router()

// Fetch all staff members
router.get('/', getAllStaff)
router.get('/count', getStaffCount)

// Fetch a single staff member by ID
router.get('/:id', getStaffById)

// Add a new staff member
router.post('/', addStaffMember)

// Update a staff member by ID
router.put('/:id', updateStaffMember)

// Delete a staff member by ID
router.delete('/:id', deleteStaffMember)

router.get('/email-options', getRoleOptions)

export default router

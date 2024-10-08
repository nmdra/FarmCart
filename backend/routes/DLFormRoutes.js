import express from 'express'
import {
    submitDLDeliveryForm,
    getPendingForms,
    getDeliveryFormById,
    updateDeliveryFormStatus,
    updateDeliveryForm,
    deleteDeliveryForm,
    getPendingFormsCount,
} from '../controllers/DLDriverFormController.js'
import upload from '../utils/DLMulter.js'

const router = express.Router()

// Route to submit the delivery form with images
router.post(
    '/',
    upload.fields([
        { name: 'idCardImage', maxCount: 1 },
        { name: 'licenseImage', maxCount: 1 },
        { name: 'personalImage', maxCount: 1 },
    ]),
    submitDLDeliveryForm
)

// Route to get all pending forms
router.get('/pending-forms', getPendingForms)

// Add the new route to get the pending forms count
router.get('/pending-forms/count', getPendingFormsCount)

// Route to get a specific delivery form by ID
router.get('/:id', getDeliveryFormById)

// Route to update the status of a delivery form (approve or reject)
router.put('/:id/status', updateDeliveryFormStatus)

// Route to update a delivery form by ID
router.put('/edit/:id', updateDeliveryForm)

// Route to delete a delivery form by ID
router.delete('/remove/:id', deleteDeliveryForm)

export default router

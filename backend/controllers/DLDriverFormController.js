import asyncHandler from 'express-async-handler'
import DLDeliveryForm from '../models/DLDeliveryFormModel.js'

// Function to submit a delivery form
// Function to submit a delivery form
const submitDLDeliveryForm = asyncHandler(async (req, res) => {
    const {
        firstName,
        lastName,
        fullName,
        email,
        phone,
        dateOfBirth,
        idCardNumber,
        licenseCardNumber,
        address,
        vehicleNumber,
        vehicleType,
        idCardImageUrl, // Image URLs passed from front-end
        licenseImageUrl, // Image URLs passed from front-end
        personalImageUrl, // Image URLs passed from front-end
    } = req.body

    // Check if a form with the same email already exists
    const existingForm = await DLDeliveryForm.findOne({ email })

    if (existingForm) {
        res.status(400).json({
            message: 'A form with this email already exists',
        })
        return
    }

    // Create and save the delivery form
    const deliveryForm = await DLDeliveryForm.create({
        firstName,
        lastName,
        fullName,
        email,
        phone,
        dateOfBirth,
        idCardNumber,
        licenseCardNumber,
        address,
        vehicleNumber,
        vehicleType,
        idCardImageUrl, // Directly saving the image URL passed from front-end
        licenseImageUrl, // Directly saving the image URL passed from front-end
        personalImageUrl, // Directly saving the image URL passed from front-end
    })

    // Respond with success message and saved form
    res.status(201).json({
        message: 'Form submitted successfully',
        deliveryForm,
    })
})

// Function to get all pending forms
const getPendingForms = asyncHandler(async (req, res) => {
    const pendingForms = await DLDeliveryForm.find({ status: 'Pending' })

    // Instead of returning a 404, return an empty array with status 200
    res.status(200).json(pendingForms)
})

// Function to get a specific delivery form by ID
const getDeliveryFormById = asyncHandler(async (req, res) => {
    const deliveryForm = await DLDeliveryForm.findById(req.params.id)

    if (deliveryForm) {
        res.json(deliveryForm)
    } else {
        res.status(404).json({ message: 'Delivery form not found' })
    }
})

// Function to update the status of a delivery form (approve or reject)
const updateDeliveryFormStatus = asyncHandler(async (req, res) => {
    const deliveryForm = await DLDeliveryForm.findById(req.params.id)

    if (deliveryForm) {
        deliveryForm.status = req.body.status // 'Approved' or 'Rejected'
        await deliveryForm.save()
        res.json({ message: `Form status updated to ${req.body.status}` })
    } else {
        res.status(404).json({ message: 'Delivery form not found' })
    }
})

// Function to update a delivery form by ID
const updateDeliveryForm = asyncHandler(async (req, res) => {
    const deliveryForm = await DLDeliveryForm.findById(req.params.id)

    if (deliveryForm) {
        const updatedForm = await DLDeliveryForm.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json({
            message: 'Form updated successfully',
            updatedForm,
        })
    } else {
        res.status(404).json({ message: 'Delivery form not found' })
    }
})

// Function to delete a delivery form by ID
const deleteDeliveryForm = asyncHandler(async (req, res) => {
    const deliveryForm = await DLDeliveryForm.findById(req.params.id)

    if (deliveryForm) {
        await deliveryForm.remove()
        res.json({ message: 'Delivery form deleted successfully' })
    } else {
        res.status(404).json({ message: 'Delivery form not found' })
    }
})

// Function to get the count of pending forms
const getPendingFormsCount = asyncHandler(async (req, res) => {
    const pendingFormsCount = await DLDeliveryForm.countDocuments({
        status: 'Pending',
    })

    res.json({ count: pendingFormsCount })
})

export {
    submitDLDeliveryForm,
    getPendingForms,
    getDeliveryFormById,
    updateDeliveryFormStatus,
    updateDeliveryForm,
    deleteDeliveryForm,
    getPendingFormsCount,
}

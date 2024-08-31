import asyncHandler from 'express-async-handler';
import DLDeliveryForm from '../models/DLDeliveryFormModel.js';

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
    } = req.body;

    // Check if a form with the same email already exists
    const existingForm = await DLDeliveryForm.findOne({ email });

    if (existingForm) {
        res.status(400).json({ message: 'A form with this email already exists' });
        return;
    }

    // Save the images
    const idCardImageUrl = req.files['idCardImage'][0].path;
    const licenseImageUrl = req.files['licenseImage'][0].path;
    const personalImageUrl = req.files['personalImage'][0].path;

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
        idCardImageUrl,
        licenseImageUrl,
        personalImageUrl,
    });

    res.status(201).json({
        message: 'Form submitted successfully',
        deliveryForm,
    });
});

// Function to get all pending forms
const getPendingForms = asyncHandler(async (req, res) => {
    const pendingForms = await DLDeliveryForm.find({ status: 'Pending' });

    if (pendingForms.length > 0) {
        res.json(pendingForms);
    } else {
        res.status(404).json({ message: 'No pending forms found' });
    }
});

// Function to get a specific delivery form by ID
const getDeliveryFormById = asyncHandler(async (req, res) => {
    const deliveryForm = await DLDeliveryForm.findById(req.params.id);

    if (deliveryForm) {
        res.json(deliveryForm);
    } else {
        res.status(404).json({ message: 'Delivery form not found' });
    }
});

// Function to update the status of a delivery form (approve or reject)
const updateDeliveryFormStatus = asyncHandler(async (req, res) => {
    const deliveryForm = await DLDeliveryForm.findById(req.params.id);

    if (deliveryForm) {
        deliveryForm.status = req.body.status; // 'Approved' or 'Rejected'
        await deliveryForm.save();
        res.json({ message: `Form status updated to ${req.body.status}` });
    } else {
        res.status(404).json({ message: 'Delivery form not found' });
    }
});

// Function to update a delivery form by ID
const updateDeliveryForm = asyncHandler(async (req, res) => {
    const deliveryForm = await DLDeliveryForm.findById(req.params.id);

    if (deliveryForm) {
        const updatedForm = await DLDeliveryForm.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({
            message: 'Form updated successfully',
            updatedForm,
        });
    } else {
        res.status(404).json({ message: 'Delivery form not found' });
    }
});

// Function to delete a delivery form by ID
const deleteDeliveryForm = asyncHandler(async (req, res) => {
    const deliveryForm = await DLDeliveryForm.findById(req.params.id);

    if (deliveryForm) {
        await deliveryForm.remove();
        res.json({ message: 'Delivery form deleted successfully' });
    } else {
        res.status(404).json({ message: 'Delivery form not found' });
    }
});

export { submitDLDeliveryForm, getPendingForms, getDeliveryFormById, updateDeliveryFormStatus, updateDeliveryForm, deleteDeliveryForm };

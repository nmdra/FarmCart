import asyncHandler from 'express-async-handler';
import DLDeliveryForm from '../models/DLDeliveryFormModel.js';

// Define the submitDLDeliveryForm function
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
    });

    res.status(201).json({
        message: 'Form submitted successfully',
        deliveryForm,
    });
});

// Ensure the function is exported correctly
export { submitDLDeliveryForm };

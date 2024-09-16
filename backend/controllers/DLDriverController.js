import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import DLDriver from '../models/DLDriverModel.js';
import DLDeliveryForm from '../models/DLDeliveryFormModel.js';


const addDriver = asyncHandler(async (req, res) => {
    const deliveryForm = await DLDeliveryForm.findById(req.params.id);

    if (deliveryForm) {
        const hashedPassword = await bcrypt.hash(deliveryForm.idCardNumber, 10);

        const driver = new DLDriver({
            firstName: deliveryForm.firstName,
            lastName: deliveryForm.lastName,
            fullName: deliveryForm.fullName,
            email: deliveryForm.email,
            phone: deliveryForm.phone,
            dateOfBirth: deliveryForm.dateOfBirth,
            idCardNumber: deliveryForm.idCardNumber,
            licenseCardNumber: deliveryForm.licenseCardNumber,
            address: deliveryForm.address,
            vehicleNumber: deliveryForm.vehicleNumber,
            vehicleType: deliveryForm.vehicleType,
            password: hashedPassword, // Store the hashed ID card number as the password
            idCardImageUrl: deliveryForm.idCardImageUrl, // Store the ID card image URL
            licenseImageUrl: deliveryForm.licenseImageUrl, // Store the license image URL
            personalImageUrl: deliveryForm.personalImageUrl, // Store the personal image URL
        });

        await driver.save();

        res.status(201).json({ message: 'Driver approved and added to the system' });
    } else {
        res.status(404).json({ message: 'Delivery form not found' });
    }
});

// Example file: controllers/driverController.js

// Define the function


// Get driver by ID
const getDriverById = asyncHandler(async (req, res) => {
    const driver = await DLDriver.findById(req.params.id);

    if (driver) {
        res.json(driver);
    } else {
        res.status(404).json({ message: 'Driver not found' });
    }
});

// Update driver by ID
const updateDriverById = asyncHandler(async (req, res) => {
    const driver = await DLDriver.findById(req.params.id);

    if (driver) {
        driver.firstName = req.body.firstName || driver.firstName;
        driver.lastName = req.body.lastName || driver.lastName;
        driver.fullName = req.body.fullName || driver.fullName;
        driver.email = req.body.email || driver.email;
        driver.phone = req.body.phone || driver.phone;
        driver.dateOfBirth = req.body.dateOfBirth || driver.dateOfBirth;
        driver.idCardNumber = req.body.idCardNumber || driver.idCardNumber;
        driver.licenseCardNumber = req.body.licenseCardNumber || driver.licenseCardNumber;
        driver.address = req.body.address || driver.address;
        driver.vehicleNumber = req.body.vehicleNumber || driver.vehicleNumber;
        driver.vehicleType = req.body.vehicleType || driver.vehicleType;
        driver.isAvailable = req.body.isAvailable !== undefined ? req.body.isAvailable : driver.isAvailable;
        driver.idCardImageUrl = req.body.idCardImageUrl || driver.idCardImageUrl;
        driver.licenseImageUrl = req.body.licenseImageUrl || driver.licenseImageUrl;
        driver.personalImageUrl = req.body.personalImageUrl || driver.personalImageUrl;

        // If a new password is provided, hash it before saving
        if (req.body.password) {
            driver.password = await bcrypt.hash(req.body.password, 10);
        }

        const updatedDriver = await driver.save();

        res.json({ message: 'Driver updated successfully', driver: updatedDriver });
    } else {
        res.status(404).json({ message: 'Driver not found' });
    }
});

// Delete driver by ID
const deleteDriverById = asyncHandler(async (req, res) => {
    const driver = await DLDriver.findById(req.params.id);

    if (driver) {
        await driver.deleteOne(); // Use deleteOne instead of remove
        res.json({ message: 'Driver deleted successfully' });
    } else {
        res.status(404).json({ message: 'Driver not found' });
    }
});






export { addDriver, getDriverById, updateDriverById, deleteDriverById };

import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import DLDriver from '../models/DLDriverModel.js';
import DLDeliveryForm from '../models/DLDeliveryFormModel.js';
import { generateToken } from '../utils/dlgenerateToken.js';

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


// Driver Login
// Driver Login
const loginDriver = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    // Find driver by email
    const driver = await DLDriver.findOne({ email });

    if (driver && (await bcrypt.compare(password, driver.password))) {
        // Generate JWT token and return it
        const token = generateToken(driver._id);
        res.status(200).json({
            _id: driver._id,
            fullName: driver.fullName,
            email: driver.email,
            vehicleType: driver.vehicleType,
            isAvailable: driver.isAvailable,
            token, // Send the token in the response
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});


// Get Driver Profile
const getDriverProfile = asyncHandler(async (req, res) => {
    const driver = await DLDriver.findById(req.driver._id).select('-password'); // Exclude password

    if (driver) {
        res.json(driver);
    } else {
        res.status(404).json({ message: 'Driver not found' });
    }
});

// Toggle driver's availability
const updateAvailability = asyncHandler(async (req, res) => {
    const driver = await DLDriver.findById(req.driver._id);

    if (driver) {
        driver.isAvailable = req.body.isAvailable;
        const updatedDriver = await driver.save();
        res.json({
            message: 'Availability updated successfully',
            isAvailable: updatedDriver.isAvailable,
        });
    } else {
        res.status(404).json({ message: 'Driver not found' });
    }
});

// Logout driver
const logoutDriver = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: 'Logged out successfully' });
};

export { addDriver, getDriverById, updateDriverById, deleteDriverById , loginDriver, getDriverProfile, logoutDriver, updateAvailability };

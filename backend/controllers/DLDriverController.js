import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import DLDriver from '../models/DLDriverModel.js'
import DLDeliveryForm from '../models/DLDeliveryFormModel.js'
import { generateToken } from '../utils/dlgenerateToken.js'

// Function to generate a unique driverID starting with "D" and followed by a 6-digit number
const generateDriverID = async () => {
    let isUnique = false
    let driverID

    while (!isUnique) {
        // Generate a random 6-digit number
        const randomID = Math.floor(100000 + Math.random() * 900000) // Ensures a 6-digit number
        driverID = `D${randomID}` // Prefix the number with "D"

        // Check if the generated driverID already exists in the database
        const existingDriver = await DLDriver.findOne({ driverID })

        // If no existing driver is found, the driverID is unique
        if (!existingDriver) {
            isUnique = true
        }
    }

    return driverID
}

const addDriver = asyncHandler(async (req, res) => {
    const deliveryForm = await DLDeliveryForm.findById(req.params.id)

    if (deliveryForm) {
        const hashedPassword = await bcrypt.hash(deliveryForm.idCardNumber, 10)

        // Generate the unique driverID
        const driverID = await generateDriverID()

        const driver = new DLDriver({
            driverID, // Add the unique driverID
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
        })

        await driver.save()

        res.status(201).json({
            message: 'Driver approved and added to the system',
            driverID,
        })
    } else {
        res.status(404).json({ message: 'Delivery form not found' })
    }
})

// Example file: controllers/driverController.js

// Define the function

// Get driver by ID
const getDriverById = asyncHandler(async (req, res) => {
    const driver = await DLDriver.findById(req.params.id)

    if (driver) {
        res.json(driver)
    } else {
        res.status(404).json({ message: 'Driver not found' })
    }
})

// Update driver by ID
const updateDriverById = asyncHandler(async (req, res) => {
    const driver = await DLDriver.findById(req.params.id)

    if (driver) {
        driver.firstName = req.body.firstName || driver.firstName
        driver.lastName = req.body.lastName || driver.lastName
        driver.fullName = req.body.fullName || driver.fullName
        driver.email = req.body.email || driver.email
        driver.phone = req.body.phone || driver.phone
        driver.dateOfBirth = req.body.dateOfBirth || driver.dateOfBirth
        driver.idCardNumber = req.body.idCardNumber || driver.idCardNumber
        driver.licenseCardNumber =
            req.body.licenseCardNumber || driver.licenseCardNumber
        driver.address = req.body.address || driver.address
        driver.vehicleNumber = req.body.vehicleNumber || driver.vehicleNumber
        driver.vehicleType = req.body.vehicleType || driver.vehicleType
        driver.isAvailable =
            req.body.isAvailable !== undefined
                ? req.body.isAvailable
                : driver.isAvailable
        driver.idCardImageUrl = req.body.idCardImageUrl || driver.idCardImageUrl
        driver.licenseImageUrl =
            req.body.licenseImageUrl || driver.licenseImageUrl
        driver.personalImageUrl =
            req.body.personalImageUrl || driver.personalImageUrl

        // If a new password is provided, hash it before saving
        if (req.body.password) {
            driver.password = await bcrypt.hash(req.body.password, 10)
        }

        const updatedDriver = await driver.save()

        res.json({
            message: 'Driver updated successfully',
            driver: updatedDriver,
        })
    } else {
        res.status(404).json({ message: 'Driver not found' })
    }
})

// Delete driver by ID
const deleteDriverById = asyncHandler(async (req, res) => {
    const driver = await DLDriver.findById(req.params.id)

    if (driver) {
        await driver.deleteOne() // Use deleteOne instead of remove
        res.json({ message: 'Driver deleted successfully' })
    } else {
        res.status(404).json({ message: 'Driver not found' })
    }
})

// getting all the drivers

const getAllDrivers = asyncHandler(async (req, res) => {
    const drivers = await DLDriver.find({}) // Find all drivers
    res.json(drivers)
})

// Driver Login
// Driver Login
const loginDriver = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Find driver by email
    const driver = await DLDriver.findOne({ email })

    if (driver && (await bcrypt.compare(password, driver.password))) {
        // Generate JWT token and return it
        const token = generateToken(driver._id)
        res.status(200).json({
            _id: driver._id,
            fullName: driver.fullName,
            email: driver.email,
            vehicleType: driver.vehicleType,
            isAvailable: driver.isAvailable,
            token, // Send the token in the response
        })
    } else {
        res.status(401).json({ message: 'Invalid email or password' })
    }
})

// Get Driver Profile
const getDriverProfile = asyncHandler(async (req, res) => {
    const driver = await DLDriver.findById(req.driver._id).select('-password') // Exclude password

    if (driver) {
        res.json({
            _id: driver._id,
            driverID: driver.driverID,
            firstName: driver.firstName,
            lastName: driver.lastName,
            fullName: driver.fullName, // Ensure fullName is returned
            email: driver.email,
            phone: driver.phone,
            dateOfBirth: driver.dateOfBirth,
            address: driver.address,
            vehicleNumber: driver.vehicleNumber,
            vehicleType: driver.vehicleType,
            idCardNumber: driver.idCardNumber, // Ensure idCardNumber is returned
            licenseCardNumber: driver.licenseCardNumber, // Ensure licenseCardNumber is returned
            idCardImageUrl: driver.idCardImageUrl,
            licenseImageUrl: driver.licenseImageUrl,
            personalImageUrl: driver.personalImageUrl,
            isAvailable: driver.isAvailable,
        })
    } else {
        res.status(404)
        throw new Error('Driver not found')
    }
})

// Toggle driver's availability

const updateDriverAvailability = asyncHandler(async (req, res) => {
    const driver = await DLDriver.findById(req.params.id)

    if (driver) {
        driver.isAvailable = req.body.isAvailable
        await driver.save()
        res.json({
            message: 'Driver availability updated',
            isAvailable: driver.isAvailable,
        })
    } else {
        res.status(404).json({ message: 'Driver not found' })
    }
})

const updateDriverProfile = asyncHandler(async (req, res) => {
    const driver = await DLDriver.findById(req.driver._id)

    if (driver) {
        driver.firstName = req.body.firstName || driver.firstName
        driver.lastName = req.body.lastName || driver.lastName
        driver.email = req.body.email || driver.email
        driver.phone = req.body.phone || driver.phone
        driver.dateOfBirth = req.body.dateOfBirth || driver.dateOfBirth
        driver.address = req.body.address || driver.address
        driver.vehicleNumber = req.body.vehicleNumber || driver.vehicleNumber
        driver.vehicleType = req.body.vehicleType || driver.vehicleType
        driver.idCardImageUrl = req.body.idCardImageUrl || driver.idCardImageUrl
        driver.licenseImageUrl =
            req.body.licenseImageUrl || driver.licenseImageUrl
        driver.personalImageUrl =
            req.body.personalImageUrl || driver.personalImageUrl

        const updatedDriver = await driver.save()

        res.json({
            _id: updatedDriver._id,
            driverID: updatedDriver.driverID,
            firstName: updatedDriver.firstName,
            lastName: updatedDriver.lastName,
            email: updatedDriver.email,
            phone: updatedDriver.phone,
            dateOfBirth: updatedDriver.dateOfBirth,
            address: updatedDriver.address,
            vehicleNumber: updatedDriver.vehicleNumber,
            vehicleType: updatedDriver.vehicleType,
            idCardImageUrl: updatedDriver.idCardImageUrl,
            licenseImageUrl: updatedDriver.licenseImageUrl,
            personalImageUrl: updatedDriver.personalImageUrl,
        })
    } else {
        res.status(404)
        throw new Error('Driver not found')
    }
})

// Logout driver
const logoutDriver = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })

    res.status(200).json({ message: 'Logged out successfully' })
}

// Update driver password
const updateDriverPassword = asyncHandler(async (req, res) => {
    const driver = await DLDriver.findById(req.driver._id)

    if (driver) {
        const { currentPassword, newPassword, confirmPassword } = req.body

        // Check if current password matches
        const isMatch = await bcrypt.compare(currentPassword, driver.password)
        if (!isMatch) {
            res.status(401)
            throw new Error('Current password is incorrect')
        }

        // Check if new and confirm password match
        if (newPassword !== confirmPassword) {
            res.status(400)
            throw new Error('New passwords do not match')
        }

        // Hash new password
        driver.password = await bcrypt.hash(newPassword, 10)
        await driver.save()

        res.json({ message: 'Password updated successfully' })
    } else {
        res.status(404)
        throw new Error('Driver not found')
    }
})

const deleteDriverAccount = asyncHandler(async (req, res) => {
    const driver = await DLDriver.findById(req.driver._id)

    if (driver) {
        await driver.deleteOne() // Use deleteOne to delete the driver
        res.json({ message: 'Driver account deleted successfully' })
    } else {
        res.status(404)
        throw new Error('Driver not found')
    }
})

//verify the password
const verifyPassword = async (req, res) => {
    try {
        const driver = await DLDriver.findById(req.driver._id) // Assuming driver is authenticated

        if (!driver) {
            res.status(404).json({ message: 'Driver not found' })
            return
        }

        const isMatch = await bcrypt.compare(req.body.password, driver.password) // Compare the password

        if (isMatch) {
            res.json({ isValid: true }) // Password is valid
        } else {
            res.status(400).json({ message: 'Invalid password' }) // Password does not match
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

// Example: Endpoint to get total drivers count
const getDriversCount = asyncHandler(async (req, res) => {
    const count = await DLDriver.countDocuments({})
    res.json({ count })
})

// Example: Endpoint to get available drivers count
const getAvailableDriversCount = asyncHandler(async (req, res) => {
    const count = await DLDriver.countDocuments({ isAvailable: true })
    res.json({ count })
})

// Add this function to check if NIC number and password are equal
export const checkNicPassword = asyncHandler(async (req, res) => {
    const driver = await DLDriver.findById(req.driver._id)

    if (driver) {
        // Compare the NIC number (idCardNumber) and password
        const isMatch = await bcrypt.compare(
            driver.idCardNumber,
            driver.password
        )
        if (isMatch) {
            res.json({ nicMatchesPassword: true }) // If they are the same
        } else {
            res.json({ nicMatchesPassword: false }) // If they are different
        }
    } else {
        res.status(404).json({ message: 'Driver not found' })
    }
})

export { getDriversCount, getAvailableDriversCount }

export {
    addDriver,
    deleteDriverAccount,
    updateDriverPassword,
    updateDriverAvailability,
    getDriverById,
    updateDriverById,
    deleteDriverById,
    loginDriver,
    getDriverProfile,
    logoutDriver,
    updateDriverProfile,
    verifyPassword,
    getAllDrivers,
}

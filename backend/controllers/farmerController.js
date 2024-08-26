import asyncHandler from '../middlewares/asyncHandler.js'
import Farmer from '../models/farmerModel.js'
import { generateToken } from '../utils/genrateToken.js'

// @desc    Register a new farmer
// @route   POST /api/farmers/register
// @access  Public
const registerFarmer = asyncHandler(async (req, res) => {
    const { name, BirthDay, NIC, Address, email, contactNumber, password } =
        req.body

    // Check if all required fields are provided
    if (
        !name ||
        !BirthDay ||
        !NIC ||
        !Address ||
        !email ||
        !contactNumber ||
        !password
    ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check if the farmer already exists by email
    try {
        const farmerByEmail = await Farmer.findOne({ email })
        if (farmerByEmail) {
            return res
                .status(400)
                .json({ message: 'Farmer with this email already exists' })
        }
    } catch (error) {
        console.error('Error checking email:', error)
        return res
            .status(500)
            .json({ message: 'Error checking email', error: error.message })
    }

    // Check if the farmer already exists by NIC
    try {
        const farmerByNIC = await Farmer.findOne({ NIC })
        if (farmerByNIC) {
            return res
                .status(400)
                .json({ message: 'Farmer with this NIC already exists' })
        }
    } catch (error) {
        console.error('Error checking NIC:', error)
        return res
            .status(500)
            .json({ message: 'Error checking NIC', error: error.message })
    }

    // Create a new Farmer
    const farmer = await Farmer.create({
        name,
        BirthDay,
        NIC,
        Address,
        email,
        contactNumber,
        password,
    })

    // Generate and set token in cookie
    generateToken(res, farmer._id)

    // Respond with the farmer details and token
    res.status(201).json({
        _id: farmer._id,
        name: farmer.name,
        BirthDay: farmer.BirthDay,
        NIC: farmer.NIC,
        Address: farmer.Address,
        email: farmer.email,
        contactNumber: farmer.contactNumber,
        token: generateToken(res, farmer._id), // Include token in the response
    })
})

// @desc    Authenticate farmer & get token
// @route   POST /api/farmers/login
// @access  Public
const authFarmer = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Find farmer by email
    const farmer = await Farmer.findOne({ email })

    // Check if farmer exists and passwords match
    if (farmer && (await farmer.matchPassword(password))) {
        const token = generateToken(res, farmer._id)
        res.json({
            _id: farmer._id,
            name: farmer.name,
            email: farmer.email,
            token, // Send the token in the response body
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc    Get farmer profile
// @route   GET /api/farmers/profile
// @access  Private (or Public if no auth check is required)
const getFarmerProfile = asyncHandler(async (req, res) => {
    // Find farmer by ID from the request (req.user._id should be set by authentication middleware)
    const farmer = await Farmer.findById(req.user._id)

    if (farmer) {
        res.json({
            _id: farmer._id,
            name: farmer.name,
            BirthDay: farmer.BirthDay,
            NIC: farmer.NIC,
            Address: farmer.Address,
            email: farmer.email,
            contactNumber: farmer.contactNumber,
        })
    } else {
        res.status(404)
        throw new Error('Farmer not found')
    }
})

// @desc    Update farmer profile
// @route   PUT /api/farmers/profile
// @access  Private (or Public if no auth check is required)
const updateFarmerProfile = asyncHandler(async (req, res) => {
    try {
        const farmer = await Farmer.findById(req.user._id)

        if (!farmer) {
            return res.status(404).json({ message: 'Farmer not found' })
        }

        // Validate password format if provided
        if (req.body.password) {
            const passwordIsValid =
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                    req.body.password
                )
            if (!passwordIsValid) {
                return res
                    .status(400)
                    .json({ message: 'Invalid password format' })
            }

            // Hash the new password
            farmer.password = await bcrypt.hash(req.body.password, 10)
        }

        // Update other fields
        farmer.name = req.body.name || farmer.name
        farmer.BirthDay = req.body.BirthDay || farmer.BirthDay
        farmer.NIC = req.body.NIC || farmer.NIC
        farmer.Address = req.body.Address || farmer.Address
        farmer.email = req.body.email || farmer.email
        farmer.contactNumber = req.body.contactNumber || farmer.contactNumber

        const updatedFarmer = await farmer.save()

        res.json({
            _id: updatedFarmer._id,
            name: updatedFarmer.name,
            BirthDay: updatedFarmer.BirthDay,
            NIC: updatedFarmer.NIC,
            Address: updatedFarmer.Address,
            email: updatedFarmer.email,
            contactNumber: updatedFarmer.contactNumber,
            token: generateToken(res, updatedFarmer._id), // Generate new token and include in response
        })
    } catch (error) {
        console.error('Error updating profile:', error.message) // Detailed logging
        res.status(500).json({
            message: 'Error updating farmer profile',
            error: error.message,
        })
    }
})

// @desc    Logout farmer
// @route   POST /api/farmers/logout
// @access  Private (or Public if no auth check is required)
const logoutFarmer = asyncHandler(async (req, res) => {
    // Clear the token cookie
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0), // Set the cookie expiration to a past date
    })

    res.status(200).json({ message: 'Farmer logged out successfully' })
})

// @desc    Delete farmer account
// @route   DELETE /api/farmers/profile
// @access  Private (or Public if no auth check is required)
const deleteFarmerAccount = asyncHandler(async (req, res) => {
    try {
        // Find and delete farmer by ID
        const farmer = await Farmer.findByIdAndDelete(req.user._id)

        if (!farmer) {
            res.status(404)
            throw new Error('Farmer not found')
        }

        res.status(200).json({ message: 'Farmer account deleted successfully' })
    } catch (error) {
        console.error('Error deleting farmer account:', error) // Log the full error
        res.status(500).json({
            message: 'Error deleting farmer account',
            error: error.message,
        })
    }
})

// @desc    Get farmer by ID
// @route   GET /api/farmers/:id
// @access  Private (or Public if no auth check is required)
const getFarmerById = asyncHandler(async (req, res) => {
    // Find farmer by ID from the request parameters
    const farmer = await Farmer.findById(req.params.id)

    if (farmer) {
        res.json({
            _id: farmer._id,
            name: farmer.name,
            BirthDay: farmer.BirthDay,
            NIC: farmer.NIC,
            Address: farmer.Address,
            email: farmer.email,
            contactNumber: farmer.contactNumber,
        })
    } else {
        res.status(404)
        throw new Error('Farmer not found')
    }
})

export {
    registerFarmer,
    authFarmer,
    getFarmerProfile,
    updateFarmerProfile,
    logoutFarmer,
    deleteFarmerAccount,
    getFarmerById,
}

import asyncHandler from '../middlewares/asyncHandler.js';
import Farmer from '../models/farmerModel.js';
import { generateToken } from '../utils/genrateToken.js';

// @desc    Register a new farmer
// @route   POST /api/farmers/register
// @access  Public
const registerFarmer = asyncHandler(async (req, res) => {
    const { name, BirthDay, NIC, Address, email, contactNumber, password } = req.body;

    // Check if the farmer already exists
    const farmerExists = await Farmer.findOne({ email });

    if (farmerExists) {
        res.status(400);
        throw new Error('Farmer already exists');
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
    });

    // Generate and set token in cookie
    generateToken(res, farmer._id);

    // Respond with the farmer details and token
    res.status(201).json({
        _id: farmer._id,
        name: farmer.name,
        BirthDay: farmer.BirthDay,
        NIC: farmer.NIC,
        Address: farmer.Address,
        email: farmer.email,
        contactNumber: farmer.contactNumber,
        token: generateToken(res, farmer._id),
    });
});

// @desc    Authenticate farmer & get token
// @route   POST /api/farmers/login
// @access  Public
const authFarmer = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const farmer = await Farmer.findOne({ email });

    if (farmer && (await farmer.matchPassword(password))) {
        const token = generateToken(res, farmer._id);
        res.json({
            _id: farmer._id,
            name: farmer.name,
            email: farmer.email,
            token, // Send the token in the response body
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Get farmer profile
// @route   GET /api/farmers/profile
// @access  Private (or Public if no auth check is required)
const getFarmerProfile = asyncHandler(async (req, res) => {
    const farmer = await Farmer.findById(req.user._id);

    if (farmer) {
        res.json({
            _id: farmer._id,
            name: farmer.name,
            BirthDay: farmer.BirthDay,
            NIC: farmer.NIC,
            Address: farmer.Address,
            email: farmer.email,
            contactNumber: farmer.contactNumber,
        });
    } else {
        res.status(404);
        throw new Error('Farmer not found');
    }
});

// @desc    Update farmer profile
// @route   PUT /api/farmers/profile
// @access  Private (or Public if no auth check is required)
const updateFarmerProfile = asyncHandler(async (req, res) => {
    const farmer = await Farmer.findById(req.user._id);

    if (farmer) {
        farmer.name = req.body.name || farmer.name;
        farmer.BirthDay = req.body.BirthDay || farmer.BirthDay;
        farmer.NIC = req.body.NIC || farmer.NIC;
        farmer.Address = req.body.Address || farmer.Address;
        farmer.email = req.body.email || farmer.email;
        farmer.contactNumber = req.body.contactNumber || farmer.contactNumber;

        if (req.body.password) {
            farmer.password = req.body.password;
        }

        const updatedFarmer = await farmer.save();

        res.json({
            _id: updatedFarmer._id,
            name: updatedFarmer.name,
            BirthDay: updatedFarmer.BirthDay,
            NIC: updatedFarmer.NIC,
            Address: updatedFarmer.Address,
            email: updatedFarmer.email,
            contactNumber: updatedFarmer.contactNumber,
            token: generateToken(res, updatedFarmer._id),
        });
    } else {
        res.status(404);
        throw new Error('Farmer not found');
    }
});

// @desc    Logout farmer
// @route   POST /api/farmers/logout
// @access  Private (or Public if no auth check is required)
const logoutFarmer = asyncHandler(async (req, res) => {
    // Clear the token cookie
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),  // Set the cookie expiration to a past date
    });

    res.status(200).json({ message: 'Farmer logged out successfully' });
});

// @desc    Delete farmer account
// @route   DELETE /api/farmers/profile
// @access  Private (or Public if no auth check is required)
const deleteFarmerAccount = asyncHandler(async (req, res) => {
    const farmer = await Farmer.findById(req.user._id);

    if (farmer) {
        await farmer.remove(); // Remove the farmer from the database
        res.status(200).json({ message: 'Farmer account deleted successfully' });
    } else {
        res.status(404);
        throw new Error('Farmer not found');
    }
});

// @desc    Get farmer by ID
// @route   GET /api/farmers/:id
// @access  Private (or Public if no auth check is required)
const getFarmerById = asyncHandler(async (req, res) => {
    const farmer = await Farmer.findById(req.params.id);

    if (farmer) {
        res.json({
            _id: farmer._id,
            name: farmer.name,
            BirthDay: farmer.BirthDay,
            NIC: farmer.NIC,
            Address: farmer.Address,
            email: farmer.email,
            contactNumber: farmer.contactNumber,
        });
    } else {
        res.status(404);
        throw new Error('Farmer not found');
    }
});

export { 
    registerFarmer, 
    authFarmer, 
    getFarmerProfile, 
    updateFarmerProfile, 
    logoutFarmer, 
    deleteFarmerAccount, 
    getFarmerById 
};

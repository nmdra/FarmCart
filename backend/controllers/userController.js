import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = async (req, res, next) => {
    const { name, email, password, role, defaultAddress, contactNumber, pic } =
        req.body

    try {
        const isUserExist = await User.findOne({ email })
        if (isUserExist) {
            res.status(400)
            throw new Error('User already exists')
        }

        const user = await User.create({
            name,
            email,
            password,
            role,
            defaultAddress,
            contactNumber,
            pic
        })

        if (user) {
            generateToken(res, user._id, user.name)
            return res.status(201).json(user)
        } else {
            res.status(500)
            throw new Error('User creation failed')
        }
    } catch (error) {
        return next(error)
    }
}

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
export const authUser = async (req, res, next) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            res.status(400)
            throw new Error('Email and password are required')
        }
        const user = await User.findOne({ email })

        if (user && (await user.matchPassword(password))) {
            generateToken(res, user._id)

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                defaultAddress: user.defaultAddress,
                contactNumber: user.contactNumber,
            })
        } else {
            res.status(401)
            throw new Error('Invalid email or password')
        }
    } catch (error) {
        return next(error)
    }
}

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
export const logoutUser = (_req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({ message: 'Logged out successfully' })
}

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = async (req, res, next) => {
    if (req.user.role !== 'admin') {
        res.status(403)
        throw new Error('Unauthorized access')
    }

    try {
        const user = await User.findById(req.params.id).select('-password')

        if (user) {
            res.json(user);
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        next(error)
    }
}

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json(user);
  } else {
    res.status(404)
    throw new Error('User not found')
  }
}

// @desc    Upload User Profile picture
// @route   GET /api/users/pfp
// @access  Private
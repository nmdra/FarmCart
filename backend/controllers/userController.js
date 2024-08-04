import User from '../models/userModel.js'
import { generateToken, tokenToVerify } from '../utils/generateToken.js'
import { sendEmail } from '../utils/sendEmail.js'
import jwt from 'jsonwebtoken'

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
            generateToken(res, user._id)
            sendVerifyEmail(user)
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                defaultAddress: user.defaultAddress,
                contactNumber: user.contactNumber,
            })
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
            res.status(401).json({ message: "Invalid Password or Email" })
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

// @desc    Send Verify Email
// @route   GET /api/users/verify
// @access  Private

export const sendVerifyEmail = async (user, res) => {
    try {
        const token = tokenToVerify(user.email);
        const body = {
            from: `'FarmCart 🌱' <${process.env.EMAIL_USER}>`,
            to: `${user.email}`,
            subject: 'FarmCart: Email Activation',
            html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #22c55e;">Hello ${user.name},</h2>
      <p>Thank you for signing up with <strong>FarmCart</strong>. Please verify your email address to complete your registration.</p>
      <p>This link will expire in <strong>2 minutes</strong>.</p>
      <p style="margin-bottom: 20px;">Click the button below to activate your account:</p>
      <a href="${process.env.SITE_URL}/api/users/verify?token=${token}" 
         style="background: #22c55e; color: white; border: 1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration: none; display: inline-block;">Verify Account</a>
      <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@farmcart.com</p>
      <p style="margin-bottom: 0;">Thank you,</p>
      <p style="font-weight: bold;">The FarmCart Team</p>
    </div>
  `,
        };

        const message = 'Please check your email to verify!';
        await sendEmail(body, message);
        return res.status(200).json({ success: true, message });
    } catch (error) {
        console.error(`Error in sending verification email: ${error.message}`);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export const verifyEmail = async (req, res) => {
    const token = req.query.token

    if (!token) {
        return res.status(400).json({ success: false, message: 'Invalid token' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ email: decoded.email })

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid token or user does not exist' })
        }

        user.isVerified = true
        await user.save()

        return res.status(200).json({ success: true, message: 'Email verified successfully!' })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}

// @desc    Send Password Reset Email
// @route   GET /api/users/forgot-password
// @access  Private

export const forgotPassword = async (req, res) => {
    try {
        const isAdded = await User.findOne({ email: req.body.verifyEmail })
        if (!isAdded) {
            return res.status(404).json({ success: false, message: 'No user found with this email' })
        }

        const token = await tokenToVerify(isAdded.email)

        const body = {
            from: `'FarmCart 🌱' <${process.env.EMAIL_USER}>`,
            to: `${req.body.verifyEmail}`,
            subject: 'FarmCart: Password Reset',
            html: `<h2>Hello ${req.body.verifyEmail}</h2>
      <p>A request has been received to change the password for your <strong>FarmCart</strong> account </p>

        <p>This link will expire in <strong> 15 minutes</strong>.</p>

        <p style="margin-bottom:20px;">Click this link for reset your password</p>

        <a href="${process.env.SITE_URL}/api/users/reset-pass?token=${token}" 
             style="background: #ff0000; color: white; border: 1px solid #ff0000; padding: 10px 15px; border-radius: 4px; text-decoration: none; display: inline-block;">Reset Password</a>
        <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@farmcart.com</p>
        <p style="margin-bottom:0px;">Thank you</p>
        <strong>FarmCart Team</strong>
             `,
        };

        const message = 'Please check your email to reset your password!';
        await sendEmail(body);

        return res.status(200).json({ success: true, message });
    } catch (error) {
        console.error(`Error in forgotPassword: ${error.message}`);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

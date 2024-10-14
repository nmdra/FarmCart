import User from '../models/userModel.js'
import { generateToken, tokenToVerify } from '../utils/generateToken.js'
import { sendEmail } from '../utils/sendEmail.js'
import { addDays } from 'date-fns' // Use this for adding days to the current date
import jwt from 'jsonwebtoken'
import Stripe from 'stripe'

// Initialize the Stripe instance with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = async (req, res, next) => {
    const {
        firstname,
        lastname,
        email,
        password,
        membershipType,
        defaultAddress,
        contactNumber,
        pic,
    } = req.body

    try {
        const isUserExist = await User.findOne({ email })
        if (isUserExist) {
            res.status(400)
            throw new Error('User already exists')
        }

        const user = await User.create({
            firstname,
            lastname,
            email,
            password,
            membershipType,
            defaultAddress,
            contactNumber,
            pic,
        })

        if (user) {
            await sendVerifyEmail(req, user, res)
        } else {
            res.status(500)
            throw new Error('User creation failed')
        }
    } catch (error) {
        return next(error)
    }
}

export const updateUser = async (req, res, next) => {
    const {
        firstname,
        lastname,
        email,
        password,
        membershipType,
        defaultAddress,
        contactNumber,
        pic,
        birthday,
    } = req.body

    try {
        const user = await User.findById(req.user._id)

        if (!user) {
            res.status(404)
            throw new Error('User not found')
        }

        // Update user details
        user.firstname = firstname || user.firstname
        user.lastname = lastname || user.lastname
        user.email = email || user.email
        if (password) user.password = password // Only update if password is provided
        user.membershipType = membershipType || user.membershipType
        user.defaultAddress = defaultAddress || user.defaultAddress
        user.contactNumber = contactNumber || user.contactNumber
        user.pic = pic || user.pic
        user.birthday = birthday || user.birthday

        // Save updated user
        const updatedUser = await user.save()

        if (updatedUser) {
            res.status(200).json({
                message: 'User updated successfully',
                user: {
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    firstname: updatedUser.firstname,
                    lastname: updatedUser.lastname,
                    email: updatedUser.email,
                    membershipType: updatedUser.membershipType,
                    membershipExpires: user.membershipExpires,
                    defaultAddress: updatedUser.defaultAddress,
                    contactNumber: updatedUser.contactNumber,
                    pic: updatedUser.pic,
                    isVerified: updatedUser.isVerified,
                    birthday: updatedUser.birthday,
                },
            })
        } else {
            res.status(500)
            throw new Error('User update failed')
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

        if (user.isVerified === false) {
            return res.status(401).json({ message: 'User Email Not Verified' })
        }

        if (user && (await user.matchPassword(password))) {
            generateToken(res, user._id)

            res.json({
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                membershipType: user.membershipType,
                pic: user.pic,
                defaultAddress: user.defaultAddress,
                contactNumber: user.contactNumber,
                membershipExpires: user.membershipExpires,
                isVerified: user.isVerified,
                birthday: user.birthday,
            })
        } else {
            res.status(401).json({ message: 'Invalid Password or Email' })
        }
    } catch (error) {
        return next(error)
    }
}

// @desc    Upgrade user membership
// @route   POST /api/users/upgrade
// @access  Private
export const upgradeMembership = async (req, res, next) => {
    const { membershipType, billingCycle } = req.body

    try {
        const user = await User.findById(req.user._id)

        if (!user) {
            res.status(404)
            throw new Error('User not found')
        }

        if (!['silver', 'gold'].includes(membershipType)) {
            res.status(400)
            throw new Error('Invalid membership type')
        }

        let membershipExpires
        if (billingCycle === 'monthly') {
            membershipExpires = addDays(new Date(), 30) // expires in 30 days
        } else if (billingCycle === 'yearly') {
            membershipExpires = addDays(new Date(), 365) //  expires in 365 days
        } else {
            res.status(400)
            throw new Error('Invalid billing cycle')
        }

        user.membershipType = membershipType
        user.membershipExpires = membershipExpires

        const updatedUser = await user.save()

        res.status(200).json({
            message: `Membership upgraded to ${membershipType}`,
            user: {
                _id: updatedUser._id,
                firstname: updatedUser.firstname,
                lastname: updatedUser.lastname,
                email: updatedUser.email,
                membershipType: updatedUser.membershipType,
                pic: updatedUser.pic,
                defaultAddress: updatedUser.defaultAddress,
                contactNumber: updatedUser.contactNumber,
                membershipExpires: updatedUser.membershipExpires,
                isVerified: updatedUser.isVerified,
                birthday: updatedUser.birthday,
            },
        })
    } catch (error) {
        next(error)
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
    if (req.user.membershipType !== 'admin') {
        return res.status(403).json('Unauthorized')
    }

    try {
        const user = await User.findById(req.params.id).select('-password')

        if (user) {
            res.json(user)
        } else {
            return res.status(404).json('User not found')
        }
    } catch (error) {
        next(error)
    }
}

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json(user)
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
export const sendVerifyEmail = async (req, user, res) => {
    const isAdded = await User.findOne({ email: req.body.email || user.email })
    if (!isAdded) {
        return res.status(404).json({
            success: false,
            message: 'No user found with this email',
        })
    }

    // Generate the verification token using the user's email
    const token = await tokenToVerify(isAdded.email)
    const result = await emailVerify(isAdded, token)
    if (result.success) {
        res.status(200).json(result)
    } else {
        res.status(500).json(result)
    }
}

const emailVerify = async (user, token) => {
    try {
        // Prepare the email body
        const body = {
            from: `'FarmCart 🌱' <${process.env.EMAIL_USER}>`,
            to: `${user.email}`,
            subject: 'FarmCart: Email Activation',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #22c55e;">Hello ${user.firstname},</h2>
                    <p>Thank you for signing up with <strong>FarmCart</strong>. Please verify your email address to complete your registration.</p>
                    <p>This link will expire in <strong>2 minutes</strong>.</p>
                    <p style="margin-bottom: 20px;">Click the button below to activate your account:</p>
                    <a href="${process.env.SITE_URL}/verifyEmail?token=${token}"
                        style="background: #22c55e; color: white; border: 1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration: none; display: inline-block;">Verify Account</a>
                    <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@farmcart.com</p>
                    <p style="margin-bottom: 0;">Thank you,</p>
                    <p style="font-weight: bold;">The FarmCart Team</p>
                </div>
            `,
        }

        const message = 'Please check your email to verify!'
        await sendEmail(body, message)
        return { success: true, message: 'Please check your email to verify!' }
    } catch (error) {
        console.error(`Error in sending verification email: ${error.message}`)
        return {
            success: false,
            error: `Error in sending verification email: ${error.message}`,
        }
    }
}

export const verifyEmail = async (req, res) => {
    const token = req.query.token

    if (!token) {
        return res
            .status(400)
            .json({ success: false, message: 'Invalid token' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ email: decoded.email })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid token or user does not exist',
            })
        }

        user.isVerified = true
        await user.save()

        return res
            .status(200)
            .json({ success: true, message: 'Email verified successfully!' })
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
            return res.status(404).json({
                success: false,
                message: 'No user found with this email',
            })
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

        <a href="${process.env.SITE_URL}/reset-pass?token=${token}" 
             style="background: #ff0000; color: white; border: 1px solid #ff0000; padding: 10px 15px; border-radius: 4px; text-decoration: none; display: inline-block;">Reset Password</a>
        <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@farmcart.com</p>
        <p style="margin-bottom:0px;">Thank you</p>
        <strong>FarmCart Team</strong>
             `,
        }

        const message = 'Please check your email to reset your password!'
        await sendEmail(body)

        return res.status(200).json({ success: true, message })
    } catch (error) {
        console.error(`Error in forgotPassword: ${error.message}`)
        res.status(500)
        throw new Error('Internal server error')
    }
}

export const resetPassword = async (req, res) => {
    const { token, password } = req.body

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Find the user by email (which is embedded in the token)
        const user = await User.findOne({ email: decoded.email })

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: 'User not found' })
        }

        // Update the user's password
        user.password = password
        await user.save()

        return res.status(200).json({
            success: true,
            message: 'Password has been reset successfully',
        })
    } catch (error) {
        console.error('Error in resetPassword:', error.message)
        return res
            .status(400)
            .json({ success: false, message: 'Invalid or expired token' })
    }
}

export const paymentUser = async (req, res) => {
    const { amount, id, email } = req.body

    try {
        // Create a Payment Intent with the specified amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in cents (smallest currency unit)
            currency: 'lkr', // Sri Lankan Rupees
            description: `FarmCart order for ${email}`, // Payment description
            payment_method: id, // Stripe Payment Method ID
            confirm: true, // Confirm payment automatically
            return_url: `${process.env.SITE_URL}/paymentComplete`, // Redirect after payment completion
        })

        // Send a success response with the Payment Intent details
        res.json({
            success: true,
            message: 'Payment Intent created successfully!',
            paymentIntent,
        })
    } catch (error) {
        console.error('Error creating Payment Intent:', error)
        // Send an error response if the payment creation fails
        res.status(500).json({
            success: false,
            message: 'Failed to create Payment Intent',
            error: error.message,
        })
    }
}

// Function to validate the current password
export const validatePassword = async (req, res) => {
    const { currentPassword } = req.body

    try {
        const user = await User.findById(req.user._id) // Ensure req.user is populated with the logged-in user's information

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        console.log(currentPassword)
        // Check if the provided password matches the stored hashed password
        const isMatch = await user.matchPassword(currentPassword) // Define this method in your user model
        console.log(isMatch)

        if (!isMatch) {
            return res.status(400).json({ valid: false })
        }

        return res.json({ valid: true })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

// Update function for changing password
export const updatePassword = async (req, res) => {
    const { newPassword } = req.body

    try {
        const user = await User.findById(req.user._id) // Get the user

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Hash the new password before saving
        user.password = newPassword

        // Save updated user
        const updatedUser = await user.save()

        if (updatedUser) {
            res.status(200).json({
                message: 'Password updated successfully',
                user: {
                    _id: updatedUser._id,
                    email: updatedUser.email,
                },
            })
        } else {
            res.status(500)
            throw new Error('User update failed')
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error' })
    }
}

export const deleteUserAccount = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)

        if (!user) {
            res.status(404)
            throw new Error('User not found')
        }

        await User.findByIdAndDelete(req.user._id)

        res.status(200).json({ message: 'User account deleted successfully' })
    } catch (error) {
        return next(error)
    }
}
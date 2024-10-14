import {
    sendSuccessResetPasswordEmail,
    sendWelcomeEmail,
} from '../../config/mailtrap/emails.js'
import {
    sendVerificationEmail,
    sendPasswordResetEmail,
} from '../../config/mailtrap/emails.js'
import {
    generateTokenAndSetCookie,
    generateVerificationCode,
} from '../../utils/generateVerificationCode.js'
import CCMUser from '../../models/Help/ccmUser.model.js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

export const ccmSignup = async (req, res) => {
    const { email, firstName, lastName, password, profilePicture } = req.body
    try {
        if (!email || !firstName || !lastName || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const userAllreadyExists = await CCMUser.findOne({ email })
        if (userAllreadyExists) {
            return res
                .status(400)
                .json({ success: false, message: 'User allready exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const verificationCode = generateVerificationCode()
        const ccmUser = new CCMUser({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            profilePicture,
            verificationToken: verificationCode,
            verificationTokenExpire: Date.now() + 24 * 60 * 60 * 1000,
        })

        await ccmUser.save()

        //JWT
        generateTokenAndSetCookie(res, ccmUser._id)
        //Verification Email
        await sendVerificationEmail(ccmUser.email, verificationCode)

        res.status(201).json({
            success: true,
            message: 'User Created Successfully',
            ccmUser: {
                ...ccmUser._doc,
                password: undefined,
            },
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const ccmVerifyEmail = async (req, res) => {
    const { code } = req.body
    try {
        const user = await CCMUser.findOne({
            verificationToken: code,
            verificationTokenExpire: { $gt: Date.now() },
        })
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: 'Invalid verification code' })
        }

        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpire = undefined

        await user.save()

        await sendWelcomeEmail(user.email, user.firstName)

        res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            user: {
                ...user._doc,
                password: undefined,
            },
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const ccmLogin = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await CCMUser.findOne({ email })
        if (!user) {
            return res
                .status(400)
                .json({ message: 'Invalid email or password' })
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res
                .status(400)
                .json({ message: 'Invalid email or password' })
        }

        // JWT token generation and setting cookie
        generateTokenAndSetCookie(res, user._id)
        user.lastLogin = Date.now()
        await user.save()

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                ...user._doc,
                password: undefined,
            },
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const ccmLogout = async (req, res) => {
    res.clearCookie('token')
    res.status(200).json({ success: true, message: 'Logged out successfully' })
}

export const ccmForgotPassword = async (req, res) => {
    const { email } = req.body

    try {
        // Find user by email
        const user = await CCMUser.findOne({ email })
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: 'User not found' })
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex')
        const resetTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000 // 1 hour expiry

        // Set token and expiration time in the user object
        user.resetPasswordToken = resetToken
        user.resetPasswordExpire = resetTokenExpiresAt

        // Save the user with the updated token
        await user.save()

        // Send the reset password email
        const resetUrl = `${process.env.SITE_URL}/help/ccm/reset-password/${resetToken}`
        await sendPasswordResetEmail(user.email, resetUrl)

        // Send a response
        res.status(200).json({
            success: true,
            message: 'Password reset email sent successfully',
        })
    } catch (error) {
        // Handle and log error
        res.status(500).json({
            success: false,
            message: 'An error occurred while sending the reset email',
            error: error.message,
        })
    }
}

export const ccmResetPassword = async (req, res) => {
    try {
        const { token } = req.body
        const { password } = req.body

        const user = await CCMUser.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() },
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token',
            })
        }

        //update password
        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save()

        await sendSuccessResetPasswordEmail(user.email)

        res.status(200).json({
            success: true,
            message: 'Password Reset Successfully',
        })
    } catch (error) {
        console.log('Error in Password Reset', error)
        res.status(400).json({
            success: false,
            message: 'Password Reset Wrrong',
        })
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await CCMUser.findById(req.CCMUser._id).select('-password')
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: 'User not found' })
        }

        res.status(200).json({ success: true, user })
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
    }
}

import { sendWelcomeEmail } from '../../config/mailtrap/emails.js'
import { sendVerificationEmail } from '../../config/mailtrap/emails.js'
import {
    generateTokenAndSetCookie,
    generateVerificationCode,
} from '../../utils/generateVerificationCode.js'
import CCMUser from '../../models/Help/ccmUser.model.js'
import bcrypt from 'bcryptjs'

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
    res.send('Login route')
}
export const ccmLogout = async (req, res) => {
    res.send('Logout route')
}

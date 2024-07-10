import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

export const registerUser = async (req, res, next) => {
    const { name, email, password, role, defaultAddress, contactNumber } =
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
        })

        if (user) {
            generateToken(res, user._id, user.name)
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: role || 'regular',
                defaultAddress: {
                    address: defaultAddress?.address || '',
                    city: defaultAddress?.city || '',
                    postalCode: defaultAddress?.postalCode || '',
                    country: defaultAddress?.country || '',
                },
                contactNumber: contactNumber || '',
            })
        } else {
            res.status(500)
            throw new Error('User creation failed')
        }
    } catch (error) {
        return next(error)
    }
}

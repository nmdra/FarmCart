import User from '../../models/userModel.js'
import bcrypt from 'bcryptjs'

// Fetch all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error })
    }
}

// Fetch single user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error })
    }
}

// Update user by ID
export const updateUserById = async (req, res) => {
    const {
        firstname,
        lastname,
        email,
        password,
        defaultAddress,
        contactNumber,
        membershipType,
        membershipExpires,
    } = req.body

    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        user.firstname = firstname || user.firstname
        user.lastname = lastname || user.lastname
        user.email = email || user.email
        user.defaultAddress = defaultAddress || user.defaultAddress
        user.contactNumber = contactNumber || user.contactNumber
        user.membershipType = membershipType || user.membershipType
        user.membershipExpires = membershipExpires || user.membershipExpires

        if (password) {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)
        }

        const updatedUser = await user.save()
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error })
    }
}

// Delete user by ID
export const deleteUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        await user.remove()
        res.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error })
    }
}

// Validate user password
export const validateUserPassword = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const isMatch = await user.matchPassword(password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' })
        }

        res.status(200).json({ message: 'Password validated successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error validating password', error })
    }
}

export const getUserCount = async (req, res) => {
    try {
        const count = await User.countDocuments()
        res.status(200).json({ count })
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user count' })
    }
}

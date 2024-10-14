import CCMUser from '../../models/Help/ccmUser.model.js'

// Create a new Customer Care Manager
export const createCCM = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body
        const newUser = await CCMUser.create({
            email,
            password,
            firstName,
            lastName,
        })
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Get all Customer Care Managers
export const getAllCCMs = async (req, res) => {
    try {
        const ccmUsers = await CCMUser.find()
        res.status(200).json(ccmUsers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get a specific Customer Care Manager by ID
export const getCCMById = async (req, res) => {
    try {
        const ccmUser = await CCMUser.findById(req.params.id)
        if (!ccmUser) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json(ccmUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Update a Customer Care Manager
export const updateCCM = async (req, res) => {
    try {
        const ccmUser = await CCMUser.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!ccmUser) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json(ccmUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Delete a Customer Care Manager
export const deleteCCM = async (req, res) => {
    try {
        const ccmUser = await CCMUser.findByIdAndDelete(req.params.id)
        if (!ccmUser) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(204).send() // No content
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

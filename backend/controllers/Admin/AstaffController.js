import Staff from '../../models/Admin/AstaffModel.js'
import mongoose from 'mongoose'

// Create a new staff member
export const addStaffMember = async (req, res) => {
    const { firstName, lastName, nic, email, birthday, phone, Address, role } =
        req.body

    try {
        const newStaff = new Staff({
            firstName,
            lastName,
            nic,
            email,
            birthday,
            phone,
            Address,
            role,
        })

        const savedStaff = await newStaff.save()
        res.status(201).json(savedStaff)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get all staff members
export const getAllStaff = async (req, res) => {
    try {
        const staff = await Staff.find().sort({ firstName: 1 }) // Change sorting to firstName
        res.status(200).json(staff)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const getStaffCount = async (req, res) => {
    try {
        const count = await Staff.countDocuments()
        res.status(200).json({ count })
    } catch (error) {
        res.status(500).json({ error: 'Error fetching staff count' })
    }
}

// Get staff member by ID
export const getStaffById = async (req, res) => {
    const { id: staffId } = req.params

    try {
        if (!mongoose.isValidObjectId(staffId)) {
            return res.status(400).json({ message: 'Invalid staff ID format' })
        }

        const staff = await Staff.findById(staffId)
        if (!staff) {
            return res.status(404).json({ message: 'Staff not found' })
        }

        res.status(200).json(staff)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Update staff member by ID
export const updateStaffMember = async (req, res) => {
    const { id: staffId } = req.params
    const { firstName, lastName, nic, birthday, phone, email, Address, role } =
        req.body

    try {
        if (!mongoose.isValidObjectId(staffId)) {
            return res.status(400).json({ message: 'Invalid staff ID format' })
        }

        const staff = await Staff.findById(staffId)
        if (!staff) {
            return res.status(404).json({ message: 'Staff not found' })
        }

        staff.firstName = firstName || staff.firstName
        staff.lastName = lastName || staff.lastName
        staff.nic = nic || staff.nic
        staff.email = email || staff.email
        staff.birthday = birthday || staff.birthday
        staff.Address = {
            home: Address.home || staff.Address.home,
            street: Address.street || staff.Address.street,
            city: Address.city || staff.Address.city,
        }

        staff.phone = phone || staff.phone
        staff.role = role || staff.role

        const updatedStaff = await staff.save()
        res.status(200).json(updatedStaff)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Delete staff member by ID
export const deleteStaffMember = async (req, res) => {
    const { id: staffId } = req.params

    try {
        if (!mongoose.isValidObjectId(staffId)) {
            return res.status(400).json({ message: 'Invalid staff ID format' })
        }

        const staff = await Staff.findByIdAndDelete(staffId)
        if (!staff) {
            return res.status(404).json({ message: 'Staff not found' })
        }

        res.status(200).json({ message: 'Staff deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get email options (example)
export const getRoleOptions = async (req, res) => {
    const roleOptions = [
        'example1@gmail.com',
        'example2@gmail.com',
        'example3@gmail.com',
    ]
    res.status(200).json(emailOptions)
}

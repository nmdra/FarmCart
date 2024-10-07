import Staff from '../../models/Admin/AdminStaff.js' // Correct path to Staff model

// Add a new staff member
export const addStaff = async (req, res) => {
    try {
        const { nic, name, birthday, email, phone, address } = req.body

        // Check if the email or NIC is already in use
        const existingStaffByEmail = await Staff.findOne({ email })
        if (existingStaffByEmail) {
            return res.status(400).json({ message: 'Email is already in use' })
        }

        const existingStaffByNic = await Staff.findOne({ nic })
        if (existingStaffByNic) {
            return res.status(400).json({ message: 'NIC is already in use' })
        }

        // Create a new staff member
        const staff = new Staff({
            nic,
            name,
            birthday,
            email,
            phone,
            address,
        })

        // Save the staff member to the database
        await staff.save()

        res.status(201).json(staff)
    } catch (error) {
        res.status(500).json({ message: 'Error adding staff member', error })
    }
}

// Update an existing staff member
export const updateStaff = async (req, res) => {
    try {
        const { staffId } = req.params
        const { nic, name, birthday, email, phone, address } = req.body

        // Find the staff member by ID
        const staff = await Staff.findById(staffId)
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' })
        }

        // Check for unique constraints
        const existingStaffByEmail = await Staff.findOne({
            email,
            _id: { $ne: staffId },
        })
        if (existingStaffByEmail) {
            return res.status(400).json({ message: 'Email is already in use' })
        }

        const existingStaffByNic = await Staff.findOne({
            nic,
            _id: { $ne: staffId },
        })
        if (existingStaffByNic) {
            return res.status(400).json({ message: 'NIC is already in use' })
        }

        // Update staff member details
        staff.nic = nic
        staff.name = name
        staff.birthday = birthday
        staff.email = email
        staff.phone = phone
        staff.address = address

        await staff.save()

        res.status(200).json(staff)
    } catch (error) {
        res.status(500).json({ message: 'Error updating staff member', error })
    }
}

// Retrieve all staff members
export const getAllStaff = async (req, res) => {
    try {
        const staffMembers = await Staff.find()
        res.status(200).json(staffMembers)
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving staff members',
            error,
        })
    }
}

// Retrieve a specific staff member by ID
export const getStaffById = async (req, res) => {
    try {
        const { staffId } = req.params

        const staff = await Staff.findById(staffId)
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' })
        }

        res.status(200).json(staff)
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving staff member',
            error,
        })
    }
}

// Delete a staff member
export const deleteStaff = async (req, res) => {
    try {
        const { staffId } = req.params

        const staff = await Staff.findById(staffId)
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' })
        }

        await staff.deleteOne()

        res.status(200).json({ message: 'Staff member deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting staff member', error })
    }
}

// Search staff members by name
export const searchStaffByName = async (req, res) => {
    try {
        const { name } = req.query

        // Find staff members whose names contain the search term (case-insensitive)
        const staffMembers = await Staff.find({
            name: { $regex: name, $options: 'i' },
        })
        res.status(200).json(staffMembers)
    } catch (error) {
        res.status(500).json({
            message: 'Error searching staff members',
            error,
        })
    }
}

// models/Admin/AstaffModel.js

import mongoose from 'mongoose'

// Define the Address sub-schema
const AddressSchema = new mongoose.Schema({
    home: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
})

// Define the Staff schema
const StaffSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },

    nic: {
        type: String,
        unique: true,
        required: true, // Ensure that NIC is always provided
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    Address: {
        type: AddressSchema,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
})

// Create and export the Staff model
const Staff = mongoose.model('Staff', StaffSchema)
export default Staff

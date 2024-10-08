import mongoose from 'mongoose'

const DLDriverSchema = mongoose.Schema(
    {
        driverID: {
            type: String,
            required: true,
            unique: true, // Ensure the driverID is unique
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        idCardNumber: {
            type: String,
            required: true,
        },
        licenseCardNumber: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        vehicleNumber: {
            type: String,
            required: true,
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['Bike', 'Three-Wheel', 'Lorry'],
        },
        password: {
            type: String,
            required: true,
        },
        isAvailable: {
            type: Boolean,
            default: false, // Set availability to unavailable by default
        },
        idCardImageUrl: {
            type: String,
            required: true,
        },
        licenseImageUrl: {
            type: String,
            required: true,
        },
        personalImageUrl: {
            type: String,
            required: true,
        },

        xxxName: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
)

const DLDriver = mongoose.model('DLDriver', DLDriverSchema)

export default DLDriver

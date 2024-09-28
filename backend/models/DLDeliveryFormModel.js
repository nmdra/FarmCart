import mongoose from 'mongoose'

const DLDeliveryFormSchema = mongoose.Schema(
    {
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
            match: [/.+@.+\..+/, 'Please enter a valid email address'],
        },
        phone: {
            type: String,
            required: true,
            match: [/^\d{10}$/, 'Please enter a valid phone number'],
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
        status: {
            type: String,
            required: true,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending',
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
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
)

const DLDeliveryForm = mongoose.model('DLDeliveryForm', DLDeliveryFormSchema)

export default DLDeliveryForm

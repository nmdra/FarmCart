import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const DLDriverSchema = new mongoose.Schema({
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
}, {
    timestamps: true,
});

// Encrypt password before saving
DLDriverSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to match password
DLDriverSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const DLDriver = mongoose.model('DLDriver', DLDriverSchema);

export default DLDriver;

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const addressSchema = new mongoose.Schema({
    houseNo: {
        type: String,
        required: [true, 'House number is required'],
    },
    streetName: {
        type: String,
        required: [true, 'Street name is required'],
    },
    city: {
        type: String,
        required: [true, 'City is required'],
    },
});

const farmerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        BirthDay: {
            type: Date,
            required: [true, 'BirthDay is required'],
            validate: {
                validator: function (v) {
                    // Ensure the birth date is in the past
                    return v < new Date();
                },
                message: 'BirthDay must be a valid past date!',
            },
        },
        NIC: {
            type: String,
            required: [true, 'NIC is required'],
            unique: true,
            validate: [
                {
                    validator: function (v) {
                        // Check if NIC length is 12 characters
                        return v.length === 12;
                    },
                    message: 'NIC must be 12 characters long!',
                },
                {
                    validator: function (v) {
                        if (!this.BirthDay) return true; // Skip this validation if BirthDay is not provided

                        const birthYear = this.BirthDay.getFullYear().toString();
                        const nicYear = v.slice(0, 4);

                        // Check if the NIC's first four characters match the birth year
                        return birthYear === nicYear;
                    },
                    message: 'NIC does not match the birth year!',
                },
            ],
        },
        Address: {
            type: addressSchema,
            required: true,
        },
        email: {
            type: String,
            lowercase: true,
            required: [true, 'Email is required'],
            unique: [true, 'Email already exists'],
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: '{VALUE} is not a valid email!',
            },
        },
        contactNumber: {
            type: String,
            required: [true, 'Contact number is required'],
            validate: {
                validator: function (v) {
                    return /^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$/.test(v);
                },
                message: '{VALUE} is not a valid contact number!',
            },
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
    },
    {
        timestamps: true,
    }
);

farmerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        next(error);
    }
});

farmerSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Farmer = mongoose.model('Farmer', farmerSchema);

export default Farmer;

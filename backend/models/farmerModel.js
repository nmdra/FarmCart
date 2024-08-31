import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// Schema for storing address details
const addressSchema = new mongoose.Schema({
    houseNo: {
        type: String,
        required: [true, 'House number is required'], // Ensure house number is provided
    },
    streetName: {
        type: String,
        required: [true, 'Street name is required'], // Ensure street name is provided
    },
    city: {
        type: String,
        required: [true, 'City is required'], // Ensure city is provided
    },
})

// Main schema for Farmer model
const farmerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'], // Ensure name is provided
            validate: {
                validator: function (v) {
                    // Validate that the name contains only letters and spaces
                    return /^[a-zA-Z\s]+$/.test(v)
                },
                message:
                    '{VALUE} is not a valid name! Only letters and spaces are allowed.',
            },
        },
        BirthDay: {
            type: Date,
            required: [true, 'BirthDay is required'], // Ensure birth date is provided
            validate: {
                validator: function (v) {
                    // Ensure the birth date is in the past
                    return v < new Date()
                },
                message: 'BirthDay must be a valid past date!',
            },
        },
        NIC: {
            type: String,
            required: [true, 'NIC is required'], // Ensure NIC is provided
            unique: true, // NIC must be unique
            validate: [
                {
                    validator: function (v) {
                        // Check if NIC length is exactly 12 characters
                        return v.length === 12
                    },
                    message: 'NIC must be 12 characters long!',
                },
                {
                    validator: function (v) {
                        const birthYear = this.BirthDay.getFullYear().toString()
                        const nicYear = v.slice(0, 4)

                        // Check if the NIC's first four characters match the birth year
                        return birthYear === nicYear
                    },
                    message: 'NIC does not match the birth year!',
                },
            ],
        },
        Address: {
            type: addressSchema,
            required: true, // Ensure address is provided
        },
        email: {
            type: String,
            lowercase: true, // Convert email to lowercase
            required: [true, 'Email is required'], // Ensure email is provided
            unique: [true, 'Email already exists'], // Email must be unique
            validate: {
                validator: function (v) {
                    // Validate email format
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
                },
                message: '{VALUE} is not a valid email!',
            },
        },
        contactNumber: {
            type: String,
            required: [true, 'Contact number is required'], // Ensure contact number is provided
            validate: {
                validator: function (v) {
                    // Validate contact number format (starts with 0, followed by 7 and then 8 digits)
                    return /^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$/.test(v)
                },
                message: '{VALUE} is not a valid contact number!',
            },
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        image: {
            type: String,
            default: function () {
                return `https://avatar.iran.liara.run/username?username=${this.name}}`
            },
            required: false,
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
)

// Hash the password before saving to the database
farmerSchema.pre('save', async function (next) {
    // If the password is not modified, move to the next middleware
    if (!this.isModified('password')) {
        return next()
    }

    try {
        const salt = await bcrypt.genSalt(10) // Generate salt
        this.password = await bcrypt.hash(this.password, salt) // Hash the password

        next() // Proceed to the next middleware after successful hashing
    } catch (error) {
        next(error) // Pass any errors to the next middleware
    }
})

// Method to compare input password with hashed password
farmerSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password) // Compare passwords
}

const Farmer = mongoose.model('Farmer', farmerSchema)

export default Farmer

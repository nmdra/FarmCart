import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: false,
        },
        lastname: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            lowercase: true,
            required: [true, 'Email not Provided'],
            unique: [true, 'Email already exists'],
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
                },
                message: '{VALUE} is not a valid email!',
            },
        },
        password: {
            type: String,
            required: [true, 'Password not provided'],
        },
        pic: {
            type: String,
            default: function () {
                return `https://avatar.iran.liara.run/username?username=${this.firstname}}`
            },
            required: false,
        },
        defaultAddress: {
            streetAddress: { type: String, required: false },
            city: { type: String, required: false },
            zipCode: { type: String, required: false },
            district: { type: String, required: false },
        },
        contactNumber: {
            type: String,
            required: false,
            validate: {
                validator: function (v) {
                    return /^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$/.test(v)
                },
                message: '{VALUE} is not a valid contact number!',
            },
        },
        birthday: {
            type: Date,
            required: false, // Ensure birth date is provided
        },
        isVerified: {
            type: Boolean,
            default: false,
            required: false,
        },
        membershipType: {
            type: String,
            enum: ['regular', 'silver', 'gold'],
            default: 'regular',
        },
        membershipExpires: { type: Date, default: null },
    },

    {
        timestamps: true,
    }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    } catch (error) {
        next(error)
    }
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User

// TODO: Joi Validation schema support
// TODO: Addresses and more

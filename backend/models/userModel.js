import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            lowercase: true,
            required: [true, 'Email not Provided`'],
            unique: [true, 'Email already exists'],
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
                },
                message: '{VALUE} is not a valid email!',
            },
        },
        role: {
            type: String,
            lowercase: true,
            enum: ['regular', 'vip'],
            default: 'regular',
            required: [true, 'Please specify user role'],
        },
        password: {
            type: String,
            required: [true, 'Password not provided'],
        },
        defaultAddress: {
            address: { type: String, required: false, default: '' },
            city: { type: String, required: false, default: '' },
            postalCode: { type: Number, required: false, default: '' },
            country: { type: String, required: false, default: '' },
        },
        contactNumber: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$/.test(v);
                },
                message: '{VALUE} is not a valid contact number!',
            },
        },
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

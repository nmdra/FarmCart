import mongoose from 'mongoose'

const ccmUserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default:
                'https://res.cloudinary.com/aweeshainfo/image/upload/v1659132492/ITPCCM/user_dp9s8o.png',
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
        verificationToken: String,
        verificationTokenExpire: Date,
    },
    {
        timestamps: true,
    }
)

const CCMUser = mongoose.model('CCMUser', ccmUserSchema)
export default CCMUser

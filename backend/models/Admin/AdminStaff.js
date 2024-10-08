import mongoose from 'mongoose'

const staffSchema = new mongoose.Schema({
    nic: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    birthday: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
})

const Staff = mongoose.model('Staff', staffSchema)

export default Staff

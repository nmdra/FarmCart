// models/DLImageModel.js
import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
})

const DLImage = mongoose.model('DLImage', imageSchema)

export default DLImage

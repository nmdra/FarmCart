// controllers/DLuploadController.js
import DLImage from '../models/DLImageModel.js'
import asyncHandler from 'express-async-handler'

export const uploadImage = asyncHandler(async (req, res) => {
    const { filename, path } = req.file

    const newDLImage = new DLImage({
        filename,
        path,
    })

    await newDLImage.save()

    res.status(201).json({
        message: 'Image uploaded successfully',
        image: newDLImage,
    })
})

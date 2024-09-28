import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Specify the folder where images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`) // Create a unique filename
    },
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb('Please upload only images.', false)
    }
}

const upload = multer({
    storage,
    fileFilter,
})

export default upload

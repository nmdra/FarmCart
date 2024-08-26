import multer from 'multer'
import { extname } from 'path'

// Multer config
const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname)
        if (
            ext !== '.jpg' &&
            ext !== '.jpeg' &&
            ext !== '.png' &&
            ext !== '.webp'
        ) {
            cb(new Error('File type is not supported'), false)
            return
        }
        cb(null, true)
    },
})

export default upload

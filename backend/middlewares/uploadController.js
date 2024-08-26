import cloudinary from '../utils/cloudinary.js'
import upload from '../utils/multer.js'

export const uploadImage = async (req, res) => {
    try {
        // Wrap the multer upload in a Promise
        const fileUpload = () => {
            return new Promise((resolve, reject) => {
                upload.single('image')(req, res, (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(req.file)
                    }
                })
            })
        }

        // Await the file upload
        const file = await fileUpload()

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' })
        }

        // Upload to Cloudinary
        console.log()
        const result = await cloudinary.uploader.upload(file.path, {
            folder: req.body.folder, // Optional: specify a folder in your Cloudinary account
        })

        // Return the Cloudinary URL
        res.status(200).json({
            message: 'File uploaded successfully',
            url: result.secure_url,
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

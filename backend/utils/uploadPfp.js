import { v2 as cloudinary } from 'cloudinary';

const uploadPfp = async (file) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    try {
        const result = await cloudinary.uploader.upload(file, {
            public_id: `profile_${Date.now()}`,
            width: 200,
            height: 200,
            crop: 'fill',
            format: 'jpg',
        })
        console.log (result.secure_url)
    } catch (error) {
        console.error(error)
        throw new Error('Failed to upload profile picture')
    }
}

export default uploadPfp
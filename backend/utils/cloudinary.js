import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function checkCloudinaryConnection() {
    try {
        const result = await cloudinary.api.ping()
        console.log('Cloudinary connection successful:', result)
    } catch (error) {
        console.error('Cloudinary connection failed:', error.message)
    }
}

checkCloudinaryConnection()

export default cloudinary

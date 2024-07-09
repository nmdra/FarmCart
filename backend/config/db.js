import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB

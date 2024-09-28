import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'

// Import routes
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
import farmerRoutes from './routes/farmerRoute.js'
import shopRoute from './routes/shop_productRoute.js'
import userShop from './routes/userShopRoute.js'
import imageHandler from './routes/imageHandlerRoute.js'
import couponRouter from './routes/couponRouter.js'

//Admin imports
import promotionRoutes from './routes/Admin/AdminPromotionRoutes.js';
import productRoutes from './routes/Admin/AdminProductRoutes.js';
import staffRoutes from './routes/Admin/AdminStaffRoutes.js';
import customerRoutes from './routes/Admin/AdminCustomerRoutes.js';

import { errorHandler, notFound } from './middlewares/errorMiddleware.js'

// Load environment variables from .env file
dotenv.config()

// Set up port from environment or default to 8000
const PORT = process.env.PORT || 8000

// Connect to MongoDB
connectDB()

const app = express()

// Apply middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Test API route
app.get('/', (_req, res) => {
    res.send('FarmCart API is Running...')
})

// Define API routes
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)
app.use('/api/farmers', farmerRoutes)
app.use('/api/shops', shopRoute)
app.use('/api/userShops', userShop)
app.use('/api/images', imageHandler)
app.use('/api/coupon', couponRouter)

//Admin Routes
// Routes
app.use('/api/promotion', promotionRoutes);
app.use('/api/product', productRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/customer', customerRoutes);

// Middleware to handle errors and send appropriate responses
// Handle 404 Not Found
app.use(notFound)
// Error handler middleware
app.use(errorHandler)

// Start the server
app.listen(PORT, () => {
    console.log(`Server currently is running on port ${PORT}`)
}).on('error', (error) => {
    console.error(`Error starting server: ${error.message}`)
})

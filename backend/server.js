import express from 'express'
import cors from 'cors'
// import path from 'path'; //DL
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
import promotionRoutes from './routes/Admin/AdminPromotionRoutes.js'
import productRoutes from './routes/Admin/AdminProductRoutes.js'
import staffRoutes from './routes/Admin/AdminStaffRoutes.js'
import customerRoutes from './routes/Admin/AdminCustomerRoutes.js'

//Delivery imports
import DLFormRoutes from './routes/DLFormRoutes.js' //DL
import driverRoutes from './routes/DLDriverRoutes.js' //DL
import { fileURLToPath } from 'url' //DL
import DLEmailRoutes from './routes/DLEmailRoutes.js' //DL
import oRoutes from './routes/DLORoutes.js' // DL
import { checkForAvailableDrivers } from './controllers/DLDeliveryController.js' //DL THIS IS CHECKING ALL ODRS AND ASSIGN DRIVERS
import deliveryRoutes from './routes/DLDeliveryRoute.js' //DL
import { startOrderAssignment } from './controllers/DLOcontroller.js' // Import the periodic check

checkForAvailableDrivers() //DL
startOrderAssignment()

import { errorHandler, notFound } from './middlewares/errorMiddleware.js'

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

//Delivery image
// TODO: Remove

// const __filename = fileURLToPath(import.meta.url); //DL
// const __dirname = path.dirname(__filename);//DL

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));//DL

// routes
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
app.use('/api/promotion', promotionRoutes)
app.use('/api/product', productRoutes)
app.use('/api/staff', staffRoutes)
app.use('/api/customer', customerRoutes)

//Delivery Routes
app.use('/api/images', imageHandler) //DL
app.use('/api/d_forms', DLFormRoutes) //DL
app.use('/api/drivers', driverRoutes) // Added driver routes
app.use('/api/email', DLEmailRoutes) // Use the email routes
app.use('/api/od', oRoutes) //dl
app.use('/api/delivery', deliveryRoutes) // Use the delivery routes

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

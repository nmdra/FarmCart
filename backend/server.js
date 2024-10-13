import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import path from 'path'
import { fileURLToPath } from 'url'

// Utility to get the current directory in ES modules
// Correct way to define __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)

// Import routes
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
import farmerRoutes from './routes/farmerRoute.js'
import shopRoute from './routes/shop_productRoute.js'
import userShop from './routes/userShopRoute.js'
import imageHandler from './routes/imageHandlerRoute.js'
import couponRouter from './routes/couponRouter.js'

// Admin imports
import staffRoutes from './routes/Admin/AstaffRoute.js'
import customerRoute from './routes/Admin/AuserRoute.js'

// Delivery imports
import DLFormRoutes from './routes/DLFormRoutes.js'
import driverRoutes from './routes/DLDriverRoutes.js'
import DLEmailRoutes from './routes/DLEmailRoutes.js'
import oRoutes from './routes/DLORoutes.js'
import deliveryRoutes from './routes/DLDeliveryRoute.js'

// Delivery controllers
import {
    checkForAvailableDrivers,
    cleanUpDuplicateDeliveries,
} from './controllers/DLDeliveryController.js'
import {
    startOrderAssignment,
    startSyncDeliveryOrderStatus,
} from './controllers/DLOcontroller.js' // Import the periodic check

// Production-only delivery task scheduling
if (process.env.SERVER_ENV === 'production') {
    checkForAvailableDrivers()
    startOrderAssignment()
    startSyncDeliveryOrderStatus()
    cleanUpDuplicateDeliveries()
}

// Blog, Comments, and News Imports (Merged Content)
import blogRouter from './routes/Blog.js'
import commentRoutes from './routes/comments.js'
import newsRoutes from './routes/newsRoutes.js'

// Error handling
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

// Serve static files for blog images (Merged content)
app.use('/BlogImages', express.static(path.join(__dirname, 'BlogImages')))

// Routes
app.get('/', (_req, res) => {
    res.send('FarmCart API is Running...')
})

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

// Define API routes
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)
app.use('/api/farmers', farmerRoutes)
app.use('/api/shops', shopRoute)
app.use('/api/userShops', userShop)
app.use('/api/images', imageHandler)
app.use('/api/coupon', couponRouter)

// Admin Routes
app.use('/api/staff', staffRoutes)
app.use('/api/customers', customerRoute)

// Delivery Routes
app.use('/api/d_forms', DLFormRoutes)
app.use('/api/drivers', driverRoutes)
app.use('/api/email', DLEmailRoutes)
app.use('/api/od', oRoutes)
app.use('/api/delivery', deliveryRoutes)

// Blog, Comments, and News Routes (Merged content)
app.use('/Blog', blogRouter) // Blog routes
app.use('/comments', commentRoutes) // Comment routes
app.use('/news', newsRoutes) // News routes

// Middleware to handle errors and send appropriate responses
app.use(notFound) // Handle 404 Not Found
app.use(errorHandler) // Error handler middleware

import express from 'express'
import cors from 'cors'
import path from 'path'; //DL
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
import farmerRoutes from './routes/farmerRoute.js'
import shopRoute from './routes/shop_productRoute.js'
import userShop from './routes/userShopRoute.js'
import imageHandler from './routes/imageHandlerRoute.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'
import couponRouter from './routes/couponRouter.js'

//Admin imports
import dotenv from 'dotenv';
import promotionRoutes from './routes/Admin/AdminPromotionRoutes.js';
import productRoutes from './routes/Admin/AdminProductRoutes.js';
import staffRoutes from './routes/Admin/AdminStaffRoutes.js';
import customerRoutes from './routes/Admin/AdminCustomerRoutes.js';


//Delivery imports
import DLFormRoutes from './routes/DLFormRoutes.js';//DL
import driverRoutes from './routes/DLDriverRoutes.js';//DL
import { fileURLToPath } from 'url'; //DL
import DLEmailRoutes from './routes/DLEmailRoutes.js'; //DL
import oRoutes from './routes/DLORoutes.js'; // DL
import { checkForAvailableDrivers } from './controllers/DLDeliveryController.js'; //DL THIS IS CHECKING ALL ODRS AND ASSIGN DRIVERS
import deliveryRoutes from './routes/DLDeliveryRoute.js'; //DL
checkForAvailableDrivers(); //DL

//Admin
dotenv.config();

// load environment variables
const PORT = process.env.PORT || 8000

// connect to MongoDB
connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())


//Delivery image 

const __filename = fileURLToPath(import.meta.url); //DL
const __dirname = path.dirname(__filename);//DL

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));//DL




// routes
app.get('/', (_req, res) => {
    res.send('FarmCart API is Running...')
})

// User API routes
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)

// Shop API routes
app.use('/api/farmers', farmerRoutes);
app.use('/api/shops', shopRoute);
app.use('/api/userShops', userShop);
app.use('/api/images', imageHandler)
app.use('/api/coupon', couponRouter)
app.use(notFound)

//Admin Routes
// Routes
app.use('/api/promotion', promotionRoutes);
app.use('/api/product', productRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/customer', customerRoutes);



//Delivery Routes
// Routes
app.use('/api/images', imageHandler);//DL
app.use('/api/d_forms', DLFormRoutes);//DL
app.use('/api/drivers', driverRoutes); // Added driver routes
app.use('/api/email', DLEmailRoutes); // Use the email routes
app.use('/api/od', oRoutes);//dl
app.use('/api/delivery', deliveryRoutes); // Use the delivery routes


// Middleware to handle errors and send appropriate responses
app.use(errorHandler)

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server currently is running on port ${PORT}`)
}).on('error', (error) => {
    console.error(`Error starting server: ${error.message}`)
})

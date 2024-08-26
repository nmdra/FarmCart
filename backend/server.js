import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'
import farmerRoutes from './route/farmerRoute.js'
import shopRoute from './route/shop_productRoute.js'
// load environment variables
const PORT = process.env.PORT || 8000

// connect to MongoDB
connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

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

app.use(notFound);

// Middleware to handle 404 errors (route not found)
app.use(errorHandler)

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server currently is running on port ${PORT}`)
}).on('error', (error) => {
    console.error(`Error starting server: ${error.message}`)
})

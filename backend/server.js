import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoute from './routes/userRoute.js';
import orderRoute from './routes/orderRoute.js';
import imageHandler from './routes/imageHandlerRoute.js';
import DLDeliveryRoutes from './routes/DLDeliveryRoutes.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Routes
app.get('/', (_req, res) => {
    res.send('FarmCart API is Running...');
});

// User API routes
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);

// Delivery API route
app.use('/api/delivery', DLDeliveryRoutes);

// Shop API routes
// app.use('/api/farmers', farmerRoutes);
// app.use('/api/shops', shopRoute);
app.use('/api/images', imageHandler);

app.use(notFound);

// Middleware to handle errors and send appropriate responses
app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server currently is running on port ${PORT}`);
}).on('error', (error) => {
    console.error(`Error starting server: ${error.message}`);
});

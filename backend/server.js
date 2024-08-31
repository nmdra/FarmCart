import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoute from './routes/userRoute.js';
import orderRoute from './routes/orderRoute.js';
import farmerRoutes from './routes/farmerRoute.js';
import shopRoute from './routes/shop_productRoute.js';
import imageHandler from './routes/imageHandlerRoute.js';
import DLFormRoutes from './routes/DLFormRoutes.js';
import { fileURLToPath } from 'url';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

// Load environment variables
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.get('/', (_req, res) => {
    res.send('FarmCart API is Running...');
});

app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);
app.use('/api/farmers', farmerRoutes);
app.use('/api/shops', shopRoute);
app.use('/api/images', imageHandler);
app.use('/api/d_forms', DLFormRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server currently is running on port ${PORT}`);
}).on('error', (error) => {
    console.error(`Error starting server: ${error.message}`);
});

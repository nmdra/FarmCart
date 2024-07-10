import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import { errorHandler } from './middlewares/errorMiddleware.js'

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
// app.use('/api/users', userRoute)

app.all('*', (_req, res) => {
    res.status(404).json({
        message: 'Page not found',
        statusCode: 404,
    })
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server currently is running on port ${PORT}`)
}).on('error', (error) => {
    console.error(`Error starting server: ${error.message}`)
})

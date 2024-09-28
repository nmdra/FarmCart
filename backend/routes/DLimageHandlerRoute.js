// routes/DLimageHandlerRoute.js
import express from 'express'
import { uploadImage } from '../controllers/DLuploadController.js'
import upload from '../middlewares/DLMulter.js'

const router = express.Router()

router.post('/upload', upload.single('image'), uploadImage)

export default router

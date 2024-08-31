import express from 'express'
import { uploadImage } from '../controllers/uploadController.js'

const router = express.Router()

router.route('/').post(uploadImage)
// router.route('/').post(protect,uploadImage)

export default router

import express from 'express'
import { authUser, forgotPassword, getUserById, logoutUser, registerUser, updateUserProfile, verifyEmail } from '../controllers/userController.js'
import protect from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('').post(registerUser).put(protect, updateUserProfile)
router.route('/auth').post(authUser)
router.route('/logout').post(protect, logoutUser)
router.route('/verify').get(verifyEmail)
router.route('/forgot-password').post(forgotPassword)

router.route('/:id').get(protect, getUserById)

export default router

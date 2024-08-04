import express from 'express'
import { authUser, forgotPassword, logoutUser, registerUser, verifyEmail } from '../controllers/userController.js'

const router = express.Router()

router.route('').post(registerUser)
router.route('/auth').post(authUser)
router.route('/logout').post(logoutUser)
router.route('/verify').get(verifyEmail)
router.route('/forgot-password').post(forgotPassword)
export default router
